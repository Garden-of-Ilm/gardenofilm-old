import { Request, Response } from "express";

import { Benefit } from "../models/benefit.model";

interface RequestQuery {
  q: string;
  category: string;
  page: number;
  limit: number;
}

export class BenefitController {
  static async getAllBenefits(
    req: Request<any, any, any, RequestQuery>,
    res: Response
  ) {
    try {
      const { q = "", category = "" } = req.query;

      const page = req.query.page ?? 1;
      const limit = req.query.limit ?? 20;

      let query: any = {};

      if (q) {
        const searchRegex = new RegExp(q, "i");
        query.title = { $regex: searchRegex };
      }

      if (category) {
        query.category = { $regex: category };
      }

      const total = await Benefit.countDocuments(query);
      const pages = Math.ceil(total / limit);

      const benefits = await Benefit.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });

      return res.status(200).json({
        paging: { total, page, pages, perPage: limit },
        benefits: benefits,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }

  static async getBenefitById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const benefit = await Benefit.findById(id);
      return res.status(200).json(benefit);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }

  static async incrementBenefitViews(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const benefit = Benefit.findById(id);
      if (!benefit) {
        return res.status(404).json({ message: "benefit not found" });
      }

      await Benefit.findByIdAndUpdate(id, { $inc: { views: 1 } });

      res.json({ message: "views incremented successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async createBenefit(req: Request, res: Response) {
    try {
      const {
        title,
        author,
        content,
        category,
        additionalReferences,
        audioUrl,
      } = req.body;
      const resource = new Benefit({
        title,
        author,
        content,
        category,
        additionalReferences,
        audioUrl,
      });
      await resource.save();
      res.status(201).json(resource);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }

  static async updateBenefit(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const benefit = await Benefit.findById(id);
      if (!benefit) {
        return res.status(404).json({ message: "benefit not found" });
      }

      const updatedBenefit = await Benefit.findByIdAndUpdate(id, {
        $set: req.body,
      });

      res.status(200).json(updatedBenefit);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteBenefit(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const benefit = await Benefit.findById(id);
      if (!benefit) {
        throw new Error("benefit not found");
      }
      await Benefit.findByIdAndDelete(id);
      res.status(200).json({ message: "deleted benefit successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
}
