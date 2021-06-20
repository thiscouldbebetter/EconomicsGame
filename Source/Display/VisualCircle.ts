
class VisualCircle
{
	constructor(radius, colorFill, colorBorder)
	{
		this.radius = radius;
		this.colorFill = colorFill;
		this.colorBorder = colorBorder;
	}

	// methods

	draw(universe, world, display, drawable, entity)
	{
		display.drawCircle
		(
			drawable.pos, this.radius,
			this.colorFill, this.colorBorder
		);
	}
}
