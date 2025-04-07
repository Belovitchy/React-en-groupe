import { useState } from "react";

function Cell({ isAlive, setIsAlive }) {
	//const [isAlive, setIsAlive] = useState(false);

	// isAlive ? carré noir : carré blanc

	// function HandleIsAlive() {
	// 	isAlive ? setIsAlive(false) : setIsAlive(true);
	// }

	return (
		<>
			{isAlive ? (
				<article
					onClick={() => setIsAlive(!isAlive)}
					className="h-5 w-5 border-1 bg-black"
				/>
			) : (
				<article
					onClick={() => setIsAlive(!isAlive)}
					className="h-5 w-5 border-1 bg-white"
				/>
			)}
		</>
	);
}

export default Cell;
