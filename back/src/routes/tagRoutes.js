import { Router } from "express";
import { getAllTags, getArticlesByTag } from "../controllers/articleController.js";

const tagRouter = Router();

tagRouter.get("/", getAllTags);
tagRouter.get("/:id/articles", getArticlesByTag);

export default tagRouter;