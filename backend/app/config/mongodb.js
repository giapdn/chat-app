import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const {MONGOD_URI} = process.env;
let isConnected = false;
//
// const db = async () => {
//     const {MONGOD_URI} = process.env;
//     try {
//         await mongoose.connect(MONGOD_URI);
//     } catch (error) {
//         console.error("Error: ", error);
//     }
// };

const db = () => {
    return new Promise((resolve, reject) => {
        if (isConnected) {
            return resolve("MongoDB is connected");
        }
        mongoose.connect(MONGOD_URI, {})
            .then((db) => {
                isConnected = true;
                return resolve("Connect success !");
            })
            .catch(() => {
                return reject("Connect failed ! ");
            })
    })
}

export default db;
