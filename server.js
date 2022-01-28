const express=require('express');
require('./config/mongoose');
const cookieParser=require('cookie-parser');
const {checkUser}=require('./middlewares/authMiddleware');

const mainRouter=require('./routers/mainRouter');
const userRouter=require('./routers/userRouter');
const questionRouter=require('./routers/questionRouter');

const app=express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('*',checkUser);
app.use(mainRouter,userRouter,questionRouter);

app.set('view engine', 'ejs');

app.listen(2022, () => console.log("Application is listening to port 2022 ..."));