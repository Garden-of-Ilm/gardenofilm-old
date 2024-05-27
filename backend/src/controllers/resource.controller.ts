import { Request, Response } from "express";

import { Resource } from "../models/resource.model";

export class ResourceController {
  static async getAllResources(req: Request, res: Response) {
    try {
      const resources = await Resource.find();
      return res.status(200).json(resources);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }

  static async createResource(req: Request, res: Response) {
    try {
      const { name, downloadUrl } = req.body;
      const resource = new Resource({ name, downloadUrl });
      await resource.save();
      res.status(201).json(resource);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteResource(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const resource = await Resource.findById(id);
      if (!resource) {
        throw new Error("resource not found");
      }
      await Resource.findByIdAndDelete(id);
      res.status(200).json({ message: "deleted resource successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
}
