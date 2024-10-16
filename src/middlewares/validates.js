const Joi = require("joi");
const { statusCode } = require("../helpers/codeError");
const { User } = require("../model/userModel");

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().pattern(new RegExp("^[0-9]{10}$")).required(),
});

exports.validateUser = async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);

    if (error) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json({ message: error.details[0].message });
    }

    const existingUserByEmail = await User.findOne({ email: req.body.email });
    const existingUser = await User.findOne({ phoneNumber: req.body.phoneNumber });

    if (existingUserByEmail) {
      return res.status(statusCode.BAD_REQUEST).json({ message: "Email already exists" });
    }
    if (existingUser) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json({ message: "Phone number already exists" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const reviewSchema = Joi.object({
  name: Joi.string().required(),
  genre: Joi.string().required(),
  year: Joi.number().required(),
  rating: Joi.number(),
  views: Joi.number(),
});

exports.validateReview = async (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    return res.status(statusCode.BAD_REQUEST).json({ message: error.details[0].message });
  }

  next(error);
};
