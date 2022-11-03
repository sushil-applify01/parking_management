const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  ownerName: {
    type: String,
  },
  number: {
    type: String,
  },
  vehicleInfo: {
    category: {
      type: String,
    },
    model: {
      type: String,
    },
    number: {
      type: String,
    },
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Vehicle = mongoose.model("Vehicle", VehicleSchema);
