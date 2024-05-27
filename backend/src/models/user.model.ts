import { model, Schema } from "mongoose";

export interface IUser {
  email: string;
  password: string;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: String,
  },
  {
    timestamps: true,
  }
);

export const userModel = model<IUser>("users", userSchema);
