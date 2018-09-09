const express = require('express');
const router = express.Router();

router.get('/', (req,res)=> {
    res.render('docs/index');
});

router.get('/add', (req,res)=> {
    res.send('stories/add');
});


module.exports = router;