
function Level(name, map, owner, facilities, agents)
{
	this.name = name;
	this.map = map;
	this.owner = owner;
	this.facilities = facilities.addLookupLists("defnName");
	this.agents = agents;

	this.cursor = new Cursor(this.map.sizeInCells.clone().divideScalar(2));

	this.inputToActionMappings = 
	[
		new InputToActionMapping("ArrowDown", "MoveDown"),
		new InputToActionMapping("ArrowLeft", "MoveLeft"),
		new InputToActionMapping("ArrowRight", "MoveRight"),
		new InputToActionMapping("ArrowUp", "MoveUp"),
		new InputToActionMapping("Enter", "Activate"),
		new InputToActionMapping("Escape", "Cancel"),
		new InputToActionMapping("[", "SelectPrevious"),
		new InputToActionMapping("]", "SelectNext"),
		

	].addLookups("inputName");
}

{
	Level.prototype.entityAtPos = function(world, posToCheck)
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
					returnValue = entity;
					s = entitySets.length;
					break;
				}
			}
		}

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
			Coords.Instances.Zeroes,
			this.map.sizeInPixels	
		);

		this.paneStatus = new Pane
		(
			new Coords(this.map.sizeInPixels.x, 0),
			new Coords
			(
				this.map.sizeInPixels.x / 3, 
				this.map.sizeInPixels.y
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

	Level.prototype.updateForTimerTick = function(world)
	{
		this.drawToDisplay(Globals.Instance.display, world);

		this.updateForTimerTick_1_Input(world);

		this.updateForTimerTick_2_Entities(world);

		this.ticksSinceStarted++;
	}

	Level.prototype.updateForTimerTick_1_Input = function(world)
	{
		var inputHelper = Globals.Instance.inputHelper;

		var keyPressed = inputHelper.keyPressed;

		if (keyPressed != null)
		{
			inputHelper.keyPressed = null;

			var mappingForKeyPressed = 
				this.inputToActionMappings[keyPressed];

			if (mappingForKeyPressed != null)
			{
				var actionName = mappingForKeyPressed.actionName;
				var action = world.actions[actionName];
				action.perform(world, this);
			}
		}
	}

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
	}

	// drawable

	Level.prototype.drawToDisplay = function(display, world)
	{
		display.clear();

		this.map.drawToDisplay(this.paneMap, world, this);

		for (var i = 0; i < this.facilities.length; i++)
		{
			var facility = this.facilities[i];
			facility.drawToDisplay(this.paneMap, world, this);
		}

		for (var i = 0; i < this.agents.length; i++)
		{
			var agent = this.agents[i];
			agent.drawToDisplay(this.paneMap, world, this);
		}

		this.cursor.drawToDisplay(this.paneMap, world, this);
	}
}
