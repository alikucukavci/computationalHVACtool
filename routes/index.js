const express = require('express');
const router = express.Router();
const Project = require("../models/Project")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


// POST route => to create a new project
router.post('/projects', (req, res, next) => {

  Project.create({
    title: req.body.title,
    description: req.body.description,
     // <== add this !
    Rooms: []
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

module.exports = router;
