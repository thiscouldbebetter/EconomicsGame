
function Cursor(posInCells)
{
	this.posInCells = posInCells;
	this.entitySelected = null;
	this.entityToPlace = null;

	this.pos = new Coords();
}

{
	Cursor.prototype.activate = function(world, level)
	{
		if (this.entitySelected == null)
		{
			var entityAtCursor = level.entityAtPos
			(
				world, this.pos
			);
			this.entitySelected = entityAtCursor;
		}
		else if (this.entityToPlace != null)
		{
			var facility = this.entityToPlace;
			var facilityDefn = facility.defn(world);
			var owner = level.owner;
			var canBuild = owner.resourceHolder.hasResources
			(
				facilityDefn.resourcesToBuild
			);

			if (canBuild == true)
			{
				facility.posInCells = this.posInCells.clone();
				facility.initialize(world, level);
				level.facilities.push(facility);

				this.entityToPlace = null;
			}
		}
	}

	Cursor.prototype.cancel = function(world, level)
	{
		this.entitySelected = null;
	}

	Cursor.prototype.selectInDirection = function(world, level, direction)
	{
		var facilityDefns = Globals.Instance.world.facilityDefns;
	
		if (this.entityToPlace == null)
		{
			var facilityDefn = facilityDefns[0];
			var facility = new Facility
			(
				facilityDefn.name, 
				this.posInCells
			);
			this.entityToPlace = facility;
		}
		else
		{
			var facility = this.entityToPlace;
			var facilityDefn = facilityDefns[facility.defnName];
			var facilityDefnIndex = facilityDefns.indexOf(facilityDefn);
			facilityDefnIndex = NumberHelper.wrapValueToRangeMinMax
			(
				facilityDefnIndex + direction,
				0, facilityDefns.length
			);
			facility.defnName = facilityDefns[facilityDefnIndex].name;
		}

		this.entitySelected = this.entityToPlace;
	}


	Cursor.prototype.moveInDirection = function(level, direction)
	{
		this.posInCells.add
		(
			direction
		);
		level.map.boundsInCellsMinusOnes.trimCoords
		(
			this.posInCells
		);
	}

	// entity

	Cursor.prototype.initialize = function(world, level)
	{
		var mapCellSizeInPixels = level.map.cellSizeInPixels;

		this.pos.overwriteWith
		(
			this.posInCells
		).add
		(
			Coords.Instances.Halves
		).multiply
		(
			mapCellSizeInPixels
		);

		this.sizeInPixels = mapCellSizeInPixels.clone();

		this.visual = new VisualRectangle
		(
			this.sizeInPixels,
			null, // colorFill
			"Red" // colorBorder
		);
	}

	Cursor.prototype.updateForTimerTick = function(world, level)
	{
		var mapCellSizeInPixels = level.map.cellSizeInPixels;

		this.pos.overwriteWith
		(
			this.posInCells
		).add
		(
			Coords.Instances.Halves
		).multiply
		(
			level.map.cellSizeInPixels
		);
	}

	// drawable

	Cursor.prototype.drawToDisplay = function(display, world, level)
	{
		this.visual.drawToDisplayForDrawable(display, this);

		if (this.entitySelected != null)
		{
			var entitySelectedAsText = this.entitySelected.toString();
			var visual = new VisualText
			(
				entitySelectedAsText, 
				"LightGray"
			);
			var drawableDummy = display.drawableDummy;
			drawableDummy.pos.clear();
			visual.drawToDisplayForDrawable
			(
				level.paneStatus,
				drawableDummy
			);

			if (this.entityToPlace != null)
			{
				this.entityToPlace.pos.overwriteWith
				(
					this.pos
				);
				this.entityToPlace.drawToDisplay
				(
					display, world, level
				);
			}
		}
	}	
}
