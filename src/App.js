import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const api = {
    key: "a3e733bce38445cf27e1d774a0f0ddd6",
  };
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("london");
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    ifClicked();
  }, []);

  function ifClicked() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=a3e733bce38445cf27e1d774a0f0ddd6&units=metric`
    )
      .then((res) => {
        if (res.ok) {
          console.log(res.status);

          return res.json();
        } else {
          if (res.status === 404) {
            return alert("Try another location");
          }
          alert("An error occurred");
          throw new Error("You have an error");
        }
      })
      .then((object) => {
        setWeather(object);
        console.log(weather);
      })
      .catch((error) => console.log(error));
    fetch(
      `https://api.unsplash.com/search/photos?query=${locations}&client_id=fV7Hm0Rk-Op8OgKL6DJZSbTcMdaS8ybrGubIcgOJ72U`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("error");
        }
      })
      .then((data) => {
        console.log(data);
        setPhotos(data?.results[0]?.urls?.raw);
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className="app">
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter location"
            className="location_input"
          />
          <button className="location_searcher" onClick={ifClicked}>
            Search Location
          </button>
        </div>
        <div className="app__data">
          <p className="temp">
            Current Temperature: {(weather?.main?.temp * 1.8 + 32).toFixed(1)} F
          </p>
        </div>
        <img className="app__image" src={photos} alt="" />
      </div>
    </div>
  );
}

export default App;
