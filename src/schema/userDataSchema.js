import mongoose from 'mongoose';

const userDataSchema = new mongoose.Schema({
    name: String,
    location: String,

})

export default userDataSchema