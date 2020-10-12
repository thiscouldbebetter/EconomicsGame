
class MapCell
{
	constructor(terrainCode, emplacementCode, posInCells)
	{
		this.terrainCode = terrainCode;
		this.emplacementCode = emplacementCode;
		this.posInCells = posInCells;
	}

	costToTraverse(map)
	{
		var returnValue = this.terrain(map).costToTraverse;

		var emplacement = this.emplacement(map);
		if (emplacement != null)
		{
			returnValue *= emplacement.costToTraverseMultiplier;
		}

		return returnValue;
	}

	emplacement(map)
	{
		var emplacementDefn =
			map.emplacementDefns[this.emplacementCode];

		return emplacementDefn;
	}

	terrain(map)
	{
		return map.terrains[this.terrainCode];
	}

	// drawable

	draw(universe, world, display, map)
	{
		this.locatable = map._locatable;
		var drawPos = this.locatable.loc.pos;

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

		var visual = this.terrain(map).visual;
		visual.draw(universe, world, display, this);

		var emplacement = this.emplacement(map);

		if (emplacement != null)
		{
			visual = emplacement.visual;
			visual.draw(universe, world, display, this);
		}
	}
}
