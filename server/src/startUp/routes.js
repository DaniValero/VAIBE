//RUTAS
require('express-async-errors')
const express = require('express');
const cors = require('cors');


const login = require('../routes/auth')
const user = require('../routes/user')
const registro = require('../routes/registro')
const recommendv1 = require('../routes/recommendv1')
const errors = require('../middleware/errors')



const app = express();

module.exports = function (app) {

    app.use(cors())
    app.use(express.json())

    app.use('/login', login)
    app.use('/signup', registro)
    app.use('/user', user)
    app.use('/recommendv1', recommendv1)
    

//PING

    app.get('/ping', (req, res) => {
        res.send('¡PONG!')
    })

    app.use(errors)

}