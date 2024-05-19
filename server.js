console.clear();
import express from "express";
import mongoose from "mongoose";
import fs from "fs";
import Ingr from "./Models/ingrediant.js";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";
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
// get for file HTML
app.get("/", (req, res) => {
  fs.readFile("./index.html", (err, data) => {
    if (err) console.log(err);
    return res.end(data);
  });
});

// end get
// try Post method
app.post("/add", async (req, res) => {
  try {
    const kca = req.body.protein * 4 + req.body.carbs * 4 + req.body.fat * 9;
    const newIngr = Ingr({ ...req.body, kcalories: kca });

    await newIngr.save();
    fs.readFile("./submit.html", (err, data) => {
      if (err) console.log(err);
      return res.end(data);
    });
  } catch (error) {
    res.status(500).send({ msg: "invalid request ", error });
  }
});

//end post
// get all data in DB
app.get("/data", async (req, res) => {
  try {
    const getData = await Ingr.find();
    res.status(200).send({ msg: "all ingredients gutted", getData });
  } catch (error) {
    res.status(500).send({ msg: "invalid request ", error });
  }
});
//end get
//end routes

// lancement serveur
app.listen(PORT, (err) => {
  if (err) {
    console.log("this error from server ", err);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});
