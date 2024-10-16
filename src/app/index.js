const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const usersRouter = require("../routes/userRoutes");
const reviewsRoutes = require("../routes/reviewsRoutes");
const barbersRoutes = require("../routes/barberRoutes");
const authRouter = require("../routes/authRoutes");

const { statusCode } = require("../helpers/codeError");

app.use(express.json());

app.use("/auth", authRouter);
app.use("/", usersRouter);
app.use("/", barbersRoutes);
app.use("/", reviewsRoutes);

app.use((_, res) => {
  res.status(statusCode.NOT_FOUND).json({
    status: "error",
    code: statusCode.NOT_FOUND,
    message: "Not found",
  });
});

// handle all other errors
app.use((err, _, res, next) => {
  err.status = err.status ? err.status : statusCode.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === 500 ? "fail" : "error",
    code: err.status,
    message: err.message,
    data: err.status === 500 ? "Internal Server Error" : err.data,
  });
});

module.exports = app;
