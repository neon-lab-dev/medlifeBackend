import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";


config({
  path: "./config/config.env",
});

const app = express();

//using middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());


app.use(
  cors({
    origin: ["https://medlife-frontend-new.vercel.app","http://localhost:5000"],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

//Importing and using Routes
import leads from "./routes/leadRoute.js";
import review from "./routes/reviewRoute.js";
import doctor from "./routes/doctorRoute.js";
import admin from "./routes/adminRoutes.js";
import ErrorMiddleware from "./middlewares/Error.js";

app.use("/api/v1", leads);
app.use("/api/v1", review);
app.use("/api/v1", doctor);
app.use("/api/v1", admin);

export default app;

app.get("/", (req, res) => res.send(`<h1>Site is working</h1>`));

app.use(ErrorMiddleware);
