const jwt = require('jsonwebtoken');
const SECRET_KEY = 'tuClaveSecreta'; // Cambia esto y guárdalo de forma segura

function verificarToken(req, res, next) {
  const token_ = req.headers.authorization;

  if (!token_) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  const token = token_.split(' ');
  console.log({token})

  jwt.verify(token[1], SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    }

    req.email = decoded.email; // Guarda el email del usuario decodificado en el objeto de solicitud
    next();
  });
}

module.exports = { verificarToken };
