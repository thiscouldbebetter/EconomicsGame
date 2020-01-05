

function World
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
}

{
	World.prototype.initialize = function()
	{
		this.level.initialize(this);
	}

	World.prototype.updateForTimerTick = function()
	{
		this.level.updateForTimerTick(this);
	}
}
