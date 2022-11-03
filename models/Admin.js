const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  organisation: {
    type: String,
  },
  parkingSlots: {
    type: Number,
  },
});

module.exports = Admin = mongoose.model("Admin", AdminSchema);
