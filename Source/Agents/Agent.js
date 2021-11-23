"use strict";
class Agent extends Entity2 {
    constructor(name, defnName, posInCells) {
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
    animatable() {
        return this._animatable;
    }
    approach(world, level, entityGoal) {
        var isAtGoal = false;
        var goalPosInCells = entityGoal.posInCells;
        var displacementToGoal = this._displacementToGoal.overwriteWith(goalPosInCells).subtract(this.posInCells);
        var distanceToGoal = displacementToGoal.magnitude();
        var moveSpeedPerTick = .2;
        if (distanceToGoal < moveSpeedPerTick) {
            this.posInCells.overwriteWith(goalPosInCells);
            isAtGoal = true;
        }
        else {
            var path = new PathAgent(level.map, this.posInCells.clone().floor(), // startPos
            goalPosInCells);
            path.calculate();
            var directionToGoal;
            var forward = this.locatable().loc.orientation.forward;
            if (path.nodes.length < 2) {
                directionToGoal = displacementToGoal.clone().divideScalar(distanceToGoal);
                forward.overwriteWith(Coords.Instances().Zeroes);
            }
            else {
                var pathNode1 = path.nodes[1];
                directionToGoal = pathNode1.cellPos.clone().subtract(path.startPos).normalize();
                forward.overwriteWith(directionToGoal);
            }
            var moveTowardGoal = directionToGoal.clone().multiplyScalar(moveSpeedPerTick);
            this.posInCells.add(moveTowardGoal);
        }
        return isAtGoal;
    }
    defn(world) {
        return world.agentDefnsByName.get(this.defnName);
    }
    initialize(uwpe) {
        var place = uwpe.place;
        var level = place;
        this.pos.overwriteWith(this.posInCells).add(Coords.Instances().Halves).multiply(level.map.cellSizeInPixels);
        return this;
    }
    locatable() {
        return this._locatable;
    }
    updateForTimerTick(uwpe) {
        var worldAsWorld = uwpe.world;
        var place = uwpe.place;
        var world = worldAsWorld;
        var level = place;
        if (this.facilityHome == null) {
            this.facilityHome = this.updateForTimerTick_FacilityChoose(level, true // findHome
            );
        }
        if (this.facilityWork == null) {
            this.facilityWork = this.updateForTimerTick_FacilityChoose(level, false // findHome
            );
        }
        var fractionOfDayNightCycleCompleted = level.fractionOfDayNightCycleCompleted(world);
        if (fractionOfDayNightCycleCompleted < .4) {
            // work
            if (this.facilityWork != null) {
                this.facilityWork.agentDirect(world, level, this);
            }
        }
        else if (fractionOfDayNightCycleCompleted < .6) {
            // shop
            if (this.facilityHome != null) {
                var marketplaces = level.facilitiesListsByDefnName.get("Marketplace");
                var facilityMarketplace = marketplaces[0];
                facilityMarketplace.agentDirect(world, level, this);
            }
        }
        else {
            // home
            if (this.facilityHome != null) {
                this.facilityHome.agentDirect(world, level, this);
            }
        }
        this.pos.overwriteWith(this.posInCells).add(Coords.Instances().Halves).multiply(level.map.cellSizeInPixels);
        return this;
    }
    updateForTimerTick_FacilityChoose(level, findHome) {
        var returnValue = null;
        var facilities = level.facilities;
        for (var i = 0; i < facilities.length; i++) {
            var facility = facilities[i];
            var facilityIsHouse = (facility.defnName == "House");
            if (facility.agentAssigned == null
                && findHome == facilityIsHouse) {
                returnValue = facility;
                returnValue.agentAssigned = this;
                break;
            }
        }
        return returnValue;
    }
    // drawable
    draw(universe, world, display, level) {
        var visual = this.defn(world).visual;
        var uwpe = new UniverseWorldPlaceEntities(universe, world, null, this, null);
        visual.draw(uwpe, display);
    }
    // strings
    toString() {
        var newline = "\n";
        var returnValue = this.name + newline
            + this.defnName + newline
            + this.resourceHolder.toString();
        return returnValue;
    }
}
