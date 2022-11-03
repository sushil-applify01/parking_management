const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  number: {
    type: String,
  },
  password: {
    type: String,
  },
  organisation: {
    type: String,
  },
});

module.exports = User = mongoose.model("User", UserSchema);
