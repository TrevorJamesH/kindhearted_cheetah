onst pgPromise = require('pg-promise')
const pgp = pgPromise()
const db = pgp(`postgres://${process.env.USER}@localhost:5432/dumo`)

const createProjectsQuery = 'INSERT INTO projects (project_name, project_description, rank) VALUES ($1, $2, $3) RETURNING *'

const createTasksQuery = 'INSERT INTO tasks (project_name, task_name, rank) VALUES ($1, $2, $3) RETURNING *'

const allProjectsQuery = 'SELECT * FROM projects ORDER BY rank'

const allTasksFromSingleProject = 'SELECT tasks FROM '

const updateRankQuery = 'UPDATE projects SET rank=${rank} WHERE id=${id}'

const tasksUnderProjectQuery = 'SELECT * FROM tasks WHERE (project_id) = $1'

const deleteTask = 'DELETE FROM tasks WHERE task_id = $1'



const createProjectFunction = {
  create:(project_name, project_description, rank) => {
    return db.oneOrNone( createProjectsQuery[project_name, project_description, rank] )
  },

  getAll:() => {
    db.any( allProjectsQuery,)
  },

  deleteTask:() => {
    db.one( deleteTask, task_id)
  }

}
