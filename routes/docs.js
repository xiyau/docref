const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth')
const mongoose = require('mongoose');
const Doc = mongoose.model('docs');
const User = mongoose.model('users');

router.get('/', (req,res)=> {
    Doc.find({status:'public'})
        .populate('user')
        .then(docs => {
            res.render('docs/index',{
                docs:docs
            });
        });
    
});

router.get('/my',ensureAuthenticated, (req,res)=> {
    Doc.find({})
        .populate('user')
        .then(docs => {
            res.render('docs/index',{
                docs:docs
            });
        });
    
});

// Add Story Form
router.get('/add',ensureAuthenticated, (req,res)=> {
    res.render('docs/add');
});

//Edit Story Form
router.get('/edit/:id', ensureAuthenticated, (req,res) => {
    Doc.findOne({
        _id: req.params.id
    })
    .then(doc => {
        res.render('docs/edit',{
            doc:doc
        })
    })
});

//showing a single story
router.get('/show/:id', (req,res) => {
    Doc.findOne({
        _id: req.params.id
    })
    .populate('user')
    .populate('comments.commentUser')
    .then(doc => {
        res.render('docs/show',{
            doc:doc
        })
    })
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

// Add Comment
router.post('/comment/:id', (req,res) => {
    Doc.findOne({
        _id: req.params.id
    })
    .then(doc => {
        const newComment = {
            commentBody: req.body.commentBody,
            commentUser: req.user.id
        }

        doc.comments.unshift(newComment);
        doc.save()
        .then(doc => {
            res.redirect(`/docs/show/${doc.id}`);
        });
    });
});


module.exports = router;