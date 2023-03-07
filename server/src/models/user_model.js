//SCHEMA - USERS

const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const Joi = require('joi')
const validator = require("../middleware/joiValidator");
const _ = require("lodash");
const { string } = require("joi");

const dataSchema = new mongoose.Schema({
    user_id: String,
    grupo1: String,
    grupo2: String,
    recomendacion1: String,
    recomendacion2: String,
    recomendacion3: String,
    opinion: Boolean
});

const dataSchema2 = new mongoose.Schema({
    user_id: String,
    text: String,
    gender: String,
    ages: String,
    music: String,
    hobbie: String,
    language: String,
    recomendacion1: String,
    recomendacion2: String,
    recomendacion3: String,
    opcion1: String,
    opcion2: String,
    opcion3: String
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    data: [dataSchema],
    data2: [dataSchema2]

});

userSchema.methods.generateToken = function () {
    return jwt.sign(
      _.pick(this, ["_id", "email", "username", "gender", "occupation", "age", "password", "data", "data2"]),
      config.get("jwtPrivateKey")
    );
  };

const User = mongoose.model('User', userSchema)

function validateData(data){
    const schema = Joi.object({
    grupo1: Joi.string(),
    grupo2: Joi.string(),
    temp: Joi.number(),
    response: Joi.object()
    })

    return schema.validate(data)
}


const reqSchema = Joi.object({
    username: Joi.string()
    .required()
    .messages({ "any.required": `Username invalid or incomplete` }),
    email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": `Invalid or incomplete email` }),
    password: Joi.string()
    .required()
    .messages({ "any.required": `Invalid or incomplete password` }),
    age: Joi.number()
    .messages({ "any.required": `Age is required` }),
    gender: Joi.string()
    .messages({ "any.required": `Gender is required` }),
    occupation: Joi.string()
    .messages({ "any.required": `Occupation is required` })
})

exports.User = User;
exports.validateBody = validator(reqSchema);