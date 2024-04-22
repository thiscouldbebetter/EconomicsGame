
class World2 extends World
{
	name: string;
	dayNightCyclePeriodInSeconds: number;
	resourceDefns: ResourceDefn[];
	mapEmplacementDefns: MapEmplacementDefn[];
	facilityDefns: FacilityDefn[];
	agentDefns: AgentDefn[];
	actions: Action2[];
	level: Level;

	resourceDefnsByName: Map<string, ResourceDefn>;
	mapEmplacementDefnsByName: Map<string, MapEmplacementDefn>;
	facilityDefnsByName: Map<string, FacilityDefn>;
	agentDefnsByName: Map<string, AgentDefn>;
	actionsByName: Map<string, Action2>;

	timerTicksSoFar: number;

	constructor
	(
		name: string,
		dayNightCyclePeriodInSeconds: number,
		resourceDefns: ResourceDefn[],
		mapEmplacementDefns: MapEmplacementDefn[],
		facilityDefns: FacilityDefn[],
		agentDefns: AgentDefn[],
		actions: Action2[],
		level: Level
	)
	{
		super
		(
			name,
			null, // timeCreated
			null, // worldDefn
			(name) => level, // placeGetByName
			null // placeInitialName
		);

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

	initialize2(universe: Universe): void
	{
		this.level.initialize2(universe, this);
	}

	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): void
	{
		var universe = uwpe.universe;

		this.level.updateForTimerTick2(universe, this);

		this.timerTicksSoFar++;
	}
}
