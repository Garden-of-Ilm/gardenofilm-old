import { Request, Response } from "express";
import { PasswordService } from "../middlewares/password";
import { TokenService } from "../middlewares/token";
import { IUser, userModel } from "../models/user.model";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password: reqPassword } = req.body;

      const user: IUser = await userModel
        .findOne({ email: email })
        .lean()
        .exec();

      if (!user) {
        throw Error("User not found");
      }

      await PasswordService.comparePassword(reqPassword, user.password);
      const token = await TokenService.generateToken(user);
      const { password, ...other } = user;
      res.status(200).json({ success: true, data: other, accessToken: token });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}
