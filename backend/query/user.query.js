const User = require('../BDD/user.model');

exports.createUser =  async (body) =>{
        console.log(body)
        const hashedPassword = await User.hashPassword(body.password);
        const newUser = new User({
            username: body.username,
            lastname: body.lastname,
            email:body.email,
            password:hashedPassword,
            phone: body.phone,
            isAdmin:false,
            role:body.role,
        });
        return newUser.save();
}


exports.findUserPerEmail = (email) =>{
    return User.findOne({'email':email}).exec();
}

exports.GetWebDesigner = ()=>{
    return User.find({role:'web-designer'}).exec();
}