const {
  addVisitController,
  getMyVisitsController,
  getVisitByIdController,
  updateVisitByIdController,
  deleteVisitController,
} = require("../controllers/visitController");

const { asyncWrapper } = require("../helpers/apiHelpers");
const { authGuard } = require("../middlewares/authGuard");

visitsRouter.post("/visit", authGuard, asyncWrapper(addVisitController));

visitsRouter.get("/visits", asyncWrapper(getMyVisitsController));

visitsRouter.get("/visit/:visitId", asyncWrapper(getVisitByIdController));

visitsRouter.patch("/visit/:visitId", authGuard, asyncWrapper(updateVisitByIdController));

visitsRouter.delete("/review/:reviewId", authGuard, asyncWrapper(deleteVisitController));

module.exports = visitsRouter;
