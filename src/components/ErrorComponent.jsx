const ErrorComponent = () => (
    <div className="w-full flex justify-center items-center h-full">
        <div className="h-[40vh] bg-red-200 w-[40vw] h rounded-2xl flex items-center justify-center">
        <h2 className="text-xl text-center text-red-800">City not found. Please enter a valid city name.</h2>
    </div>
    </div>
);

export default ErrorComponent;
