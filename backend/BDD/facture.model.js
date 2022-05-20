const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const counterReset = require('mongoose-sequence')(mongoose);
const schema = mongoose.Schema;

const factureSchema = schema ({
    type:{type:String},
    doctor:{type:String},
    definitive:{type:Boolean},
    date_of_creation:{type:String},
    flux : {type:Array},
    canceled:{type:Boolean},
    total:{type:Number},
},{
    timestamp:true,
});

factureSchema.plugin(AutoIncrement, {inc_field: 'number_order_facture'});

const Facture = mongoose.model('facture',factureSchema);

module.exports = Facture;