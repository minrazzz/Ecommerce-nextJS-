import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   name: String,
   email: String,
   password: String,
   role: String,
});

const UserModel =
   mongoose.models.UserModels || mongoose.model("UserModels", UserSchema);

export default UserModel;
