import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnect from "./config/db.connect";
import authRouter from "./routes/auth.router";
import categoryRouter from "./routes/category.router";
import morgan from "morgan";
import express, { Application } from "express";
import { errorCatcher, notFound } from "./middlewares/error.handler";

dotenv.config();
const app: Application = express();
const server = http.createServer(app);
const port = process.env.PORT || 4001;
dbConnect();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);

app.use(notFound);
app.use(errorCatcher);
server.listen(port, () => console.log(`sever is running at port ${port}`));
