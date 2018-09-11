const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Doc = mongoose.model('docs');
const Server = mongoose.model('servers');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth')


router.get('/index',ensureAuthenticated, (req,res)=> {
    Server.find({user: req.user.id})
        .then(servers => {
            res.render('servers/index',{
                servers:servers
            });
        })
    
});

// show
router.get('/show/:id', (req,res) => {
    Server.findOne({
        _id: req.params.id
    })
    .populate('user')
    .then(server => {
        res.render('servers/show',{
            server:server
        })
    })
})

// Show server Add form
router.get('/add',(req,res) => {
    res.render('servers/add');
});

// Process Server Add form post request
router.post('/', (req,res) => {
    console.log(req.body);



    //building the server object
    const newServer = {
        name: req.body.name,
        fqdn: req.body.fqdn,
        ip: req.body.ip,
        location: req.body.location,
        status: req.body.status,
        description: req.body.description,
        //services: req.body.services,
        user: req.user.id

        }
    
        //Create doc
        new Server(newServer)
            .save()
            .then(server =>{
                res.redirect(`/servers/show/${server.id}`);
            });
})




module.exports = router;