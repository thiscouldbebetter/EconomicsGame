
function VisualText(text, color)
{
	this.text = text;
	this.color = color;
}

{
	VisualText.prototype.drawToDisplayForDrawable = function(display, drawable)
	{
		display.drawText(this.text, this.color, drawable.pos);
	}
}
