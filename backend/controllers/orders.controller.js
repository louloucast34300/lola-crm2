const {
    createOrder,
    listOrder,
    detailOrder
} = require('../query/orders.query')
exports.orderCreate = async (req, res, next) => {
    const body = req.body;
    const array_price =[]
    

        await body.flux_de_prod.forEach((prod)=>{
                const push_array = array_price.push(prod.price_presta)
            })
            let calcul_price = 0;
            for (let i = 0; i < array_price.length; i++){
                calcul_price += array_price[i];
            }
            const total_price = calcul_price
    try{
        const order = await createOrder(body, total_price)
      //  res.redirect(`/order?message=${encodeURIComponent('Nouveau bon de livraison enregistré.')}`);
      res.end();
    }catch(e){
        next(e);
    }
}

exports.orderList = async (req, res, next) => {
    try{
       const order = await listOrder();
       res.send(order);
    }catch(e){
        next(e);
    }
}

exports.orderEdit = async (req, res, next) => {
    try{
        res.send('orderEdit OK');
    }catch(e){
        next(e);
    }
}

exports.orderUpdate= async (req, res, next) => {
    try{
        res.send('orderUpdate OK');
    }catch(e){
        next(e);
    }
}
exports.orderDetail = async (req, res, next) => {
    const id = req.params.orderID;

    try{
        const order = await detailOrder(id);
        res.send(order);
    }catch(e){
        next(e);
    }
}

exports.orderDelete = async (req, res, next) => {
    try{
        res.send('orderDelete OK');
    }catch(e){
        next(e);
    }
}