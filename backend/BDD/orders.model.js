const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const counterReset = require('mongoose-sequence')(mongoose);
const schema = mongoose.Schema;

const orderSchema = schema ({
    flux : {type:Array},
    doctor:{type:Array},
    patient:{type:String},
    price:{type:Number},
    date_of_creation:{type:String},
    inside_facture : {type:Boolean},
},{
    timestamp:true,
});

orderSchema.plugin(AutoIncrement, {inc_field: 'number_order'});

const Order = mongoose.model('order',orderSchema);

module.exports = Order