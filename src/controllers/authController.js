const { registerServise, loginServise } = require("../services/authServise");
const { getUserByEmail } = require("../services/userService");

const { statusCode } = require("../helpers/codeError");

const registerController = async (req, res, next) => {
  const { email, password, name, phoneNumber } = req.body;
  try {
    await registerServise(email, password, name, phoneNumber);

    res.status(statusCode.CREATED).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};
const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .json({ message: "Неправильний email або пароль" });
    }
    const { token, name, phoneNumber } = await loginServise(email, password);
    user.token = token;
    await user.save();
    res.status(statusCode.CREATED).json({ token, name, phoneNumber });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerController, loginController };
