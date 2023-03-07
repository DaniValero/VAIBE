//RUTAS
require('express-async-errors')
const express = require('express');
const cors = require('cors');


const login = require('../routes/auth')
const user = require('../routes/user')
const registro = require('../routes/registro')
const errors = require('../middleware/errors')



const app = express();

module.exports = function (app) {

    app.use(cors())
    app.use(express.json())

    app.use('/login', login)
    app.use('/signup', registro)
    app.use('/user', user)
    

//PING

    app.get('/ping', (req, res) => {
        res.send('¡PONG!')
    })

    app.use(errors)

}