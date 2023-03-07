const express = require('express')
const winston = require('winston')
const router = express.Router()
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({

    apiKey: "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",

});
const openai = new OpenAIApi(configuration);



router.post('/', async (req, res) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${req.body.text}`,
        temperature: 0.1,
        max_tokens: 100,
    });

    res.send(response)
})

module.exports = router