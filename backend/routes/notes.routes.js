
const {noteList, noteCreate, noteCheck, noteDelete} = require('../controllers/notes.controller');
const router = require('express').Router();


// lien vers /api/notes/...

router.get('/', noteList);

router.post('/new-note', noteCreate);
router.get('/check-note/:noteId', noteCheck); //edit & update
router.delete('/delete-note/:noteId', noteDelete);



module.exports = router;