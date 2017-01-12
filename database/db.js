const pgPromise = require('pg-promise')
const pgp = pgPromise()
const db = pgp(`postgres://${process.env.USER}@localhost:5432/dumo`)

const createProject = 'INSERT INTO projects (project_name, project_description) VALUES ($1, $2) RETURNING *'

const getAllProjects = 'SELECT * FROM projects'

const deleteProject = 'DELETE FROM projects WHERE project_id = $1'

const changeProjectName = 'UPDATE projects SET project_name=$1 WHERE project_id=$2 '

const projects = {
  getAllProjects: () => db.any( getAllProjects ),

  createProject: (projectName, projectDescription) => db.oneOrNone( createProject, [projectName, projectDescription] ),

  deleteProject:( project_id ) => {
    return db.none( deleteProject, [project_id] )
  },

  changeProjectName:( project_name, project_id) => {
    return db.one( changeProjectName, [project_name, project_id] )
  }
}
module.exports = projects
