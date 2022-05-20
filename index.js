const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const path = require('path');
const bodyParser = require('body-parser')
const routing = require('./backend/routes');
const port = process.env.PORT || 5001;
require('./backend/BDD/connexion');

exports.app = app;

require('./backend/config/session.config');
require('./backend/config/passport.config');



app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(routing);



app.listen(port, ()=>console.log(`Server Runing on port ${port}`));

module.exports = app;