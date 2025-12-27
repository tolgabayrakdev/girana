import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import errorHandler from "./middlewares/error-handler.js";
import config from "./config/app-config.js";
import authRoutes from "./routes/auth-routes.js";

const app = express();

app.use(helmet());
app.use(cors({
  origin: config.clientUrl,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// API routes
app.use(`${config.apiPrefix}/${config.apiVersion}/auth`, authRoutes);

app.use(errorHandler);

export default app;