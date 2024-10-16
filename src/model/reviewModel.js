const mongoose = require("mongoose");

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  reviewText: {
    type: String,
    required: [true, "Please leave your review"],
  },
  date: {
    type: Date,
    default: Date.now, // автоматично встановлює поточну дату
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
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10, // оцінка від 1 до 10
  },
});

const Review = mongoose.model("review", ReviewSchema);

module.exports = { Review };
