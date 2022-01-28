const User=require('../models/user');
const jwt=require('jsonwebtoken');
const secretKey=process.env.SECRET_KEY;


const checkUserAuth = async (req, res, next ) => {

    const token= req.cookies.jwt;
    //check jwt is exist en verified
    if(token) {
        //verify the token
        try {
            const authUser = await jwt.verify(token,secretKey);
            next();
        }
        catch(err) {
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
}


const checkUser = async (req,res,next)=>{

    const token=req.cookies.jwt;
    if(token) {
        try {
            const authUser= await jwt.verify(token,secretKey);
            User.findById(authUser.id)
                .then(user => {
                    res.locals.user=user;
                    next();

                })
                .catch(err => {
                    console.log(err);
                    res.locals.user=null;
                    next();

                })
        }
        catch(err) {
            console.log('Verification was failed!');
            res.locals.user=null;
            next();

        }
    } else {
        console.log('No JWT token exists!');
        res.locals.user=null;
        next();

    }
}

module.exports={checkUserAuth,checkUser}