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

  static async updateOrCreateBanner(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { message } = req.body;

      const count = await Banner.countDocuments();

      if (count === 0) {
        const banner = new Banner({ message });
        await banner.save();
        return res.status(201).json(banner);
      }

      const updatedBanner = await Banner.findByIdAndUpdate(
        id,
        { message },
        { new: true }
      );

      if (!updatedBanner) {
        return res.status(404).json({ message: "Banner not found" });
      }

      res.status(200).json(updatedBanner);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
