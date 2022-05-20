const router = require('express').Router();

const{
    patientCreate,
    patientList,
    patientEdit,
    patientUpdate,
    patientDetail,
    patientDelete
} = require('../controllers/patients.controller');

// link vers ici /api/clients/:doctorID....
router.post('/new-patient',patientCreate);
router.get('/', patientList);
router.get('/edit-patient/:patientID', patientEdit);
router.post('/update-patient/:patientID',patientUpdate);
router.get('/detail/:patientID', patientDetail);
router.delete('/delete/:patientID', patientDelete);


module.exports = router;