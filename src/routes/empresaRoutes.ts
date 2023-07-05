import express from 'express';
import controller from '../controller/empresaController'

const router = express.Router();

router.post('/ingresarEmpresa', (req, res, next) => {
    controller.ingresarEmpresa(req, res)
});

router.post("/eliminarEmpresa/:idEmpresa", (req,res,next) =>{
    controller.eliminarEmpresa(req,res)
})

router.get("/listarEmpresas", (req,res,next) =>{
    controller.listarEmpresas(req,res)
})

router.get("/detalleEmpresa/:idEmpresa", (req,res,next) =>{
    controller.detalleEmpresa(req,res)
})


export default router;