import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

const PORT = process.PORT || 3000;
const app = express();

//Some config
dotenv.config();

// This is list of imported route
import authRoutes from "./app/routes/Auth.routes.js";
import mongoCn from "./app/database/Mongo.database.js";

//db
mongoCn();

//This is list of thing the app used
app.use(cors()); //Cross site origin resource
app.use(cookieParser());
app.use(
  // XSS Protection
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "http://localhost:3000"],
        connectSrc: ["'self'", "http://localhost:27017"],
      },
    },
  })
);
app.use(express.json()); //MidleWare

//Set something
app.set("view engine", "pug");

//This is the area for routing
app.get("/", (req, res) => {
  res.render("welcome", { auth: "Đỗ Nguyên Giáp" });
});

app.use("/auth", authRoutes);

//This is the start server method
app.listen(PORT, () => {
  console.log(`app running on [http://localhost:${PORT}]`);
});
