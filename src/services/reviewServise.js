const { Review } = require("../model/reviewModel");
const { User } = require("../model/userModel");

const getReviews = async () => {
  try {
    const reviewsList = await Review.find();
    return reviewsList;
  } catch (error) {
    throw error;
  }
};

const getReviewById = async (reviewId) => {
  try {
    const reviewById = await Review.findById(reviewId);
    return reviewById;
  } catch (error) {
    throw error;
  }
};

const addReview = async (body, userId) => {
  try {
    const newReview = await Review.create({ ...body, owner: userId });
    const user = await User.findById(userId);
    user.reviews.push(newReview._id);
    await user.save();

    return newReview;
  } catch (error) {
    throw error;
  }
};

const updateReviewById = async (reviewId, body) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { $set: body },
      { new: true }
    );
    return updatedReview;
  } catch (error) {
    throw error;
  }
};

const deleteReviewById = async (reviewId, userId) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (deletedReview) {
      const user = await User.findById(userId);
      user.reviews = user.reviews.filter((review) => review.toString() !== reviewId);
      await user.save();
    }

    return deletedReview;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addReview,
  getReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
};
