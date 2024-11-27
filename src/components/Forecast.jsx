
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const Forecast = ({ city, text, data}) => {
    const apiURL = import.meta.env.VITE_API_URL1;
    const apiKey = import.meta.env.VITE_API_KEY;
    

    const [weatherInfo, setWeatherInfo] = useState({});

    const fetchData = async (city) => {
        if (!city) return; // Prevent fetching if city is empty
        try {
            const response = await fetch(apiURL + city + `&appid=${apiKey}`);
            const data = await response.json();
            setWeatherInfo((prev) => ({
                ...prev,
                [city]: data || {} // Store the full data for the city
            }));
        } catch (error) {
            console.error('Error fetching the weather data:', error);
        }
    };

    useEffect(() => {
        if (city) {
            fetchData(city); // Fetch data for the provided city when component loads
        }
    }, [city]);  // Add 'city' as a dependency to refetch when the city changes


    return (
        <div className="w-[45vw] text-white">
            <div className="text-center mb-5 relative top-2 ">
                <p className="font-medium flex justify-center uppercase text-center">3 Hour Step Forecast</p>
            </div>
            <div className="h-[2px] w-full bg-[#790b0b8b] mb-6"></div>

            {weatherInfo[city] && weatherInfo[city].list && weatherInfo[city].list.length > 0 ? <div className="flex flex-row items-center justify-around">
                {weatherInfo[city] && weatherInfo[city].list && weatherInfo[city].list.length > 0 ? (
                    data.map((item, index) => {
                        const time = weatherInfo[city].list[item].dt_txt.split(' ')[1].slice(0, 5); // Get HH:MM
                        const [hours, minutes] = time.split(':'); // Split into hours and minutes
                        const hour = parseInt(hours, 10); // Convert hours to a number
                        const formattedHour = hour % 12 || 12; // Convert to 12-hour format
                        const period = hour >= 12 ? 'PM' : 'AM'; // Determine AM/PM

                        return (
                            <div key={index} className="flex flex-col items-center justify-center">
                                <p className="text-white">Time: {formattedHour}:{minutes} {period}</p>
                                <img className="w-16" src={"/image/" + (weatherInfo[city].list[item].weather[0].main || "default") + ".png"} alt="img" />
                                <p className="font-medium text-white">{weatherInfo[city].list[item].main.temp_max}°C</p>
                            </div>
                        );
                    })
                ) : (
                    <p>N/A</p>
                )}
            </div> :
                <div className="flex flex-col items-center justify-center">
                    <p>
                        {weatherInfo[city] && weatherInfo[city].list && weatherInfo[city].list.length > 0 ? (() => {
                            const time = weatherInfo[city].list[0].dt_txt.split(' ')[1].slice(0, 5); // Get HH:MM
                            const [hours, minutes] = time.split(':'); // Split into hours and minutes
                            const hour = parseInt(hours, 10); // Convert hours to a number
                            const formattedHour = hour % 12 || 12; // Convert to 12-hour format, handle edge cases for 12 AM/PM
                            const period = hour >= 12 ? 'PM' : 'AM'; // Determine AM/PM
                            return `Time: ${formattedHour}:${minutes} ${period}`; // Return the formatted time with AM/PM
                        })() : 'N/A'}
                    </p>
                    <img className="w-12 my-1" src="https://openweathermap.org/img/wn/01d@2x.png" alt="weather" />
                    <p className="font-medium">{weatherInfo[city] && weatherInfo[city].list && weatherInfo[city].list.length > 0
                        ? + weatherInfo[city].list[0].main.temp_max + "°C"
                        : 'N/A'}</p>
                </div>
            }
        </div>
    );
};

export default Forecast;
