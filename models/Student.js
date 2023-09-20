import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";
const Student = mongoose.model(
  "Student",
  new Schema(
    {
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
        validate: { validator: (value) => isEmail(value), message: "Invalid email" },
      },
      phone: {
        type: String,
        required: false,
        validate: {
          validator: (phone) => phone.length > 7 && phone.length < 50,
          message: "Invalid phone number",
        }
      },
      address: { type: String, required: false },
      gender: {
        type: String,
        enum: {
          values: ["male", "female"],
          message: "Gender must be male or female",
        },
        required: false,
      },
      language: { type: [String] , required : false},
    },
    {
      autoCreate: true,
      autoIndex: true,
    }
  )
);
export default Student;
