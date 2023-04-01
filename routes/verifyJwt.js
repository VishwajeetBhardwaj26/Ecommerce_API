const jwt = require("jsonwebtoken");
const verifyJwt = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    //const token = authHeader.split(" ")[1];
    jwt.verify(authHeader, process.env.jwt_Secret, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("UnAuthenticated");
  }
};
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyJwt(req, res, () => {
    if (req.userId === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Not allowed to perform this action");
    }
  });
};
const verifyTokenAndAdmin = (req, res, next) => {
  verifyJwt(req, res, () => {
      if (req?.user?.isAdmin) {
        next();
      } else {
        res.status(403).json("Unauthorized to perform this.");
      }
    });
  };

module.exports = {
  verifyJwt,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization
};
