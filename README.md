1)diagrama textual o descripción detallada de la arquitectura por capas aplicada en el código.
Cada capa tiene un responsabildiad distinta. Siguiendo un flujo que va de desde el cliente a routes, que Define únicamente el verbo HTTP y el path de cada endpoint, y encadena los middlewares correspondientes antes de llegar al controller. Posteriormente pasa por los middlewares donde analiza la peticion antes de llegar al controller. ValidarToken verifcia la firma e vigencia, mientras que validarCamposRequeridos valida que el body tenga todos los campos obligatorios. Posteriormente llega al controller cual extrae los datos de req (body/params/query), invoca la función correspondiente del service, y devuelve la respuesta HTTP con el código correcto según el resultado. Tras esto avanza a services cual ejecuta las queries a PostgreSQL (usando pg) y contiene también la lógica de negocio asociada a los datos. Recibe parámetros y devuelve datos o lanza excepciones, que el controller captura y traduce a una respuesta HTTP.

No obstante tambien se hayan la capa de config, cual cuenta con la configuracion a postgreSQL (db-config.js), mediante las variables de entorno. Tambien se encuentras los helpers que registra errores de las queries.

Dentro de routes, controllers y services, los archivos se dividen por dominio en lugar de concentrar todo en un único archivo. Los middlewares validarToken y validarCamposRequeridos, en cambio, se usan en todas las rutas protegidas.
Diagrama(realizado con inteligencia artificial):
Cliente (React)
      │
      ▼
   routes    define verbo HTTP + endpoint, delega a middlewares y controller
      │
      ▼
 middlewares intercepta antes del controller (JWT, validación de campos)
      │
      ▼
  controllers orquesta la petición: lee req, llama al service, arma la res
      │
      ▼
   services   capa de datos pura: ejecuta SQL contra PostgreSQL
      │
      ▼
   PostgreSQL
Carpetas(realizado con inteligencia artificial):
Estructura de carpetas
/src
  ├── /config
  │     └── db-config.js        → credenciales de conexión a PostgreSQL desde .env
  │
  ├── /database
  │     └── /entities            → definición de las tablas (usuarios, publicaciones)
  │
  ├── /helpers
  │     └── logHelper.js         → registro centralizado de errores (consola / archivo)
  │
  ├── /middlewares
  │     ├── validarToken.js      → valida el JWT en rutas protegidas
  │     └── validarDatos.js      → valida campos obligatorios en el body
  │
  ├── /controllers
  │     ├── authController.js
  │     ├── usuariosController.js
  │     └── publicacionesController.js
  │
  ├── /routes
  │     ├── authRoutes.js
  │     ├── usuariosRoutes.js
  │     └── publicacionesRoutes.js
  │
  ├── /services
  │     ├── usuario-services.js       → SQL + lógica de negocio de usuarios
  │     └── publicaciones-services.js → SQL + lógica de negocio de publicaciones
  │
  └── app.js                     → inicialización de Express, CORS, puerto y montaje de rutas
2)Estructura SQL de las tablas y relaciones creadas (usuarios y publicaciones).
Para este ejericcio hicimos una relacion de 1 a N(usuario a publicaciones).
Sieno estos sus atributos:
Usuario atributos:
CREATE TABLE public.usuarios (
    id               integer NOT NULL,
    nombre_usuario   character varying NOT NULL,
    nombre_completo  character varying NOT NULL,
    email            character varying NOT NULL,
    password         character varying NOT NULL,
    foto_perfil      character varying,
    biografia        character varying
);
ALTER TABLE public.usuarios
    ADD CONSTRAINT usuarios_pk PRIMARY KEY (id);
