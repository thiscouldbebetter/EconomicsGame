
function Agent(name, defnName, posInCells)
{
	this.name = name;
	this.defnName = defnName;
	this.posInCells = posInCells;

	this.pos = new Coords();
	var loc = new Location(this.pos);
	this.locatable = new Locatable(loc);
	this.drawable = {};

	this.resourceHolder = new ResourceHolder();
	this.facilityHome = null;
	this.facilityWork = null;

	this._displacementToGoal = new Coords();
}

{
	Agent.prototype.approach = function
	(
		world, level, entityGoal
	)
	{
		var isAtGoal = false;

		var goalPosInCells = entityGoal.posInCells;
		var displacementToGoal = this._displacementToGoal.overwriteWith
		(
			goalPosInCells
		).subtract
		(
			this.posInCells
		);
		var distanceToGoal = displacementToGoal.magnitude();
		var moveSpeedPerTick = .2;

		if (distanceToGoal < moveSpeedPerTick)
		{
			this.posInCells.overwriteWith(goalPosInCells);

			isAtGoal = true;
		}
		else
		{
			var path = new PathAgent
			(
				level.map,
				this.posInCells.clone().floor(), // startPos
				goalPosInCells
			);

			path.calculate();

			var directionToGoal;
			var forward = this.locatable.loc.orientation.forward;

			if (path.nodes.length < 2)
			{
				directionToGoal = displacementToGoal.clone().divideScalar
				(
					distanceToGoal
				);
				forward.overwriteWith(Coords.Instances().Zeroes);
			}
			else
			{
				var pathNode1 = path.nodes[1];

				directionToGoal = pathNode1.cellPos.clone().subtract
				(
					path.startPos
				).normalize();

				forward.overwriteWith(directionToGoal);
			}

			var moveTowardGoal = directionToGoal.clone().multiplyScalar
			(
				moveSpeedPerTick
			);

			this.posInCells.add(moveTowardGoal);
		}

		return isAtGoal;
	};

	Agent.prototype.defn = function(world)
	{
		return world.agentDefns[this.defnName];
	};

	Agent.prototype.initialize = function(world, level)
	{
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
	};

	Agent.prototype.updateForTimerTick = function(world, level)
	{
		if (this.facilityHome == null)
		{
			this.facilityHome = this.updateForTimerTick_FacilityChoose
			(
				level, true // findHome
			);
		}

		if (this.facilityWork == null)
		{
			this.facilityWork = this.updateForTimerTick_FacilityChoose
			(
				level, false // findHome
			);
		}

		var fractionOfDayNightCycleCompleted = level.fractionOfDayNightCycleCompleted(world);

		if (fractionOfDayNightCycleCompleted < .4)
		{
			// work

			if (this.facilityWork != null)
			{
				this.facilityWork.agentDirect(world, level, this);
			}
		}
		else if (fractionOfDayNightCycleCompleted < .6)
		{
			// shop

			if (this.facilityHome != null)
			{
				var facilityMarketplace = level.facilities["Marketplace"][0];
				facilityMarketplace.agentDirect(world, level, this);
			}
		}
		else
		{
			// home

			if (this.facilityHome != null)
			{
				this.facilityHome.agentDirect(world, level, this);
			}
		}

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
	};

	Agent.prototype.updateForTimerTick_FacilityChoose = function(level, findHome)
	{
		var returnValue = null;

		var facilities = level.facilities;
		for (var i = 0; i < facilities.length; i++)
		{
			var facility = facilities[i];
			var facilityIsHouse = (facility.defnName == "House");
			if
			(
				facility.agentAssigned == null
				&& findHome == facilityIsHouse
			)
			{
				returnValue = facility;
				returnValue.agentAssigned = this;
				break;
			}
		}

		return returnValue;
	};

	// drawable

	Agent.prototype.draw = function(universe, world, display, level)
	{
		var visual = this.defn(world).visual;
		visual.draw(universe, world, display, this);
	};

	// strings

	Agent.prototype.toString = function()
	{
		var newline = "\n";

		var returnValue =
			this.name + newline
			+ this.defnName + newline
			+ this.resourceHolder.toString();

		return returnValue;
	};
}
