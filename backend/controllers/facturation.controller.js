
const {factuCreate,factuList, changeInPro, changeInFacture,cloture_bon_de_livraison,reinject_bon_de_livraison,factuDetail,doctorDetail,factuCancel,queryFactuByDoctor} = require('../query/facturation.query')


exports.createFactu = async (req, res, next) =>{
    const body = req.body;
    let price_total = 0;
    for(let i = 0; i< body[0].flux.length; i++){
        const prix = body[0].flux[i].price
        price_total += prix
    }
    const today = new Date();
    let jj = today.getDate();
    let mm = today.getMonth()+1;
    const aaaa = today.getFullYear()
    if(mm <10){
        mm = '0'+ mm
    }
    if(jj < 10){
        jj = '0'+ jj
    }
    const dateResult = `${jj}/${mm}/${aaaa}`
    try{
        const facture = await factuCreate(body, price_total,dateResult);
        res.redirect(`/facturation`);
    }catch(e){
        next(e);
    }
};

exports.listFactu = async (req, res, next) =>{
    try{
        const facture = await factuList();
        res.send(facture);
    }catch(e){
        next(e);
    }
}

exports.pro_to_facture = async (req,res, next) =>{
    const id = req.params.factuId;
    try{
        const facture = await changeInFacture(id);
        console.log(facture[0].flux)
        facture[0].flux.forEach((el)=>{
                const id = el._id;
                cloture_bon_de_livraison(id)
        })
        res.end()
    }catch(e){
        next(e);
    }
}

exports.facture_to_pro = async (req,res, next) =>{
    const id = req.params.factuId;
    console.log(id)
    try{
        const facture = await changeInPro(id);
        facture[0].flux.forEach((el)=>{
            const id = el._id;
            reinject_bon_de_livraison(id)
    })
        res.end()
    }catch(e){
        next(e);
    }
}

exports.detailFactu = async (req, res, next) =>{
    const id = req.params.factuId;
    try{
        const facture = await factuDetail(id);
        res.send(facture);
    }catch(e){
        next(e);
    }
}

exports.detailDoctor = async (req, res, next) =>{
    const name = req.params.nameDoctor
    console.log(name)
    try{
        const doctor = await doctorDetail(name);
        res.send(doctor);
    }catch(e){
        next(e);
    }
}

exports.cancelFactu = async (req, res, next) =>{
    const id = req.params.factuId;
    try{
        const facture = await factuCancel(id);
        facture[0].flux.forEach((el)=>{
            const id = el._id;
            reinject_bon_de_livraison(id)
    })
        res.end();
    }catch(e){
        next(e);
    }
}

exports.getFactuByDoctor = async (req, res, next) =>{
    const name = req.params.nameDoctor;
    try{
        const facture = await queryFactuByDoctor(name)
        res.send(facture);
    }catch(e){
    next(e);
    }
}