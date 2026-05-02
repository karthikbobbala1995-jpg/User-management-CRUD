const mongoose = require('mongoose');

const DB_URL = "mongodb://127.0.0.1:27017/Employee-management-app"
const ConnectDB = async () => {
    try {
      await mongoose.connect(DB_URL);
         console.log("MongoDB connected successfully");
    } catch(err){
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    }
};

module.exports = ConnectDB