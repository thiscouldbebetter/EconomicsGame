
function Globals()
{
	// do nothing
}

{
	// instance

	Globals.Instance = new Globals();

	// methods

	Globals.prototype.initialize = function
	(
		timerTicksPerSecond, display, world
	)
	{
		this.timerTicksPerSecond = timerTicksPerSecond;
		this.display = display;
		this.world = world;

		this.inputHelper = new InputHelper();

		this.display.initialize();
		this.world.initialize();

		var millisecondsPerTimerTick = Math.floor
		(
			1000 / this.timerTicksPerSecond
		);

		this.timer = setInterval
		(
			this.handleEventTimerTick.bind(this),
			millisecondsPerTimerTick
		);

		this.inputHelper.initialize();
	}

	// events

	Globals.prototype.handleEventTimerTick = function()
	{
		this.world.updateForTimerTick();
	}
}
