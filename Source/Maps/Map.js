
function Map
(
	sizeInPixels, 
	terrains, 
	emplacementDefns, 
	cellTerrainsAsStrings, 
	cellEmplacementsAsStrings
)
{
	this.sizeInPixels = sizeInPixels;
	this.terrains = terrains.addLookups("code");
	this.emplacementDefns = emplacementDefns.addLookups("code");

	this.sizeInCells = new Coords
	(
		cellTerrainsAsStrings[0].length,
		cellTerrainsAsStrings.length
	);

	this.boundsInCellsMinusOnes = new Bounds
	(
		Coords.Instances.Zeroes,
		this.sizeInCells.clone().subtract
		(
			Coords.Instances.Ones
		)
	);

	this.cellSizeInPixels = this.sizeInPixels.clone().divide
	(
		this.sizeInCells
	);

	this.cells = [];
	var cellPos = new Coords();
	for (var y = 0; y < this.sizeInCells.y; y++)
	{
		cellPos.y = y;
		for (var x = 0; x < this.sizeInCells.x; x++)
		{
			cellPos.x = x;

			var cellTerrainCode = cellTerrainsAsStrings[y][x];
			var emplacementCode = cellEmplacementsAsStrings[y][x];

			var cell = new MapCell
			(
				cellTerrainCode, 
				emplacementCode, 
				cellPos.clone()
			);

			this.cells.push(cell);
		}
	}

	this.neighborOffsets = 
	[
		new Coords(1, 0),
		new Coords(0, 1),
		new Coords(-1, 0),
		new Coords(0, -1),

		new Coords(1, 1),
		new Coords(-1, 1),
		new Coords(-1, -1),
		new Coords(1, -1),
	];

	// helper variables

	this.cellPos = new Coords();
	this.drawPos = new Coords();
}

{
	Map.prototype.cellAtPosInCells = function(posInCells)
	{
		return this.cells[this.indexOfCellAtPosInCells(posInCells)];
	}

	Map.prototype.indexOfCellAtPosInCells = function(posInCells)
	{
		return posInCells.y * this.sizeInCells.x + posInCells.x;
	}

	// drawable

	Map.prototype.drawToDisplay = function(display)
	{
		var cellPos = this.cellPos;
		var drawPos = this.drawPos;

		for (var y = 0; y < this.sizeInCells.y; y++)
		{
			cellPos.y = y;

			for (var x = 0; x < this.sizeInCells.x; x++)
			{
				cellPos.x = x;

				var cell = this.cellAtPosInCells(cellPos);
				
				cell.drawToDisplay(display, this);
			}
		}
	}
}
