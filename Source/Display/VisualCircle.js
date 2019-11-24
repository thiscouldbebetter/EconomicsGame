
function VisualCircle(radius, colorFill, colorBorder)
{
	this.radius = radius;
	this.colorFill = colorFill;
	this.colorBorder = colorBorder;
}

{
	// methods

	VisualCircle.prototype.drawToDisplayForDrawable = function
	(
		display, drawable
	)
	{
		display.drawCircle
		(
			drawable.pos, this.radius,
			this.colorFill, this.colorBorder
		);
	}
}
