
class Agent extends Entity2 implements Actor2
{
	name: string;
	defnName: string;
	posInCells: Coords;

	pos: Coords;
	_locatable: Locatable;
	drawable: any;

	resourceHolder: ResourceHolder;
	facilityHome: Facility;
	facilityWork: Facility;

	_displacementToGoal: Coords;
	_animatable: Animatable2;

	constructor(name: string, defnName: string, posInCells: Coords)
	{
		super();

		this.name = name;
		this.defnName = defnName;
		this.posInCells = posInCells;

		this.pos = Coords.create();
		var loc = Disposition.fromPos(this.pos);
		this._locatable = new Locatable(loc);
		this.drawable = new DrawableDummy();

		this.resourceHolder = new ResourceHolder();
		this.facilityHome = null;
		this.facilityWork = null;

		this._displacementToGoal = Coords.create();

		this._animatable = Animatable2.create();
	}

	animatable(): Animatable2
	{
		return this._animatable;
	}

	approach(world: World2, level: Level, entityGoal: Entity2): boolean
	{
		var isAtGoal = false;

		var goalPosInCells = entityGoal.posInCells;
		var displacementToGoal = this._displacementToGoal.overwriteWith
		(
			goalPosInCells
		).subtract
		(
			this.posInCells
		);
		var distanceToGoal = displacementToGoal.magnitude();
		var moveSpeedPerTick = .2;

		if (distanceToGoal < moveSpeedPerTick)
		{
			this.posInCells.overwriteWith(goalPosInCells);

			isAtGoal = true;
		}
		else
		{
			var path = new PathAgent
			(
				level.map,
				this.posInCells.clone().floor(), // startPos
				goalPosInCells
			);

			path.calculate();

			var directionToGoal;
			var forward = this.locatable().loc.orientation.forward;

			if (path.nodes.length < 2)
			{
				directionToGoal = displacementToGoal.clone().divideScalar
				(
					distanceToGoal
				);
				forward.overwriteWith(Coords.Instances().Zeroes);
			}
			else
			{
				var pathNode1 = path.nodes[1];

				directionToGoal = pathNode1.cellPos.clone().subtract
				(
					path.startPos
				).normalize();

				forward.overwriteWith(directionToGoal);
			}

			var moveTowardGoal = directionToGoal.clone().multiplyScalar
			(
				moveSpeedPerTick
			);

			this.posInCells.add(moveTowardGoal);
		}

		return isAtGoal;
	}

	defn(world: World2): AgentDefn
	{
		return world.agentDefnsByName.get(this.defnName);
	}

	initialize(universe: Universe, world: World, place: Place): Entity
	{
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

		return this;
	}

	locatable(): Locatable
	{
		return this._locatable;
	}

	updateForTimerTick
	(
		universe: Universe, worldAsWorld: World, place: Place
	): Entity
	{
		var world = worldAsWorld as World2;
		var level = place as Level;

		if (this.facilityHome == null)
		{
			this.facilityHome = this.updateForTimerTick_FacilityChoose
			(
				level, true // findHome
			);
		}

		if (this.facilityWork == null)
		{
			this.facilityWork = this.updateForTimerTick_FacilityChoose
			(
				level, false // findHome
			);
		}

		var fractionOfDayNightCycleCompleted =
			level.fractionOfDayNightCycleCompleted(world);

		if (fractionOfDayNightCycleCompleted < .4)
		{
			// work

			if (this.facilityWork != null)
			{
				this.facilityWork.agentDirect(world, level, this);
			}
		}
		else if (fractionOfDayNightCycleCompleted < .6)
		{
			// shop

			if (this.facilityHome != null)
			{
				var marketplaces =
					level.facilitiesListsByDefnName.get("Marketplace");
				var facilityMarketplace = marketplaces[0];
				facilityMarketplace.agentDirect(world, level, this);
			}
		}
		else
		{
			// home

			if (this.facilityHome != null)
			{
				this.facilityHome.agentDirect(world, level, this);
			}
		}

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

		return this;
	}

	updateForTimerTick_FacilityChoose
	(
		level: Level, findHome: boolean
	): Facility
	{
		var returnValue = null;

		var facilities = level.facilities;
		for (var i = 0; i < facilities.length; i++)
		{
			var facility = facilities[i];
			var facilityIsHouse = (facility.defnName == "House");
			if
			(
				facility.agentAssigned == null
				&& findHome == facilityIsHouse
			)
			{
				returnValue = facility;
				returnValue.agentAssigned = this;
				break;
			}
		}

		return returnValue;
	}

	// drawable

	draw
	(
		universe: Universe, world: World2, display: Display,
		level: Level
	): void
	{
		var visual = this.defn(world).visual;
		visual.draw(universe, world, null, this, display);
	}

	// strings

	toString(): string
	{
		var newline = "\n";

		var returnValue =
			this.name + newline
			+ this.defnName + newline
			+ this.resourceHolder.toString();

		return returnValue;
	}
}
