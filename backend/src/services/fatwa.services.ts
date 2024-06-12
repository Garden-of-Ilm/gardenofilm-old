import mongoose from "mongoose";
import { fatwaModel, IFatwa } from "../model/fatwa.model";

interface ISearchOptions {
  question_headline?: any;
  is_deleted: false;
}

interface ISearchArgs {
  limit?: string;
  search?: string;
  page?: string;
}

export class FatwaServices {
  static async createFatwa(fatwa: IFatwa) {
    try {
      const generated_id = [];
      for (let i = 1; i < 7; i++) {
        generated_id.push(Math.floor(Math.random() * 10));
      }
      await fatwaModel.create({
        ...fatwa,
        generated_id: generated_id.join(" "),
      });
      return "Fatwa successfully created";
    } catch (error) {
      throw error;
    }
  }

  static async getFatwaById(id: string) {
    try {
      const fatwa = await fatwaModel
        .findById(id)
        .select(
          "is_deleted question_headline audios createdAt generated_id additional_preference full_question  detailed_answer author"
        )
        .populate({
          path: "audios",
        });
      if (fatwa?.is_deleted) throw Error("Fatwa not found");
      return fatwa;
    } catch (error) {
      throw error;
    }
  }

  static async getFatwaList(arg: ISearchArgs) {
    const { search, limit, page } = arg;
    try {
      const query: ISearchOptions = { is_deleted: false };

      if (search) {
        const searchRegex = new RegExp(search, "i");
        query.question_headline = { $regex: searchRegex };
      }

      const totalCount = await fatwaModel.countDocuments(query);

      let totalPages = 1; // Default to 1 page if no results

      if (limit) {
        totalPages = Math.ceil(totalCount / Number(limit));
      }

      let fatwaList;

      if (page && limit) {
        const pageNum = parseInt(page, 10);
        const pageLimit = parseInt(limit, 10);
        fatwaList = await fatwaModel
          .find(query)
          .select(
            "is_deleted question_headline additional_preference createdAt detailed_answer author"
          )
          .skip((pageNum - 1) * pageLimit)
          .limit(pageLimit)
          .sort({ createdAt: -1 });
      } else {
        fatwaList = await fatwaModel
          .find(query)
          .select(
            "is_deleted question_headline additional_preference createdAt detailed_answer author"
          )
          .sort({ createdAt: -1 });
      }

      return { fatwaList, totalPages, currentPage: page };
    } catch (error) {
      throw error;
    }
  }

  static async update(arg: { fatwa: IFatwa; id: string }) {
    try {
      const { fatwa, id } = arg;
      if (!mongoose.isValidObjectId(id)) throw new Error("Invalid object id");
      const currentFatwa = await fatwaModel.findById(id);
      if (currentFatwa?.is_deleted)
        throw new Error("Fatwa already deleted you can not update");
      await fatwaModel.findByIdAndUpdate(id, { $set: fatwa });
      return "Fatwa update successfully";
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: string) {
    try {
      if (!mongoose.isValidObjectId(id)) throw new Error("Invalid object id");
      const currentFatwa = await fatwaModel.findById(id);
      if (!currentFatwa) throw new Error("Fatwa not found");
      if (currentFatwa?.is_deleted)
        throw new Error("Fatwa already deleted you can not update");
      await fatwaModel.findByIdAndDelete(id);
      return "Fatwa delete successfully";
    } catch (error) {
      throw error;
    }
  }
}
