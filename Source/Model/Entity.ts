
class Entity2 extends Entity
{
	posInCells: Coords;
	drawToDisplay: (u: Universe, w: World2, d: Display, l: Level) => void
	initialize2: (w: World, l: Level) => void;

	constructor()
	{
		super("", []);
	}
}
