import { Router } from "express";
import { TokenService } from "../middlewares/token";
import { upload } from "../firebase-bucket";
import { FileController } from "../controllers/file.controller";

const FileRouter = Router();

FileRouter.post(
  "/upload",
  // @ts-ignore
  TokenService.parseToken,
  upload.single("file"),
  FileController.uploadFiles
);

export default FileRouter;
