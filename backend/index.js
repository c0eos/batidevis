require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});

async function main() {
  app.get("/", (req, res, next) => {
    res.json({ message: "Bienvenue sur le backend" });
  });

  // utilise les routes
  const usersRoutes = require("./routes/users");

  app.use("/api/v1/users", usersRoutes(knex));

  // route 404
  app.use((req, res, next) => {
    console.log(req.url);
    res.status(404).json({ message: "Introuvable" });
  });

  const PORT = process.env.PORT || 9000;
  app.listen(PORT, () => {
    console.log(`Backend démarré sur le port ${PORT}`);
  });
}

// démarre le serveur
main()
// catch les erreurs non gérées
  .catch((err) => {
    throw err;
  })
// ferme le serveur correctement
  .finally(async () => {
    console.log("Fermeture du serveur");
  });
