import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase-bucket";
import { fileModal } from "../model/file.model";

export class FileServices {
  static async uploadFile(file: any) {
    try {
      const storageRef = ref(storage, `/files/${file.originalname}`);
      const snapshot = await uploadBytesResumable(storageRef, file.buffer);
      const url = await getDownloadURL(snapshot.ref);

      const uploadedFile = await fileModal.create({
        url,
        filename: file.originalname,
        size: file.size,
      });

      return uploadedFile._id;
    } catch (e) {
      throw e;
    }
  }
}
