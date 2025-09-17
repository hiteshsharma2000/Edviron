const express = require("express");
const UserModel = require("../models/Usermodel");
const jwt=require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require("bcrypt");
const UserRouter = express.Router();
const { body, validationResult } = require("express-validator");

UserRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let userexist = await UserModel.findOne({ email });
      if (userexist)
        return res.status(200).send({ msg: "Email already exist" });

      const hash = await bcrypt.hash(password, 10);

      const newuser = new UserModel({ email, password: hash });
      await newuser.save();
      res.json({ msg: "user has been created" });
    } catch (error) {
      res.status(404).send({ err: error });
    }
  }
);

UserRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const finduser = await UserModel.findOne({ email });
      if (finduser) {
        bcrypt.compare(password, finduser.password).then(function (result) {
          console.log(result);
          if (result) {
            const token = jwt.sign({ id: finduser._id }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRES_IN || "7d",
            });
            res.json({ msg:"login successfull",token });
            // return res.send({ login: result });
          } else {
            return res.send({ msg: "password not match" });
          }
        });
      } else {
        res.send({ msg: "no account found" });
      }
    } catch (error) {
      res.send({ err: error });
    }
  }
);

module.exports = { UserRouter };
