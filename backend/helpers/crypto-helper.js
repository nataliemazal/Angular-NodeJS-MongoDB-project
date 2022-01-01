const crypto = require("crypto");

function hash(plainText) {
  if (!plainText) return null;

  // Hasing with salt:
  const salt = "SecretKey";
  return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}

module.exports = {
  hash,
};
