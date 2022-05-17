import express from "express";
import Devis from "./devisModel";
import { AppError } from "../utils/errors";

const router = express.Router();

router.route("/")
  .get((req, res, next) => {
    Devis.getAll()
      .then((devis) => {
        res.json(devis);
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
    Devis.getOneById(req.params.id)
      .then((devis) => {
        if (devis) {
          res.json(devis);
        } else {
          throw new AppError("Devis introuvable", 401, true);
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
    Devis.delete(req.params.id)
      .then((devis) => {
        res.json(devis);
      })
      .catch((err) => {
        next(err);
      });
  });

router.route("/:id/details")
  .get((req, res, next) => {
    Devis.getDetails(req.params.id)
      .then((lignes) => {
        res.json(lignes);
      })
      .catch((err) => {
        next(err);
      });
  })
  .post((req, res, next) => {
    throw new AppError("Not implemented", 501, true);
  })
  .put((req, res, next) => {
    throw new AppError("Not implemented", 501, true);
  })
  .delete((req, res, next) => {
    throw new AppError("Not implemented", 501, true);
  });

export default router;
