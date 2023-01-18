const express = require("express");
const { createValidator } = require("express-joi-validation");
const UsuarioController = require("./controllers/usuario");
const router = express.Router();
const { create } = require("./validator");

router.post(
  "/usuario",
  createValidator().body(create.body),
  UsuarioController.criarUsuario,
);

module.exports = router;