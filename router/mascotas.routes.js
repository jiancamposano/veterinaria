const express = require("express");
const router = express.Router();

const Mascota = require("../models/mascota");

router.get("/", async (req, res) => {
    try {
        const arrayMascotasDB = await Mascota.find();
        const mensaje = req.query.message;
        
        res.render("mascotas", {
            arrayMascotasDB,
            mensaje,
            mensajeVacio : 'NO SE ENCONTRARON MASCOTAS DISPONIBLES'
        });
    } catch (error) {
        console.error("Error al obtener las mascotas:", error);

       
    }
});

router.get("/crear", (req, res) => {
    res.render("crear", {
        tituloServicios: " crear mascotas",
    });
});

router.post("/", async (req, res) => {
    try {
        const body = req.body;

        //await mascotaDB.save();
        await Mascota.create(body);

        res.redirect("/mascotas?message=Usuario Creado exitosamente");
    } catch (error) {
        console.error("Error al crear la mascota:", error);


    }
});

router.get("/:id", async (req, res) => {
    // const id =req.params.id
    const { id } = req.params;
    try {
        // const mascostaDB = await Mascota.findOne({_id : id})
        const mascotaDB = await Mascota.findById(id);

        //console.log(mascotaDB);
        if (!mascotaDB) {
            res.render("detalle", {
                error: true,
                mensaje: "No se encontró la mascota",
            });
        }
        //res.redirect("/mascotas?message=Usuario ELIMINADO exitosamente");
        res.render("detalle", {
            mascota: mascotaDB,
            error: false,
        });
    } catch (error) {
        console.error("Error al obtener la mascota:", error);
       
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        mascotaDB = await Mascota.findByIdAndDelete(id);
        if (!mascotaDB) {
            res.status(404).json({
                estado: false,
                mensaje: "Mascota no encontrada",
            });
        }
        res.json({
            estado: true,
            mensaje: "Mascota eliminada correctamente",
        });
    } catch (error) {
        console.error("Error al eliminar mascota:", error);

       
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    try {
        const mascota = await Mascota.findByIdAndUpdate(id, body, {
            new: true,
        });
        if (!mascota) {
            res.status(404).json({
                estado: false,
                mensaje: "Mascota no encontrada",
            });
        }
        res.json({
            estado: true,
            mensaje: "Mascota editada correctamente",
        });
    } catch (error) {
        console.error("Error al editar mascota:", error);
       
    }
});

module.exports = router;
