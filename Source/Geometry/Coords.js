
function Coords(x, y)
{
	this.x = x;
	this.y = y;
}

{
	 // instances

	Coords.Instances = new Coords_Instances();

	function Coords_Instances()
	{
		this.Halves = new Coords(.5, .5);
		this.Ones = new Coords(1, 1);
		this.Zeroes = new Coords(0, 0);
	}

	// methods

	Coords.prototype.absolute = function()
	{
		this.x = Math.abs(this.x);
		this.y = Math.abs(this.y);
		return this;
	}

	Coords.prototype.add = function(other)
	{
		this.x += other.x;
		this.y += other.y;
		return this;
	}

	Coords.prototype.clear = function()
	{
		this.x = 0;
		this.y = 0;
		return this;
	}

	Coords.prototype.clone = function()
	{
		return new Coords(this.x, this.y);
	}

	Coords.prototype.divide = function(other)
	{
		this.x /= other.x;
		this.y /= other.y;
		return this;
	}

	Coords.prototype.divideScalar = function(scalar)
	{
		this.x /= scalar;
		this.y /= scalar;
		return this;
	}

	Coords.prototype.equals = function(other)
	{
		var returnValue = 
		(
			this.x == other.x
			&& this.y == other.y
		);

		return returnValue;
	}

	Coords.prototype.floor = function()
	{
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		return this;
	}

	Coords.prototype.magnitude = function()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	Coords.prototype.multiply = function(other)
	{
		this.x *= other.x;
		this.y *= other.y;
		return this;
	}

	Coords.prototype.multiplyScalar = function(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	Coords.prototype.normalize = function()
	{
		var magnitude = this.magnitude();
		if (magnitude != 0)
		{
			this.divideScalar(magnitude);
		}
		return this;
	}

	Coords.prototype.overwriteWith = function(other)
	{
		this.x = other.x;
		this.y = other.y;
		return this;
	}

	Coords.prototype.overwriteWithXY = function(x, y)
	{
		this.x = x;
		this.y = y;
		return this;
	}

	Coords.prototype.subtract = function(other)
	{
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}

	Coords.prototype.sumOfXAndY = function()
	{
		return this.x + this.y;
	}

	Coords.prototype.toString = function()
	{
		return this.x + "x" + this.y;
	}
}
