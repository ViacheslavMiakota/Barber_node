const express = require("express");

const barberRouter = express.Router();
const {
  addBarberController,
  getBarbersController,
  getBarberByIdController,
  updateBarberByIdController,
  deleteBarberController,
} = require("../controllers/barberController");
const { asyncWrapper } = require("../helpers/apiHelpers");
const { authGuard } = require("../middlewares/authGuard");

barberRouter.post("/barber", authGuard, asyncWrapper(addBarberController));

barberRouter.get("/barbers", asyncWrapper(getBarbersController));

barberRouter.get("/barber/:barberId", asyncWrapper(getBarberByIdController));

barberRouter.patch("/barber/:barberId", asyncWrapper(updateBarberByIdController));

barberRouter.delete("/barber/:barberId", asyncWrapper(deleteBarberController));

module.exports = barberRouter;
