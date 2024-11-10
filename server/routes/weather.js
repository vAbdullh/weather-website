var express = require('express');
var axios = require('axios');
var router = express.Router();

router.get('/:city', async (req, res, next) => {
    try {
        const city = req.params.city;
        const apiKey = process.env.API_KEY;
        const endpoint = process.env.WEATHER_API_PROVIDER_ENDPOINT;

        const url = `${endpoint}point?place_id=${city}&sections=current%2Chourly&language=en&units=auto&key=${apiKey}`;
        const response = await axios.get(url);
        const weather = response.data;
        res.json(weather);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
});

module.exports = router;
