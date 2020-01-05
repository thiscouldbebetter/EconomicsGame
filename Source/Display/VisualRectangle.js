
function VisualRectangle(size, colorFill, colorBorder)
{
	this.size = size;
	this.colorFill = colorFill;
	this.colorBorder = colorBorder;

	this.sizeHalf = this.size.clone().divideScalar(2);
}

{
	// helper variables

	VisualRectangle.drawPos = new Coords();

	// methods

	VisualRectangle.prototype.draw = function(universe, world, display, drawable, entity)
	{
		var drawPos = VisualRectangle.drawPos;
		drawPos.overwriteWith
		(
			drawable.pos
		).subtract
		(
			this.sizeHalf
		);

		display.drawRectangle
		(
			drawPos, this.size,
			this.colorFill, this.colorBorder
		);
	}
}
