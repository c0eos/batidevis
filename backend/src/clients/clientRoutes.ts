import express from "express";
import Client from "./clientModel";
import { AppError } from "../utils/errors";
import { ClientSchema } from "../utils/schemas";
import { generateClientCode } from "../utils/codesGenerator";

const router = express.Router();

router.route("/")
  .get((req, res, next) => {
    Client.getAll()
      .then((clients) => {
        res.json({ results: clients });
      })
      .catch((err) => {
        next(err);
      });
  })
  .post(async (req, res, next) => {
    try {
      const clientdata = await ClientSchema.validate(req.body, { stripUnknown: true });
      const codes = await Client.getAllCodes();

      const code = generateClientCode(clientdata.nom, codes);
      clientdata.code = code;

      const client = await Client.create(clientdata);

      res.json({ results: client });
    } catch (error) {
      next(error);
    }
  });

router.route("/:id")
  .get((req, res, next) => {
    Client.getOneById(req.params.id)
      .then((client) => {
        if (client) {
          res.json({ results: client });
        } else {
          throw new AppError("Client introuvable", 401, true);
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  .put(async (req, res, next) => {
    try {
      const clientdata = await ClientSchema.validate(req.body, { stripUnknown: true });
      const client = await Client.update(req.params.id, clientdata);
      res.json({ results: client });
    } catch (error) {
      next(error);
    }
  })
  .delete((req, res, next) => {
    Client.delete(req.params.id)
      .then((client) => {
        res.json({ results: client });
      })
      .catch((err) => {
        next(err);
      });
  });

export default router;
