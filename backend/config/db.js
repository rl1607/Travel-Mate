const mongoose = require('mongoose');
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/travelmate';
async function connectDB(){
  try{
    await mongoose.connect(uri, { });
    console.log('MongoDB connected');
  }catch(e){
    console.error('MongoDB connection error', e.message);
    process.exit(1);
  }
}
module.exports = connectDB;
