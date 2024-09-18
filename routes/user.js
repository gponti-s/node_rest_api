import { Router } from "express";
import userSchema from "../src/schema/userDataSchema.js";
import mongoose from "mongoose";

const router = Router();

// Create a model based on the schema
const DataModel = mongoose.model("Data", userSchema);

router.get("/", async (req, res) => {
  try {
    const users = await DataModel.find();
    if (!users.length) {
      return res.status(404).json({ message: "No users have been found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await DataModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/insert", async (req, res) => {
  try {
    const newData = new DataModel(req.body);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/update", async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    const result = await DataModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (result) {
      res
        .status(200)
        .json({ message: "User updated successfully", user: result });
    } else {
      res.status(404).json({ message: "No user found to update" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await DataModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "No user found to delete" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
