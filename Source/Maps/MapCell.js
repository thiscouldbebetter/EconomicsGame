
function MapCell(terrainCode, emplacementCode, posInCells)
{
	this.terrainCode = terrainCode;
	this.emplacementCode = emplacementCode;
	this.posInCells = posInCells;
}

{
	MapCell.prototype.costToTraverse = function(map)
	{
		var returnValue = this.terrain(map).costToTraverse;

		var emplacement = this.emplacement(map);
		if (emplacement != null)
		{
			returnValue *= emplacement.costToTraverseMultiplier;
		}

		return returnValue;
	}

	MapCell.prototype.emplacement = function(map)
	{
		var emplacementDefn =
			map.emplacementDefns[this.emplacementCode];

		return emplacementDefn;
	}

	MapCell.prototype.terrain = function(map)
	{
		return map.terrains[this.terrainCode];
	}

	// drawable

	MapCell.prototype.draw = function(universe, world, display, map)
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
