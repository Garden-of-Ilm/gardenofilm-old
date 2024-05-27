import { Router } from "express";

import { BenefitController } from "../controllers/benefit.controller";
import { TokenService } from "../middlewares/token";

const benefitRouter = Router();

benefitRouter.get("/", BenefitController.getAllBenefits);
benefitRouter.get("/:id", BenefitController.getBenefitById);
benefitRouter.patch("/:id", BenefitController.updateBenefit);
benefitRouter.patch("/:id/views", BenefitController.incrementBenefitViews);
benefitRouter.post("/", BenefitController.createBenefit);
benefitRouter.delete("/:id", BenefitController.deleteBenefit);

export default benefitRouter;
