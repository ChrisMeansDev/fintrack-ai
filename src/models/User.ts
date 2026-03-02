import mongoose, { Schema, model, models } from "mongoose";

// Define the User schema
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

// Export the model if it exists; otherwise create it
const User = models.User || model("User", userSchema);
export default User;