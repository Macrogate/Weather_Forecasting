// import Forecast1 from './Forecast1';
// import WeatherForecast from './WeatherForecast'
// import { useState, useEffect } from 'react';

// const BottomRight = ({ city }) => {

//     const apiURL = import.meta.env.VITE_API_URL1;
//     const apiKey = import.meta.env.VITE_API_KEY;

//     const [weatherInfo, setWeatherInfo] = useState({});

//     const fetchData = async (city) => {
//         if (!city) return; // Prevent fetching if city is empty
//         try {
//             const response = await fetch(apiURL + city + `&appid=${apiKey}`);
//             const data = await response.json();
//             setWeatherInfo((prev) => ({
//                 ...prev, kya
//                 [city]: data || {} // Store the full data for the city
//             }));
//             console.log(weatherInfo);
            
//         } catch (error) {
//             console.error('Error fetching the weather data:', error);
//         }
//     };

//     useEffect(() => {
//         if (city) {
//             fetchData(city); // Fetch data for the provided city when component loads
//         }
//     }, [city]);
    
//     let minFir = weatherInfo[city] && weatherInfo[city].list[2]?.main?.temp_min || 10; 
//     let maxFir = weatherInfo[city] && weatherInfo[city].list[2]?.main?.temp_max || 13;
    
//     let minSec = weatherInfo[city] && weatherInfo[city].list[11]?.main?.temp_min || 10;
//     let maxSec = weatherInfo[city] && weatherInfo[city].list[11]?.main?.temp_max || 13;
    
//     let minThi = weatherInfo[city] && weatherInfo[city].list[21]?.main?.temp_min || 10;
//     let maxThi = weatherInfo[city] && weatherInfo[city].list[21]?.main?.temp_max || 13;
    
//     let minfor = weatherInfo[city] && weatherInfo[city].list[31]?.main?.temp_min || 10;
//     let maxfor = weatherInfo[city] && weatherInfo[city].list[31]?.main?.temp_max || 13;
    
//     let minfit = weatherInfo[city] && weatherInfo[city].list[35]?.main?.temp_min || 10;
//     let maxfit = weatherInfo[city] && weatherInfo[city].list[35]?.main?.temp_max || 13;
    
//     let minArr = [minFir, minSec, minThi, minfor, minfit]
//     let maxArr = [maxFir, maxSec, maxThi, maxfor, maxfit]
//     console.log(minArr + " kn");
//     console.log(maxArr + " knzx");
    
//     return (

//         <div>
//             <div className="w-[45vw] h-[30vh] helo rounded-2xl">
//                 <WeatherForecast minArr={minArr} maxArr={maxArr}/>
//                 <Forecast1 city={city}/>
//             </div>

//         </div>
//     )
// }

// export default BottomRight



import Forecast1 from './Forecast1';
import WeatherForecast from './WeatherForecast';
import { useState, useEffect } from 'react';

const BottomRight = ({ city }) => {
    const apiURL = import.meta.env.VITE_API_URL1;
    const apiKey = import.meta.env.VITE_API_KEY;

    const [weatherInfo, setWeatherInfo] = useState({});
    
    // Fetch weather data for the city
    const fetchData = async (city) => {
        if (!city) return; // Prevent fetching if city is empty
        try {
            const response = await fetch(`${apiURL}${city}&appid=${apiKey}`);
            const data = await response.json();
            setWeatherInfo((prev) => ({
                ...prev,
                [city]: data || {}, // Store the full data for the city
            }));
        } catch (error) {
            console.error('Error fetching the weather data:', error);
        }
    };

    useEffect(() => {
        if (city) {
            fetchData(city); // Fetch data for the provided city when component loads
        }
    }, [city]);

    // Helper function to safely extract temperatures
    const getTemperature = (list, index, type = 'min') => {
        return list && list[index] && list[index].main
            ? list[index].main[`temp_${type}`]
            : 10; // Default value if missing
    };

    // Ensure the 'list' array exists and has enough data
    const cityData = weatherInfo[city] || {};
    const list = cityData.list || [];

    // Extract temperatures safely
    let minFir = getTemperature(list, 0, 'min');
    let maxFir = getTemperature(list, 4, 'max');
    
    let minSec = getTemperature(list, 5, 'min');
    let maxSec = getTemperature(list, 10, 'max');
    
    let minThi = getTemperature(list, 11, 'min');
    let maxThi = getTemperature(list, 21, 'max');
    
    let minfor = getTemperature(list, 24, 'min');
    let maxfor = getTemperature(list, 29, 'max');
    
    let minfit = getTemperature(list, 32, 'min');
    let maxfit = getTemperature(list, 37, 'max');
    
    // Create arrays for min and max temperatures
    let minArr = [minFir, minSec, minThi, minfor, minfit];
    let maxArr = [maxFir, maxSec, maxThi, maxfor, maxfit];

    // Optional: Log the temperature arrays to check values
    // console.log(minArr, 'min temperatures');
    // console.log(maxArr, 'max temperatures');

    return (
        <div>
            <div className="w-[45vw] h-[30vh] helo rounded-2xl">
                <WeatherForecast minArr={minArr} maxArr={maxArr} />
                <Forecast1 city={city} />
            </div>
        </div>
    );
};

export default BottomRight;
