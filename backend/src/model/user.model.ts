import { model, Schema } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: true,
    },
    password: String,
  },
  {
    timestamps: true,
  },
);

export const userModel = model<IUser>("users", userSchema);
