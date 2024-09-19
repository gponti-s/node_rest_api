import mongoose from "mongoose";
import postesDataSchema from "../schema/postsDataSchema.js";

const DataModel = mongoose.model("Posts", postesDataSchema);

class postsRepository {
    async findAll(){
        return DataModel.find();
    }

    async findById(id) {
        return DataModel.findById(id);
    }

    async create(post) {
        const newPost = new DataModel(post);
        return newPost.save();
    }

    async update (id, updatePost) {
        return DataModel.findByIdAndUpdate(id, updatePost, {
            new: true,
            runValidators: true
        });
    }

    async delete (id) {
        return DataModel.findByIdAndDelete(id);
    }
}

export default postsRepository