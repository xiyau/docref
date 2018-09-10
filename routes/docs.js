const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth')
const mongoose = require('mongoose');
const Doc = mongoose.model('docs');
const User = mongoose.model('users');

router.get('/', (req,res)=> {
    res.render('docs/index');
});

router.get('/my',ensureAuthenticated, (req,res)=> {
    res.render('docs/index');
});

router.get('/add',ensureAuthenticated, (req,res)=> {
    res.render('docs/add');
});

//Process Add Story
router.post('/',(req,res)=>{
    let allowComments;
    if(req.body.allowComments){
        allowComments = true;
    }else{
        allowComments = false;
    }


    //building the doc object
    const newDoc = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments: allowComments,
    user: req.user.id
    }

    //Create doc
    new Doc(newDoc)
        .save()
        .then(doc =>{
            res.redirect(`/docs/show/${doc.id}`);
        });
})


module.exports = router;