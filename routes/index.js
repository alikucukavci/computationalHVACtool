const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


// // POST route => to create a new project
// router.post('/projects', (req, res, next) => {

//   Project.create({
//     title: req.body.title,
//     description: req.body.description,
//     tasks: [],
//     owner: req.user._id // <== add this !
//   })
//     .then(response => {
//       res.json(response);
//     })
//     .catch(err => {
//       res.json(err);
//     })
// });

module.exports = router;
