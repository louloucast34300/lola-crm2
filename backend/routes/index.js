const router = require('express').Router();
const userRoutes = require('./user.routes');
const clientsRoutes = require('./clients.routes');
const ordersRoutes = require('./order.routes');
const prestationRoutes = require('./prestations.routes');
const facturationRoutes = require('./facturation.routes');
const notesRoutes = require('./notes.routes');


//départ des routes ici
router.use('/api/user', userRoutes);
router.use('/api/clients',clientsRoutes);
router.use('/api/prestations',prestationRoutes);
router.use('/api/order',ordersRoutes);
router.use('/api/factu',facturationRoutes);
router.use('/api/notes',notesRoutes);


router.get('/api', (req, res)=>{
    res.send("route racine")
})

module.exports =router;