/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

// const Forecast1 = ({ city, text, data }) => {
const Forecast1 = ({ city }) => {
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
            // console.log(weatherInfo);
            
        } catch (error) {
            console.error('Error fetching the weather data:', error);
        }
    };

    useEffect(() => {
        if (city) {
            fetchData(city); // Fetch data for the provided city when component loads
            
        }
    }, [city]);  // Add 'city' as a dependency to refetch when the city changes

    

    // Group weather data by date
    // const groupWeatherByDate = (weatherData) => {
    //     const grouped = {};
        
    //     weatherData.forEach(item => {
    //         const date = item.dt_txt.split(' ')[0]; // Extract date (YYYY-MM-DD)
    //         if (!grouped[date]) {
    //             grouped[date] = [];
    //         }
    //         grouped[date].push(item);
    //     });

    //     return grouped;
    // };

    // const groupedWeather = weatherInfo[city] && weatherInfo[city].list
    //     ? groupWeatherByDate(weatherInfo[city].list)
    //     : {};

    return (
        <div className="w-full text-white">
            <div className="text-center mb-5 relative top-2">
                <p className="font-medium flex justify-center uppercase text-center"></p>
            </div>
            <div className="h-[2px] w-full bg-[#790b0b8b] mb-6"></div>

            {/* {Object.keys(groupedWeather).length > 0 ? (
                <div className="flex flex-wrap justify-center">
                    {Object.keys(groupedWeather).map((date, index) => {
                        const dailyData = groupedWeather[date];
                        const maxTemp = Math.max(...dailyData.map(item => item.main.temp_max));
                        const weatherIcon = dailyData[0].weather[0].icon; // Use the first weather condition for the icon

                        return (
                            <div key={index} className="flex flex-col items-center mx-4 mb-5">
                                <p className="text-white">{date}</p>
                                <img className="w-16" src={"/image/" + (weatherInfo[city].list[index].weather[0].main || "default") + ".png"} alt="img" />

                                <p className="font-medium text-white">{maxTemp}°C</p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-row items-center justify-center">
                    <p>No data available</p>
                </div>
            )} */}
        </div>
    );
};

export default Forecast1;
