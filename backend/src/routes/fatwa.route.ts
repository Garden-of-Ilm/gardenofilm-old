import { Router } from "express";
import { FatwaController } from "../controllers/fatwa.controller";
import { TokenService } from "../middlewares/token";

const FatwaRouter = Router();

FatwaRouter.get("/", FatwaController.getFatwaList);
FatwaRouter.get("/:id", FatwaController.getById);
FatwaRouter.post("/", TokenService.parseToken, FatwaController.create);
FatwaRouter.patch("/:id", TokenService.parseToken, FatwaController.update);
FatwaRouter.patch("/:id/views", FatwaController.incrementFatwaViews);
FatwaRouter.delete("/:id", TokenService.parseToken, FatwaController.delete);

export default FatwaRouter;
