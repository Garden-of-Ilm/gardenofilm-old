import { Request, Response } from "express";
import { FileServices } from "../services/file.services";

export class FileController {
  static async uploadFiles(req: Request, res: Response) {
    try {
      const fileIds = await FileServices.uploadFile(req.file);
      res.status(200).json({ data: fileIds });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
