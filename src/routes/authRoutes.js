const express = require("express");
const authRouter = express.Router();

const { registerController, loginController } = require("../controllers/authController");
const { asyncWrapper } = require("../helpers/apiHelpers");

authRouter.post("/register", asyncWrapper(registerController));
authRouter.post("/login", asyncWrapper(loginController));

module.exports = authRouter;
