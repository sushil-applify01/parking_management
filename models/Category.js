const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  fees: {
    type: Number,
  },
  organisationID: {
    type: String,
  },
});

module.exports = Category = mongoose.model("Category", CategorySchema);
