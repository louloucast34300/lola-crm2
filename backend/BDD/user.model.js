const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const userSchema = schema({
    username:{type:String, required: true},
    lastname:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, min: 4, required:true},
    phone:{type:Number},
    isAdmin:{type:Boolean},
    role:{type:String},
},{
    timestamp:true,
});

userSchema.statics.hashPassword = (password) =>{
    if(password){
        return bcrypt.hash(password, 12);
    }else{
        return null;
    }
}

userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;