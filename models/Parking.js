const mongoose = require("mongoose");

const ParkingSchema = new mongoose.Schema({
  organisationID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  vehicleID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  vehicleInfo: {
    type: Object,
  },
  fees: {
    type: Number,
  },
  slip: {
    type: String,
  },
  info: {
    type: Object,
  },
  slotTime: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Parking = mongoose.model("Parking", ParkingSchema);
