
function Level(name, map, owner, facilities, agents)
{
	this.name = name;
	this.map = map;
	this.owner = owner;
	this.facilities = facilities.addLookupLists("defnName");
	this.agents = agents;

	this.cursor = new Cursor(this.map.sizeInCells.clone().divideScalar(2));

	this.actionToInputsMappings =
	[
		new ActionToInputsMapping("MoveDown", "ArrowDown"),
		new ActionToInputsMapping("MoveLeft", "ArrowLeft"),
		new ActionToInputsMapping("MoveRight", "ArrowRight"),
		new ActionToInputsMapping("MoveUp", "ArrowUp"),
		new ActionToInputsMapping("Activate", "Enter"),
		new ActionToInputsMapping("Cancel", "Escape"),
		new ActionToInputsMapping("SelectPrevious", "["),
		new ActionToInputsMapping("SelectNext", "]"),
	].addLookups(x => x.inputNames);
}

{
	Level.prototype.entitiesAtPos = function(world, posToCheck, listToAddTo)
	{
		var returnValue = null;

		var posToCheckInCells = posToCheck.clone().divide
		(
			this.map.cellSizeInPixels
		).floor();

		var entitySets =
		[
			this.facilities, this.agents
		];

		var entityPosInCells = new Coords();

		for (var s = 0; s < entitySets.length; s++)
		{
			var entitiesInSet = entitySets[s];
			for (var e = 0; e < entitiesInSet.length; e++)
			{
				var entity = entitiesInSet[e];

				entityPosInCells.overwriteWith
				(
					entity.posInCells
				).floor();

				if (entityPosInCells.equals(posToCheckInCells) == true)
				{
					listToAddTo.push(entity);
				}
			}
		}

		return listToAddTo;
	}

	Level.prototype.fractionOfDayNightCycleCompleted = function(world)
	{
		var secondsSinceSunrise =
			this.secondsSinceStarted()
			% world.dayNightCyclePeriodInSeconds;

		var returnValue =
			secondsSinceSunrise / world.dayNightCyclePeriodInSeconds;

		return returnValue;
	}

	Level.prototype.initialize = function(world)
	{
		for (var i = 0; i < this.facilities.length; i++)
		{
			var facility = this.facilities[i];
			facility.initialize(world, this);
		}

		for (var i = 0; i < this.agents.length; i++)
		{
			var agent = this.agents[i];
			agent.initialize(world, this);
		}

		this.cursor.initialize(world, this);

		// hack
		this.cursor.entitySelected = this.agents[0];

		this.paneMap = new Pane
		(
			Coords.Instances().Zeroes,
			this.map.sizeInPixels
		);

		this.paneStatus = new Pane
		(
			new Coords(this.map.sizeInPixels.x, 0),
			new Coords
			(
				this.map.sizeInPixels.x / 3,
				this.map.sizeInPixels.y / 2
			)
		);

		this.paneSelection = new Pane
		(
			new Coords(this.map.sizeInPixels.x, this.map.sizeInPixels.y / 2),
			new Coords
			(
				this.map.sizeInPixels.x / 3,
				this.map.sizeInPixels.y / 2
			)
		);

		this.ticksSinceStarted = 0;
	}

	Level.prototype.secondsSinceStarted = function()
	{
		var secondsSinceStarted =
			this.ticksSinceStarted
			/ Globals.Instance.timerTicksPerSecond;

		return secondsSinceStarted;
	}

	Level.prototype.timeOfDay = function(world)
	{
		var timeAsFraction = this.fractionOfDayNightCycleCompleted(world);
		var hoursPerDay = 24;
		var hoursFullSinceSunrise = Math.floor(timeAsFraction * hoursPerDay);

		var timeHours = hoursFullSinceSunrise += 6;
		if (timeHours >= hoursPerDay)
		{
			timeHours -= hoursPerDay;
		}

		var minutesPerHour = 60;
		var minutesPerDay = minutesPerHour * hoursPerDay;
		var minutesFullSinceSunrise = Math.floor(timeAsFraction * minutesPerDay);
		var minutesSinceStartOfHour = minutesFullSinceSunrise % minutesPerHour;

		var timeMinutes = ("" + minutesSinceStartOfHour).padStart(2, "0");

		var returnValue = timeHours + ":" + timeMinutes;

		return returnValue;
	};

	Level.prototype.updateForTimerTick = function(world)
	{
		this.draw(null, world, Globals.Instance.display);

		this.updateForTimerTick_1_Input(world);

		this.updateForTimerTick_2_Entities(world);

		this.ticksSinceStarted++;
	};

	Level.prototype.updateForTimerTick_1_Input = function(world)
	{
		var inputHelper = Globals.Instance.inputHelper;
		var mappings = this.actionToInputsMappings;
		var actions = world.actions;

		var actionsFromInput = inputHelper.actionsFromInput(actions, mappings);
		for (var i = 0; i < actionsFromInput.length; i++)
		{
			var action = actionsFromInput[i];
			action.perform(world, this);
		}
	};

	Level.prototype.updateForTimerTick_2_Entities = function(world)
	{
		for (var i = 0; i < this.facilities.length; i++)
		{
			var facility = this.facilities[i];
			facility.updateForTimerTick(world, this);
		}

		for (var i = 0; i < this.agents.length; i++)
		{
			var agent = this.agents[i];
			agent.updateForTimerTick(world, this);
		}

		this.cursor.updateForTimerTick(world, this);
	};

	// drawable

	Level.prototype.draw = function(universe, world, display)
	{
		display.clear();

		this.map.draw(universe, world, this.paneMap, this);

		for (var i = 0; i < this.facilities.length; i++)
		{
			var facility = this.facilities[i];
			facility.draw(universe, world, this.paneMap, this);
		}

		for (var i = 0; i < this.agents.length; i++)
		{
			var agent = this.agents[i];
			agent.draw(universe, world, this.paneMap, this);
		}

		this.cursor.draw(universe, world, this.paneMap, this);
	}
}