Publicaicones atributos:
CREATE TABLE public.publicaciones (
    id               integer NOT NULL,
    usuario_id       integer NOT NULL,
    url_imagen       character varying NOT NULL,
    descripcion      character varying,
    likes            integer DEFAULT 0,
    fecha_creacion   timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.publicaciones
    ADD CONSTRAINT publicaciones_pk PRIMARY KEY (id);

ALTER TABLE public.publicaciones
    ADD CONSTRAINT publicaciones_usuarios_fk FOREIGN KEY (usuario_id)
    REFERENCES public.usuarios(id) ON DELETE CASCADE;
Se utiliza on delete cascade, ya que si se elimina un usuario de la base de datos, al mismo tiempo se eliminan sus publiaciones.
3) Listado completo de endpoints desarrollados aclarando cuáles son públicos, cuáles son protegidos y el formato del JSON que esperan recibir o devolver.
Rutas públicas:
POST /api/auth/register — Registra una nueva cuenta, verificando que el email y el nombre de usuario no estén duplicados.
Body esperado:
json{
  "email": "lucas@email.com",
  "nombre_usuario": "gato_programador",
  "nombre_completo": "Lucas Fernández",
  "password": "miPassword123"
}
Respuesta 201:
json{ "id": 1, "email": "lucas@email.com" }
POST /api/auth/login — Valida credenciales contra la base y devuelve un JWT firmado con expiración de 2 horas.
Body esperado:
json{
  "email": "lucas@email.com",
  "password": "miPassword123"
}
Respuesta 200:
json{ "token": "..." }
GET /api/publicaciones —  Devuelve todas las publicaciones almacenadas para construir el feed principal. No requiere token ni body.
Respuesta 200:
[
  {
    "id": 1,
    "usuario_id": 1,
    "url_imagen": "https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg",
    "descripcion": "Mi gato descansando toda la tarde.",
    "likes": 125,
    "fecha_creacion": "2026-07-03T09:55:00.000Z"
  }
]
Rutas protegidas:
GET /api/usuarios/perfil — Devuelve el perfil del usuario autenticado (según req.user.id extraído del token) junto con sus publicaciones asociadas.
Respuesta 200:
{
  "id": 1,
  "email": "lucas@email.com",
  "nombre_usuario": "gato_programador",
  "nombre_completo": "Lucas Fernández",
  "biografia": "Amante de los gatos y la programación.",
  "foto_perfil": "https://i.pravatar.cc/150?img=1",
  "publicaciones": [
    { "id": 1, "url_imagen": "...", "descripcion": "...", "likes": 125, "fecha_creacion": "..." }
  ]
}
PUT /api/usuarios/perfil — Permite al usuario autenticado editar su biografía, nombre completo y/o foto de perfil.
Body esperado:
{
  "biografia": "Nueva bio",
  "nombre_completo": "Lucas M. Fernández",
  "foto_perfil": "https://i.pravatar.cc/150?img=15"
}
Respuesta 200:
{
  "id": 1,
  "nombre_usuario": "gato_programador",
  "nombre_completo": "Lucas M. Fernández",
  "email": "lucas@email.com",
  "foto_perfil": "https://i.pravatar.cc/150?img=15",
  "biografia": "Nueva bio"
}
La query solo selecciona estas columnas , excluyendo el campo password (hash de bcrypt) para que nunca viaje en la respuesta HTTP, aunque el resto del registro incluya ese dato en la base. 
POST /api/publicaciones Crea una publicación asociada al usuario autenticado. El usuario_id se toma de req.user.id (del token), nunca del body, para que un usuario no pueda publicar en nombre de otro.
{
  "url_imagen": "https://cataas.com/cat",
  "descripcion": "Mi nuevo gato"
}
Respuesta 201:
json{
  "id": 11,
  "usuario_id": 1,
  "url_imagen": "https://cataas.com/cat",
  "descripcion": "Mi nuevo gato",
  "likes": 0,
  "fecha_creacion": "2026-07-12T14:20:00.000Z"
}
4)Explicación de cómo configuraron el middleware de verificación de JWT y qué datos resguardaron dentro de los payloads de los tokens.
middlewares/validarToken.js
Lee el header Authorization de la petición y extrae el token con .split(' ')[1], asumiendo el formato Bearer <token> (la posición [0] sería la palabra Bearer, la [1] el token en sí).
Si no hay token, corta la petición con 401 Unauthorized y el mensaje "Token requerido", sin llegar al controller.
Si hay token, lo verifica con jwt.verify(token, secretKey), usando la misma clave secreta (SECRET_KEY_JWT) con la que se firmó en el login. Esto valida tanto la firma (que no fue alterado) como la vigencia (que no expiró).
Si la verificación falla (firma inválida, token modificado o expirado), el catch corta la petición con 401 Unauthorized y "Token inválido o expirado".
Si la verificación es exitosa, el payload decodificado se adjunta a req.user, y se llama a next() para que la petición continúe hacia el controller correspondiente.
Este middleware se aplica en las rutas que requieren autenticación:
router.get('/perfil', validarToken, obtenerPerfil);
router.put('/perfil', validarToken, editarPerfil);
router.post('/', validarToken, validarCamposRequeridos(['url_imagen', 'descripcion']), crearPublicacion);
El payload se arma en usuario-services.js, al momento del login
const payload = {
    id: usuario.id,
  };

  const options = {
    expiresIn: '2h',
    issuer: 'ORT'
  };

  return jwt.sign(payload, secretKey, options);
};

jwt.sign(payload, secretKey, options);
Un JWT está formado por tres partes separadas por puntos: header.payload.signature. jwt.sign() recibe los tres argumentos de arriba y arma ese string:
payload es la segunda parte del token, donde viajan los datos, donde se hayan datos. siendo id clave ya que la usan GET /usuarios/perfil y POST /publicaciones (vía req.user.id) para saber a qué usuario pertenece la petición. 
no viaja dentro del token, solo la conoce el servidor (se carga desde .env). Se usa para calcular la tercera parte del token
options, son instrucciones del comportamiento al firmar.

