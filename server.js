import routes from "./routes/index.js"
import express from "express";
import cors from "cors";
import logger from "morgan";
import session from "express-session";
import chalk from "chalk";
import dotenv from 'dotenv';
dotenv.config()
import passport from "./config/passport.js";
import db from "./db/connection.js";


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use("/", routes)
// Route for initiating the Google OAuth flow
app.get('/api/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// Callback route for handling the Google OAuth callback URL
app.get('/api/auth/google/callback', passport.authenticate('google'), (req, res) => {
  // Redirect or respond as needed after successful authentication
});
app.get('/oauth2callback', passport.authenticate('google'), (req, res) => {
  // Redirect or handle the successful authentication
  console.log('yay')
  res.redirect('/'); // For example, redirect to the home page
});

// app.use('/api/users', require('./routes/api/users'));

db.on("connected", () => {
  console.clear();
  console.log(chalk.blue("Connected to MONGODB!"));

  app.listen(PORT, () => {
    process.env.NODE_ENV === "production"
      ? console.log(`Express server running in production on port ${PORT}\n\n`)
      : console.log(`Express server running in development on: ${PORT}`);
  });
});


