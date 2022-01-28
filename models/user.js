const mongoose=require('mongoose');
const {isEmail,isHash}=require('validator');
const bcrypt = require('bcrypt');

const {Schema} = mongoose;

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: isEmail
    },
    password: {
        type: String,
        required: true,
        minlength: 5
        //validate: isHash
    }
}, {timestamps: true});

//hash password before saving user to db
userSchema.pre('save', async function () {
    const salt= await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password, salt);
})

//static method to login user
userSchema.statics.login = async function (email,password) {
    if (email=='') throw new Error('Please input your email address!');
    if (password=='') throw new Error('Please input your password!');

    try {//search user email address in db
        const user= await this.findOne({email:email});
        //compare passwords
        const auth=await bcrypt.compare(password,user.password);
        if(auth) return user;
        throw new Error('Incorrect password!');

    }
    catch(err) {
        throw new Error('Incorrect email address!');
    }

}

const User=mongoose.model('user', userSchema);
module.exports=User;