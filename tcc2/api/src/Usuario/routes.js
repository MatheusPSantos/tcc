const express = require("express");
const router = express.Router();

router.get("/usuario", (req, res) => {
        res.send("Dentro das rotas de usuario.");
});

module.exports = router;