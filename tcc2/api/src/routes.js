const express = require("express");
const router = express.Router();

const usuarioRoutes = require("./Usuario/routes");

router.use(usuarioRoutes);

module.exports = router;