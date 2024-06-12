import mongoose from "mongoose";

export interface IFatwa {
  author: string;
  detailed_answer: string;
  question_headline: string;
  full_question: string;
  additional_preference: string;
  is_deleted: boolean;
}

const fatwaSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "users",
    },
    author: String,
    detailed_answer: String,
    question_headline: String,
    full_question: String,
    additional_preference: String,
    generated_id: String,
    audios: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "files",
      default: [],
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const fatwaModel = mongoose.model<IFatwa>("fatwa", fatwaSchema);
