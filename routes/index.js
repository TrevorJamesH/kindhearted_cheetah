var express = require('express');
var router = express.Router();
const projects = require('../database/db.js')


/* GET home page. */
router.get('/', function(request, response, next) {
  response.redirect('/getAllProjects');
});

// router.get('/hai', (req, res) =>{
//   res.json({ title: 'HAI' });
// });

router.get('/getAllProjects', (request, response) => {
  projects.getAllProjects()
    .then(fromDB => {
      response.render('index', { allProjects: fromDB })
    })
    .catch(error => {
      response.json(error)
    })
})


router.post('/createProject', (request, response) => {
  console.log('body',request.body);
  projects.createProject(request.body.projectName, request.body.projectDescription)
    .then( () =>
    response.redirect('/getAllProjects'))
    .catch(error => response.json(error))
})

router.get('/deleteProject', (request, response) => {

})

module.exports = router;
