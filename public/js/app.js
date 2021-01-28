const weatherForm = document.querySelector("form");
const forecastEl = document.querySelector(".forecast");
const locationEl = document.querySelector(".location");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  locationEl.textContent = "Loading...";
  forecastEl.textContent = "";
  const address = e.target.querySelector("input").value;
  fetch(`/weather?address=${address}`).then((res) => {
    res.json().then((response) => {
      if (response.error) {
        console.error(response.error);
      } else {
        locationEl.textContent = response.name;
        forecastEl.textContent = response.forecast;
      }
    });
  });
});
