require("dotenv").config();
const app = require("express")();
const { json } = require("express");
const routes = require("./src/routes");
const bodyParser = require("body-parser");
const Web3 = require("web3");
const cors = require("cors");


app.use(bodyParser.json());
app.use(cors());

app.use(routes);

app.listen(process.env.PORT || 3333, () => {
    console.info(`API running on port http://127.0.0.1:${process.env.PORT || 3333}`);
});

console.log(process.env.PORT);  