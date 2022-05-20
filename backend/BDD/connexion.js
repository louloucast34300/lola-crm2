const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://louiscastel:Soleil34@cluster0.qdiai.mongodb.net/Lola?authSource=admin&replicaSet=atlas-snvdlk-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
SESSION_SECRET=cersei`,{
    useNewUrlParser: true,
}).then(()=>{
    console.log("BDD connnecté");
}).catch((err)=>{
    console.log("erreur");
});