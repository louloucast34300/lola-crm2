const User = require('../BDD/user.model');

exports.createUser = async (body) =>{
    try{
        const hashedPassword = await User.hashPassword(body.password);
        const newUser = new User ({
            username:body.username,
            lastname:body.lastname,
            email: body.email,
            password: hashedPassword,
            phone: body.phone,
            isAdmin:false,
        });
        return newUser.save();
    }
    catch(e){
        throw e
    }
}

exports.findUserPerEmail = (email) =>{
    return User.findOne({'local.email':email}).exec();
}
 