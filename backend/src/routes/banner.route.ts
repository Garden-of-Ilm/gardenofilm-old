import { Router } from "express";

import { BannerController } from "../controllers/banner.controller";

const router = Router();

router.get("/", BannerController.getBanners);
router.put("/:id?", BannerController.updateOrCreateBanner);

export default router;
