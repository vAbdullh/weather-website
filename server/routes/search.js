var axios = require('axios');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:target', async (req, res, next) => {
  try {
    const target = req.params.target;
    const apiKey = process.env.API_KEY;
    const endpoint = process.env.WEATHER_API_PROVIDER_ENDPOINT;

    const url = `${endpoint}find_places_prefix?text=${target}&language=en&key=${apiKey}`;


    const response = await axios.get(url);
    const weather = response.data;
    res.json(weather);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

module.exports = router;
