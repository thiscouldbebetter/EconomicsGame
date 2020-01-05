
function Pane(pos, size)
{
	this.pos = pos;
	this.size = size;

	// helper variables

	this.drawPos = new Coords();
	this.drawableDummy = new DrawableDummy();
}

{
	Pane.prototype.clear = function()
	{
		this.drawRectangle
		(
			Coords.Instances().Zeroes, this.sizeInPixels,
			this.colorBack, this.colorFore
		);
	}

	Pane.prototype.drawCircle = function
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

	Pane.prototype.drawPath = function(vertices, color, lineThickness, isClosed)
	{
		var display = Globals.Instance.display;
		display.drawPath(vertices, color, lineThickness, isClosed);
	}

	Pane.prototype.drawRectangle = function
	(
		pos, size, colorFill, colorBorder
	)
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

	Pane.prototype.drawText = function(textToDraw, fontHeightInPixels, pos, color)
	{
		var drawPos = this.drawPos;
		drawPos.overwriteWith(this.pos).add(pos);
		var display = Globals.Instance.display;
		display.drawText(textToDraw, fontHeightInPixels, drawPos, color);
	}
}
