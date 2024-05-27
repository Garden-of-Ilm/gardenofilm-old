import { model, Schema } from "mongoose";

const fileSchema = new Schema(
  {
    filename: String,
    size: Number,
    url: String,
  },
  {
    timestamps: true,
  }
);

export const fileModal = model("files", fileSchema);
