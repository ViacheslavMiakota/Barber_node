const { Barber } = require("../model/barberModel");

const getBarbers = async () => {
  try {
    const barbersList = await Barber.find();
    return barbersList;
  } catch (error) {
    throw error;
  }
};

const getBarberById = async (barberId) => {
  try {
    const barberById = await Barber.findById(barberId);
    return barberById;
  } catch (error) {
    throw error;
  }
};

const addBarber = async (body) => {
  try {
    console.log("Adding barber:", body);
    const newBarber = await Barber.create(body);
    console.log("New barber created:", newBarber);
    return newBarber;
  } catch (error) {
    console.error("Error while adding barber:", error.message);
    throw error;
  }
};

const updateBarberById = async (barberId, body) => {
  try {
    const updatedBarber = await Barber.findByIdAndUpdate(
      barberId,
      { $set: body },
      { new: true }
    );
    return updatedBarber;
  } catch (error) {
    throw error;
  }
};

const deleteBarberById = async (barberId) => {
  try {
    const newBarbersList = await Barber.findByIdAndDelete(barberId);
    return newBarbersList;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addBarber,
  getBarbers,
  getBarberById,
  updateBarberById,
  deleteBarberById,
};
