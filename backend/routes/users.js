const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
const secret = process.env.SECRET;

module.exports = (knex) => {
  const router = express.Router();
  const UserModel = require("../models/users")(knex);

  router.route("/:id")
    .get((req, res, next) => {
    });
};
