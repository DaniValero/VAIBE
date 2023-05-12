const express = require('express')
const router = express.Router()
const config = require("config")
const axios = require("axios")
const qs = require("qs")

const client_id = config.get("spotifyClient")
const client_secret = config.get("spotifySecret")
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

const getAuth = async () => {
    try{

      //make post request to SPOTIFY API for access token, sending relevant info
      const token_url = 'https://accounts.spotify.com/api/token';
      const data = qs.stringify({'grant_type':'client_credentials'});
      
          const response = await axios.post(token_url, data, {
          headers: { 
              'Authorization': `Basic ${auth_token}`,
              'Content-Type': 'application/x-www-form-urlencoded' 
          }
          })
          //return access token
          return response.data.access_token;
          //console.log(response.data.access_token);   
      }catch(error){
          //on fail, log the error in console
          console.log(error);
      }
  }

router.post('/', async (req, res) => {
    // console.log(req.body);
    const uris = []
    //request token using getAuth() function
    const access_token = await getAuth();
    //console.log(access_token);
    const urls = [
        `https://api.spotify.com/v1/search?query=${req.body.artist}&type=artist&locale=es-ES%2Ces%3Bq%3D0.9&offset=0&limit=20`,
        `https://api.spotify.com/v1/search?query=${req.body.artist2}&type=artist&locale=es-ES%2Ces%3Bq%3D0.9&offset=0&limit=20`,
        `https://api.spotify.com/v1/search?query=${req.body.artist3}&type=artist&locale=es-ES%2Ces%3Bq%3D0.9&offset=0&limit=20`
    ];
    
    const requests = urls.map(url => axios.get(url, {
    headers: {
        'Authorization': `Bearer ${access_token}`
    }
    }));
    
    axios.all(requests).then(responses => {
    responses.forEach(response => {
        const code = response.data.artists.items[0].uri.split(":")[2];
        // console.log(code);
        uris.push(code)
    });
    res.send(uris) 
    // console.log(uris);
    }).catch(error => {
    console.log(error);
    });
      
})

module.exports = router