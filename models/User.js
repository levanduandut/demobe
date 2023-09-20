import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";
const User = mongoose.model(
  "User",
  new Schema({
    id: { type: ObjectId },
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length > 3,
        message: "Name must be more than 3 characters",
      },
    },
    email: {
      type: String,
      required: true,
      validate: { validator: (value) => isEmail, message: "Invalid email" },
    },
    password: {
      type: String,
      required: true,
    },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  })
);
export default User;
