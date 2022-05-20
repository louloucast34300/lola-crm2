const {
    createPresta,
    listPresta,
    editPresta,
    updatePresta
} = require ('../query/prestation.query')



exports.prestaCreate = async (req, res, next) => {
    const body = req.body
    try{
        console.log(body)
        const prestation = await createPresta(body);
        res.redirect(`/prestation?message=${encodeURIComponent('Nouvelle prestation ajoutée')}`)
    }catch(e){
        next(e);
    }
}
exports.prestaList = async (req, res, next) => {
    try{
        const prestation = await listPresta();
        res.send(prestation)
    }catch(e){
        next(e);
    }
}
exports.prestaEdit = async (req, res, next) => {
    const prestaId = req.params.prestaID
    console.log(prestaId)
    try{
        const prestation = await editPresta(prestaId);

        res.send(prestation)
    }catch(e){
        next(e);
    }
}

exports.prestaUpdate = async (req, res, next) => {
    const body = req.body
    const prestaID = req.params.prestaID
    console.log(body)
    try{
        const prestation = await updatePresta(body, prestaID);
        res.redirect(`/prestation?message=${encodeURIComponent('Modification réussi')}`)
    }catch(e){
        next(e);
    }
}

exports.prestaDetail = async (req, res, next) => {
    try{
        res.send("prestaDetail OK");
    }catch(e){
        next(e);
    }
}

exports.prestaDelete = async (req, res, next) => {
    try{
        res.send("prestaDelete OK");
    }catch(e){
        next(e);
    }
}