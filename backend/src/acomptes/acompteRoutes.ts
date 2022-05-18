import express from "express";
import Acompte from "./acompteModel";
import { AppError } from "../utils/errors";

const router = express.Router();

router.route("/")
  .get((req, res, next) => {
    Acompte.getAll()
      .then((acomptes) => {
        res.json({ results: acomptes });
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
    Acompte.getOneById(req.params.id)
      .then((acompte) => {
        if (acompte) {
          res.json({ results: acompte });
        } else {
          throw new AppError("Acompte introuvable", 401, true);
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
    Acompte.delete(req.params.id)
      .then((acompte) => {
        res.json({ results: acompte });
      })
      .catch((err) => {
        next(err);
      });
  });

export default router;
