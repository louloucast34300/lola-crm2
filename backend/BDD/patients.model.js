const mongoose = require('mongoose');
const schema = mongoose.Schema;

const patientSchema = schema ({
    username:{type:String},
    lastname:{type:String},
    phone:{type:Number},
    doctorID:{type:String},
},{
    timestamp:true,
});

const Patient = mongoose.model('patient',patientSchema);

module.exports = Patient;