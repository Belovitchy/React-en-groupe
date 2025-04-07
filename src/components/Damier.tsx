import Cell from "../components/Cell";
import { useState, useEffect } from "react";

function Damier({ size }: { size: number }) {
	const sectionStyle = {
		height: `${20 * size}px`,
		width: `${20 * size}px`,
	};

	const [cellsState, setCellsState] = useState(() => createEmptyDamier());
	const [isPlaying, setIsPlaying] = useState(false);

	// Initialisation au chargement de la page - Crée un tableau à deux dimensions de tous les états de celulle et les initialise à faux
	function createEmptyDamier() {
		const initialGrid = [];

		for (let x = 0; x < size; x++) {
			const row = [];

			for (let y = 0; y < size; y++) {
				row.push(false); // chaque cellule est initialisée à "morte"
			}

			initialGrid.push(row);
		}

		return initialGrid;
	}

	// Update le tableau d'état en taille, si cette dernière a changé (createEmpty Damier à externaliser pour éviter les erreur Biome mais osef)
	useEffect(() => {
		setCellsState(createEmptyDamier());
	}, [size]);

	// Update l'état d'une cellule x, y : ne sert qu'à transmettre l'info au composant pour gérer le clic souris initial
	const toggleCell = (x, y, newState) => {
		const updated = [];

		// Va chercher l'état de cellule i, j qui correspond au x, y demandé en paramètre
		for (let i = 0; i < cellsState.length; i++) {
			const row = [];

			for (let j = 0; j < cellsState[i].length; j++) {
				if (i === x && j === y) {
					row.push(newState); // on change l'état de la cellule ciblée
				} else {
					row.push(cellsState[i][j]); // on garde les autres inchangées
				}
			}

			updated.push(row);
		}

		setCellsState(updated);
	};

	// FONCTION MISE A JOUR DU TABLEAU DANS LE TEMPS ------------- à mettre dans une boucle temporelle !!!!!!!!!!!!!!!
	function NextGeneration() {
		//Initialise le tableau de la nouvelle génération
		const next = [];

		// Boucle qui parcourt toutes les cellules dans le tableau d'état
		for (let x = 0; x < cellsState.length; x++) {
			const row = [];

			for (let y = 0; y < cellsState[x].length; y++) {
				let nbVoisinsVivants = 0;

				// Parcours les voisins autour de la cellule en question
				for (let dx = -1; dx <= 1; dx++) {
					for (let dy = -1; dy <= 1; dy++) {
						if (dx === 0 && dy === 0) continue;

						const nx = x + dx;
						const ny = y + dy;

						// Vérifie que le voisin est bien dans le tableau (quand on arrive au bord)
						if (
							nx >= 0 &&
							nx < cellsState.length &&
							ny >= 0 &&
							ny < cellsState[0].length
						) {
							if (cellsState[nx][ny] === true) {
								nbVoisinsVivants++;
							}
						}
					}
				}

				const cell = cellsState[x][y];

				// Détermine comment devrait être la nouvelle celule, selon les règles du jeu de la vie

				// Toute cellule vivante avec deux ou trois voisines vivantes vit sur la prochaine génération.
				if (cell && (nbVoisinsVivants === 2 || nbVoisinsVivants === 3)) {
					row.push(true);
				}

				// Toute cellule morte avec exactement trois voisines vivantes devient une cellule vivante, comme si elle se reproduisait.
				else if (cell === false && nbVoisinsVivants === 3) {
					row.push(true);
				}

				// Dans tous les autres cas, elle est morte
				else {
					row.push(false);
				}
			}

			next.push(row);
		}

		setCellsState(next);
	}

	// Boucle temporelle

	function HandleIsPlaying() {
		setIsPlaying(true);
	}

	// Affichage des cellules
	return (
		<>
			<button
				className="border-1 border-amber-950"
				type="button"
				onClick={NextGeneration}
			>
				⏩​ Next Generation
			</button>
			<button
				className="border-1 border-amber-950"
				type="button"
				onClick={HandleIsPlaying}
			>
				▶️​ Autoplay
			</button>
			<section style={sectionStyle} className="flex flex-wrap m-auto">
				{cellsState.map((row, x) =>
					row.map((isAlive, y) => (
						<Cell
							key={`${x}-${y}`}
							isAlive={isAlive}
							setIsAlive={(newState) => toggleCell(x, y, newState)}
						/>
					)),
				)}
			</section>
		</>
	);
}

export default Damier;
