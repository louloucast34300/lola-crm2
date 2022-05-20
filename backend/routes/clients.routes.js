const router = require('express').Router();
const patientsRoutes = require('./patient.routes');

const {
    doctorCreate,
    doctorList,
    doctorEdit,
    doctorUpdate,
    doctorDelete,
    doctorDetail,
    commandeByDoctor
}= require('../controllers/clients.controller')

// link vers ici : /api/clients/...
router.use('/:doctorID',patientsRoutes)

router.post('/new-doctor',doctorCreate);
router.get('/',doctorList);
router.get('/edit-doctor/:doctorID',doctorEdit);
router.post('/update-doctor/:doctorID', doctorUpdate);
router.get('/detail/:doctorID', doctorDetail);
router.delete('/delete/:doctorID',doctorDelete);

// fiche clientDetail (commandes, en attente, patients, Factures);
router.get('/commande-client/:doctorID', commandeByDoctor)

module.exports = router;