const { User } = require("../models/user_model");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const validator = require("../middleware/joiValidator");
const express = require("express");
const router = express.Router();

const reqSchema = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .messages({ "any.required": `El campo "email" es requerido` }),
  password: Joi.string()
    .required()
    .messages({ "any.required": `El campo "password" es requerido` }),
});

router.post("/", validator(reqSchema), async (req, res) => {


  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email y password invalidos");

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).send("Email y password invalidos");

  const token = user.generateToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send("Usuario autentificado");
});

module.exports = router;