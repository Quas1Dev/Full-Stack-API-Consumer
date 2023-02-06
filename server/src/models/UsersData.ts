import mongoose from "mongoose";
mongoose.set('strictQuery', false);

// Structure declaration for the users collection 
const UsersDataSchema = new mongoose.Schema({
    user: String,
    password: String
})

const ModelForUser = mongoose.model('User', UsersDataSchema);

export default ModelForUser;
