import { Request, Response } from "express";

import { Banner } from "../models/banner.model";

export class BannerController {
  static async getBanners(req: Request, res: Response) {
    try {
      const banners = await Banner.find();
      return res.status(200).json(banners);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }
}
