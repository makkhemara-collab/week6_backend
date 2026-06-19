CREATE DATABASE IF NOT EXISTS week6Db;

USE week6Db;

CREATE TABLE IF NOT EXISTS articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  journalist VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL
);

INSERT INTO articles (title, content, journalist, category)
VALUES
  ('React Basics', 'Learn React', 'Alice', 'Frontend'),
  ('Routing', 'React Router', 'Bob', 'Frontend');
