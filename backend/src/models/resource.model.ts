import { model, Schema } from "mongoose";

const resourceSchema = new Schema(
  {
    name: String,
    downloadUrl: String,
  },
  {
    timestamps: true,
  }
);

export const Resource = model("resources", resourceSchema);
