const passport = require('passport');
const {createUser} = require('../query/user.query.js');


exports.UserCreate = async (req, res, next) => {
    const body = req.body
    try{
        const user = await createUser(body);
        res.redirect(`/?message=${encodeURIComponent('Nouvel utilisateur enregistré.')}`);
    }catch(e){
        res.status(400).send({ error: e.errors });
    }
};


exports.SessionCreate = (req, res, next) =>{
    passport.authenticate('local', (err, user, info)=>{
        if(err){
            next(e);
        }else if(!user){
            res.redirect('/connexion');
        }else{
            req.login(user, (err)=>{
                if(err){
                    next(e)
                }else{
                    console.log(req.user);
                    res.redirect('/')
                }
            })
        }
    })(req, res, next);
}

exports.SessionDelete = async (req, res, next)=>{
    await req.logout();
    console.log("deconnecté");
    res.clearCookie('connect.sid', {path: '/', httpOnly:true})
    console.log("je passe ici");
    return res.redirect('/connexion')
    //res.clearCookie('connect.sid', {domain:'localhost', path: '/'}).status(200).send('Ok.');
}

exports.GetSessionInfo = async (req,res, next) =>{
    try{
        const user = req.user;
       res.send(user);
    }catch(e){
        next(e)
    }
}