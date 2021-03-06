const express = require('express');
const path = require('path');
const pug = require('pug');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParse = require('cookie-parser');
const session = require('express-session');


//Load User Model
require('./models/User');
require('./models/doc');
require('./models/Server');

//passport config
require('./config/passport')(passport);

// Load Routes
const servers = require('./routes/servers');
const docs = require('./routes/docs');
const index = require('./routes/index');
const auth = require('./routes/auth');

//Load keys
const keys = require('./config/keys');


// hepers 
const {truncate, stripTags, formatDate, select, selecting} = require('./helpers/hbs');


//Mongoose connect
mongoose.connect(keys.mongoURI)
    .then(()=> console.log('mongodb connected'))
    .catch(err =>{
        console.log(err)
    })



const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine' , 'pug');


//setup cookieparse and bodyparser
app.use(cookieParse());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// Passport Middlware
app.use(passport.initialize());
app.use(passport.session());

// Set global Vars
app.locals.selecting = selecting; 
app.locals.select = select;
app.locals.formatDate = formatDate;
app.locals.truncate = truncate;
app.locals.stripTags = stripTags;
app.use((req,res,next) => {
    res.locals.user = req.user || null;
    next();
});

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

//auth route
app.use('/', index);
app.use('/servers', servers);
app.use('/docs', docs);
app.use('/auth', auth);






const port = process.env.PORT || 5000;
app.listen(port, ()=> {
    console.log(`server starter on port ${port}`)
});