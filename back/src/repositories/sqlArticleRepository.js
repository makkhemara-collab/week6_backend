import { pool } from "../utils/database.js";

// Get all articles (with journalist name and tags)
export async function getArticles() {
  const [rows] = await pool.query(
    `SELECT articles.*, journalists.name AS journalist_name,
     GROUP_CONCAT(tags.name SEPARATOR ', ') AS tags
     FROM articles
     LEFT JOIN journalists ON articles.journalist_id = journalists.id
     LEFT JOIN article_tags ON articles.id = article_tags.article_id
     LEFT JOIN tags ON article_tags.tag_id = tags.id
     GROUP BY articles.id`
  );
  return rows;
}

// Get one article by ID
export async function getArticleById(id) {
  const [rows] = await pool.query("SELECT * FROM articles WHERE id = ?", [id]);
  return rows[0] || null;
}

// Create a new article
export async function createArticle(article) {
  const { title, content, journalist_id, category } = article;
  const [result] = await pool.query(
    "INSERT INTO articles (title, content, journalist_id, category) VALUES (?, ?, ?, ?)",
    [title, content, journalist_id, category]
  );
  return { id: result.insertId, ...article };
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
  const { title, content, journalist_id, category } = updatedData;
  const [result] = await pool.query(
    "UPDATE articles SET title = ?, content = ?, journalist_id = ?, category = ? WHERE id = ?",
    [title, content, journalist_id, category, id]
  );
  if (result.affectedRows === 0) return null;
  return { id, ...updatedData };
}

// Delete an article by ID
export async function deleteArticle(id) {
  const [result] = await pool.query("DELETE FROM articles WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

// Get all tags
export async function getTags() {
  const [rows] = await pool.query("SELECT * FROM tags");
  return rows;
}

// Get articles filtered by tag ID
export async function getArticlesByTag(tagId) {
  const [rows] = await pool.query(
    `SELECT DISTINCT articles.*, journalists.name AS journalist_name
     FROM articles
     JOIN article_tags ON articles.id = article_tags.article_id
     JOIN journalists ON articles.journalist_id = journalists.id
     WHERE article_tags.tag_id = ?`,
    [tagId]
  );
  return rows;
}

// Get article with journalist info
export async function getArticleWithJournalist(id) {
  const [rows] = await pool.query(
    `SELECT articles.*, journalists.name AS journalist_name, journalists.email, journalists.bio
     FROM articles
     JOIN journalists ON articles.journalist_id = journalists.id
     WHERE articles.id = ?`,
    [id]
  );
  return rows[0] || null;
}

// Get all articles by journalist ID
export async function getArticlesByJournalist(journalistId) {
  const [rows] = await pool.query(
    `SELECT articles.*, journalists.name AS journalist_name
     FROM articles
     JOIN journalists ON articles.journalist_id = journalists.id
     WHERE journalists.id = ?`,
    [journalistId]
  );
  return rows;
}