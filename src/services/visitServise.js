const { Visit } = require("../model/visitModel");
const { User } = require("../model/userModel");

const getMyVisits = async (userId) => {
  try {
    const visitsList = await Visit.find({ user: userId });
    return visitsList;
  } catch (error) {
    throw error;
  }
};

const getVisitById = async (visitId) => {
  try {
    const visitById = await Visit.findById(visitId);
    return visitById;
  } catch (error) {
    throw error;
  }
};

const addVisit = async (body, userId) => {
  try {
    const newVisit = await Visit.create({ ...body, owner: userId });
    const user = await User.findById(userId);
    user.visits.push(newVisit._id);
    await user.save();

    return newVisit;
  } catch (error) {
    throw error;
  }
};

const updateVisitById = async (visitId, body) => {
  try {
    const updatedVisit = await Visit.findByIdAndUpdate(
      visitId,
      { $set: body },
      { new: true }
    );
    return updatedVisit;
  } catch (error) {
    throw error;
  }
};

const deleteVisitById = async (visitId, userId) => {
  try {
    const deletedVisit = await Visit.findByIdAndDelete(visitId);
    if (deletedVisit) {
      const user = await User.findById(userId);
      user.visits = user.visits.filter((visit) => visit.toString() !== visitId);
      await user.save();
    }

    return deletedVisit;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addVisit,
  getMyVisits,
  getVisitById,
  updateVisitById,
  deleteVisitById,
};
