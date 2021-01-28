const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=853bfe7f4a79fded8a340f2bd161213e&query=${long},${lat}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service");
    } else if (response.body.error) {
      callback("unable to find location for weather data");
    } else {
      const {
        weather_descriptions,
        temperature,
        feelslike,
        precip,
        humidity,
      } = response.body.current;
      callback(
        undefined,
        `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. There is a ${precip}% chance of rain. The humidity is ${humidity}%.`,
        response.body.location
      );
    }
  });
};

module.exports = forecast;
