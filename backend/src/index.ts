import dotenv from "dotenv";
// express import
import express from "express";
import cors from "cors";
import compression from "compression";

// logging
import logger from "./utils/logger";

import auth from "./utils/auth";
import usersRoutes from "./users/userRoutes";
import clientsRoutes from "./clients/clientRoutes";
import devisRoutes from "./devis/devisRoutes";
import facturesRoutes from "./factures/factureRoutes";

// erreurs
import { handler, AppError } from "./utils/errors";

dotenv.config();
const PORT = process.env.PORT || "9000";

// express setup
const app = express();
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// authentication
// app.use(auth);

// utilise les routes
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur le backend" });
});

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/clients", clientsRoutes);
app.use("/api/v1/devis", devisRoutes);
app.use("/api/v1/factures", facturesRoutes);

// route 404
app.use((req, res) => {
  throw new AppError(`${req.url} est introuvable`, 404, true);
});

// erreurs
app.use(async (
  err: Error | AppError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  await handler.handle(err, res);
  next();
});

app.listen(PORT, () => {
  logger.info(`Backend démarré sur le port ${PORT}`);
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
