import { Router } from "express";

import { CategoryController } from "../controllers/category.controller";

const categoryRouter = Router();

categoryRouter.get("/", CategoryController.getAllCategories);
categoryRouter.post("/", CategoryController.createCategory);
categoryRouter.delete("/:id", CategoryController.deleteCategory);

export default categoryRouter;
