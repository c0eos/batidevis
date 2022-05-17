require("dotenv").config();

// express import
import express from "express";
import cors from "cors";
import compression from "compression";

// logging
import logger from "./utils/logger"

// express app setup
const app = express();
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// authentication
import auth from "./utils/auth";

// app.use(auth);

// utilise les routes
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur le backend" });
});

import usersRoutes from "./users/userRoutes";
import clientsRoutes from "./clients/clientRoutes";
import devisRoutes from "./devis/devisRoutes";

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/clients", clientsRoutes);
app.use("/api/v1/devis", devisRoutes);

const PORT = process.env.PORT || "9000";
app.listen(PORT, () => {
  logger.info(`Backend démarré sur le port ${PORT}`);
});

// erreurs
import {handler, AppError} from "./utils/errors";

// route 404
app.use((req, res) => {
  throw new AppError(`${req.url} est introuvable`, 404, true);
});

app.use(async (err: Error | AppError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  await handler.handle(err, res);
  next();
});

process.on("unhandledRejection", (reason, p) => {
  // Promise rejection non gérée, on lance une erreur
  throw reason;
});

process.on("uncaughtException", (err) => {
  handler.handle(err);

  // erreur non gérée, on arrête le process
  if (!handler.isTrustedError(err)) {
    process.exit(1);
  }
});
