import { Router } from "express";

import { BannerController } from "../controllers/banner.controller";

const router = Router();

router.get("/", BannerController.getBanners);

export default router;
