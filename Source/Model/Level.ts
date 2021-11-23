
class Level extends Place
{
	name: string;
	map: MapOfCells2;
	owner: Owner;
	facilities: Facility[];
	agents: Agent[];

	facilitiesListsByDefnName: Map<string, Facility[]>;
	cursor: Cursor;
	actionToInputsMappings: ActionToInputsMapping[];
	actionToInputsMappingsByInputName: Map<string, ActionToInputsMapping>;

	paneMap: Pane;
	paneSelection: Pane;
	paneStatus: Pane;
	ticksSinceStarted: number;

	constructor
	(
		name: string,
		map: MapOfCells2,
		owner: Owner,
		facilities: Facility[],
		agents: Agent[]
	)
	{
		super
		(
			name,
			null, // defnName
			map.sizeInPixels, // size
			[] // entities
		);

		this.map = map;
		this.owner = owner;
		this.facilities = facilities;
		this.facilitiesListsByDefnName =
			ArrayHelper2.addLookupLists(this.facilities, "defnName");
		this.agents = agents;

		this.cursor = new Cursor(this.map.sizeInCells.clone().divideScalar(2));

		var inactivate = true;

		this.actionToInputsMappings =
		[
			new ActionToInputsMapping("MoveDown", [ "ArrowDown" ], inactivate),
			new ActionToInputsMapping("MoveLeft", [ "ArrowLeft" ], inactivate ),
			new ActionToInputsMapping("MoveRight", [ "ArrowRight"], inactivate ),
			new ActionToInputsMapping("MoveUp", [ "ArrowUp" ], inactivate ),
			new ActionToInputsMapping("Activate", [ "Enter" ], inactivate ),
			new ActionToInputsMapping("Cancel", [ "Escape" ], inactivate ),
			new ActionToInputsMapping("SelectPrevious", [ "[" ], inactivate ),
			new ActionToInputsMapping("SelectNext", [ "]" ], inactivate ),
		];

		this.actionToInputsMappingsByInputName
			= new Map<string, ActionToInputsMapping>();

		for (var i = 0; i < this.actionToInputsMappings.length; i++)
		{
			var mapping = this.actionToInputsMappings[i];
			for (var j = 0; j < mapping.inputNames.length; j++)
			{
				var inputName = mapping.inputNames[j];
				this.actionToInputsMappingsByInputName.set(inputName, mapping);
			}
		}
	}

	entitiesAtPos
	(
		world: World2, posToCheck: Coords, listToAddTo: Entity2[]
	): Entity2[]
	{
		var posToCheckInCells = posToCheck.clone().divide
		(
			this.map.cellSizeInPixels
		).floor();

		var entitySets =
		[
			this.facilities, this.agents
		];

		var entityPosInCells = Coords.create();

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

				if (entityPosInCells.equals(posToCheckInCells) )
				{
					listToAddTo.push(entity);
				}
			}
		}

		return listToAddTo;
	}

	fractionOfDayNightCycleCompleted(world: World2): number
	{
		var secondsSinceSunrise =
			this.secondsSinceStarted()
			% world.dayNightCyclePeriodInSeconds;

		var returnValue =
			secondsSinceSunrise / world.dayNightCyclePeriodInSeconds;

		return returnValue;
	}

	initialize2(universe: Universe, world: World2): void
	{
		var uwpe = new UniverseWorldPlaceEntities
		(
			universe, world, this, null, null
		);

		for (var i = 0; i < this.facilities.length; i++)
		{
			var facility = this.facilities[i];
			facility.initialize(uwpe);
		}

		for (var i = 0; i < this.agents.length; i++)
		{
			var agent = this.agents[i];
			agent.initialize(uwpe);
		}

		this.cursor.initialize(uwpe);

		// hack
		this.cursor.entitySelected = this.agents[0];

		this.paneMap = new Pane
		(
			Coords.Instances().Zeroes,
			this.map.sizeInPixels
		);

		this.paneStatus = new Pane
		(
			Coords.fromXY(this.map.sizeInPixels.x, 0),
			Coords.fromXY
			(
				this.map.sizeInPixels.x / 3,
				this.map.sizeInPixels.y / 2
			)
		);

		this.paneSelection = new Pane
		(
			Coords.fromXY(this.map.sizeInPixels.x, this.map.sizeInPixels.y / 2),
			Coords.fromXY
			(
				this.map.sizeInPixels.x / 3,
				this.map.sizeInPixels.y / 2
			)
		);

		this.ticksSinceStarted = 0;
	}

	secondsSinceStarted(): number
	{
		var secondsSinceStarted =
			this.ticksSinceStarted
			/ Globals.Instance().timerTicksPerSecond;

		return secondsSinceStarted;
	}

	timeOfDay(world: World2): string
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

		var timeMinutes = StringHelper.padStart
		(
			"" + minutesSinceStartOfHour, 2, "0"
		);

		var returnValue = timeHours + ":" + timeMinutes;

		return returnValue;
	}

	updateForTimerTick2(universe: Universe, world: World2): void
	{
		this.draw(null, world, Globals.Instance().display);

		this.updateForTimerTick_1_Input(universe, world);

		this.updateForTimerTick_2_Entities(universe, world);

		this.ticksSinceStarted++;
	}

	updateForTimerTick_1_Input(universe: Universe, world: World2): void
	{
		var inputHelper = Globals.Instance().inputHelper;
		var mappingsByInputName = this.actionToInputsMappingsByInputName;
		var actionsByName = world.actionsByName;

		var actionsFromInput =
			inputHelper.actionsFromInput(actionsByName, mappingsByInputName);

		for (var i = 0; i < actionsFromInput.length; i++)
		{
			var action = actionsFromInput[i] as Action2;
			action.perform2(world, this, null);
		}
	}

	updateForTimerTick_2_Entities(universe: Universe, world: World2): void
	{
		var uwpe = new UniverseWorldPlaceEntities(universe, world, this, null, null);

		for (var i = 0; i < this.facilities.length; i++)
		{
			var facility = this.facilities[i];
			facility.updateForTimerTick(uwpe);
		}

		for (var i = 0; i < this.agents.length; i++)
		{
			var agent = this.agents[i];
			agent.updateForTimerTick(uwpe);
		}

		this.cursor.updateForTimerTick(uwpe);
	}

	// drawable

	draw(universe: Universe, world: World2, display: Display): void
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
