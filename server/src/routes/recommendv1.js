const express = require('express')
const winston = require('winston')
const router = express.Router()
<<<<<<< HEAD
const config = require("config")
=======
const config = require("config");
>>>>>>> 2f4c5f4b6b90191adc8dc4ba358e4e0dc7dc9fcb
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({

    apiKey: config.get("openai"),

});
const openai = new OpenAIApi(configuration);



router.post('/', async (req, res) => {
    
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${req.body.text}`,
            temperature: 0.25,
            max_tokens: 1000,
        });
        res.send(response.data.choices[0].text);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating text');
    }


    // Act as an API music recommender. I will provide you with artist or bands and you will recommend 3 artist that are very similar to all the artist I give you and not very popular. Avoid artists that have same name as the ones I give you. Reply JSON format. My first request is nas and method man and the language must be English.

    // Act as an API music recommender. I will provide you with artist or bands and you will recommend 3 artist that are very similar to all the artist I give you and not very popular. Avoid artists that have same name as the ones I give you. Reply JSON. My first request is nas and method man and the language must be Spanish.
});

module.exports = router