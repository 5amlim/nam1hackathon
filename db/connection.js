import mongoose from "mongoose";
import chalk from "chalk";
import dotenv from 'dotenv';
dotenv.config()

//This is for Model.findByIdAndUpdate method, specifically so that {new: true} is the default (if not set when querying it wont show new info)
mongoose.set("returnOriginal", false);
mongoose
  .connect(process.env.PROD_MONGODB)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log("Error", error.message));

mongoose.connection.on("disconnected", () =>
  console.log(chalk.bold("Disconnected from MongoDB!"))
);

mongoose.connection.on("error", (error) =>
  console.error(chalk.red(`MongoDB connection error: ${error}`))
);

export default mongoose.connection;
