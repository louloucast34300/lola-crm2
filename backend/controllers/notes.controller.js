const {listNote, createNote, checkNote, deleteNote} = require('../query/notes.query');

exports.noteList = async (req, res, next) =>{
    try{
        const note = await listNote();
        res.send(note);
    }catch(e){
        next(e);
    }
};

exports.noteCreate = async (req, res, next) =>{
    const body = req.body;
    const date = new Date();
    let jj = date.getDay();
    let mm = date.getMonth()+1;
    if(mm <10){
        mm = '0'+ mm
    }
    if(jj < 10){
        jj = '0'+ jj
    }
    const aaaa = date.getFullYear();
    const dateNow = `${jj}/${mm}/${aaaa}`
    console.log("coucou")
    console.log(body)
    try{
        const note = await createNote(body,dateNow);
        res.redirect('/')
    }catch(e){
        next(e);
    }
};

exports.noteCheck = async (req, res, next) =>{ // edit && update;
    const id = req.params.noteId;

    try{
        const note = await checkNote(id);
        res.redirect('/');
    }catch(e){
        next(e);
    }
};

exports.noteDelete = async (req, res, next) =>{
    const id = req.params.noteId;
    console.log(id)
    try{    
        const note = await deleteNote(id);
        res.end();
    }catch(e){
        next(e);
    }
};