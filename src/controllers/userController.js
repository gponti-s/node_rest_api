import { Router } from "express";
import UserService from "../services/userService.js";

const router = Router();
const userService = new UserService();

router.get("/", async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    if (error.message === "No users have been found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    if (error.message === 'Invalid id provided') {
      res.status(400).json({ message: error.message });
    } else if (error.message.startsWith('User with id')) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

//TODO: create a handleError function
router.post('/insert', async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    if (error.message === 'Invalid user data provided' || 
        error.message === 'User name is required and must be a non-empty string' ||
        error.message === 'User location is required and must be a non-empty string') {
      res.status(400).json({ message: error.message });
    } else if (error.message === 'User with this name already exists') {
      res.status(409).json({ message: error.message });
    } else if (error.message.startsWith('Validation error:')) {
      res.status(422).json({ message: error.message });
    } else {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

router.patch('/update', (req, res) => {
async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.body);
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    if (error.message === "Invalid user data provided" || error.message === "User ID is required for update") {
      res.status(400).json({ message: error.message });
    } else if (error.message.startsWith("User with id")) {
      res.status(404).json({ message: error.message });
    } else if (error.message === "User with this name already exists") {
      res.status(409).json({ message: error.message });
    } else if (error.message.startsWith("Validation error:")) {
      res.status(422).json({ message: error.message });
    } else {
      console.error('Error updating user:', error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
})


router.delete('/delete/:id', async (req, res) => {
  try {
    const result = await userService(req.params.id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

export default router;