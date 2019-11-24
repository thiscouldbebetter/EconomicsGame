
function Bounds(min, max)
{
	this.min = min;
	this.max = max;
	this.size = new Coords();
	this.sizeRecalculate();
}

{
	Bounds.prototype.containsPoint = function(pointToCheck)
	{
		var returnValue =
		(
			pointToCheck.x >= this.min.x
			&& pointToCheck.x <= this.max.x
			&& pointToCheck.y >= this.min.y
			&& pointToCheck.y <= this.max.y
		);

		return returnValue;	
	}

	Bounds.prototype.fromPoints = function(points)
	{
		var point0 = points[0];
		var min = point0.clone();
		var max = point0.clone();

		for (var i = 1; i < points.length; i++)
		{
			var point = points[i];

			if (point.x < min.x)
			{
				min.x = point.x;
			}
			else if (point.x > max.x)
			{
				max.x = point.x;
			}

			if (point.y < min.y)
			{
				min.y = point.y;
			}
			else if (point.y > max.y)
			{
				max.y = point.y;
			}
		}

		return new Bounds(min, max);
	}

	Bounds.prototype.sizeRecalculate = function()
	{
		this.size.overwriteWith(this.max).subtract(this.min);
	}

	Bounds.prototype.trimCoords = function(coordsToTrim)
	{
		if (coordsToTrim.x < this.min.x)
		{
			coordsToTrim.x = this.min.x;
		}
		else if (coordsToTrim.x > this.max.x)
		{
			coordsToTrim.x = this.max.x;
		}

		if (coordsToTrim.y < this.min.y)
		{
			coordsToTrim.y = this.min.y;
		}
		else if (coordsToTrim.y > this.max.y)
		{
			coordsToTrim.y = this.max.y;
		}

		return coordsToTrim;
	}
}
