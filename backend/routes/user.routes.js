const router = require('express').Router();
const {UserCreate, SessionCreate, SessionDelete,GetSessionInfo } = require('../controllers/user.controller')
// link vers ici : /api/user/...

router.get('/', (req, res)=>{ res.end() })
router.post('/', UserCreate);

router.get('/user-info',GetSessionInfo);
router.post('/signin', SessionCreate);
router.get('/signout', SessionDelete);
router.get('/test', (req, res)=> {res.send('test')});
module.exports = router;