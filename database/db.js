const pgPromise = require('pg-promise')
const pgp = pgPromise()
const db = pgp(`postgres://${process.env.USER}@localhost:5432/dumo`)

const createProject = 'INSERT INTO projects (project_name, project_description) VALUES ($1, $2)'

const createTask = 'INSERT INTO tasks (project_id, task_name) VALUES ($1, $2)'

const getAllProjects = 'SELECT * FROM projects'

const getTasks = 'SELECT * FROM tasks where project_id = $1'


// const orderID = 'SELECT project_id FROM projects ORDER BY project_id'

const deleteProject = 'DELETE FROM projects WHERE project_id = $1'

const changeProjectName = 'UPDATE projects SET project_name = $1 WHERE project_id = $2 '

const setRank = 'UPDATE projects SET project_rank = project_id WHERE project_name = $1'


const projects = {
  getAllProjects: () => {
    return db.any( getAllProjects )
  },

  getTasks: ( project_id ) => {
    return db.any( getTasks, [project_id] )
  },

  createProject: (projectName, projectDescription) =>
    db.oneOrNone( createProject, [projectName, projectDescription] ),
    // .then( () => db.oneOrNone(setRank)),

  createTask: (project_id, task_name) => {
    console.log('========', createTask, [project_id, task_name])
    return db.oneOrNone(createTask, [project_id, task_name])
  },

  deleteProject:( project_id ) => {
    return db.none( deleteProject, [project_id] )
  },

  changeProjectName:( project_name, project_id) => {
    return db.any( changeProjectName, [project_name, project_id] )
  },

  setRank:( project_id ) => {
    return db.none(setRank, [project_id])
  },

  oderby: () => db.any(orderID)


}
module.exports = projects
