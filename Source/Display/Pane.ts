
class Pane
{
	constructor(pos, size)
	{
		this.pos = pos;
		this.size = size;

		// helper variables

		this.drawPos = new Coords();
		this.drawableDummy = new DrawableDummy();
	}

	clear()
	{
		this.drawRectangle
		(
			Coords.Instances().Zeroes, this.sizeInPixels,
			this.colorBack, this.colorFore
		);
	}

	drawCircle
	(
		centerPos, radius, colorFill, colorBorder
	)
	{
		var drawPos = this.drawPos;
		drawPos.overwriteWith(this.pos).add(centerPos);
		var display = Globals.Instance.display;
		display.drawCircle
		(
			drawPos, radius,
			colorFill, colorBorder
		);
	}

	drawPath(vertices, color, lineThickness, isClosed)
	{
		var display = Globals.Instance.display;
		display.drawPath(vertices, color, lineThickness, isClosed);
	}

	drawRectangle(pos, size, colorFill, colorBorder)
	{
		var drawPos = this.drawPos;
		drawPos.overwriteWith(this.pos).add(pos);
		var display = Globals.Instance.display;
		display.drawRectangle
		(
			drawPos, size,
			colorFill, colorBorder
		);
	}

	drawText(textToDraw, fontHeightInPixels, pos, color)
	{
		var drawPos = this.drawPos;
		drawPos.overwriteWith(this.pos).add(pos);
		var display = Globals.Instance.display;
		display.drawText(textToDraw, fontHeightInPixels, drawPos, color);
	}
}
