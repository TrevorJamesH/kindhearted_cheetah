DROP TABLE IF EXISTS users;
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  password VARCHAR(255)
);

DROP TABLE IF EXISTS projects;
CREATE TABLE projects (
  project_id SERIAL PRIMARY KEY,
  project_name VARCHAR(255) NOT NULL,
  project_description VARCHAR(255),
  completed BOOLEAN DEFAULT false,
  project_rank INTEGER UNIQUE
);

DROP TABLE IF EXISTS tasks;
CREATE TABLE tasks (
  task_id SERIAL PRIMARY KEY,
  task_name VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT false,
  task_rank INTEGER

);

DROP TABLE IF EXISTS tasks_projects;
CREATE TABLE tasks_projects (
  project_id
);

-- from ondras

CREATE TABLE "tasks_projects" (
"tasks_projects_id"  SERIAL PRIMARY KEY NOT NULL ,
"project_id_Projects " INTEGER NOT NULL ,
"task_id_tasks" INTEGER NOT NULL ,
"project_name" VARCHAR(255) NOT NULL ,
"task_name" VARCHAR(255) NOT NULL ,
);

ALTER TABLE "tasks_projects" ADD FOREIGN KEY ("project_id_projects ") REFERENCES "projects " ("project_id");
ALTER TABLE "tasks_projects" ADD FOREIGN KEY ("task_id_tasks") REFERENCES "tasks" ("task_id");
