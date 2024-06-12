import express, {Application} from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import authRouter from "./routes/auth.router";
import FatwaRouter from "./routes/fatwa.router";
import FileRouter from "./routes/file.router";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3333;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.raw({type: "application/vnd.custom-type"}));
app.use(express.text({type: "text/html"}));
app.use(
    cors({
        origin:"*",
        methods: "*",
        credentials: true,
    }),
);
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.status(200).send({status: "ok"});
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/fatwa", FatwaRouter);
app.use("/api/v1/files", FileRouter);

//some comment
function startApp() {
    if (!process.env.MONGO_URL) return;
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
