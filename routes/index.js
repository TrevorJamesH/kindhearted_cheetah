var express = require('express');
var router = express.Router();
const projects = require('../database/db.js')


/* GET home page. */
router.get('/', (request, response) => {
  response.redirect('/getAllProjects');
});


router.get('/getAllProjects', (request, response) => {
  projects.getAllProjects()
    .then(allProjects => {
      // set the index of the project to the rank
      allProjects.forEach((project, index) => {
        project.project_rank = ++index
      })
      response.render('index.pug', {allProjects})
    })
    .catch(error => {
      response.json(error)
    })
})

router.post('/createProject', (request, response) => {
    projects.createProject(request.body.projectName, request.body.projectDescription)
      // .then( () =>
      //   projects.setRank( request.body.projectName )
      // )
      .then(() => response.redirect('/getAllProjects'))
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
  let projectId = request.params.project_id
  //get/save this project record from db
  projects.getOneProject(projectId)
  .then( projectData => {
    console.log(projectData.project_rank);
    let deletedRank = projectData.project_rank
    projects.deleteProject(projectId)
    return deletedRank
  })
  .then( (deletedRank) => {
    console.log('deletedRank', deletedRank);
    //take the ranks below deletedRank and +1 to each
  })
  //Bre thinks: write .then that passes deletedRank
  // write 2 for loops that loops through the arr of project_id's to look for project_id's > deletedRank
  // and adds +1, then +2, then +3 etc until the loop reaches arr.length-1
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
