require("dotenv").config();
const app = require("express")();
const routes = require("./src/routes");

app.use(routes);
app.listen(process.env.PORT || 3333, () => {
    console.info(`API running on port ${process.env.PORT || 3333}`);
});

console.log(process.env.PORT);  