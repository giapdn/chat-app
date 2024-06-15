import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import favicon from "serve-favicon";
import apiRoutes from "./app/routes/api.js";

//some constant
const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);


//This is list of global middleware the app used
app.use(bodyParser.json());
app.use(cookieParser()); //middleware này giúp tạo dc cookie
app.use(express.json()); //MidlleWare body parser để có thể đọc dữ liệu từ req
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true, //Cho phép cookie !
    })
); //Cross site origin resource
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

//Set view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "app", "views"));

//Routing
app.get("/", (req, res) => {
    res.render("welcome", {auth: "Đỗ Nguyên Giáp"});
});
app.use("/api", apiRoutes);


export default app;

