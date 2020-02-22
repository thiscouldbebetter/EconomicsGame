
function Facility(defnName, posInCells)
{
	this.defnName = defnName;
	this.posInCells = posInCells;

	this.pos = new Coords();
	var loc = new Location(this.pos);
	this.locatable = new Locatable(loc);

	this.agentAssigned = null;

	this.resourceHolder = new ResourceHolder();
}

{
	Facility.prototype.defn = function(world)
	{
		return world.facilityDefns[this.defnName];
	}

	// entity

	Facility.prototype.initialize = function(world, level)
	{
		this.pos.overwriteWith
		(
			this.posInCells
		).add
		(
			Coords.Instances().Halves
		).multiply
		(
			level.map.cellSizeInPixels
		);

		var defnInitialize = this.defn(world).initialize;
		if (defnInitialize != null)
		{
			defnInitialize(world, level, this);
		}
	}

	Facility.prototype.updateForTimerTick = function(world, level)
	{
		// todo
	}

	// agents

	Facility.prototype.agentDirect = function(world, level, agent)
	{
		this.defn(world).agentDirect(world, level, agent, this);
	}

	Facility.prototype.interactWith = function(world, level, agent)
	{
		this.defn(world).interactWith(world, level, agent, this);
	}

	// drawable

	Facility.prototype.draw = function(universe, world, display, level)
	{
		var defn = this.defn(world);
		var visual = defn.visual;
		visual.draw(universe, world, display, this);
	}

	// strings

	Facility.prototype.toString = function()
	{
		var newline = "\n";

		var returnValue =
			this.defnName + newline
			+ this.resourceHolder.toString();

		return returnValue;
	}
}
