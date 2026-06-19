import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getArticleById } from "../services/api";

export default function ArticlePage() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchArticle = useCallback(async () => {
    try {
      setLoading(true);

      const found = await getArticleById(id);
      if (found) {
        setArticle(found);
        setError("");
      } else {
        setArticle(null);
        setError("Article not found.");
      }
    } catch {
      setError("Failed to fetch article.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  if (loading) return <div>Loading article...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>No article found.</div>;

  return (
  <div>
    <h2>{article.title}</h2>
    <p>{article.content}</p>
    <div>
      <strong>Journalist: </strong>
      <a href={`/journalists/${article.journalist_id}/articles`}>
        {article.journalist_name}
      </a>
    </div>
    <div><strong>Category:</strong> {article.category}</div>
  </div>
);
}
