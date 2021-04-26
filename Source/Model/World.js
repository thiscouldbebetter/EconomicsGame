
class World
{
	constructor
	(
		name,
		dayNightCyclePeriodInSeconds,
		resourceDefns,
		mapEmplacementDefns,
		facilityDefns,
		agentDefns,
		actions,
		level
	)
	{
		this.name = name;
		this.dayNightCyclePeriodInSeconds = dayNightCyclePeriodInSeconds;
		this.resourceDefns = resourceDefns;
		this.resourceDefnsByName =
			ArrayHelper.addLookupsByName(this.resourceDefns);
		this.mapEmplacementDefns = mapEmplacementDefns;
		this.mapEmplacementDefnsByName =
			ArrayHelper.addLookupsByName(this.mapEmplacementDefns);
		this.facilityDefns = facilityDefns;
		this.facilityDefnsByName =
			ArrayHelper.addLookupsByName(this.facilityDefns);
		this.agentDefns = agentDefns;
		this.agentDefnsByName =
			ArrayHelper.addLookupsByName(this.agentDefns);
		this.actions = actions;
		this.actionsByName = ArrayHelper.addLookupsByName(this.actions);
		this.level = level;

		this.timerTicksSoFar = 0;
	}

	initialize()
	{
		this.level.initialize(this);
	}

	updateForTimerTick()
	{
		this.level.updateForTimerTick(this);

		this.timerTicksSoFar++;
	}
}
