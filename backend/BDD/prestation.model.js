const mongoose = require('mongoose');
const schema = mongoose.Schema;

const prestationSchema = schema ({
    category : {type:String},
    title_presta : {type:String},
    product_used : {type:Array},
    price_presta : {type:Number},
    info_supp : {type:String}
},{
    timestamp:true,
});

const Prestation = mongoose.model('prestation',prestationSchema);

module.exports = Prestation;