
class Facility
{
	constructor(defnName, posInCells)
	{
		this.defnName = defnName;
		this.posInCells = posInCells;

		this.pos = new Coords();
		var loc = new Location(this.pos);
		this.locatable = new Locatable(loc);

		this.agentAssigned = null;

		this.resourceHolder = new ResourceHolder();
	}

	defn(world)
	{
		return world.facilityDefns[this.defnName];
	}

	// entity

	initialize(world, level)
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

	updateForTimerTick(world, level)
	{
		// todo
	}

	// agents

	agentDirect(world, level, agent)
	{
		this.defn(world).agentDirect(world, level, agent, this);
	}

	interactWith(world, level, agent)
	{
		this.defn(world).interactWith(world, level, agent, this);
	}

	// drawable

	draw(universe, world, display, level)
	{
		var defn = this.defn(world);
		var visual = defn.visual;
		visual.draw(universe, world, display, this);
	}

	// strings

	toString()
	{
		var newline = "\n";

		var returnValue =
			this.defnName + newline
			+ this.resourceHolder.toString();

		return returnValue;
	}
}
