const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibmJodXBhbGFtIiwiYSI6ImNra2VjcGs2eTA3OGcycG85d2VpaGpxbW0ifQ.bBu6qUUVlPE5KIwLMkuq_Q&limit=1`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location service");
    } else if (!response.body.features.length) {
      callback("unable to find location");
    } else {
      const [lat, long] = response.body.features[0].center;
      callback(undefined, { lat, long });
    }
  });
};

module.exports = geocode;
