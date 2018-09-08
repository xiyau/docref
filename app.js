const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

//Load User Model
require('./models/User');

//passport config
require('./config/passport')(passport);
// Load Routes
const auth = require('./routes/auth');

//Load keys
const keys = require('./config/keys')
//Mongoose connect
mongoose.connect(keys.mongoURI)
    .then(()=> console.log('mongodb connected'))
    .catch(err =>{
        console.log(err)
    })



const app = express();

app.get('/', (req,res) => {
    res.send('it works');
})

app.use('/auth', auth);

// Passport Middlware
app.use(passport.initialize());
app.use(passport.session());


const port = process.env.PORT || 5000;
app.listen(port, ()=> {
    console.log(`server starter on port ${port}`)
});