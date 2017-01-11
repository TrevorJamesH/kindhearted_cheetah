var express = require('express');
var router = express.Router();
const projects = require('../database/db.js')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hai', (req, res) =>{
  res.json({ title: 'HAI' });
});


router.get('/getAllProjects', (request, response) => {
  projects.getAll()
    .then(fromDB => response.render(index, {allProjects: fromDB}))
    .catch(error => response.json(error))
})


router.post('/createProject', (request, response) => {
  projects.getAll()
    .then(fromDB => response.render(index, {allTodos: fromDB}))
    .catch(error => response.json(error))
})

module.exports = router;
