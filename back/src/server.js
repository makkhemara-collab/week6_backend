import express, { json } from "express";
import cors from "cors";
import articleRouter from "./routes/articleRoutes.js";
import journalistRouter from "./routes/journalistRoutes.js";
import tagRouter from "./routes/tagRoutes.js";

const app = express();


// Enable CORS for all routes and origins
app.use(cors());

// Enable json serialization
app.use(json());

app.use("/api/articles", articleRouter);

app.use("/api/journalists", journalistRouter);

app.use("/api/tags", tagRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
