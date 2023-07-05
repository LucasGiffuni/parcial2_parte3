import express from 'express';
import controller from '../controller/userController'

const router = express.Router();

router.get('/getUsers/:id', (req, res, next) => {
    controller.getUser(req, res)
});

router.post("/createUser", (req,res,next) =>{
    controller.createUser(req,res)
})

router.post("/login", (req,res,next) =>{
    controller.login(req,res)
})

router.delete("/deleteUser/:id", (req,res,next) =>{
    controller.deleteUser(req,res)
})

export default router;