const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Set name for user"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      required: [true, "User phone number required"],
      validate: {
        validator: function (value) {
          return /\d{3}-\d{3}-\d{4}/.test(value);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    selectedBarber: {
      type: String,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    message: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

UserSchema.methods.verifyPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", UserSchema);

module.exports = { User };
