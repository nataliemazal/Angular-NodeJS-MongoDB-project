require("../data-access-layer/dal");
const UserModel = require("../models/user-model");
const cryptoHelper = require("../helpers/crypto-helper");
const jwtHelper = require("../helpers/jwt-helper");
const CartModel = require("../models/cart-model");
const OrderModel = require("../models/order-model");
const CartItemModel = require("../models/cartItem-model");

async function registerAsync(user) {
  const isUserIdExist = await UserModel.findOne({
    userID: user.userID,
  }).exec();

  if (isUserIdExist !== null) {
    return false;
  }

  // Hash password
  user.password = cryptoHelper.hash(user.password);
  user.isAdmin = false;

  // Create user
  const userModelObject = new UserModel(user);
  const addedUser = await userModelObject.save();

  if (!addedUser) return;

  return {
    firstName: addedUser.firstName,
    lastName: addedUser.lastName,
    username: addedUser.username,
    isAdmin: addedUser.isAdmin,
    city: addedUser.city,
    street: addedUser.street,
    token: jwtHelper.getNewToken(user),
    _id: addedUser._id,
  };
}

async function loginAsync(credentials) {
  // Hash password
  credentials.password = cryptoHelper.hash(credentials.password);

  const loggedInUser = await UserModel.findOne({
    userName: credentials.userName,
    password: credentials.password,
  }).exec();

  if (loggedInUser) {
    const user = {
      _id: loggedInUser._id,
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
      userName: loggedInUser.userName,
      isAdmin: loggedInUser.isAdmin,
      city: loggedInUser.city,
      street: loggedInUser.street,
    };

    return {
      ...user,
      token: jwtHelper.getNewToken(user),
    };
  }
}

async function userStatus(userId) {
  const userHaveCart = await CartModel.findOne({ userId: userId }).exec();

  if (!userHaveCart) {
    return "new user";
  } else {
    const lastCartId = await CartModel.findOne({ userId: userId })
      .sort({ date: "desc" })
      .limit(1)
      .exec();

    const isCartOpen = await OrderModel.findOne({
      cartId: lastCartId,
    }).exec();

    if (!isCartOpen) {
      //get total price of this cart:
      const cartItemsOfThisCart = await CartItemModel.find({
        cartId: lastCartId,
      }).exec();

      let total = 0;
      for (const item of cartItemsOfThisCart) {
        total += item.totalPrice;
      }

      return { openCart: lastCartId, totalCart: total };
    } else {
      const lastOrder = await OrderModel.find({ userId: userId })
        .sort({ orderDate: -1 })
        .limit(1)
        .exec();
      return { noOpenCart: lastOrder };
    }
  }
}

module.exports = {
  registerAsync,
  loginAsync,
  userStatus,
};
