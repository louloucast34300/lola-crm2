const session = require('express-session');
const MongoStore = require('connect-mongo');

const { app } = require('../../index');
const urlDatabase = `mongodb+srv://louiscastel:Soleil34@cluster0.qdiai.mongodb.net/smileart?authSource=admin&replicaSet=atlas-snvdlk-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
SESSION_SECRET=cersei`;

app.use(
    session({
      secret: `cersei`,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 14, // session 14 days
      },
      store: MongoStore.create({
        mongoUrl: urlDatabase,
        ttl: 60 * 60 * 24 * 14,
      }),
    })
  );