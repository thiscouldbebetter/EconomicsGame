
class Cursor
{
	constructor(posInCells)
	{
		this.posInCells = posInCells;
		this.entitySelected = null;
		this.entityToPlace = null;

		this.pos = new Coords();
		var loc = new Location(this.pos);
		this.locatable = new Locatable(loc);
	}

	activate(world, level)
	{
		if (this.entityToPlace != null)
		{
			var facility = this.entityToPlace;
			var facilityDefn = facility.defn(world);
			var owner = level.owner;
			var canBuild = owner.resourceHolder.hasResources
			(
				facilityDefn.resourcesToBuild
			);

			if (canBuild)
			{
				facility.posInCells = this.posInCells.clone();
				facility.initialize(world, level);
				level.facilities.push(facility);

				this.entityToPlace = null;
			}
		}
		else
		{
			var entitiesAtPos = level.entitiesAtPos
			(
				world, this.pos, []
			);

			for (var i = 0; i < entitiesAtPos.length; i++)
			{
				var entityAtPos = entitiesAtPos[i];
				if (entityAtPos != this.entitySelected)
				{
					this.entitySelected = entityAtPos;
					break;
				}
			}
		}
	}

	cancel(world, level)
	{
		this.entitySelected = null;
	}

	selectInDirection(world, level, direction)
	{
		var facilityDefns = Globals.Instance.world.facilityDefns;

		if (this.entityToPlace == null)
		{
			var facilityDefn = facilityDefns[0];
			var facility = new Facility
			(
				facilityDefn.name,
				this.posInCells.clone()
			);
			this.entityToPlace = facility;
		}
		else
		{
			var facility = this.entityToPlace;
			var facilityDefn = facilityDefns[facility.defnName];
			var facilityDefnIndex = facilityDefns.indexOf(facilityDefn);
			facilityDefnIndex = 
			(
				facilityDefnIndex + direction
			).wrapToRangeMax
			(
				facilityDefns.length - 1
			);
			facility.defnName = facilityDefns[facilityDefnIndex].name;
		}

		this.entitySelected = this.entityToPlace;
	}


	moveInDirection(level, direction)
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

	initialize(world, level)
	{
		var mapCellSizeInPixels = level.map.cellSizeInPixels;

		this.pos.overwriteWith
		(
			this.posInCells
		).add
		(
			Coords.Instances().Halves
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

	updateForTimerTick(world, level)
	{
		var mapCellSizeInPixels = level.map.cellSizeInPixels;

		this.pos.overwriteWith
		(
			this.posInCells
		).add
		(
			Coords.Instances().Halves
		).multiply
		(
			level.map.cellSizeInPixels
		);
	}

	// drawable

	draw(universe, world, display, level)
	{
		this.visual.draw(universe, world, display, this);

		var textColor = "Gray";
		var timeAsString = level.timeOfDay(world);
		var visual = new VisualText("Time: " + timeAsString, textColor);
		visual = new VisualAnchor(visual, new Coords(0, 0));
		visual.draw(universe, world, level.paneStatus, this);

		var selectionAsText = "[none]";

		if (this.entitySelected != null)
		{
			selectionAsText = this.entitySelected.toString();

			if (this.entityToPlace != null)
			{
				this.entityToPlace.pos.overwriteWith
				(
					this.pos
				);
				this.entityToPlace.drawToDisplay
				(
					universe, world, display, level
				);
			}
		}

		visual.child._text = "Selected:\n" + selectionAsText;
		visual.draw(universe, world, level.paneSelection, this);
	}
}
