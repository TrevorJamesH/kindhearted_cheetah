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
  task_rank INTEGER,
  project_id INTEGER
);
