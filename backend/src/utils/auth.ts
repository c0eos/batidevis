import jwt from "jsonwebtoken";
import { AppError } from "./errors";
import express from "express";

const secret = process.env.SECRET || "secret";

interface TokenPayload {
  id: string;
  email: string;
  date: string
}

const auth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
    try {
      const decoded = jwt.verify(token, secret) as TokenPayload;
      res.locals.userId = decoded.id;
      return next();
    } catch (err) {
      throw new AppError("Token invalide", 400, true);
    }
  }
  throw new AppError("Token requis", 401, true);
};

export default auth;
