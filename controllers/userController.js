import { body, query, validationResult } from "express-validator";
import { userRepository } from "../repositories/index.js";
import { EventEmitter } from "node:events";
import HtttpStatusCode from "../exceptions/HttpStatusCode.js";

const myEvent = new EventEmitter();
myEvent.on("event.register.user", (params) => {
  console.log(`They talk about ${JSON.stringify(params)}`);
});

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HtttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    let user = await userRepository.login({ email, password });
    res.status(HtttpStatusCode.OK).json({
      message: "Login user is successfully !",
      data: user,
    });
  } catch (error) {
    res.status(HtttpStatusCode.BAD_REQUEST).json({
      message: error.toString(),
    });
  }
};

const register = async (req, res) => {
  const { email, password, name, phone, address } = req.body;
  try {
    const user = await userRepository.register({
      email,
      password,
      name,
      phone,
      address,
    });
    myEvent.emit("event.register.user", { email, address });
    res.status(HtttpStatusCode.OK).json({
      message: "Register user is successfully !",
      data: user,
    });
  } catch (error) {
    res.status(HtttpStatusCode.BAD_REQUEST).json({
      message: error.toString(),
    });
  }
};

const getDetailUser = async (res, req) => {};
export default {
  login,
  register,
  getDetailUser,
};
