import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Promise from "bluebird";

import auth from "./routes/auth";
import users from "./routes/users";
import books from "./routes/books";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.Promise = Promise;
//mongoose.connect(process.env.MONGODB_URL, { useMongoClient: true });
mongoose.connect("mongodb://localhost:27017/books", { useMongoClient: true });
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/books", books);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});



app.listen(8000, () => console.log("Running on localhost:8000"));
