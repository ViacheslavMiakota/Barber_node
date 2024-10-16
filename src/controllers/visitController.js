const {
  addVisit,
  getMyVisits,
  getVisitById,
  updateVisitById,
  deleteVisitById,
} = require("../services/visitServise");

const { updateUserById } = require("../services/userService");
const { statusCode } = require("../helpers/codeError");

const getMyVisitsController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const visits = await getMyVisits(userId);
    res.status(statusCode.OK).json(visits);
  } catch (error) {
    next(error);
  }
};

const getVisitByIdController = async (req, res, next) => {
  const { visitId } = req.params;
  const visit = await getVisitById(visitId);
  if (!visit) {
    return next({
      status: statusCode.NOT_FOUND,
      message: "Not found",
    });
  }
  res.status(statusCode.OK).json(visit);
};

const addVisitController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const newVisit = await addVisit(req.body, userId);

    user.visits.push(newVisit._id);
    await updateUserById(user.id, { visits: user.visits });

    res.status(statusCode.CREATED).json(newVisit);
  } catch (error) {
    next(error);
  }
};

const updateVisitByIdController = async (req, res, next) => {
  const { visitId } = req.params;
  const visit = await getVisitById(visitId);
  if (!visit) {
    return next({
      status: statusCode.BAD_REQUEST,
      message: `Not found visit with id ${visitId}`,
    });
  }
  const updatedVisit = await updateVisitById(visitId, req.body);
  res.status(statusCode.OK).json(updatedVisit);
};

const deleteVisitController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const visitId = req.params.visitId;
    const visitDelete = await getVisitById(visitId, userId);
    if (!visitDelete) {
      return next({
        status: statusCode.BAD_REQUEST,
        message: `Not found visit with id ${id}`,
      });
    }
  } catch (error) {}

  const user = req.user;
  user.visits = user.visits.filter((visit) => visit.toString() !== id);
  await updateUserById(user.id, { visits: user.visits });

  const newVisitsList = await deleteVisitById(id);
  res.status(statusCode.OK).json(newVisitsList);
};

module.exports = {
  addVisitController,
  getMyVisitsController,
  getVisitByIdController,
  updateVisitByIdController,
  deleteVisitController,
};
