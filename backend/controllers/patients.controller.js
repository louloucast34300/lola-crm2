
exports.patientCreate = async (req, res, next) =>{
    try{
        res.send('patientCreate OK')
    }catch(e){
        next(e);
    }
}

exports.patientList = async (req, res, next) =>{
    try{
        res.send('patientList OK')
    }catch(e){
        next(e);
    }
}

exports.patientEdit = async (req, res, next) =>{
    try{
        res.send('patientEdit OK')
    }catch(e){
        next(e);
    }
}

exports.patientUpdate = async (req, res, next) =>{
    try{
        res.send('patientUpdate OK')
    }catch(e){
        next(e);
    }
}

exports.patientDetail = async (req, res, next) =>{
    try{
        res.send('patientDetail OK')
    }catch(e){
        next(e);
    }
}

exports.patientDelete = async (req, res, next) =>{
    try{
        res.send('patientDelete OK')
    }catch(e){
        next(e);
    }
}