import "express-async-errors";
import express, { Application, json } from "express";
import cors from "cors";
import helmet from "helmet";
import { taskRouter } from "./routes/taskRouter";
import { HandleErrorMiddleware } from "./errors/handleErrors";
import { categoryRouter } from "./routes/categoryRoute";
import { userRouter } from "./routes/userRouter";

export const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(json());

app.use("/tasks", taskRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);
app.use(HandleErrorMiddleware.execute);
