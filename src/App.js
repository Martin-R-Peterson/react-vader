/* eslint-disable default-case */
import { useState } from "react";
import "./App.scss";
import { History } from "./History.js";
require("dotenv").config();

const api = {
  key: process.env.vader_REACT_APINYCKEL,
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [history, setHistory] = useState([]);

  console.log("test");

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())

        .then((result) => {
          const { name, main } = result;
          const { temp } = { ...main };
          setHistory([...history, { name: name, temp: temp }]);
          setWeather(result);
          setQuery("");
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "Januari",
      "Februari",
      "Mars",
      "April",
      "Maj",
      "Juni",
      "Juli",
      "Augusti",
      "September",
      "Oktober",
      "November",
      "December",
    ];
    let days = [
      "Söndag",
      "Måndag",
      "Tisdag",
      "Onsdag",
      "Torsdag",
      "Fredag",
      "Lördag",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  function check() {
    if (typeof weather.main != "undefined") {
      let vdrtyp = weather.weather[0].main;
      let temp = " ";
      switch (vdrtyp) {
        case "Clear":
          temp = "App";
          break;
        case "rain":
          temp = "Apprain";
          break;
        case "drizzle":
          temp = "Apprain";
          break;
        case "Clouds":
          temp = "Appclouds";
          break;
      }

      return temp;
    }
  }

  function translate() {
    if (typeof weather.main != "undefined") {
      let vdr = weather.weather[0].main;
      let temp = " ";

      switch (vdr) {
        case "Clear":
          temp = "Klart";
          break;
        case "rain":
          temp = "Regn";
          break;
        case "drizzle":
          temp = "Regn";
          break;
        case "Clouds":
          temp = "Molnigt";
          break;
      }

      return temp;
    }
  }

  return (
    <div className={check()}>
      <main>
        <div className="s-box">
          <input
            type="text"
            className="s-bar"
            placeholder="Sök Stad..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="l-box">
              <div className="location">
                {" "}
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="w-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{translate()}</div>
            </div>
            <History rows={history}></History>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}
export default App;
