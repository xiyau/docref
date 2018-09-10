const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth')

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
    res.send('whats wrong');
})


module.exports = router;