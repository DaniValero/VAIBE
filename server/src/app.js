//APP

const express = require('express')
const path = require('path');
const winston = require('winston')


require('dotenv').config()

const app = express();

require('./startUp/routes')(app)
require('./startUp/db')()
require('./startUp/logging')()

//PUERTO DE ESCUCHA

const port = process.env.PORT || 3000
app.listen(port, () => winston.info(`SERVIDOR CONECTADO EN: http://localhost:${port}`))