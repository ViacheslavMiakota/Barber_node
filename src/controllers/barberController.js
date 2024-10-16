const {
  addBarber,
  getBarbers,
  getBarberById,
  updateBarberById,
  deleteBarberById,
} = require("../services/barberService");

const { statusCode } = require("../helpers/codeError");

const addBarberController = async (req, res, next) => {
  try {
    console.log("Request body:", req.body);
    const newBarber = await addBarber(req.body);
    res.status(201).json(newBarber);
  } catch (error) {
    console.error("Error adding barber:", error.message);
    next(error);
  }
};

const getBarberByIdController = async (req, res, next) => {
  try {
    const { barberId } = req.params;
    const barber = await getBarberById(barberId);
    if (!barber) {
      return next({
        status: statusCode.NOT_FOUND,
        message: "Not found",
      });
    }
    res.status(statusCode.OK).json(barber);
  } catch (error) {
    next(error);
  }
};

const getBarbersController = async (req, res, next) => {
  try {
    const newBarber = await getBarbers(req.body);
    res.status(statusCode.CREATED).json(newBarber);
  } catch (error) {
    next(error);
  }
};

const updateBarberByIdController = async (req, res, next) => {
  try {
    const { barberId } = req.params;
    const barber = await getBarberById(barberId);
    if (!barber) {
      return next({
        status: statusCode.BAD_REQUEST,
        message: `Not found barber with id ${barberId}`,
      });
    }
    const updatedBarber = await updateBarberById(barberId, req.body);
    res.status(statusCode.OK).json(updatedBarber);
  } catch (error) {
    next(error);
  }
};

const deleteBarberController = async (req, res, next) => {
  try {
    const id = req.params.barberId;
    const barberDelete = await getBarberById(id);
    if (!barberDelete) {
      return next({
        status: statusCode.BAD_REQUEST,
        message: `Not found barber with id ${id}`,
      });
    }
    const newBarberList = await deleteBarberById(id);
    res.status(statusCode.OK).json(newBarberList);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addBarberController,
  getBarbersController,
  getBarberByIdController,
  updateBarberByIdController,
  deleteBarberController,
};
