
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
		var drawable = display.drawableDummy;

		this.Locatable = map._locatable;

		var drawPos =
			//drawable.pos;
			this.Locatable.loc.pos;

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
		visual.draw(universe, world, display, drawable, this);

		var emplacement = this.emplacement(map);

		if (emplacement != null)
		{
			visual = emplacement.visual;
			visual.draw(universe, world, display, drawable, this);
		}
	}
}
