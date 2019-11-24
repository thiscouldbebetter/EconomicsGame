
function VisualPath(vertices, isClosed, colorFill, colorBorder)
{
	this.vertices = vertices;
	this.isClosed = isClosed;
	this.colorFill = colorFill;
	this.colorBorder = colorBorder;

	this.size = new Bounds
	(
		new Coords(), new Coords()
	).fromPoints
	(
		this.vertices
	).size;

	this.sizeHalf = this.size.clone().divideScalar(2);
}

{
	// helper variables

	VisualPath.drawPos = new Coords();

	// methods

	VisualPath.prototype.drawToDisplayForDrawable = function
	(
		display, drawable
	)
	{
		var drawPos = VisualPath.drawPos;
		drawPos.overwriteWith
		(
			drawable.pos
		).subtract
		(
			this.sizeHalf
		);
		
		display.drawPath
		(
			drawPos, this.vertices, this.isClosed,
			this.colorFill, this.colorBorder
		);
	}
}
