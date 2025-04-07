import { useState } from "react";
import Dammier from "../components/Dammier";

function Menu() {
	const [size, setSize] = useState(2);

	console.log(size);
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

			<Dammier size={size} />
		</>
	);
}

export default Menu;
