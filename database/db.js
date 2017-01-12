const pgPromise = require('pg-promise')
const pgp = pgPromise()
const db = pgp(`postgres://${process.env.USER}@localhost:5432/dumo`)

const createProject = 'INSERT INTO projects (project_name, project_description) VALUES ($1, $2) RETURNING *'

const getAllProjects = 'SELECT * FROM projects'

// const createTasksQuery = 'INSERT INTO tasks ( task_name, rank, project_id) VALUES ($1, $2, $3) RETURNING *'

// const allTasksFromSingleProject = 'SELECT tasks FROM '

// const tasksUnderProjectQuery = 'SELECT * FROM tasks WHERE (project_id) = $1'

const deleteTask = 'DELETE FROM tasks WHERE task_id = $1'

const deleteProject = 'DELETE FROM projects WHERE project_id = $1'


const projects = {
  getAllProjects: () => db.any( getAllProjects ),

  createProject: (projectName, projectDescription) => db.oneOrNone( createProject, [projectName, projectDescription] ),

  deleteProject:( project_id ) => {
    return db.none( deleteProject, [project_id] )
  }
}
module.exports = projects
