import mongoose from "mongoose";
mongoose.set("strictQuery", true);
async function connect() {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
    return connection;
  } catch (error) {
    debugger
    console.log(error);
  }
}
export default connect;
