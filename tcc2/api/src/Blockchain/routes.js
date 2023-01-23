const express = require("express");
const { createValidator } = require("express-joi-validation");
const router = express.Router();

const { create } = require('./validator');
const BlockchainController = require('./controllers');

router.post(
  "/blockchain/usuarios",
  createValidator().body(create.body),
  BlockchainController.salvarUsuarioNaBlockchain
);

module.exports = router;