
class VisualText
{
	constructor(text, color)
	{
		this.text = text;
		this.color = color;
	}

	draw(universe, world, display, drawable, entity)
	{
		display.drawText(this.text, null, drawable.pos, this.color);
	}
}
