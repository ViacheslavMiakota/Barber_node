const mongoose = require("mongoose");

const { Schema } = mongoose;

const BarberSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for barber"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Barber phone number required"],
    validate: {
      validator: function (value) {
        return /\d{3}-\d{3}-\d{4}/.test(value);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  specialization: {
    type: String,
    required: [true, "Barber specialization required"],
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Barber = mongoose.model("Barber", BarberSchema);

module.exports = { Barber };
