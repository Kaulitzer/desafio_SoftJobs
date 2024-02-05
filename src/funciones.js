const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../database');

const SECRET_KEY = 'tuClaveSecreta'; // Cambia esto y guárdalo de forma segura

async function register_usuarios(req, res) {
  try {
    const { email, password, rol, lenguage } = req.body;

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, hashedPassword, rol, lenguage]
    );

    const usuarioRegistrado = result.rows[0];

    res.json({ mensaje: 'Usuario registrado con éxito', usuario: usuarioRegistrado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const usuario = result.rows[0];

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const match = await bcrypt.compare(password, usuario.password);

    if (!match) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ email: usuario.email }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
}

async function get_usuario(req, res) {
  try {
    const { email } = req;

    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const usuario = result.rows[0];

    res.json({ usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener usuario autenticado' });
  }
}

module.exports = { register_usuarios, login, get_usuario };
