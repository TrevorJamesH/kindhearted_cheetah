const pgPromise = require('pg-promise')
const pgp = pgPromise()
const db = pgp(`postgres://${process.env.USER}@localhost:5432/dumo`)

const createProjectsQuery = 'INSERT INTO projects (project_name, project_description) VALUES ($1, $2) RETURNING *'

const createTasksQuery = 'INSERT INTO tasks ( task_name, rank, project_id) VALUES ($1, $2, $3) RETURNING *'

const getAll = 'SELECT * FROM projects'
const allProjectsQuery = 'SELECT * FROM projects ORDER BY rank'

const allTasksFromSingleProject = 'SELECT tasks FROM '

const updateRankQuery = 'UPDATE projects SET rank=${rank} WHERE id=${id}'

const tasksUnderProjectQuery = 'SELECT * FROM tasks WHERE (project_id) = $1'

const deleteTask = 'DELETE FROM tasks WHERE task_id = $1'



const projects = {
  getAll:() => db.any( getAll ),

  //createTask:(task_name, project_id, task_rank)

  //
  // getAll:() => {
  //   db.any( allProjectsQuery,)
  // },

  deleteTask:() => db.one( deleteTask, task_id)
}

module.exports = projects
