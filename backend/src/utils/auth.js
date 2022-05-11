const jwt = require("jsonwebtoken");
const { AppError } = require("./errors");

const secret = process.env.SECRET;

const auth = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const token = bearerToken?.split(" ")[1];

  const routesPubliques = [
    "/",
    "/api/v1/users/login",
  ];
  // pas de token pour les routes publiques
  if (routesPubliques.includes(req.path)) {
    return next();
  }
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        throw new AppError("Token invalide", 400, true);
      } else {
        req.id = decoded.id;
        return next();
      }
    });
  }
  throw new AppError("Token requis", 401, true);
};

module.exports = auth;
