import { Request, Response } from "express";
import mongoose from "mongoose";

import { fatwaModel } from "../models/fatwa.model";

interface AuthRequest extends Request {
  userId: string;
}

interface RequestQuery {
  limit?: string;
  q?: string;
  page?: string;
  category?: string;
  sort?: string;
  order?: string;
}

interface ISearchOptions {
  title?: any;
  category?: any;
}

export class FatwaController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const validationKeys = ["author", "reply", "title", "question"];
      for (let key of validationKeys) {
        if (!req.body[key]) {
          return res.status(400).json({ message: `${key} required` });
        }
      }

      await fatwaModel.create({
        ...req.body,
      });

      res.status(200).json({ message: "Fatwa successfully created" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message });
    }
  }

  static async getFatwaList(
    req: Request<{}, {}, {}, RequestQuery>,
    res: Response
  ) {
    try {
      const {
        q,
        limit = "20",
        page = "1",
        category = "",
        sort = "",
        order = "",
      } = req.query;

      const query: ISearchOptions = {};

      if (q) {
        const searchRegex = new RegExp(q, "i");
        query.title = { $regex: searchRegex };
      }

      if (category != "") {
        const searchRegex = new RegExp(category, "i");
        query.category = { $regex: searchRegex };
      }

      const total = await fatwaModel.countDocuments(query);

      let fatwaList;

      if (page && limit) {
        const pageNum = parseInt(page);
        const pageLimit = parseInt(limit);
        fatwaList = await fatwaModel
          .find(query)
          .select("category views title question createdAt author")
          .skip((pageNum - 1) * pageLimit)
          .limit(pageLimit)
          .sort(
            sort
              ? { [sort as string]: order == "asc" ? 1 : -1 }
              : { createdAt: -1 }
          );
      } else {
        fatwaList = await fatwaModel
          .find(query)
          .select("category views title question createdAt author")
          .sort(
            sort
              ? { [sort as string]: order == "asc" ? 1 : -1 }
              : { createdAt: -1 }
          );
      }

      return res.status(200).json({
        fatwas: fatwaList,
        paging: {
          total: total,
          page: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          perPage: limit,
        },
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const validationKeys = ["author", "reply", "title", "question"];
      for (let key of validationKeys) {
        if (!req.body[key]) {
          return res.status(400).json({ message: `${key} required` });
        }
      }

      if (!mongoose.isValidObjectId(id)) throw new Error("Invalid object id");
      await fatwaModel.findByIdAndUpdate(id, { $set: req.body });

      res.status(200).json({ message: "Fatwa update successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async incrementFatwaViews(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const fatwa = fatwaModel.findById(id);
      if (!fatwa) {
        return res.status(404).json({ message: "fatwa not found" });
      }

      await fatwaModel.findByIdAndUpdate(id, { $inc: { views: 1 } });

      res.json({ message: "views incremented successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) throw new Error("Invalid fatwa id");
      const fatwa = await fatwaModel
        .findById(id)
        .select(
          "views category title audios createdAt additionalReferences question reply author"
        )
        .populate({
          path: "audios",
        });
      res.status(200).json(fatwa);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async delete(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        throw new Error("Invalid object id");
      }

      const currentFatwa = await fatwaModel.findById(id);
      if (!currentFatwa) {
        throw new Error("Fatwa not found");
      }

      await fatwaModel.findByIdAndDelete(id);

      res.status(200).json({ message: "deleted fatwa successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
}
