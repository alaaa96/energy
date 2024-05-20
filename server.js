console.clear();
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";
import IngrsRoutes from "./Routes/IngrsRoutes.js";
import PlatsRoutes from "./Routes/PlatsRoutes.js";
// initial app
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cors());
//end app

// connect DB

mongoose
  .connect(process.env.DB_URI, { dbName: "energyfood" })
  .then(() => console.log("DB connected"))
  .catch((error) => console.log("error when connected DB ", error));
// end connect db

//routes
app.use("/", IngrsRoutes);
app.use("/plat", PlatsRoutes);
//end routes

// lancement serveur
app.listen(PORT, (err) => {
  if (err) {
    console.log("this error from server ", err);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});
