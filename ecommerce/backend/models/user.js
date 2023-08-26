import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   name: String,
   email: String,
   password: String,
   role: String,
});

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
