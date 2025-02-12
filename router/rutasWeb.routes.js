const express =  require('express')
const router = express.Router()

router.get('/', (req,res) => {
    res.render('index' , {
        titulo : "Este es el render de indexs.ejs"
    })
} )



router.get('/servicios' , (req,res) => {
    res.render('servicios' , {
        tituloServicios : " Este es mi Servicio"
    })
    
})


module.exports = router
