
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

	MapCell.prototype.drawToDisplay = function(display, map)
	{
		var drawableDummy = display.drawableDummy;

		var drawPos = drawableDummy.pos;
			
		drawPos.overwriteWith
		(
			this.posInCells
		).add
		(
			Coords.Instances.Halves
		).multiply
		(
			map.cellSizeInPixels
		);

		this.terrain(map).visual.drawToDisplayForDrawable
		(
			display,
			drawableDummy
		);

		var emplacement = this.emplacement(map);

		if (emplacement != null)
		{
			emplacement.visual.drawToDisplayForDrawable
			(
				display,
				drawableDummy
			);
		}
	}
}
