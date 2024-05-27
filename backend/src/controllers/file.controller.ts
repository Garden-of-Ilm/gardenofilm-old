import { Request, Response } from "express";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase-bucket";
import { fileModal } from "../models/file.model";

export class FileController {
  static async uploadFiles(req: Request, res: Response) {
    try {
      const storageRef = ref(storage, `/files/${req.file.originalname}`);
      const snapshot = await uploadBytesResumable(storageRef, req.file.buffer);
      const url = await getDownloadURL(snapshot.ref);

      const uploadedFile = await fileModal.create({
        url,
        filename: req.file.originalname,
        size: req.file.size,
      });

      res.status(200).json({ data: uploadedFile._id });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
