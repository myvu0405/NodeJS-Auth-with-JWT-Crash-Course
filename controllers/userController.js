const User=require('../models/user');
const jwt=require('jsonwebtoken');

//function to create jwt token
const maxAge = 3*24*60*60; //3 days in seconds
const secretKey=process.env.SECRET_KEY;


const createJwtToken=(id) => jwt.sign({id}, secretKey, {expiresIn:maxAge})


const signupFunc = async (req,res) => {
    if (req.method=='GET') {
        res.render('users/signup', {pageTitle: 'Signup form'});
    } else if (req.method=='POST') {

        // User.create(req.body)
        //     .then(user => {

        //     })
        //     .catch(err => console.log(err))

        try {
            const user=await User.create(req.body);
            console.log('New user created in DB: ', user);
            //create token
            const token=createJwtToken(user._id);
            //set token in cookies
            res.cookie('jwt',token,{httpOnly:true, maxAge:maxAge*1000});

            res.redirect('/');
        }
        catch(err){
            console.log(err)
        }
    }
}

const loginFunc = (req,res)=> {
    if (req.method=='GET') {
        res.render('users/login', {pageTitle: 'Login form'});
    } else if (req.method=='POST') {
        const {email,password} = req.body;
        User.login(email,password)
            .then(user => {
                console.log('Found user in DB..Allow user to login.');
                //create token
                const token=createJwtToken(user._id);
                //set token in cookies
                res.cookie('jwt',token,{httpOnly:true, maxAge:maxAge*1000});
                res.redirect('/');
            })
            .catch(error => console.log(error))
    }

}

const logoutFunc=(req,res) =>{
    //res.cookie('jwt','',{maxAge:1});
    res.clearCookie('jwt');
    res.redirect('/login');
}

module.exports={
    signupFunc,
    loginFunc,
    logoutFunc
}