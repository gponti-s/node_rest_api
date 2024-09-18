import UserRepository from "../repositories/userRepository.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    if (!users.length) {
      throw new Error("No users have been found");
    }
    return users;
  }

  async getUserById(id) {
    if (!id) {
      throw new Error("Invalid id provided");
    }
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async createUser(user) {
    if (!user || typeof user !== 'object' || Object.keys(user).length === 0) {
      throw new Error("Invalid user data provided");
    }

    if (!user.name || typeof user.name !== 'string' || user.name.trim() === '') {
      throw new Error("User name is required and must be a non-empty string");
    }

    if (!user.location || typeof user.location !== 'string' || user.location.trim() === '') {
      throw new Error("User location is required and must be a non-empty string");
    }

    try {
      const newUser = await this.userRepository.create(user);
      if (!newUser) {
        throw new Error("Failed to create user");
      }
      return newUser;
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new Error(`Validation error: ${error.message}`);
      }
      if (error.code === 11000) {
        throw new Error("User with this name already exists");
      }
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async updateUser(user) {
    if (!user || typeof user !== 'object' || Object.keys(user).length === 0) {
      throw new Error("Invalid user data provided");
    }

    if (!user.id) {
      throw new Error("User ID is required for update");
    }

    try {
      const updatedUser = await this.userRepository.update(user.id, user);
      if (!updatedUser) {
        throw new Error(`User with id ${user.id} not found`);
      }
      return updatedUser;
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new Error(`Validation error: ${error.message}`);
      }
      if (error.code === 11000) {
        throw new Error("User with this name already exists");
      }
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async deleteUser(id) {
    if (!id) {
      throw new Error("Invalid id provided");
    }

    const deletedUser = await this.userRepository.delete(id);
    if (!deletedUser) {
      throw new Error(`User with id ${id} not found`);
    }

    return { message: "User deleted successfully", deletedUser };
  }
}

export default UserService;
