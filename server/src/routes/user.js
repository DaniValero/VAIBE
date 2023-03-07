const express = require('express')
const winston = require('winston')
const { User, validateBody } = require('../models/user_model')
const validator = require("../middleware/joiValidator");
const router = express.Router()
const Joi = require("joi");

//EDITAR DATOS DE USUARIO

router.put('/edit/:email', async (req, res) => {

  const user = await User.findOneAndUpdate({ email: req.params.email }, req.body)
  res.send(user)
  winston.info(`Usuario editado: ${req.params.email}`)
})

// AÑADIR BUSQUEDAS REALIZADAS EN LA WEB 

router.put('/add-recommendation/:email', async (req, res) => {
  console.log(req.body)

  const user = await User.findOneAndUpdate({email: req.params.email}, {$push: {data: req.body}})
  res.send(user)
  winston.info(`Recomendacion añadida: ${req.params.email}`)
})

//AÑADIR BUSQUEDAS VERSION2

router.put('/add-recommendationv2/:email', async (req, res) => {
  console.log(req.body)

  const user = await User.findOneAndUpdate({email: req.params.email}, {$push: {data2: req.body}})
  res.send(user)
  winston.info(`Recomendacion añadida: ${req.params.email}`)
})

module.exports = router