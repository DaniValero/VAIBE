const config = require("config");
const mongoose = require('mongoose')
const winston = require('winston')



module.exports = function () {
    mongoose
    .connect(config.get("db"), {useUnifiedTopology: true}) 
    .then(() => winston.info("Conectado a MongoDB/VIBE.AI"))
}
