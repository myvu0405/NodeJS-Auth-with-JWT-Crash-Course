const express = require('express');
const userController=require('../controllers/userController');

const userRouter=express.Router();

userRouter.all('/signup', userController.signupFunc);
userRouter.all('/login', userController.loginFunc);
userRouter.get('/logout', userController.logoutFunc);


module.exports=userRouter;