const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

/* GET home page */

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
    let updated
    if (req.body.file) updated = { file: req.body.file };
    else {
        const { roomAHU, roomAirflow, roomID } = req.body;
        updated = 
             { $set: { [`file.rooms.${roomID}.roomAHU`]: roomAHU, [`file.rooms.${roomID}.roomAirflow`]: roomAirflow } }
        console.log(updated)

    }
  Project.findByIdAndUpdate(req.params.id,updated, {new: true})
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.json(err);
        });
});


module.exports = router;
