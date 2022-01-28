const mongoose=require('mongoose');
require('dotenv').config();

const usr_login=process.env.USER_LOGIN_MONGODB;
const usr_pswrd=process.env.USER_PASSWORD_MONGODB;
const my_db=process.env.DATABASE_MONGODB;

const db=`mongodb+srv://${usr_login}:${usr_pswrd}@nodetuts.zqauy.mongodb.net/${my_db}?retryWrites=true&w=majority`; //db url

mongoose.connect(db)
    .then( () => console.log('Connected to DB successfully!'))
    .catch(err => console.log(err))
