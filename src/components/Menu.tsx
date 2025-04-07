import { useState } from "react";
import Damier from "../components/Damier";

function Menu() {
	const [size, setSize] = useState(2);

	//console.log(size);
	return (
		<>
			<nav>
				<p className="text-2xl">
					Taille du terrain: {size}x{size}
				</p>
				<input
					type="number"
					value={size}
					onChange={(e) => setSize(Number(e.target.value))}
					className="bg-amber-100 text-2xl w-12 ml-6"
				/>
			</nav>

			<Damier size={size} />
		</>
	);
}

export default Menu;
