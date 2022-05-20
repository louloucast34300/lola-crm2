const path = require('path')
const {
    createDoctor,
    listDoctor,
    deleteDoctor,
    editDoctor,
    updateDoctor,
    detailDoctor,
    doctorCommande,
} = require('../query/clients.query');


exports.doctorCreate = async (req, res, next) =>{
    const body = req.body
    try{
        console.log(body)
        const client = await createDoctor(body);
        res.redirect(`/client?message=${encodeURIComponent('Nouveau client enregistré.')}`);
    }catch(e){
        next(e);
    }
}

exports.doctorList = async (req, res, next) =>{
    try{
        const client = await listDoctor();
        res.send(client)
    }catch(e){
        next(e);
    }
}

exports.doctorEdit = async (req, res, next) =>{
    const clientId = req.params.doctorID
    console.log(clientId)
    try{
        const client = await editDoctor(clientId);
        res.send(client);
    }catch(e){
        next(e);
    }
}

exports.doctorUpdate = async (req, res, next) =>{
    const clientId = req.params.doctorID;
    const body = req.body;
    try{
       const client = await updateDoctor(clientId, body);
       res.redirect(`/client?message=${encodeURIComponent('Modifications enregistrées')}`);
    }catch(e){
        next(e);
    }
}

exports.doctorDelete = async (req, res, next) =>{
    const clientId = req.params.doctorID;
    console.log(clientId)
    try{
       await deleteDoctor(clientId);
    }catch(e){
        next(e);
    }
}

exports.doctorDetail = async (req, res, next) =>{
    const clientId = req.params.doctorID;
    try{
       const client = await detailDoctor(clientId);
       res.send(client);
    }catch(e){
        next(e);
    }
};


// clientDetail (commande, en attente, patients, factures)

exports.commandeByDoctor = async (req, res, next) =>{
    const clientId = req.params.doctorID;
    try{
        const client = await doctorCommande(clientId);
        res.send(client);
    }catch(e){
        next(e);
    }
}