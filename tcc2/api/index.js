require("dotenv").config();
const app = require("express")();
const routes = require("./src/routes");
const bodyParser = require("body-parser");
const cors = require("cors");
require('./database');

app.use(bodyParser.json());
app.use(cors());

app.use(routes);

console.info( '✔ Starting Application' );
console.info( `✔ Mode: ${process.env.NODE_ENV}` );
console.info( `✔ Port: ${process.env.PORT}` );

app.listen(process.env.PORT || 3333, () => {
    console.info(`API running on port http://127.0.0.1:${process.env.PORT || 3333}`);
});

console.info(process.env.PORT);
module.exports = app;