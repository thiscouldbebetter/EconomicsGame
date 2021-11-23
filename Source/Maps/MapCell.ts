
class MapCell2 extends Entity2
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

	costToTraverse(map: MapOfCells2): number
	{
		var returnValue = this.terrain(map).costToTraverse;

		var emplacement = this.emplacement(map);
		if (emplacement != null)
		{
			returnValue *= emplacement.costToTraverseMultiplier;
		}

		return returnValue;
	}

	emplacement(map: MapOfCells2): MapEmplacementDefn
	{
		var emplacementDefn =
			map.emplacementDefnsByCode.get(this.emplacementCode);

		return emplacementDefn;
	}

	locatable(): Locatable
	{
		return this._locatable;
	}

	terrain(map: MapOfCells2): MapTerrain
	{
		return map.terrainsByCode.get(this.terrainCode);
	}

	// drawable

	draw
	(
		universe: Universe, world: World2, display: Display, map: MapOfCells2
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
		var uwpe = new UniverseWorldPlaceEntities
		(
			universe, world, null, this, null
		);
		visual.draw(uwpe, display);

		var emplacement = this.emplacement(map);

		if (emplacement != null)
		{
			visual = emplacement.visual;
			visual.draw(uwpe, display);
		}
	}
}
