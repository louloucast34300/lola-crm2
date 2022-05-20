const Client = require('../BDD/clients.model');
const Order = require('../BDD/orders.model');

exports.createDoctor = (body) =>{
    const newClient = new Client({
        username : body.username,
        lastname : body.lastname,
        email : body.email,
        address : body.address,
        postal_code : body.postal_code,
        city: body.city,
        phone : body.phone,
        n_siret : body.n_siret,
        infos : body.infos
    });
    return newClient.save();
};

exports.listDoctor = () =>{
    return Client.find().exec();
}

exports.deleteDoctor = (clientId) =>{
    return Client.findByIdAndDelete({_id : clientId}).exec();
}

exports.editDoctor = (clientId) =>{
    return Client.findById({_id : clientId}).exec();
}

exports.updateDoctor = (clientId, body) =>{
    return Client.findByIdAndUpdate(clientId,{
        $set:{
            username : body.username,
            lastname : body.lastname,
            email : body.email,
            address : body.address,
            phone : body.phone,
            n_siret : body.n_siret,
            infos : body.infos
        }
    })
};

exports.detailDoctor = (clientId) =>{
    return Client.findById({_id : clientId}).exec();
}


//clientDetail (commande, en attente, patients, factures)

exports.doctorCommande = (clientId) =>{
    return Order.find({'doctor._id':clientId})
}