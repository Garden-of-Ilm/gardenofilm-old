import dotenv from "dotenv";

import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

interface AuthRequest extends Request {
  userId: string;
}

export class TokenService {
  static async generateToken(args: IUser) {
    try {
      return jwt.sign({ ...args }, JWT_SECRET, { expiresIn: "1D" });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  static async parseToken(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      req.userId = decoded._id;
      next();
    } catch (e) {
      console.error(e);
      return res.status(401).json({ message: "Invalid token" });
    }
  }
}
