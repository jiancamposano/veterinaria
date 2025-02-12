const mongoose = require("mongoose");

const mascotaSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true },
        descripcion: { type: String, required: true },
    },
    { collection: "mascota" }
); 

const Mascota = mongoose.model("Mascota", mascotaSchema); 
module.exports = Mascota;
