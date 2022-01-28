const User=require('../models/user');
const jwt=require('jsonwebtoken');

//function to create jwt token
const maxAge = 3*24*60*60; //3 days in seconds
const secretKey=process.env.SECRET_KEY;

//function to handle errors
const errHandler = (err) => {

    let errors = {username: '', email: '', password: ''};
    //if inputting incorrect email
    if(err.message.includes('email')) {
        errors.email=err.message;
    }
    
    //if inputting incorrect password
    if(err.message.includes('password')) {
        errors.password=err.message;
    }

    //check duplicate error code (for signing up an duplicate email)
    if (err.code===11000) {
        errors.email='This email is already registered!';
        return errors;
    }

    //validation errors
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path]=properties.message;
        });
    }
    return errors;
}

//function to create jwt token
const createJwtToken= (id) => jwt.sign({id}, secretKey, {expiresIn:maxAge})


const signupFunc = async (req,res) => {

    let signupInfo={username:'',email:'',password:''};

    if (req.method=='GET') {
        
        res.render('users/signup', {pageTitle: 'Signup form',signupVals:signupInfo, errors: false});
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
            //console.log('ERROR OCCURS: ',err.errors);
            const errors=errHandler(err);
            signupInfo=req.body;
            res.render('users/signup', {pageTitle: 'Signup form',signupVals:signupInfo, errors});
            //console.log(errors);
        }
    }
}

const loginFunc = (req,res)=> {
    let loginInfos={email:'',password:''};

    if (req.method=='GET') {
        res.render('users/login', {pageTitle: 'Login form',loginVals:loginInfos, errors:false});
    } else if (req.method=='POST') {
        const {email,password} = req.body;
        User.login(email,password)
            .then(user => {
                
                //create token
                const token=createJwtToken(user._id);
                //set token in cookies
                res.cookie('jwt',token,{httpOnly:true, maxAge:maxAge*1000});
                res.redirect('/');
            })
            .catch(error => {
                loginInfos=req.body;
                const errors=errHandler(error);
                res.render('users/login',{pageTitle:'Login form',loginVals:loginInfos, errors});
            })
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