import mongoose from "mongoose";
mongoose.set('strictQuery', false);

// Structure declaration for the users collection 
const ClientDataSchema = new mongoose.Schema({
    name: String,
    email: String, 
    telephone: String,
    cpf: String,
    address: String,
})

const ModelForClient = mongoose.model('Client', ClientDataSchema);

export default ModelForClient;
