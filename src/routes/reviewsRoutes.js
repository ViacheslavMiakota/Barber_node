const express = require("express");
const reviewsRouter = express.Router();

const {
  addReviewController,
  getReviewsController,
  getReviewByIdController,
  updateReviewByIdController,
  deleteReviewController,
} = require("../controllers/reviewController");

const { asyncWrapper } = require("../helpers/apiHelpers");
const { authGuard } = require("../middlewares/authGuard");

reviewsRouter.post("/review", authGuard, asyncWrapper(addReviewController));

reviewsRouter.get("/reviews", asyncWrapper(getReviewsController));

reviewsRouter.get("/review/:reviewId", asyncWrapper(getReviewByIdController));

reviewsRouter.patch(
  "/review/:reviewId",
  authGuard,
  asyncWrapper(updateReviewByIdController)
);

reviewsRouter.delete(
  "/review/:reviewId",
  authGuard,
  asyncWrapper(deleteReviewController)
);

module.exports = reviewsRouter;
