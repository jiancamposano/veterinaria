const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    

    res.render("index", {
        titulo: "JC Pet Care",
        subTituloWeb: " Tu mejor Veterinaria ",
    });
});

router.get("/servicios", (req, res) => {
    res.render("servicios", {
        tituloServicios: "Este es un mensaje dinámico de servicios",
    });
});

module.exports = router;
