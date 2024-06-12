import { Router } from "express";
import { TokenService } from "../middleware/token";
import { upload } from "../firebase-bucket";
import { FileController } from "../controller/file.controller";

const FileRouter = Router();

FileRouter.post(
  "/upload",
  // @ts-ignore
  TokenService.parseToken,
  upload.single("file"),
  FileController.uploadFiles,
);

export default FileRouter;
