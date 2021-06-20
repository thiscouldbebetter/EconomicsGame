
class MapCell extends Entity2
{
	terrainCode: string;
	emplacementCode: string;
	posInCells: Coords;

	_locatable: Locatable;

	constructor
	(
		terrainCode: string, emplacementCode: string, posInCells: Coords
	)
	{
		super();
		this.terrainCode = terrainCode;
		this.emplacementCode = emplacementCode;
		this.posInCells = posInCells;
	}

	costToTraverse(map: MapOfCells): number
	{
		var returnValue = this.terrain(map).costToTraverse;

		var emplacement = this.emplacement(map);
		if (emplacement != null)
		{
			returnValue *= emplacement.costToTraverseMultiplier;
		}

		return returnValue;
	}

	emplacement(map: MapOfCells): MapEmplacementDefn
	{
		var emplacementDefn =
			map.emplacementDefnsByCode.get(this.emplacementCode);

		return emplacementDefn;
	}

	locatable(): Locatable
	{
		return this._locatable;
	}

	terrain(map: MapOfCells): MapTerrain
	{
		return map.terrainsByCode.get(this.terrainCode);
	}

	// drawable

	draw
	(
		universe: Universe, world: World2, display: Display, map: MapOfCells
	): void
	{
		this._locatable = map._locatable;
		var drawPos = this._locatable.loc.pos;

		drawPos.overwriteWith
		(
			this.posInCells
		).add
		(
			Coords.Instances().Halves
		).multiply
		(
			map.cellSizeInPixels
		);

		var terrain = this.terrain(map);
		var visual = terrain.visual;
		visual.draw(universe, world, null, this, display);

		var emplacement = this.emplacement(map);

		if (emplacement != null)
		{
			visual = emplacement.visual;
			visual.draw(universe, world, null, this, display);
		}
	}
}
