const {
  addReview,
  getReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
} = require("../services/reviewServise");

const { updateUserById } = require("../services/userService");
const { statusCode } = require("../helpers/codeError");

const getReviewsController = async (req, res, next) => {
  const reviews = await getReviews();
  res.status(statusCode.OK).json(reviews);
};

const getReviewByIdController = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await getReviewById(reviewId);
  if (!review) {
    return next({
      status: statusCode.NOT_FOUND,
      message: "Not found",
    });
  }
  res.status(statusCode.OK).json(review);
};

const addReviewController = async (req, res, next) => {
  try {
    const user = req.user;
    const newReview = await addReview(req.body, user.id);

    user.reviews.push(newReview._id);
    await updateUserById(user.id, { reviews: user.reviews });

    res.status(statusCode.CREATED).json(newReview);
  } catch (error) {
    next(error);
  }
};

const updateReviewByIdController = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await getReviewById(reviewId);
  if (!review) {
    return next({
      status: statusCode.BAD_REQUEST,
      message: `Not found review with id ${reviewId}`,
    });
  }
  const updatedReview = await updateReviewById(reviewId, req.body);
  res.status(statusCode.OK).json(updatedReview);
};

const deleteReviewController = async (req, res, next) => {
  const id = req.params.reviewId;
  const reviewDelete = await getReviewById(id);
  if (!reviewDelete) {
    return next({
      status: statusCode.BAD_REQUEST,
      message: `Not found review with id ${id}`,
    });
  }

  const user = req.user;
  user.reviews = user.reviews.filter((review) => review.toString() !== id);
  await updateUserById(user.id, { reviews: user.reviews });

  const newReviewsList = await deleteReviewById(id);
  res.status(statusCode.OK).json(newReviewsList);
};

module.exports = {
  addReviewController,
  getReviewsController,
  getReviewByIdController,
  updateReviewByIdController,
  deleteReviewController,
};
