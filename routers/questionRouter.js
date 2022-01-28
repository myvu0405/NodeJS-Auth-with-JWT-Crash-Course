const express = require('express');
const questionController=require('../controllers/questionController');
const authMiddleWare=require('../middlewares/authMiddleware');

const questionRouter=express.Router();

questionRouter.all('/askQuestion', authMiddleWare.checkUserAuth, questionController.askQuestion);

module.exports=questionRouter;