import express from "express";
import Facture from "./factureModel";
import Devis from "../devis/devisModel";
import { AppError } from "../utils/errors";
import { FactureSchema } from "../utils/schemas";
import { generateDocumentCode } from "../utils/codesGenerator";

const router = express.Router();

router.route("/")
  .get((req, res, next) => {
    Facture.getAll()
      .then((factures) => {
        res.json({ results: factures });
      })
      .catch((err) => {
        next(err);
      });
  })
  .post(async (req, res, next) => {
    const { devisId } = req.body;
    try {
      const devis = await Devis.getOneById(devisId);
      const devislignes = await Devis.getLignes(devisId);

      const facturedata = await FactureSchema.validate({
        ...devis,
        codeDevis: devis.code,
      }, { stripUnknown: true });

      const codes = await Facture.getAllCodes();
      const code = generateDocumentCode("F", codes);

      facturedata.code = code;

      // retire données devis inutiles
      delete facturedata.id;
      delete facturedata.dateEdition;
      delete facturedata.dateCreation;

      const facture = await Facture.create(facturedata);

      await Facture.createLignesFromDevis(facture.id.toString(), devislignes);
      await Facture.updateTotaux(facture.code);

      await Devis.update(devisId, { transFacture: true });

      res.json({ results: facture });
    } catch (error) {
      next(error);
    }
  });

router.route("/:id")
  .get((req, res, next) => {
    Facture.getOneById(req.params.id)
      .then((facture) => {
        res.json({ results: facture });
      })
      .catch((err) => {
        next(err);
      });
  })
  .put(async (req, res, next) => {
    try {
      const facturedata = await FactureSchema.validate(req.body, { stripUnknown: true });
      const facture = await Facture.update(req.params.id, facturedata);
      res.json({ results: facture });
    } catch (error) {
      next(error);
    }
  })
  .delete((req, res, next) => {
    Facture.delete(req.params.id)
      .then((facture) => {
        res.json({ results: facture });
      })
      .catch((err) => {
        next(err);
      });
  });

router.route("/:id/lignes")
  .get((req, res, next) => {
    Facture.getLignes(req.params.id)
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
      let facture = await Facture.getOneById(req.params.id);
      const lignesdata = req.body;

      const newLignes = await Facture.updateLignes(req.params.id, lignesdata);

      facture = await Facture.updateTotaux(facture?.code);

      res.json({ results: newLignes });
    } catch (error) {
      next(error);
    }
  })
  .delete((req, res, next) => {
    throw new AppError("Not implemented", 501, true);
  });

export default router;
