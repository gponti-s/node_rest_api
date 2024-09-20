import { Router } from "express";
import UserService from "../services/userService.js";
import { errorHandler } from '../../utils/errorHandler.js';


const router = Router();
const userService = new UserService();

router.get("/", async (req, res) => {
  try {
    const users = await userService.findAll();
    res.status(200).json(users);
  } catch (error) {
    errorHandler(error, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await userService.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    errorHandler(error, res);
  }
});

router.post("/create", async (req, res) => {
  try {
    const newUser = await userService.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    errorHandler(error, res);
  }
});

router.patch("/", async (req, res) => {
  try {
    const updatedUser = await userService.update(req.body);
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    errorHandler(error, res);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await userService.delete(req.params.id);
    if (result) {
      res.status(200).json(result);
    }
  } catch (error) {
    errorHandler(error, res);
  }
});

export default router;
