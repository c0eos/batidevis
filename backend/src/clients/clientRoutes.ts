import express from "express";
import Client from "./clientModel";
import { AppError } from "../utils/errors";

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
    throw new AppError("Not implemented", 501, true);
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
    throw new AppError("Not implemented", 501, true);
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

export default router;
