import { Request, Response } from "express";
import { AuthServices } from "../services/auth.services";
import { PasswordService } from "../middleware/password";
import { TokenService } from "../middleware/token";

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email && !password)
        return res.status(403).json({ message: "Enter email and password" });
      const count = await AuthServices.getUserByEmail(email);
      if (count >= 1)
        return res.status(500).json({ message: "This email alrady exist" });
      req.body.password = await PasswordService.generatePassword(password);
      const user = await AuthServices.register(req.body);
      res.status(200).json({ message: user });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password: reqPassword } = req.body;
      const user = await AuthServices.login(email);
      await PasswordService.comparePassword(reqPassword, user.password);
      const token = await TokenService.generateToken(user);
      const { password, ...other } = user;
      res.status(200).json({ success: true, data: other, accessToken: token });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}
