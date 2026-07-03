export const validarCamposRequeridos = (camposRequeridos) => (req, res, next) => {
  const faltantes = camposRequeridos.filter(campo => !req.body[campo]?.toString().trim());

  if (faltantes.length) {
    return res.status(400).json({ message: `Faltan campos obligatorios: ${faltantes.join(', ')}` });
  }

  next();
};