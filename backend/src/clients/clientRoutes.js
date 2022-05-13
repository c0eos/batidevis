const express = require("express");
const Client = require("./clientModel");
const { AppError } = require("../utils/errors");

const router = express.Router();

router.route("/")
  .get((req, res, next) => {
    Client.getAll()
      .then((clients) => {
        res.json(clients);
      })
      .catch((err) => {
        next(err);
      });
  })
  .post((req, res, next) => {
    const {
      nom,
      interlocuteur,
      adresse,
      zip,
      ville,
      telephone,
      portable,
      email,
      compte,
      commentaire,
    } = req.body;

    Client.create({
      nom,
      interlocuteur,
      adresse,
      zip,
      ville,
      telephone,
      portable,
      email,
      compte,
      commentaire,
    })
      .then((client) => {
        res.json(client);
      })
      .catch((err) => {
        next(err);
      });
  });

router.route("/:id")
  .get((req, res, next) => {
    Client.getOneById(req.params.id)
      .then((client) => {
        if (client) {
          res.json(client);
        } else {
          throw new AppError("Client introuvable", 401, true);
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  .put((req, res, next) => {
    const {
      nom,
      interlocuteur,
      adresse,
      zip,
      ville,
      telephone,
      portable,
      email,
      compte,
      commentaire,
    } = req.body;
    Client.update(req.params.id, {
      nom,
      interlocuteur,
      adresse,
      zip,
      ville,
      telephone,
      portable,
      email,
      compte,
      commentaire,
    })
      .then((client) => {
        res.json(client);
      })
      .catch((err) => {
        next(err);
      });
  })
  .delete((req, res, next) => {
    Client.delete(req.params.id)
      .then((client) => {
        res.json(client);
      })
      .catch((err) => {
        next(err);
      });
  });

module.exports = router;
