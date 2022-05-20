const Note = require('../BDD/notes.model');

exports.createNote = (body,dateNow) =>{

    const newNote = new Note({
        title_note:body.title,
        message:body.message,
        check:body.check?true:false,
        date:dateNow
    })
    return newNote.save();
};

exports.listNote = () =>{
    return Note.find({}).exec();
}
exports.checkNote = async (id) =>{

    const getNote = await Note.findById(id);
    console.log(getNote.check)
    if(getNote.check === false){
        return Note.findByIdAndUpdate(id,{
            $set:{
               check: true,
            }
        })
    }else{
        return Note.findByIdAndUpdate(id,{
            $set:{
               check: false,
            }
        })
    }
}

exports.deleteNote = (id) => {

    return Note.findByIdAndDelete(id).exec();
}