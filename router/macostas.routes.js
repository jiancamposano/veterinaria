const express = require("express");
const router = express.Router();
const Mascota = require("../models/mascota");

router.get("/", async (req, res) => {
    try {
      const arrayMascotasDB = await Mascota.find(); // Obtener todas las mascotas
      console.log(arrayMascotasDB); // Responder con los registros
      res.render('mascotas',{
        arrayMascotasDB
      })
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las mascotas" });
    }
  });

module.exports = router;
