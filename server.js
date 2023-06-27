import routes from "./routes/index.js"
import express from "express";
import cors from "cors";
import logger from "morgan";
import chalk from "chalk";
import dotenv from 'dotenv';
dotenv.config()
import db from "./db/connection.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(logger("dev"));

app.use("/", routes)

db.on("connected", () => {
  console.clear();
  console.log(chalk.blue("Connected to MONGODB!"));

  app.listen(PORT, () => {
    process.env.NODE_ENV === "production"
      ? console.log(`Express server running in production on port ${PORT}\n\n`)
      : console.log(`Express server running in development on: ${PORT}`);
  });
});


