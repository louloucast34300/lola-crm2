const mongoose = require('mongoose');
const schema = mongoose.Schema;

const clientSchema = schema ({
    username:{type:String},
    lastname:{type:String},
    email:{type:String},
    address:{type:String},
    postal_code:{type:String},
    city:{type:String},
    phone:{type:Number},
    n_siret:{type:String},
    infos:{type:String}
},{
    timestamp:true,
});

const Client = mongoose.model('client',clientSchema);

module.exports = Client