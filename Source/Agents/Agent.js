
function Agent(defnName, posInCells)
{
	this.defnName = defnName;
	this.posInCells = posInCells;

	this.pos = new Coords();
	this.resourceHolder = new ResourceHolder();
	this.facilityHome = null;
	this.facilityWork = null;
}

{
	Agent.prototype.approach = function
	(
		world, level, entityGoal
	)
	{
		var isAtGoal = false;

		var goalPosInCells = entityGoal.posInCells;
		var displacementToGoal = goalPosInCells.clone().subtract
		(
			this.posInCells
		);
		var distanceToGoal = displacementToGoal.magnitude();
		var moveSpeedPerTick = .1;

		if (distanceToGoal < moveSpeedPerTick)
		{
			this.posInCells.overwriteWith(goalPosInCells);
			
			isAtGoal = true;
		}
		else
		{
			/*
			var directionToGoal = displacementToGoal.clone().divideScalar
			(
				distanceToGoal
			);

			var moveTowardGoal = directionToGoal.clone().multiplyScalar
			(
				moveSpeedPerTick
			);
			*/

			var path = new Path
			(
				level.map, 
				this.posInCells.clone().floor(), // startPos
				goalPosInCells
			); 

			path.calculate();
		
			var directionToGoal;

			if (path.nodes.length < 2)
			{
				directionToGoal = displacementToGoal.clone().divideScalar
				(
					distanceToGoal
				)
			}
			else
			{
				var pathNode1 = path.nodes[1];

				directionToGoal = pathNode1.cellPos.clone().subtract
				(
					path.startPos
				).normalize();
			}

			var moveTowardGoal = directionToGoal.clone().multiplyScalar
			(
				moveSpeedPerTick
			);

			this.posInCells.add(moveTowardGoal);
		}

		return isAtGoal;
	}

	Agent.prototype.defn = function(world)
	{
		return world.agentDefns[this.defnName];
	}

	Agent.prototype.initialize = function(world, level)
	{
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

	Agent.prototype.updateForTimerTick = function(world, level)
	{
		if (this.facilityHome == null)
		{
			this.facilityHome = this.updateForTimerTick_FacilityChoose
			(
				level, 
				true // findHome
			);
		}
	
		if (this.facilityWork == null)
		{
			this.facilityWork = this.updateForTimerTick_FacilityChoose
			(
				level,
				false // findHome
			);
		}

		var secondsSinceSunrise = 
			level.secondsSinceStarted() 
			% world.diurnalPeriodInSeconds;
		
		var fractionOfDiurnCompleted = 
			secondsSinceSunrise / world.diurnalPeriodInSeconds;
		
		if (fractionOfDiurnCompleted < .4)
		{
			// work
		
			if (this.facilityWork != null)
			{
				this.facilityWork.agentDirect(world, level, this);
			}
		}
		else if (fractionOfDiurnCompleted < .6)
		{
			// shop

			if (this.facilityHome != null)
			{
				var facilityMarketplace = level.facilities["Marketplace"][0];
				this.facilityHome.agentDirect(world, level, this);
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
			Coords.Instances.Halves
		).multiply
		(
			level.map.cellSizeInPixels
		);			
	}

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
	}

	// drawable

	Agent.prototype.drawToDisplay = function(display, world, level)
	{
		this.defn(world).visual.drawToDisplayForDrawable
		(
			display, this
		);
	}

	// strings

	Agent.prototype.toString = function()
	{
		var newline = "\n";

		var returnValue = 
			this.defnName + newline
			+ this.resourceHolder.toString();
		
		return returnValue;
	}
}
