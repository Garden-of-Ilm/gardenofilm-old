import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";

import authRouter from "./routes/auth.route";
import FatwaRouter from "./routes/fatwa.route";
import FileRouter from "./routes/file.route";
import categoryRouter from "./routes/category.route";
import resourceRouter from "./routes/resource.route";
import benefitRouter from "./routes/benefit.route";
import bannerRouter from "./routes/banner.route";

import limiter from "./middlewares/rate-limiter";

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));
app.use(
  cors({
    origin: "*",
    methods: "*",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(compression());
app.use(limiter);

app.get("/", (req, res) => {
  res.status(200).send({ status: "ok" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/banners", bannerRouter);
app.use("/api/v1/benefits", benefitRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/fatwas", FatwaRouter);
app.use("/api/v1/files", FileRouter);
app.use("/api/v1/resources", resourceRouter);

function startApp() {
  if (!process.env.MONGO_URL) {
    return;
  }

  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("MONGO DB connected");
      app.listen(port, () => {
        console.log(`Server is live at http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

startApp();

export default app;
