const express = require("express");
const rutas = require("./router/rutasWeb.routes.js");
const mascotas = require("./router/macostas.routes.js");
require("dotenv").config();
const app = express();
//conexxion a BD
const mongoose = require("mongoose");


const port = process.env.PORT || 8000;
const password = process.env.PASSWORD || "lPQkKAARDxZzO7Vl";
const user = process.env.USERDB || "crud_veterinaria";
const dbname = process.env.DBNAME || "veterinaria";
const uri = `mongodb+srv://${user}:${password}@cluster0.1b5k5.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
    .connect(uri)
    .then(() => console.log("BD conectada"))
    .catch((e) => console.log(e));

//motor de plantilla
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));

app.use("/", rutas);
app.use("/mascotas", mascotas);

app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo404: " Pagina No encontrada 404",
    });
});

app.listen(port, () => {
    console.log(`Escuchando puerto ${port} `);
});
