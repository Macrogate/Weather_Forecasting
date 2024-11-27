// import Forecast from "./Forecast";

// const BottomLeft = ({ city }) => {
//   const data = [0, 1, 2, 3, 4];

//   return (
//     <div>
//           <div className="w-[45vw] h-[30vh] helo rounded-2xl">
//               <Forecast city={city} data={data} />
//           </div>
//     </div>
//   )
// }

// export default BottomLeft


import Forecast from "./Forecast";

const BottomLeft = ({ city }) => {
  // Example data structure that could be passed to the Forecast component
  const data = [0, 1, 2, 3, 4];

  return (
    <div>
      <div className="w-[45vw] h-[30vh] helo rounded-2xl">
        {/* Pass city and data to Forecast component */}
        <Forecast city={city} data={data} />
      </div>
    </div>
  );
};

export default BottomLeft;
