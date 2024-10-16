const {
  addUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../services/userService");

const { statusCode } = require("../helpers/codeError");

const getUsersController = async (req, res, next) => {
  const users = await getUsers();
  res.status(statusCode.OK).json(users);
};

const getUserByIdController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await getUserById(userId);
    if (!user) {
      return next({
        status: statusCode.NOT_FOUND,
        message: "Not found",
      });
    }
    res.status(statusCode.OK).json(user);
  } catch (error) {
    next(error);
  }
};

const addUserController = async (req, res, next) => {
  try {
    const newUser = await addUser(req.body);
    res.status(statusCode.CREATED).json(newUser);
  } catch (error) {
    next(error);
  }
};

const updateUserByIdController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await getUserById(userId);
    if (!user) {
      return next({
        status: statusCode.BAD_REQUEST,
        message: `Not found user with id ${userId}`,
      });
    }
    const updatedUser = await updateUserById(userId, req.body);
    res.status(statusCode.OK).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteUserController = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const userDelete = await getUserById(id);
    if (!userDelete) {
      return next({
        status: statusCode.BAD_REQUEST,
        message: `Not found user with id ${id}`,
      });
    }
    const newUserList = await deleteUserById(id);
    res.status(statusCode.OK).json(newUserList);
  } catch (error) {
    next(error);
  }
};

const getCurentUserController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await getUserById(userId);
    if (!user) {
      return next({
        status: statusCode.UNAUTHORIZED,
        message: "User is not authorized",
      });
    }
    res.status(statusCode.OK).json(user);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  addUserController,
  getUsersController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserController,
  getCurentUserController
};
