import { IUser, userModel } from "../model/user.model";
import { FlatMap } from "../types";

export class AuthServices {
  static async register(user: IUser) {
    try {
      const newUser = new userModel(user);
      await newUser.save();
      return "User successfully created";
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getUserByEmail(email: string) {
    try {
      return await userModel.countDocuments({ email: email });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async login(email: string): Promise<FlatMap<IUser>> {
    try {
      const user = await userModel.findOne({ email: email }).lean().exec();
      if (!user) throw Error("User not found");
      return user as unknown as FlatMap<IUser>;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
