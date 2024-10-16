const app = require("./src/app");

const connectDb = require("./src/config/db");

require("dotenv").config();

const PORT = process.env.PORT || 3030;

const startServer = async () => {
  try {
    app.listen(PORT, async (err) => {
      await connectDb();
      if (err) {
        console.log("Error at server launch", err);
      }
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
