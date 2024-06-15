import dotenv from "dotenv";
import db from "./app/config/mongodb.js";
import app from "./app.js";

dotenv.config();
const {PORT} = process.env || 3000;

db()
    .then((result) => console.log(result))
    .catch((err) => console.log(err));


app.listen(PORT, () => {
    console.log(`app running on [http://localhost:${PORT}]`);
});
