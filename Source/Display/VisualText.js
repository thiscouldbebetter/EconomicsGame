
function VisualText(text, color)
{
	this.text = text;
	this.color = color;
}

{
	VisualText.prototype.draw = function(universe, world, display, drawable, entity)
	{
		display.drawText(this.text, null, drawable.pos, this.color);
	};
}
