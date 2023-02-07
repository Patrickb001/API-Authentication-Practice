const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const User = require("../Models/User.model");
const { authSchema } = require("../helpers/validation_schema");
const { signAccessToken } = require("../helpers/jwt_helper");

router.post("/register", async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);

    const userDoesExist = await User.findOne({ email: result.email });
    if (userDoesExist)
      throw createError.Conflict(`${result.email} has already been registered`);

    const user = new User(result);
    const savedUser = await user.save();
    const accessToken = await signAccessToken(savedUser.id);

    res.send({ accessToken });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  res.send("login route");
});

router.post("/refresh-token", async (req, res, next) => {
  res.send("refresh token route");
});

router.delete("/logout", async (req, res, next) => {
  res.send("logout route");
});

module.exports = router;
