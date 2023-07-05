import express from 'express';
import controller from '../controller/userController'

const router = express.Router();


router.post("/login", (req,res,next) =>{
    controller.login(req,res)
})


export default router;