const router = require('express').Router();

const {
    orderCreate,
    orderList,
    orderEdit,
    orderUpdate,
    orderDetail,
    orderDelete
} = require('../controllers/orders.controller')






// link vers ici : /api/order/...
router.post('/new-order',orderCreate);
router.get('/', orderList);
router.get('/edit-order/:orderID', orderEdit);
router.post('/update-order/:orderID',orderUpdate);
router.get('/detail/:orderID', orderDetail);
router.delete('/delete/:orderID', orderDelete);



module.exports = router;