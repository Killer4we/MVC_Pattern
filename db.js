const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://abhinavajay20:MJr6xzbBIcgY36ND@cluster0.qwpvghk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectDB;