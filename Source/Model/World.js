
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
		this.resourceDefns = resourceDefns.addLookupsByName();
		this.mapEmplacementDefns = mapEmplacementDefns.addLookupsByName();
		this.facilityDefns = facilityDefns.addLookupsByName();
		this.agentDefns = agentDefns.addLookupsByName();
		this.actions = actions.addLookupsByName();
		this.level = level;

		this.actionsByName = new Map(this.actions.map(x => [x.name, x]));
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
