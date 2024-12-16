const mongoose = require("mongoose");

const connectDB = async () => {
  //   await mongoose.set('debug', true);
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB connected: ${conn.connection.host}`.cyan.bold.underline);
};

module.exports = connectDB;
