import mongoose from "mongoose";
mongoose.set('strictQuery', false);

// Structure declaration for the users collection 
const UsersDataSchema = new mongoose.Schema({
    user: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
})

const ModelForUser = mongoose.model('User', UsersDataSchema);

export default ModelForUser;
