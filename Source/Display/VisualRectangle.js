
class VisualRectangle
{
	constructor(size, colorFill, colorBorder)
	{
		this.size = size;
		this.colorFill = colorFill;
		this.colorBorder = colorBorder;

		this.sizeHalf = this.size.clone().divideScalar(2);

		this._drawPos = new Coords();
	}

	// methods

	draw(universe, world, display, drawable, entity)
	{
		var drawPos = this._drawPos;
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
