"use strict";
class MapCell extends Entity2 {
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
        visual.draw(universe, world, null, this, display);
        var emplacement = this.emplacement(map);
        if (emplacement != null) {
            visual = emplacement.visual;
            visual.draw(universe, world, null, this, display);
        }
    }
}
