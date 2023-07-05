import express from 'express';
import controller from '../controller/personController'

const router = express.Router();

router.post('/ingresarPersona', (req, res, next) => {
    controller.ingresarPersona(req, res)
});

router.post("/eliminarPersona/:idPersona", (req,res,next) =>{
    controller.eliminarPersona(req,res)
})

router.get("/buscarPersona", (req,res,next) =>{
    controller.buscarPersona(req,res)
})

router.get("/listarPersonas", (req,res,next) =>{
    controller.listarPersonas(req,res)
})

router.get("/detallePersona/:idPersona", (req,res,next) =>{
    controller.detallePersona(req,res)
})
export default router;