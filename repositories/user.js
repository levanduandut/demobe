import Exception from "../exceptions/Exception.js";
import { print, OutputType } from "../helpers/print.js";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const login = async ({ email, password }) => {
  let exisingUser = await User.findOne({ email: email }).exec();
  if (exisingUser) {
    const isMatched = await bcrypt.compare(password, exisingUser.password);
    if (!!isMatched) {
      //Create new token
      let token = jwt.sign(
        {
          data: exisingUser,
        },
        process.env.SALT,
        {
          expiresIn: "1h",
        }
      );

      return {
        ...exisingUser.toObject(),
        password: "Not show",
        token: token,
      };
    } else {
      throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
    }
  } else {
    throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
  }
};

const register = async ({ email, password, name, phone, address }) => {
  let exisingUser = await User.findOne({ email: email }).exec();
  if (!!exisingUser) {
    throw new Exception(Exception.USER_EXIST);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT)
  );
  const newUser = await User.create({
    email: email,
    password: hashedPassword,
    name: name,
    phone: phone,
    address: address,
  });
  return { ...newUser._doc, password: "Not Show" };
  // print(
  //   "Register user repository with email: " +
  //     email +
  //     ", password: " +
  //     password +
  //     ", name: " +
  //     name +
  //     ", phone: " +
  //     phone +
  //     ", address: " +
  //     address,
  //   OutputType.SUCCESS
  // );
};
export default {
  login,
  register,
};
