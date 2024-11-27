import { useEffect, useState } from 'react';
import './Navbar.css';
import Card from './Card';

const apiURL = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const Navbar = () => {
    const [weatherInfo, setWeatherInfo] = useState({});

    const fetchData = async (city) => {
        if (!city) return;
        try {
            const response = await fetch(apiURL + city + `&appid=${apiKey}`);
            const data = await response.json();
            setWeatherInfo((prev) => ({
                ...prev,
                [city]: data
            }));
        } catch (error) {
            alert('Error fetching the weather data: ' + error.message);
        }
    };

    const arr = ["Delhi", "New York", "London", "Berlin"];

    const fetchAllData = async () => {
        for (const city of arr) {
            await fetchData(city);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    return (
        <div>
            <header className="header">
                <h1 className='text-red-600 text-3xl hovtext cursor-pointer'>Weather App</h1>
                <i className='bx bx-menu' id="menu-icon"></i>
                <nav className="navbar flex gap-6">
                    {arr.map((city) => {
                        const cityWeather = weatherInfo[city];
                        const weatherMain = cityWeather?.weather ? cityWeather.weather[0]?.main : "default";
                        const temperature = cityWeather?.main ? cityWeather.main.temp : 'N/A';

                        return (
                            <Card
                                key={city}
                                city={city}
                                src={`image/${weatherMain}.png`}
                                temp={temperature}
                            />
                        );
                    })}
                </nav>
            </header>
        </div>
    );
};

export default Navbar;

