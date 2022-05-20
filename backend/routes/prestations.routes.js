const router = require('express').Router();
const {
    prestaCreate,
    prestaList,
    prestaEdit,
    prestaUpdate,
    prestaDetail,
    prestaDelete
} = require('../controllers/prestations.controller');
// link vers ici : /api/prestations/...
// Les prestations sont les produits ici !!!!!

router.post('/new-prestation', prestaCreate);
router.get('/', prestaList);
router.get('/edit-presta/:prestaID', prestaEdit);
router.post('/update-presta/:prestaID', prestaUpdate);
router.get('/detail/:pretaID',prestaDetail);
router.delete('/delete/:prestaID', prestaDelete);

module.exports = router;