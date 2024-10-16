const mongoose = require("mongoose");

const { Schema, Types } = mongoose;

const VerificationSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
    },
    code: {
      type: String,
      required: [true, "code is required"],
    },
    active: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: true },
  }
);

const Verification = mongoose.model("Verification", VerificationSchema);

module.exports = { Verification };
