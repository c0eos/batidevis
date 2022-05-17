import express from "express";
import Facture from "./factureModel";
import { AppError } from "../utils/errors";

const router = express.Router();

router.route("/")
  .get((req, res, next) => {
    Facture.getAll()
      .then((factures) => {
        res.json(factures);
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
    Facture.getOneById(req.params.id)
      .then((facture) => {
        if (facture) {
          res.json(facture);
        } else {
          throw new AppError("Facture introuvable", 401, true);
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
    Facture.delete(req.params.id)
      .then((facture) => {
        res.json(facture);
      })
      .catch((err) => {
        next(err);
      });
  });

router.route("/:id/details")
  .get((req, res, next) => {
    Facture.getDetails(req.params.id)
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
