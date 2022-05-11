const express = require("express");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

const router = express.Router();
const User = require("./userModel");

const { AppError } = require("../utils/errors");

router.route("/")
  .get((req, res) => {
    User.getAll()
      .then((users) => {
        res.json(users);
      });
  })
  .post((req, res) => {
    const { email, password } = req.body;
    User.register(email, password)
      .then((user) => {
        res.json(user);
      });
  });

router.route("/:id")
  .get((req, res) => {
    User.findById(req.params.id)
      .then((user) => {
        res.json(user);
      });
  });

router.route("/login")
  .post((req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError("Email et mot de passe requis", 400, true);
    }
    User.login(email, password)
      .then((user) => {
        if (user) {
          const payload = {
            id: user.id,
            email: user.email,
            date: new Date().toISOString(),
          };
          const token = jwt.sign(payload, secret);
          res.json({
            token,
          });
        } else {
          res.status(401).json({
            message: "Email ou mot de passe incorrect",
          });
        }
      });
  });

module.exports = router;
