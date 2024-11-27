import { useState, useEffect } from "react";
import TopLeft from "./TopLeft";
import TopRight from "./TopRight";
import ErrorComponent from "./ErrorComponent";
import BottomLeft from "./BottomLeft";
import BottomRight from "./BottomRight";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


const Weather = () => {
  const apiURL = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const [weatherInfo, setWeatherInfo] = useState({});
  const [city, setCity] = useState("");
  const [dayName, setDayName] = useState("");
  const [localTime, setLocalTime] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [isError, setIsError] = useState(false); // Track errors

  const timezone = weatherInfo[city]?.timezone || 0;
  const dt = weatherInfo[city]?.dt || 'N/A';
  const country = weatherInfo[city]?.sys?.country || 'N/A';
  const value = weatherInfo[city]?.main?.humidity || 'N/A';

  const fetchData = async (city) => {
    try {
      const response = await fetch(`${apiURL}${city}&appid=${apiKey}`);
      const data = await response.json();

      if (response.ok) {
        setWeatherInfo((prev) => ({
          ...prev,
          [city]: data,
        }));
        // console.log(weatherInfo);
        
        setIsError(false); // Reset error if data is fetched successfully
      } else {
        setIsError(true); // Set error if response is not okay
      }
    } catch (error) {
      console.error('Error fetching the weather data:', error);
      setIsError(true); // Set error on fetch failure
    }
  };

  const handleChange = (event) => {
    setCity(event.target.value);
    setIsError(false); 
  };

  const handleClick = () => {
    fetchData(city);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (dt) {
      const date = new Date(dt * 1000);
      const day = date.toLocaleDateString("en-US", { weekday: "long" });
      setDayName(day);
    }
  }, [dt, country, value, city]);

  useEffect(() => {
    if (dt && timezone !== undefined) {
      const date = new Date(dt * 1000);

      let formattedTime;

      if (country === "IN") {
        formattedTime = date.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        });
      } else {
        const localDate = new Date(date.getTime() + timezone * 1000);
        formattedTime = localDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
      }

      setLocalTime(formattedTime);
    }
  }, [dt, timezone, country]);

  return (
    <>
      {/* props */}
      {isError ? (<ErrorComponent />) : (<div className="flex flex-wrap gap-10 m-10 justify-center align-center">
        <TopLeft country={country} formattedDate={formattedDate} weatherInfo={weatherInfo} dt={dt} city={city} setCity={setCity} dayName={dayName} setWeatherInfo={setWeatherInfo} handleChange={handleChange} handleClick={handleClick} handleSubmit={handleSubmit} fetchData={fetchData} />

        <TopRight weatherInfo={weatherInfo} localTime={localTime} city={city} value={value} />
        <BottomLeft city={city} />
        <BottomRight city={city} />
      </div>)}

    </>
  );
};

export default Weather;

// import { useState, useEffect } from "react";
// import TopLeft from "./TopLeft";
// import TopRight from "./TopRight";
// import ErrorComponent from "./ErrorComponent";
// import BottomLeft from "./BottomLeft";
// import BottomRight from "./BottomRight";
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// const Weather = () => {
//   const apiURL = import.meta.env.VITE_API_URL;
//   const apiKey = import.meta.env.VITE_API_KEY;

//   const [weatherInfo, setWeatherInfo] = useState({});
//   const [city, setCity] = useState("");
//   const [dayName, setDayName] = useState("");
//   const [localTime, setLocalTime] = useState("");
//   const [formattedDate, setFormattedDate] = useState(""); // New state for formatted date
//   const [isError, setIsError] = useState(false); // Track errors

//   const timezone = weatherInfo[city]?.timezone || 0;
//   const dt = weatherInfo[city]?.dt || 'N/A';
//   const country = weatherInfo[city]?.sys?.country || 'N/A';
//   const value = weatherInfo[city]?.main?.humidity || 'N/A';

//   // Fetch weather data based on city
//   const fetchData = async (city) => {
//     try {
//       const response = await fetch(`${apiURL}?q=${city}&appid=${apiKey}`);
//       const data = await response.json();

//       if (response.ok) {
//         setWeatherInfo((prev) => ({
//           ...prev,
//           [city]: data,
//         }));
//         setIsError(false); // Reset error if data is fetched successfully
//       } else {
//         setIsError(true); // Set error if response is not okay
//       }
//     } catch (error) {
//       console.error("Error fetching the weather data:", error);
//       setIsError(true); // Set error on fetch failure
//     }
//   };

//   // Handle city change input
//   const handleChange = (event) => {
//     setCity(event.target.value);
//     setIsError(false); // Reset error on city change
//   };

//   // Handle city submit (fetch data for the entered city)
//   const handleClick = () => {
//     if (city.trim()) {
//       fetchData(city);
//     }
//   };

//   // Prevent form submission from refreshing the page
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     handleClick(); // Trigger data fetch on form submit
//   };

//   // Effect to calculate the day name based on the timestamp (dt)
//   useEffect(() => {
//     if (dt) {
//       const date = new Date(dt * 1000);
//       const day = date.toLocaleDateString("en-US", { weekday: "long" });
//       setDayName(day);
//     }
//   }, [dt]);

//   // Effect to calculate local time and formatted date based on timezone
//   useEffect(() => {
//     if (dt && timezone !== undefined) {
//       const date = new Date(dt * 1000);

//       let formattedTime;
//       let formattedDateStr;

//       if (country === "IN") {
//         formattedTime = date.toLocaleTimeString("en-IN", {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//           timeZone: "Asia/Kolkata",
//         });
//         formattedDateStr = date.toLocaleDateString("en-IN");
//       } else {
//         const localDate = new Date(date.getTime() + timezone * 1000);
//         formattedTime = localDate.toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         });
//         formattedDateStr = localDate.toLocaleDateString("en-US");
//       }

//       setLocalTime(formattedTime);
//       setFormattedDate(formattedDateStr); // Set formatted date
//     }
//   }, [dt, timezone, country]);

//   return (
//     <>
//       {isError ? (
//         <ErrorComponent />
//       ) : (
//         <div className="flex flex-wrap gap-10 m-10 justify-center items-center">
//           <TopLeft
//             country={country}
//             formattedDate={formattedDate} // Pass formatted date to TopLeft
//             weatherInfo={weatherInfo}
//             dt={dt}
//             city={city}
//             setCity={setCity}
//             dayName={dayName}
//             setWeatherInfo={setWeatherInfo}
//             handleChange={handleChange}
//             handleClick={handleClick}
//             handleSubmit={handleSubmit}
//             fetchData={fetchData}
//           />

//           <TopRight weatherInfo={weatherInfo} localTime={localTime} city={city} value={value} />
//           <BottomLeft city={city} />
//           <BottomRight city={city} />
//         </div>
//       )}
//     </>
//   );
// };

// export default Weather;
