/* eslint-disable react/prop-types */


const Card = (props) => {
    return (
        <div className="round w-[16vw] text-white text-[18px] blur-[0.5px] backdrop-blur-3xl  h-[38px] border border-white flex justify-center items-center gap-4">

            <h2>{props.city}</h2>
            <img className="w-8" src={props.src} alt="img" />
            <h2>{props.temp} °C</h2>
        </div>
    )
}

export default Card
