const express = require("express");
const router = express.Router();
const Mascota = require("../models/mascota");

router.get("/", async (req, res) => {
    try {
        const arrayMascotasDB = await Mascota.find();
        //console.log(arrayMascotasDB);
        res.render("mascotas", {
            arrayMascotasDB,
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/crear", (req, res) => {
    res.render("crear", {
        tituloServicios: " crear mascostas",
    });
});

router.post("/", async (req, res) => {
    try {
        const body = req.body;
        //const mascotaDB = new Mascota(body);
        //await mascotaDB.save();
        await Mascota.create(body);
        res.redirect("/mascotas");
    } catch (error) {
        console.log(error);
    }
});

router.get("/:id", async (req, res) => {
    // const id =req.params.id
    const { id } = req.params;
    try {
        // const mascostaDB = await Mascota.findOne({_id : id})
        const mascostaDB = await Mascota.findById(id);

        console.log(mascostaDB);
        res.render("detalle", {
            mascota: mascostaDB,
            error: false,
        });
    } catch (error) {
        console.log(error);
        res.render("detalle", {
            error: true,
            mensaje: "No se Encontro id Seleccionado",
        });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        mascotaDB = await Mascota.findByIdAndDelete(id);
        if (mascotaDB) {
            res.json({
                estado: true,
                mensaje: "Eliminado",
            });
        } else {
            res.json({
                estado: false,
                mensaje: "Eliminado",
            });
        }
    } catch (error) {
        console.log(error);
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    try {
        const mascota = await Mascota.findByIdAndUpdate(id, body, { new: true });
        res.json({
            estado : true,
            mensaje : 'editado'
        })
    } catch (error) {
        res.json({
            estado : false,
            mensaje : 'editado'
        })
    }
});

module.exports = router;
