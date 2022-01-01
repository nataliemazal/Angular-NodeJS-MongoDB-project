const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    userID: Number,
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    city: String,
    street: String,
    isAdmin: Boolean,
  },
  { versionKey: false, toJSON: { virtuals: true }, id: false }
);

const UserModel = mongoose.model("UserModel", UserSchema, "users");

module.exports = UserModel;
