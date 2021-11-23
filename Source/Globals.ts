
class Globals
{
	timerTicksPerSecond: number;
	display: Display2D;
	world: World2;
	inputHelper: InputHelper;
	timer: any;

	// instance

	static _instance: Globals;
	static Instance(): Globals
	{
		if (Globals._instance == null)
		{
			Globals._instance = new Globals();
		}
		return Globals._instance;
	}

	// methods

	initialize
	(
		timerTicksPerSecond: number, display: Display2D, world: World2
	): void
	{
		this.timerTicksPerSecond = timerTicksPerSecond;
		this.display = display;
		this.world = world;

		this.inputHelper = new InputHelper();

		this.display.initialize(null);
		this.world.initialize2(null);

		var millisecondsPerTimerTick = Math.floor
		(
			1000 / this.timerTicksPerSecond
		);

		this.timer = setInterval
		(
			this.handleEventTimerTick.bind(this),
			millisecondsPerTimerTick
		);

		this.inputHelper.initialize(null);
	}

	// events

	handleEventTimerTick(): void
	{
		var uwpe = new UniverseWorldPlaceEntities
		(
			null, this.world, null, null, null
		);
		this.world.updateForTimerTick(uwpe);
	}
}
