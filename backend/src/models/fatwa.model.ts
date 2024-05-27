import mongoose from "mongoose";

const fatwaSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    question: String,
    reply: String,
    audios: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "files",
      default: [],
    },
    additionalReferences: String,
    category: {
      type: String,
      default: "",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const fatwaModel = mongoose.model("fatwa", fatwaSchema);
