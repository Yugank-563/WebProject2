const LoadingSpinner = ({ size = "md" }) => {
	const sizeClass = size === "lg" ? "h-12 w-12" : size === "sm" ? "h-6 w-6" : "h-8 w-8";

	return (
		<div className={`flex justify-center items-center`}>
			<div className={`border-4 border-gray-300 border-t-black rounded-full animate-spin ${sizeClass}`}></div>
		</div>
	);
};

export default LoadingSpinner;
