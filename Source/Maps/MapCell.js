"use strict";
class MapCell2 extends Entity2 {
    constructor(terrainCode, emplacementCode, posInCells) {
        super();
        this.terrainCode = terrainCode;
        this.emplacementCode = emplacementCode;
        this.posInCells = posInCells;
    }
    costToTraverse(map) {
        var returnValue = this.terrain(map).costToTraverse;
        var emplacement = this.emplacement(map);
        if (emplacement != null) {
            returnValue *= emplacement.costToTraverseMultiplier;
        }
        return returnValue;
    }
    emplacement(map) {
        var emplacementDefn = map.emplacementDefnsByCode.get(this.emplacementCode);
        return emplacementDefn;
    }
    locatable() {
        return this._locatable;
    }
    terrain(map) {
        return map.terrainsByCode.get(this.terrainCode);
    }
    // drawable
    draw(universe, world, display, map) {
        this._locatable = map._locatable;
        var drawPos = this._locatable.loc.pos;
        drawPos.overwriteWith(this.posInCells).add(Coords.Instances().Halves).multiply(map.cellSizeInPixels);
        var terrain = this.terrain(map);
        var visual = terrain.visual;
        var uwpe = new UniverseWorldPlaceEntities(universe, world, null, this, null);
        visual.draw(uwpe, display);
        var emplacement = this.emplacement(map);
        if (emplacement != null) {
            visual = emplacement.visual;
            visual.draw(uwpe, display);
        }
    }
}
