import { Request, Response } from "express";
import { FatwaServices } from "../services/fatwa.services";
import mongoose from "mongoose";

interface AuthRequest extends Request {
  userId: string;
}

interface RequestQuery {
  limit?: string;
  search?: string;
  page?: string;
}

export class FatwaController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const validationKeys = [
        "author",
        "detailed_answer",
        "question_headline",
        "full_question",
      ];
      for (let key of validationKeys) {
        if (!req.body[key]) {
          return res.status(400).json({ message: `${key} required` });
        }
      }
      const newFatwa = await FatwaServices.createFatwa({
        ...req.body,
        user_id: req.userId,
      });
      res.status(200).json({ message: newFatwa });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message });
    }
  }

  static async getFatwaList(
    req: Request<{}, {}, {}, RequestQuery>,
    res: Response,
  ) {
    try {
      const { search = "", limit = undefined, page } = req.query;
      const fatwaList = await FatwaServices.getFatwaList({
        search,
        limit,
        page,
      });
      res.status(200).json({ success: true, data: fatwaList });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const validationKeys = [
        "author",
        "detailed_answer",
        "question_headline",
        "full_question",
      ];
      for (let key of validationKeys) {
        if (!req.body[key]) {
          return res.status(400).json({ message: `${key} required` });
        }
      }
      const updateFatwa = await FatwaServices.update({ fatwa: req.body, id });
      res.status(200).json({ message: updateFatwa });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) throw new Error("Invalid fatwa id");
      const fatwaById = await FatwaServices.getFatwaById(id);
      res.status(200).json(fatwaById);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
  static async delete(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const deleteFatwa = await FatwaServices.delete(id);
      res.status(200).json({ message: deleteFatwa });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
}
