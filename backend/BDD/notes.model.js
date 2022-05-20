const mongoose = require('mongoose');
const schema = mongoose.Schema;

const noteSchema = schema ({
    title_note:{type:String},
    message:{type:String},
    check:{type:Boolean, default: false},
    date:{type:String},
},{
    timestamp:true,
});

const Note = mongoose.model('note',noteSchema);

module.exports = Note;