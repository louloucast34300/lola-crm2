const mongoose = require('mongoose');
const schema = mongoose.Schema;

const clientSchema = schema({
    client:{
        name:{type:String},
        surname:{type:String},
        email:{type:String},
        phone:{type:Number},
        center:{type:String},
        conseiller:{type:String},
        dateExitForma:{type:Date},
        genre:{type:String}
    },
    siteWeb:{
        ndm:{type:String},
        type:{type:String},
        couleur:{type:String},
        menu:{type:String},
        inspiration:{type:String},
        resume:{type:String},
        comment:{type:String},
        dateStartSite:{type:Date},
        dateEndSite:{type:Date},
        dateRappelSite:{type:Date},
        Parsed_dateStart:{type:Array},
        Parsed_dateEnd:{type:Array},
        Parsed_dateRappel:{type:Array},
        ndmReserved:{type:Boolean},
        completed:{type:Boolean},
        webDesigner:{type:String},
    }
});

const Client = mongoose.model('client', clientSchema);

module.exports = Client;

