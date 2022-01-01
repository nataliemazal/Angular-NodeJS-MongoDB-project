const jwt = require("jsonwebtoken");

function verifyAdmin(request, response, next) {
  // if there is no authorization header:
  if (!request.headers.authorization) {
    return response.status(401).send({ message: "You are not logged-in!" });
  }

  // Authorization header value: Bearer <token>
  const token = request.headers.authorization.split(" ")[1];
  if (!token)
    return response.status(401).send({ message: "You are not logged-in!" });

  jwt.verify(token, config.jwtKey, (err, payload) => {
    // payload is the user object
    if (err && err.message === "jwt expired")
      return response
        .status(403)
        .send({ message: "Your login session has expired" });

    if (err)
      return response.status(401).send({ message: "You are not logged-in!" });

    if (!payload.user?.isAdmin)
      return response.status(401).send({ message: "You are not an Admin!" });

    // All good, continue to the next middleware
    next();
  });
}

module.exports = verifyAdmin;
