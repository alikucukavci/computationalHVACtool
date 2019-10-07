const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/projects', (req, res, next) => {
    Project.find()
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json(err);
        });
});

// POST route => to create a new project
router.post('/projects', (req, res, next) => {
    Project.create({
        title: req.body.title,
        description: req.body.description
        // file: req.body.file,
        //  // <== add this !
        // Rooms: []
    })
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json(err);
        });
});

router.put('/projects/:id', (req, res, next) => {
  console.log(req.body)
  Project.findByIdAndUpdate(req.params.id,{file:req.body.file})
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;
