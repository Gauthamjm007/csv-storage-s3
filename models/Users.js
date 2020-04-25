const mongoose = require("mongoose");


//User schema containing data
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  csv_url: String,
});

module.exports = mongoose.model("User", UserSchema);
