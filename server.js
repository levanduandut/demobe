import express from "express";

import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { userRouter, studentRouter } from "./routers/index.js";
import connect from "./database/database.js";
import checkToken from "./authentication/auth.js";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Duẩn API TEST",
      version: " 1.0.0 ",
    },
    server: [
      {
        api: `https://localhost:${port}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./routers/users.js",
    "./routers/controllers/*.js",
    "./routers/students.js",
    "./routers/index.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(checkToken);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(express.json());
app.use("/users", userRouter);
app.use("/students", studentRouter);

app.listen(port, async (req, res) => {
  await connect();
  console.log(
    "Backend Nodejs is runing on the port : http://localhost:" + port
  );
  console.log(
    "Backend Nodejs is runing on the port : http://localhost:" + port +"/api-docs"
  );
});
