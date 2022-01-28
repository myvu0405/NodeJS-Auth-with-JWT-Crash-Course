const mongoose=require('mongoose');
const {isEmail,isHash}=require('validator');
const bcrypt = require('bcrypt');

const {Schema} = mongoose;

const userSchema = new Schema ({
    username: {
        type: String,
        required: [true, 'Please enter your username!'],
        minlength: [3, 'Minimum username length is 3 characters!']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address!'],
        lowercase: true,
        unique: true,
        validate: [isEmail, 'Email address is not valid!']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password!'],
        minlength: [6, 'Minimum password length is 6 characters!']
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

    //search user email address in db
    const user= await this.findOne({email:email});
    if(user) {
        
        //compare passwords
        const authUser= await bcrypt.compare(password,user.password);
        if(authUser){
                
                return user;
        }
        else throw new Error('Incorrect password! Please enter your password again!');
            

    }
    else {
        throw new Error('Incorrect email address!');
    }

}

const User=mongoose.model('user', userSchema);
module.exports=User;