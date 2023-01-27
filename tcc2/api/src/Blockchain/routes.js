const express = require("express");
const { createValidator } = require("express-joi-validation");
const router = express.Router();

const { create } = require('./validator');
const BlockchainController = require('./controllers');

router.post(
  "/blockchain/salvar/usuario",
  createValidator().body(create.body),
  BlockchainController.salvarUsuarioNaBlockchain
);

router.post(
  "/blockchain/salvar/denuncia",
  //createValidator().body(create.body),
  //BlockchainController.salvarUsuarioNaBlockchain
);

router.post(
  "/blockchain/login/usuario",
  //createValidator().body(create.body),
  //BlockchainController.salvarUsuarioNaBlockchain
);

router.post(
  "/blockchain/logout/usuario",
  //createValidator().body(create.body),
  //BlockchainController.salvarUsuarioNaBlockchain
);


module.exports = router;