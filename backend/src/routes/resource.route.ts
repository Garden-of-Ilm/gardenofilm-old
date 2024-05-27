import { Router } from "express";

import { ResourceController } from "../controllers/resource.controller";

const resourceRouter = Router();

resourceRouter.get("/", ResourceController.getAllResources);
resourceRouter.post("/", ResourceController.createResource);
resourceRouter.delete("/:id", ResourceController.deleteResource);

export default resourceRouter;
