import mongoose from "mongoose";
import userDataSchema from "../schema/userDataSchema.js";

const DataModel = mongoose.model("Data", userDataSchema);

class UserRepository {
  async findAll() {
    return DataModel.find();
  }

  async findById(id) {
    return DataModel.findById(id);
  }

  async create(user) {
    const newUser = new DataModel(user);
    return newUser.save();
  }

  async update(id, updateData) {
    return DataModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });
  }
  
  async delete(id) {
    return DataModel.findByIdAndDelete(id);
  }
}

export default UserRepository;
