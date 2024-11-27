// import { DateTime } from "luxon";

// const API_KEY = "d092e5f0b7829b3dd09e850ec3a9ca4e"
// const BASE_URL = "https://api.openweathermap.org/data/2.5/";

// const getWeatherData = (infoType, searchParams) => {
//     const url = new URL(BASE_URL + infoType);
//     url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

//     return fetch(url).then((res) => res.json());
// };

// const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a") => DateTime.fromSeconds(secs + offset, { zone: 'utc' }).toFormat(format)

// const formatCurrent = (data) => {
//     const {
//         coor: { lat, lon },
//         main: { temp, feels_like, temp_min, temp_max, humidity },
//         name, dt, sys: { country, sunrise, sunset },
//         weather,
//         wind: { speed },
//         timezone
//     } = data;

//     const { main: details, icon } = weather[0]
//     const formattedLocalTime = formatToLocalTime(dt, timezone);

//     return {
//         temp, feels_like, temp_min, temp_max, humidity, name, country,
//         sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
//         sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'), speed, details, icon, formattedLocalTime, dt, timezone, lat, lon
//     };
// };

// const formatForecastWeather = (secs, offset, data) => {
//     // hourly

//     const hourly = data.filter(f => f.dt > secs).map((f) => ({
//         temp: f.main.temp,
//         title: formatToLocalTime(f.dt, offset, "hh:mm a"),
//         date: f.dt_txt,
//     })).slice(0, 5)

//     // diaily

//     const daily = data.filter((f) => f.dt_txt.slice(-8) === "00:00:00").map((f) => ({
//         temp: f.main.temp,
//         title: formatToLocalTime(f.dt, offset, "ccc"),
//         date: f.dt_txt,
//     }));

//     return { hourly, daily }
// }

// const getFormattedWeatherData = async (searchParams) => {
//     const formattedCurrentWeather = await getWeatherData(
//         "weather",
//         searchParams
//     ).then(formatCurrent);

//     const { dt, lat, lon, timezone } = formattedCurrentWeather

//     const formattedForecastWeather = await getWeatherData("forecast", {
//         lat, lon, units: searchParams.units,
//     }).then((d) => formattedForecastWeather(dt, timezone, d.list));

//     return { ...formattedCurrentWeather, ...formattedForecastWeather }
// };

// export default getFormattedWeatherData