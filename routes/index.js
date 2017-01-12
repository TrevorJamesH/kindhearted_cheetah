var express = require('express');
var router = express.Router();
const projects = require('../database/db.js')


/* GET home page. */
router.get('/', function(request, response, next) {
  response.redirect('/getAllProjects');
});


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

router.post ('/deleteProject/:project_id', (request, response) => {
  projects.deleteProject(request.params.project_id).then( () =>
    response.redirect('/getAllProjects')
    )
    .catch(error => res.json(error))
})

router.post('/changeProjectName/:project_id', (request, response) => {
  projects.changeProjectName(request.params.project_id).then( () =>
    response.redirect('/getAllProjects')
  )
  .catch(error => res.json(error))
})

module.exports = router;
