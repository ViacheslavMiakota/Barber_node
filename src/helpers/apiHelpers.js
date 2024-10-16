const asyncWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      console.log({ ERRROR: error.message });
      next(error);
    }
  };
};

module.exports = { asyncWrapper };
