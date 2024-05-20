import express from "express";
import Plat from "../Models/Plats.js";

const router = express.Router();

// post method
router.post("/addplat", async (req, res) => {
  try {
    const newPlat = Plat({ ...req.body });

    await newPlat.save();
    res.status(200).send({ msg: "plat added", newPlat });
  } catch (error) {
    res.status(500).send({ msg: "invalid request ", error });
  }
}); //end post
//get method
router.get("/dataplat", async (req, res) => {
  try {
    const getData = await Plat.find();
    res.status(200).send({ msg: "all plats gutted", getData });
  } catch (error) {
    res.status(500).send({ msg: "invalid request ", error });
  }
}); //end get


export default router;