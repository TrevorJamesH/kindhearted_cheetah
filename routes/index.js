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
      response.render('index.pug', { allProjects: fromDB })
    })
    .catch(error => {
      response.json(error)
    })
})

router.post('/createProject', (request, response) => {
    projects.createProject(request.body.projectName, request.body.projectDescription)
    .then( () =>
    projects.setRank( request.body.projectName )
  )
    .then( () =>
    response.redirect('/getAllProjects')
  )
    .catch(error => response.json(error))
})

router.post('/createTask/:project_id', (request, response) => {
  // console.log('WTF PANDA?', request.body)
  projects.createTask(request.params.project_id, request.body.task_name)
  .then( (task) =>
    response.redirect('/getTasks/'+request.params.project_id)
  )
  .catch(error => {
    response.json({
      error: error.message,
    })
  })
})

router.post ('/deleteProject/:project_id', (request, response) => {
  projects.deleteProject(request.params.project_id)
  .then( () =>
    response.redirect('/getAllProjects')
    )
    .catch(error => res.json(error))
})

router.post('/changeProjectName/:project_id', (request, response) => {
  projects.changeProjectName(request.body.changeName, request.params.project_id)
  .then( () =>
    response.redirect('/getAllProjects')
    )
    .catch(error => res.json(error))
})

router.get('/getTasks/:project_id', (request, response) => {
  projects.getTasks(request.params.project_id)
    .then(tasks => {
      response.render('tasks', {
        projectId: request.params.project_id,
        tasks: tasks
      })
    })
    .catch(error => {
      response.json(error)
    })
})

module.exports = router;
