onst pgPromise = require('pg-promise')
const pgp = pgPromise()
const db = pgp(`postgres://${process.env.USER}@localhost:5432/dumo`)

const createProjects = 'INSERT INTO projects (project_name, rank) VALUES ($1, $2) RETURNING *'

const createTasks = 'INSERT INTO tasks (project_name, task_name, rank) VALUES ($1, $2, $3) RETURNING *'


const all Projects = 'SELECT * FROM projects ORDER BY rank'
