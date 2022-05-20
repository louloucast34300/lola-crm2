const Prestation = require('../BDD/prestation.model');

exports.createPresta = (body) =>{
    const newPresta = new Prestation({
        category : body.category,
        title_presta : body.title_presta,
        product_used : body.product_used, // attention ici tableau dans model
        price_presta : body.price_presta,
        info_supp : body.info_supp
    });
    return newPresta.save();
};

exports.listPresta = () =>{
    return Prestation.find().exec();
}

exports.editPresta = (prestaId) =>{
    return Prestation.findById({_id : prestaId}).exec();
}

exports.updatePresta = (body, prestaID) =>{
    return Prestation.findByIdAndUpdate(prestaID,{
        $set:{
            category : body.category,
            title_presta : body.title_presta,
            product_used : body.product_used, // attention ici tableau dans model
            price_presta : body.price_presta,
            info_supp : body.info_supp
        }
    })
}