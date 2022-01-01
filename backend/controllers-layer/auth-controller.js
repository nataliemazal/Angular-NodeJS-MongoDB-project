const express = require("express");
const authLogic = require("../business-logic-layer/auth-logic");
const router = express.Router();

// Register:
router.post("/register", async (request, response) => {
  try {
    const addedUser = await authLogic.registerAsync(request.body);
    if (!addedUser) {
      response.status(400).send("user already registed");
    } else {
      response.status(201).json(addedUser);
    }
  } catch (err) {
    response.status(500).send("error");
  }
});

// Login:
router.post("/login", async (request, response) => {
  try {
    const loggedInUser = await authLogic.loginAsync(request.body);
    if (!loggedInUser)
      return response.status(401).send("Incorrect username or password");
    response.json(loggedInUser);
  } catch (err) {
    response.status(500).send("error");
  }
});

router.get("/userStatus/:userId", async (request, response) => {
  try {
    const userId = request.params.userId;

    const userStatus = await authLogic.userStatus(userId);
    response.status(201).json(userStatus);
  } catch {
    response.status(500).send("error");
  }
});

module.exports = router;
