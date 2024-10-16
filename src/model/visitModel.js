const mongoose = require("mongoose");

const { Schema } = mongoose;

const VisitSchema = new Schema({
  visitText: {
    type: String,
    required: [true, "Please write your wishes"],
  },
  selectedTime: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  barber: {
    type: String,
    enum: ["John Smith", "Michele Doe", "Alan Black"],
    required: [true, "Please choose a barber"],
  },
});

const Visit = mongoose.model("visit", VisitSchema);

module.exports = { Visit };
