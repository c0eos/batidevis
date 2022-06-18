import express from "express";
import Devis from "./devisModel";
import { AppError } from "../utils/errors";
import { DevisSchema } from "../utils/schemas";
import { generateDocumentCode } from "../utils/codesGenerator";

const router = express.Router();

router.route("/")
  .get((req, res, next) => {
    Devis.getAll()
      .then((devis) => {
        res.json({ results: devis });
      })
      .catch((err) => {
        next(err);
      });
  })
  .post(async (req, res, next) => {
    try {
      const devisdata = await DevisSchema.validate(req.body, { stripUnknown: true });
      const codes = await Devis.getAllCodes();

      const code = generateDocumentCode("D", codes);
      devisdata.code = code;

      const devis = await Devis.create(devisdata);

      res.json({ results: devis });
    } catch (error) {
      next(error);
    }
  });

router.route("/:id")
  .get((req, res, next) => {
    Devis.getOneById(req.params.id)
      .then((devis) => {
        res.json({ results: devis });
      })
      .catch((err) => {
        next(err);
      });
  })
  .put(async (req, res, next) => {
    try {
      const devisdata = await DevisSchema.validate(req.body, { stripUnknown: true });
      const devis = await Devis.update(req.params.id, devisdata);
      res.json({ results: devis });
    } catch (error) {
      next(error);
    }
  })
  .delete((req, res, next) => {
    Devis.delete(req.params.id)
      .then((devis) => {
        res.json({ results: devis });
      })
      .catch((err) => {
        next(err);
      });
  });

router.route("/:id/lignes")
  .get((req, res, next) => {
    Devis.getLignes(req.params.id)
      .then((lignes) => {
        res.json({ results: lignes });
      })
      .catch((err) => {
        next(err);
      });
  })
  .post((req, res, next) => {
    throw new AppError("Not implemented", 501, true);
  })
  .put(async (req, res, next) => {
    try {
      const devis = await Devis.getOneById(req.params.id);
      const lignesdata = req.body;

      const newLignes = await Devis.updateLignes(req.params.id, lignesdata);

      await Devis.updateTotaux(devis?.code);

      res.json({ results: newLignes });
    } catch (error) {
      next(error);
    }
  })
  .delete((req, res, next) => {
    throw new AppError("Not implemented", 501, true);
  });

export default router;
