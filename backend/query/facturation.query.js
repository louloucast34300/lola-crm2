const Facture = require('../BDD/facture.model');
const Order = require ('../BDD/orders.model');
const Client = require('../BDD/clients.model');

exports.factuCreate = (body, price_total,dateResult) =>{
    const newFacture = new Facture({
        type: body[0].type,
        doctor:body[0].doctor,
        definitive: body.definitive?true:false,
        date_of_creation:dateResult,
        flux: body[0].flux,
        canceled:false,
        total: price_total
    });
    return newFacture.save();
};

exports.factuList = () =>{
    return Facture.find({}).exec();
}

exports.changeInPro = (id) =>{
    Facture.findByIdAndUpdate(id, {definitive : false}).exec();
    return Facture.find({_id : id}).exec();
}

exports.changeInFacture = (id) =>{

    Facture.findByIdAndUpdate(id, {definitive : true}).exec();
    return Facture.find({_id : id}).exec();

}

exports.cloture_bon_de_livraison =(id) =>{
    return Order.findByIdAndUpdate(id, {inside_facture : true }).exec();
}

exports.reinject_bon_de_livraison = (id) =>{
    return Order.findByIdAndUpdate(id, {inside_facture : false }).exec();
}

exports.factuDetail = (id) =>{
    return Facture.findById({_id : id}).exec();
}

exports.doctorDetail = (name) =>{
    return Client.find({lastname : name}).exec();
}

exports.factuCancel = (id) =>{
  Facture.findByIdAndUpdate(id, {definitive:false, canceled:true}).exec();
  return Facture.find({_id : id}).exec();
}

exports.queryFactuByDoctor = (name) =>{
    return Facture.find({doctor : name}).exec();
}