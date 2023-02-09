import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

const password = process.env.PASSWORD;

const uriToConnect = `mongodb+srv://usuario:${password}@cluster0.tiaomwt.mongodb.net/?retryWrites=true&w=majority`

const connection = mongoose.connect(uriToConnect);

export default connection;


