"use strict";
class Facility extends Entity2 {
    constructor(defnName, posInCells) {
        super();
        this.defnName = defnName;
        this.posInCells = posInCells;
        this.pos = Coords.create();
        var loc = Disposition.fromPos(this.pos);
        this._locatable = new Locatable(loc);
        this.agentAssigned = null;
        this.resourceHolder = new ResourceHolder();
    }
    defn(world) {
        return world.facilityDefnsByName.get(this.defnName);
    }
    locatable() {
        return this._locatable;
    }
    // entity
    initialize(universe, worldAsWorld, place) {
        var world = worldAsWorld;
        var level = place;
        this.pos.overwriteWith(this.posInCells).add(Coords.Instances().Halves).multiply(level.map.cellSizeInPixels);
        var defn = this.defn(world);
        var defnInitialize = defn.initialize;
        if (defnInitialize != null) {
            defnInitialize(world, level, this);
        }
        return this;
    }
    updateForTimerTick(universe, world, place) {
        return this;
    }
    // agents
    agentDirect(world, level, agent) {
        this.defn(world).agentDirect(world, level, agent, this);
    }
    interactWith(world, level, agent) {
        this.defn(world).interactWith(world, level, agent, this);
    }
    // drawable
    draw(universe, world, display, level) {
        var defn = this.defn(world);
        var visual = defn.visual;
        visual.draw(universe, world, null, this, display);
    }
    // strings
    toString() {
        var newline = "\n";
        var returnValue = this.defnName + newline
            + this.resourceHolder.toString();
        return returnValue;
    }
}
