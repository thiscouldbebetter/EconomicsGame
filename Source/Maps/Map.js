"use strict";
class MapOfCells2 {
    constructor(sizeInPixels, terrains, emplacementDefns, cellTerrainsAsStrings, cellEmplacementsAsStrings) {
        this.sizeInPixels = sizeInPixels;
        this.terrains = terrains;
        this.terrainsByCode =
            ArrayHelper.addLookups(terrains, x => x.code);
        this.emplacementDefns = emplacementDefns;
        this.emplacementDefnsByCode =
            ArrayHelper.addLookups(this.emplacementDefns, x => x.code);
        this.sizeInCells = Coords.fromXY(cellTerrainsAsStrings[0].length, cellTerrainsAsStrings.length);
        this.boundsInCellsMinusOnes = Box.create().fromMinAndMax(Coords.Instances().Zeroes, this.sizeInCells.clone().subtract(Coords.Instances().OneOneZero));
        this.cellSizeInPixels = this.sizeInPixels.clone().divide(this.sizeInCells);
        this.cells = [];
        var cellPos = Coords.create();
        for (var y = 0; y < this.sizeInCells.y; y++) {
            cellPos.y = y;
            for (var x = 0; x < this.sizeInCells.x; x++) {
                cellPos.x = x;
                var cellTerrainCode = cellTerrainsAsStrings[y][x];
                var emplacementCode = cellEmplacementsAsStrings[y][x];
                var cell = new MapCell2(cellTerrainCode, emplacementCode, cellPos.clone());
                this.cells.push(cell);
            }
        }
        this.neighborOffsets =
            [
                Coords.fromXY(1, 0),
                Coords.fromXY(0, 1),
                Coords.fromXY(-1, 0),
                Coords.fromXY(0, -1),
                Coords.fromXY(1, 1),
                Coords.fromXY(-1, 1),
                Coords.fromXY(-1, -1),
                Coords.fromXY(1, -1),
            ];
        this.colorNight = Color.fromSystemColor("rgba(0, 0, 0, 0.5)");
        // helper variables
        this.cellPos = Coords.create();
        this.drawPos = Coords.create();
        this._locatable = new Locatable(Disposition.fromPos(this.drawPos));
    }
    cellAtPosInCells(posInCells) {
        return this.cells[this.indexOfCellAtPosInCells(posInCells)];
    }
    indexOfCellAtPosInCells(posInCells) {
        return posInCells.y * this.sizeInCells.x + posInCells.x;
    }
    // drawable
    draw(universe, world, display, level) {
        var cellPos = this.cellPos;
        for (var y = 0; y < this.sizeInCells.y; y++) {
            cellPos.y = y;
            for (var x = 0; x < this.sizeInCells.x; x++) {
                cellPos.x = x;
                var cell = this.cellAtPosInCells(cellPos);
                cell.draw(universe, world, display, this);
            }
        }
        var fractionOfDayNightCycleCompleted = level.fractionOfDayNightCycleCompleted(world);
        if (fractionOfDayNightCycleCompleted > .5) {
            display.drawRectangle(Coords.fromXY(0, 0), //pos,
            display.sizeInPixels, this.colorNight, // colorFill,
            null // colorBorder
            );
        }
    }
}
