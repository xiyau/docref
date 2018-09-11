const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Doc = mongoose.model('docs');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth')

router.get('/', ensureGuest, (req,res)=> {
    res.render('index/welcome');
});

router.get('/dashboard',ensureAuthenticated, (req,res)=> {
    Doc.find({user: req.user.id})
        .then(docs => {
            res.render('index/dashboard',{
                docs:docs
            });
        })
    
});

router.get('/about', (req,res)=> {
    res.render('index/about');
});



module.exports = router;