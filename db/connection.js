import mongoose from "mongoose";
import chalk from "chalk";

const MONGODB_URI = process.env.PROD_MONGODB || "";

//This is for Model.findByIdAndUpdate method, specifically so that {new: true} is the default (if not set when querying it wont show new info)
mongoose.set("returnOriginal", false);

mongoose
  .connect(MONGODB_URI)
  .catch((error) => console.log("Error", error.message));

mongoose.connection.on("disconnected", () =>
  console.log(chalk.bold("Disconnected from MongoDB!"))
);

mongoose.connection.on("error", (error) =>
  console.error(chalk.red(`MongoDB connection error: ${error}`))
);

export default mongoose.connection;
