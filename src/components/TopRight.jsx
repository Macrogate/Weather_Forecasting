import Humidity from "./Humidity";

const TopRight = ({ weatherInfo, localTime, city, value }) => {
    const getWeatherData = (field) => weatherInfo[city] ? weatherInfo[city][field] : 'N/A';

    // Helper functions to get specific weather data with default 'N/A' fallback
    const getWindSpeed = () => getWeatherData('wind')?.speed || 'N/A';
    const getPressure = () => getWeatherData('main')?.pressure || 'N/A';
    const getVisibility = () => getWeatherData('visibility') || 'N/A';
    const getFeelsLike = () => getWeatherData('main')?.feels_like || 'N/A';

    // Convert Unix timestamp to readable time
    const formatTime = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div>
            <img src="/" alt="" />
            <div className="w-[45vw] h-[40vh] helo rounded-2xl">
                <div className="">
                    <h1 className="text-xl p-4 text-center">TODAY'S HIGHLIGHT</h1>
                    <p className="h-[1px] bg-slate-900"></p>

                    <div className="flex gap-10 h-[20vh] m-7">
                        {/* Wind Speed */}
                        <div className=" flex flex-col w-52">
                            <p className="mb-2 text-center">Wind Speed</p>
                            <hr className="mb-3" />
                            <div className="flex justify-center mb-3">
                                <img src="/image/wind.webp" alt="" className="transparent-gif" width={"80px"} />
                            </div>
                            <div className="flex justify-center">
                                <span className="text-2xl">{getWindSpeed()} <span className="text-sm">km/h</span></span>
                            </div>
                        </div>

                        {/* Sunrise and Sunset */}
                        <div className="w-72">
                            <p className="mb-2 text-center">Sunrise and Sunset</p>
                            <hr className="mb-3" />
                            <div className="flex justify-center">
                                <img src="/image/3.jpg" alt="" className="transparent-gif hell" width={"150px"} height={"80px"} />
                            </div>
                            <div className="flex justify-center items-center text-center">
                                <p>{formatTime(weatherInfo[city]?.sys?.sunrise)}</p>
                                <p>&nbsp;to&nbsp;</p>
                                <p>{formatTime(weatherInfo[city]?.sys?.sunset)}</p>
                            </div>
                        </div>

                        {/* Humidity */}
                        <div>
                            <p className="text-center mb-2">Humidity</p>
                            <hr />
                            <Humidity value={value} />
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default TopRight;
