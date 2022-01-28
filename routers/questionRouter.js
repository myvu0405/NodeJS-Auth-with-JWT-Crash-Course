const express = require('express');
const questionController=require('../controllers/questionController');

const questionRouter=express.Router();

questionRouter.all('/askQuestion', questionController.askQuestion)

module.exports=questionRouter;