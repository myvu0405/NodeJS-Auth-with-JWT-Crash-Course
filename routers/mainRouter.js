const express=require('express');
const mainController=require('../controllers/mainController');
const {checkUser}=require('../middlewares/authMiddleware');

const mainRouter=express.Router();

mainRouter.all('/',checkUser, mainController.getHomepage);

module.exports=mainRouter;