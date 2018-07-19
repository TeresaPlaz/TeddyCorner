require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const bcrypt       = require('bcrypt');
const session      = require('express-session');
const passport     = require("passport");
const LocalStrategy= require("passport-local").Strategy;
const flash        = require("connect-flash");
const User         = require("./models/User");
const MongoStore   = require('connect-mongo')(session);


mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGODB_URI, {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.MYSECRETGGG,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000000 },
}));

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user); 
  });
});


  app.use(flash());
  
  
  passport.use("local-login", new LocalStrategy({
    passReqToCallback: true
  }, (req, username, password, next) => {
    User.findOne({ username }, (err, user) =>  {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Your username or your password is incorrect!!!" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Your username or your password is incorrect!!!" });
    }

    return next(null, user);
     });
  })
);

app.use(passport.initialize());
app.use(passport.session());


const index = require('./routes/index');
app.use('/', index);

const users = require('./routes/users');
app.use('/users', users);

const addClassifieds = require('./routes/addClassifieds');
app.use("/Classifieds",addClassifieds);


module.exports = app;
