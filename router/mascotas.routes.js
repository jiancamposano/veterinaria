const express = require("express");
const router = express.Router();
const Mascota = require("../models/mascota");

router.get("/", async (req, res) => {
    try {
        const arrayMascotasDB = await Mascota.find();
        if (!arrayMascotasDB || arrayMascotasDB.length === 0) {
            return res.render("mascotas", {
                error: true,
                mensaje: "No se encontraron mascotas.",
            });
        }
        //console.log(arrayMascotasDB);
        return res.render("mascotas", {
            arrayMascotasDB,
        });
    } catch (error) {
        console.error("Error al obtener las mascotas:", error);

        return res.status(500).render("mascotas", {
            error: true,
            mensaje: "Error al cargar las mascotas.",
        });
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
        // if (!body || Object.keys(body).length === 0) {
        //     return res.status(400).json({
        //         estado: false,
        //         mensaje: "Los datos enviados son inválidos",
        //     });
        // }
        //const mascotaDB = new Mascota(body);
        //await mascotaDB.save();
        await Mascota.create(body);
        res.redirect("/mascotas?message=UsuarioCreado");
    } catch (error) {
        console.error("Error al crear la mascota:", error);

        return res.status(500).json({
            estado: false,
            mensaje: "Error interno del servidor",
        });
    }
});

router.get("/:id", async (req, res) => {
    // const id =req.params.id
    const { id } = req.params;
    try {
        // const mascostaDB = await Mascota.findOne({_id : id})
        const mascotaDB = await Mascota.findById(id);

        console.log(mascotaDB);
        if (!mascotaDB) {
            return res.render("detalle", {
                error: true,
                mensaje: "No se encontró la mascota",
            });
        }

        return res.render("detalle", {
            mascota: mascotaDB,
            error: false,
        });
    } catch (error) {
        console.error("Error al obtener la mascota:", error);
        return res.render("detalle", {
            error: true,
            mensaje: "Error interno del servidor",
        });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        mascotaDB = await Mascota.findByIdAndDelete(id);
        if (!mascotaDB) {
            return res.status(404).json({
                estado: false,
                mensaje: "Mascota no encontrada",
            });
        }
        return res.json({
            estado: true,
            mensaje: "Mascota eliminada correctamente",
        });
    } catch (error) {
        console.error("Error al eliminar mascota:", error);

        return res.status(500).json({
            estado: false,
            mensaje: "Error interno del servidor",
        });
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
            return res.status(404).json({
                estado: false,
                mensaje: "Mascota no encontrada",
            });
        }
        return res.json({
            estado: true,
            mensaje: "Mascota editada correctamente",
        });
    } catch (error) {
        console.error("Error al editar mascota:", error);
        return res.status(500).json({
            estado: false,
            mensaje: "Error interno del servidor",
        });
    }
});

module.exports = router;
