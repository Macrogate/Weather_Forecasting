
const TopLeft = ({ weatherInfo, formattedDate, country, city, fetchData, dayName, dt, handleSubmit, handleChange, handleClick, setWeatherInfo, setCity }) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const apiKey = import.meta.env.VITE_API_KEY;

    return (

        <div>
            <div className="w-[45vw] h-[40vh] helo rounded-2xl">


                <div className='logo'>
                    <input
                        className='opacity-55 border-none text-black text-center rounded-lg focus:outline-none capitalize'
                        value={city}
                        onChange={handleChange}
                        type="text"
                        placeholder='Search for city'
                    />
                    <button className='opacity-75 text-black btn' onClick={handleClick}>
                        <lord-icon
                            src="https://cdn.lordicon.com/fkdzyfle.json"
                            trigger="hover"
                            style={{ width: "30px", height: "30px" }}></lord-icon>

                    </button>
                </div>
                <div className="h-[2px] w-full bg-[#790b0b8b] mb-3"></div>
                <div className="flex flex-col text-white justify-center items-center">
                    <p>{dayName} {formattedDate}</p>
                    <p className="text-lg font-medium">{city.toUpperCase()} {country}</p>
                </div>
                <div className="flex justify-around ">
                    <div className="">
                        <h1 className="text-[70px] text-white">{weatherInfo[city] ? weatherInfo[city].main?.temp + "°C" : 'N/A'}</h1>
                        <h2 className="text-lg text-white">{weatherInfo[city] ? "Feels like " + weatherInfo[city].main?.feels_like + "°" : 'N/A'}</h2>
                    </div>
                    <img className="relative bottom-8 w-48" src={"image/" + (weatherInfo[city]?.weather[0]?.main || "default") + ".png"} alt="img" />
                </div>
            </div>
        </div>
    )
}

export default TopLeft


