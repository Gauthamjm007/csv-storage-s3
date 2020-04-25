require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;

/**
 * Database setup
 */
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to the DB");
  });

//parsing json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//only for dev to get all the requests made to the server
app.use(morgan("dev"));

//static path of local bucket , if we only use container
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

//routes
app.use(require("./routes"));

//connecting to the port
app.listen(PORT, () => {
  console.log(`connected to the server ${PORT} ..........`);
});
