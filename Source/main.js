function main()
{
	var display = new Display
	(
		[ new Coords(400, 300) ],
		"sans-serif", // fontName
		8, // fontHeightInPixels
		"LightGray", // colorFore
		"White" // colorBack
	);

	display.drawableDummy = {};
	display.drawableDummy.pos = new Coords();

	var mapSizeInPixels = display.sizeInPixels.clone().multiply
	(
		new Coords(.75, 1)
	);

	var world = new DemoData().world
	(
		mapSizeInPixels
	);

	Globals.Instance.initialize
	(
		10, // timerTicksPerSecond
		display,
		world
	);
}
