const { createHmac } = require("node:crypto");
const { Verification } = require("../model/verificationModel");

const createVerificationCode = (userId) => {
  removeVerificationsCode(userId);

  const secret = "Werwer";
  const hashedCode = createHmac("sha256", ` ${secret}`)
    .update(`${userId}-${Date.now()}`)
    .digest("hex");
  const newVerificationCode = new Verification({ code: hashedCode, active: true });
  return newVerificationCode;
};

const removeVerificationsCode = async (userId) => {
  await Verification.deleteMany({ active: false, userId });
};
module.exports = { createVerificationCode };
