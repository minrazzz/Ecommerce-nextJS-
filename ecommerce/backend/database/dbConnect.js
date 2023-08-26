import mongoose from "mongoose";

const configOptions = {
   useNewUrlParser: true,
   useUnifiedTopology: true,
};

const connectDB = async () => {
   const connectionUrl =
      "mongodb+srv://minrazbasnet123:12345@cluster0.19re5sd.mongodb.net/";
   try {
      await mongoose.connect(connectionUrl, configOptions);
      console.log("Database connected successfully");
   } catch (err) {
      console.log(`Getting error from DB connection ${err.message}`);
   }
};

export default connectDB;
