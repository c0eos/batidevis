require("dotenv").config();

// express import
const express = require("express");
const cors = require("cors");
const compression = require("compression");

// logging
const logger = require("./utils/logger");

// express app setup
const app = express();
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// authentication
const auth = require("./utils/auth");

// app.use(auth);

// utilise les routes
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur le backend" });
});

const usersRoutes = require("./users/userRoutes");
const clientsRoutes = require("./clients/clientRoutes");

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/clients", clientsRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  logger.info(`Backend démarré sur le port ${PORT}`);
});

// erreurs
const { handler, AppError } = require("./utils/errors");

// route 404
app.use((req, res) => {
  throw new AppError(`${req.url} est introuvable`, 404, true);
});

app.use(async (err, req, res, next) => {
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
