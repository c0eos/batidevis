const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("./userModel");
const { AppError } = require("../utils/errors");

const secret = process.env.SECRET;

const router = express.Router();

router.route("/")
  .get((req, res, next) => {
    User.getAll()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        next(err);
      });
  })
  .post((req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError("Email et mot de passe requis", 400, true);
    }

    User.create(email, password)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        next(err);
      });
  });

// route non protégée
router.route("/login")
  .post((req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError("Email et mot de passe requis", 400, true);
    }

    User.login(email, password)
      .then((user) => {
        const payload = {
          id: user.id,
          email: user.email,
          date: new Date().toISOString(),
        };
        const token = jwt.sign(payload, secret);
        res.json({ token });
      })
      .catch((err) => {
        next(err);
      });
  });

router.route("/:id")
  .get((req, res, next) => {
    User.getOneById(req.params.id)
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          throw new AppError("Utilisateur introuvable", 404, true);
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  .put((req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError("Email et mot de passe requis", 400, true);
    }

    User.update(req.params.id, email, password)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        next(err);
      });
  })
  .delete((req, res, next) => {
    User.delete(req.params.id)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        next(err);
      });
  });

module.exports = router;
