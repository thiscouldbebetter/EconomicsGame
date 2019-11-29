

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
	this.resourceDefns = resourceDefns.addLookups("name");
	this.mapEmplacementDefns = mapEmplacementDefns.addLookups("name");
	this.facilityDefns = facilityDefns.addLookups("name");
	this.agentDefns = agentDefns.addLookups("name");
	this.actions = actions.addLookups("name");
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
