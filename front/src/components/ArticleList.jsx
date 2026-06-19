import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getArticles, removeArticle, getTags, getArticlesByTag } from "../services/api";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTags();
    fetchArticles();
  }, []);

  const fetchTags = async () => {
    try {
      const data = await getTags();
      setTags(data);
    } catch (err) {
      console.error("Failed to load tags");
    }
  };

  const fetchArticles = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getArticles();
      setArticles(data);
      setSelectedTag(null);
    } catch (err) {
      setError("Failed to load articles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const filterByTag = async (tag) => {
    setIsLoading(true);
    setError("");
    setSelectedTag(tag);
    try {
      const data = await getArticlesByTag(tag.id);
      setArticles(data);
    } catch (err) {
      setError("Failed to filter articles.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArticle = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      await removeArticle(id);
      await fetchArticles();
    } catch (err) {
      setError("Failed to delete article.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Tag Filter Bar */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", padding: "20px 50px 0" }}>
        <button
          className={selectedTag === null ? "button-secondary" : "button-tertiary"}
          onClick={fetchArticles}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag.id}
            className={selectedTag?.id === tag.id ? "button-secondary" : "button-tertiary"}
            onClick={() => filterByTag(tag)}
          >
            {tag.name}
          </button>
        ))}
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="article-list">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onView={(id) => navigate(`/articles/${id}`)}
            onEdit={(id) => navigate(`/articles/${id}/edit`)}
            onDelete={deleteArticle}
          />
        ))}
      </div>
    </>
  );
}

function ArticleCard({ article, onView, onEdit, onDelete }) {
  return (
    <div className="article-card">
      <div className="article-title">{article.title}</div>
      <div className="article-author">By {article.journalist_name}</div>
      {article.tags && (
        <div style={{ fontSize: "0.8em", color: "#888", marginBottom: "8px" }}>
          🏷️ {article.tags}
        </div>
      )}
      <div className="article-actions">
        <button className="button-tertiary" onClick={() => onEdit(article.id)}>Edit</button>
        <button className="button-tertiary" onClick={() => onDelete(article.id)}>Delete</button>
        <button className="button-secondary" onClick={() => onView(article.id)}>View</button>
      </div>
    </div>
  );
}