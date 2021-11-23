
class Facility extends Entity2 implements Actor2
{
	defnName: string;
	posInCells: Coords;

	pos: Coords;
	_locatable: Locatable;
	agentAssigned: Agent;
	resourceHolder: ResourceHolder;

	constructor(defnName: string, posInCells: Coords)
	{
		super();

		this.defnName = defnName;
		this.posInCells = posInCells;

		this.pos = Coords.create();
		var loc = Disposition.fromPos(this.pos);
		this._locatable = new Locatable(loc);

		this.agentAssigned = null;

		this.resourceHolder = new ResourceHolder();
	}

	defn(world: World2): FacilityDefn
	{
		return world.facilityDefnsByName.get(this.defnName);
	}

	locatable(): Locatable
	{
		return this._locatable;
	}

	// entity

	initialize(uwpe: UniverseWorldPlaceEntities): Entity
	{
		var worldAsWorld = uwpe.world;
		var place = uwpe.place;

		var world = worldAsWorld as World2;
		var level = place as Level;

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

		var defn = this.defn(world);
		var defnInitialize = defn.initialize;
		if (defnInitialize != null)
		{
			defnInitialize(world, level, this);
		}

		return this;
	}

	updateForTimerTick(uwpe: UniverseWorldPlaceEntities): Entity
	{
		return this;
	}

	// agents

	agentDirect(world: World2, level: Level, agent: Agent): void
	{
		this.defn(world).agentDirect(world, level, agent, this);
	}

	interactWith(world: World2, level: Level, agent: Agent): void
	{
		this.defn(world).interactWith(world, level, agent, this);
	}

	// drawable

	draw
	(
		universe: Universe, world: World2, display: Display, level: Level
	): void
	{
		var defn = this.defn(world);
		var visual = defn.visual;
		var uwpe = new UniverseWorldPlaceEntities
		(
			universe, world, null, this, null
		);
		visual.draw(uwpe, display);
	}

	// strings

	toString(): string
	{
		var newline = "\n";

		var returnValue =
			this.defnName + newline
			+ this.resourceHolder.toString();

		return returnValue;
	}
}
