--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2026-07-03 09:55:00

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 4797 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16407)
-- Name: publicaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.publicaciones (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    url_imagen character varying NOT NULL,
    descripcion character varying,
    likes integer,
    fecha_creacion timestamp without time zone
);


ALTER TABLE public.publicaciones OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16406)
-- Name: publicaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.publicaciones ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.publicaciones_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 217 (class 1259 OID 16399)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre_usuario character varying NOT NULL,
    nombre_completo character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    foto_perfil character varying,
    biografia character varying
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16398)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.usuarios ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4791 (class 0 OID 16407)
-- Dependencies: 219
-- Data for Name: publicaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (1, 1, 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg', 'Mi gato descansando toda la tarde.', 125, NULL);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (2, 2, 'https://cdn2.thecatapi.com/images/bpc.jpg', 'Hora de la siesta 😺', 88, NULL);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (3, 3, 'https://cdn2.thecatapi.com/images/9j5.jpg', 'Siempre curioso.', 154, NULL);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (4, 4, 'https://cdn2.thecatapi.com/images/MTY3ODIyNQ.jpg', 'Mi pequeña cazadora.', 201, NULL);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (5, 5, 'https://cdn2.thecatapi.com/images/c4m.jpg', 'Mirando por la ventana.', 67, NULL);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (6, 6, 'https://cdn2.thecatapi.com/images/MTY3ODIyNw.jpg', 'Posando para la cámara.', 173, NULL);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (7, 7, 'https://cdn2.thecatapi.com/images/6qi.jpg', 'No quiere levantarse.', 94, NULL);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (8, 8, 'https://cdn2.thecatapi.com/images/MTY3ODIyOA.jpg', 'Mi mejor compañero.', 110, NULL);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (9, 9, 'https://cdn2.thecatapi.com/images/d9m.jpg', 'Preparándose para saltar.', 132, NULL);
INSERT INTO public.publicaciones OVERRIDING SYSTEM VALUE VALUES (10, 10, 'https://cdn2.thecatapi.com/images/MTY3ODIyOQ.jpg', 'El rey de la casa.', 256, NULL);


--
-- TOC entry 4789 (class 0 OID 16399)
-- Dependencies: 217
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (1, 'gato_programador', 'Lucas Fernández', 'lucas@email.com', '$2b$10$abc123hash1', 'https://i.pravatar.cc/150?img=1', 'Amante de los gatos y la programación.');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (2, 'michifan', 'Sofía Martínez', 'sofia@email.com', '$2b$10$abc123hash2', 'https://i.pravatar.cc/150?img=2', 'Los gatos hacen mi vida mejor.');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (3, 'catlover99', 'Martín Gómez', 'martin@email.com', '$2b$10$abc123hash3', 'https://i.pravatar.cc/150?img=3', 'Fotógrafo de gatos.');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (4, 'kittyqueen', 'Valentina Ruiz', 'valentina@email.com', '$2b$10$abc123hash4', 'https://i.pravatar.cc/150?img=4', 'Rescatista de felinos.');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (5, 'peludito', 'Tomás Herrera', 'tomas@email.com', '$2b$10$abc123hash5', 'https://i.pravatar.cc/150?img=5', 'Mi gato se llama Simba.');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (6, 'gatuna', 'Camila Pérez', 'camila@email.com', '$2b$10$abc123hash6', 'https://i.pravatar.cc/150?img=6', 'Fan de los gatos naranjas.');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (7, 'felix_dev', 'Nicolás Díaz', 'nico@email.com', '$2b$10$abc123hash7', 'https://i.pravatar.cc/150?img=7', 'Backend + gatos = felicidad.');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (8, 'minino123', 'Agustina López', 'agus@email.com', '$2b$10$abc123hash8', 'https://i.pravatar.cc/150?img=8', 'Colecciono fotos de gatos.');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (9, 'gatitofeliz', 'Juan Ramírez', 'juan@email.com', '$2b$10$abc123hash9', 'https://i.pravatar.cc/150?img=9', 'Los gatos dominan el mundo.');
INSERT INTO public.usuarios OVERRIDING SYSTEM VALUE VALUES (10, 'miau_master', 'Florencia Castro', 'flor@email.com', '$2b$10$abc123hash10', 'https://i.pravatar.cc/150?img=10', 'Todo es mejor con un gato.');


--
-- TOC entry 4798 (class 0 OID 0)
-- Dependencies: 218
-- Name: publicaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.publicaciones_id_seq', 10, true);


--
-- TOC entry 4799 (class 0 OID 0)
-- Dependencies: 216
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 10, true);


--
-- TOC entry 4643 (class 2606 OID 16413)
-- Name: publicaciones publicaciones_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicaciones
    ADD CONSTRAINT publicaciones_pk PRIMARY KEY (id);


--
-- TOC entry 4641 (class 2606 OID 16405)
-- Name: usuarios usuarios_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pk PRIMARY KEY (id);


--
-- TOC entry 4644 (class 2606 OID 16414)
-- Name: publicaciones publicaciones_usuarios_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publicaciones
    ADD CONSTRAINT publicaciones_usuarios_fk FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


-- Completed on 2026-07-03 09:55:00

--
-- PostgreSQL database dump complete
--

