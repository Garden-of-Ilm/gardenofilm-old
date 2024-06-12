import { model, Schema } from "mongoose";

export interface IFile {
  filename: string;
  size: number;
  url: string;
  is_deleted: boolean;
}

const fileSchema = new Schema<IFile>(
  {
    filename: String,
    size: Number,
    url: String,
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const fileModal = model("files", fileSchema);
