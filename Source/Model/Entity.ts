
class Entity2 extends Entity
{
	posInCells: Coords;
	initialize2: (w: World, l: Level) => void;

	constructor()
	{
		super("", []);
	}

	drawToDisplay
	(
		u: Universe, w: World2, d: Display, l: Level
	): void
	{
		throw new Error("Must be implemented in subclass!");
	}
}
