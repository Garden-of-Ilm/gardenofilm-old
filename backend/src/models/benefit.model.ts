import mongoose from "mongoose";

const benefitSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    content: String,
    additionalReferences: String,
    category: {
      type: String,
      default: "",
    },
    views: {
      type: Number,
      default: 0,
    },
    audioUrl: String,
  },
  {
    timestamps: true,
  }
);

export const Benefit = mongoose.model("benefits", benefitSchema);
