import UserRepository from "../repositories/userRepository.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    if (!users.length) {
      throw new Error("No users have been found");
    }
    return users;
  }

  async findById(id) {
    if (!id) {
      throw new Error("Invalid id provided");
    }
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async create(user) {
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

  async update(user) {
    if (!user || typeof user !== 'object' || Object.keys(user).length === 0) {
      throw new Error("Invalid user data provided");
    }

    if (!user.id) {
      throw new Error("User ID is required for update");
    }

    if (user.name !== undefined && (typeof user.name !== 'string' || user.name.trim() === '')) {
      throw new Error("User name must be a non-empty string");
    }

    if (user.location !== undefined && (typeof user.location !== 'string' || user.location.trim() === '')) {
      throw new Error("User location must be a non-empty string");
    }

    const updateData = {};
    if (user.name) updateData.name = user.name.trim();
    if (user.location) updateData.location = user.location.trim();

    try {
      const updatedUser = await this.userRepository.update(user.id, updateData);
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

  async delete(id) {
    if (!id) {
      throw new Error("Invalid id provided");
    }

    try {
      const deletedUser = await this.userRepository.delete(id);
      if (!deletedUser) {
        throw new Error(`User with id ${id} not found`);
      }
      return { message: "User deleted successfully", deletedUser };
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

export default UserService;
