import { Router } from "express";
import { FatwaController } from "../controller/fatwa.controller";
import { TokenService } from "../middleware/token";

const FatwaRouter = Router();

FatwaRouter.post("/create", TokenService.parseToken, FatwaController.create);
FatwaRouter.patch(
  "/update/:id",
  TokenService.parseToken,
  FatwaController.update,
);
FatwaRouter.get("/get-list", FatwaController.getFatwaList);
FatwaRouter.get("/get/:id", FatwaController.getById);
FatwaRouter.delete(
  "/delete/:id",
  TokenService.parseToken,
  FatwaController.delete,
);

export default FatwaRouter;
