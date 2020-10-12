
class VisualPath
{
	constructor(verticesAsPath, color, lineThickness, isClosed)
	{
		this.verticesAsPath = verticesAsPath;
		this.color = color;
		this.isClosed = isClosed;

		this.size = new Box
		(
			new Coords(), new Coords()
		).ofPoints
		(
			this.verticesAsPath.points
		).size;

		this.sizeHalf = this.size.clone().divideScalar(2);

		this.verticesAsPathTransformed = this.verticesAsPath.clone();

		// Helper variables.

		this._drawPos = new Coords();
	}

	// methods

	draw(universe, world, display, drawable, entity)
	{
		var drawPos = VisualPath.drawPos;
		drawPos.overwriteWith
		(
			drawable.pos
		).subtract
		(
			this.sizeHalf
		);

		this.verticesAsPathTransformed.overwriteWith(this.verticesAsPath);
		var vertices = this.verticesAsPathTransformed.points;
		for (var i = 0; i < vertices.length; i++)
		{
			vertices[i].add(drawPos);
		}

		display.drawPath
		(
			vertices, this.color, this.lineThickness, this.isClosed
		);
	}
}
