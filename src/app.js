const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));
const app = express();

const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  //   res.send("<h1>Home page12</h1>");
  res.render("index", {
    title: "Home Page",
  });
});

app.get("/help", (req, res) => {
  //   res.send("Help page");
  res.render("help", {
    title: "Help page",
    helpText: "This is some helpful text.",
  });
});

app.get("/about", (req, res) => {
  //   res.send("About page");
  res.render("about", {
    title: "About Me",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: "address is required",
    });
  }

  geocode(address, (error, { lat, long } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(lat, long, (error, forecastData, { name, country } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        forecast: forecastData,
        country,
        name,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Search term is required",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("help", {
    title: "Help Article Page",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andrew Mead",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
