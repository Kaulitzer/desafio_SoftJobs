const express = require('express');
const { get_usuario, login, register_usuarios } = require('./funciones');
const { verificarToken } = require('../middlewares');

const router = express.Router();

router.post("/usuarios", register_usuarios);
router.post("/login", login);
router.get("/usuarios", verificarToken, get_usuario);

module.exports = router;
