"use strict";
class Cursor extends Entity2 {
    constructor(posInCells) {
        super();
        this.posInCells = posInCells;
        this.entitySelected = null;
        this.entityToPlace = null;
        this.pos = Coords.create();
        var loc = Disposition.fromPos(this.pos);
        this._locatable = new Locatable(loc);
    }
    activate(universe, world, level) {
        if (this.entityToPlace != null) {
            var facility = this.entityToPlace;
            if (facility != null) {
                var facilityDefn = facility.defn(world);
                var owner = level.owner;
                var canBuild = owner.resourceHolder.hasResources(facilityDefn.resourcesToBuild);
                if (canBuild) {
                    facility.posInCells = this.posInCells.clone();
                    var uwpe = new UniverseWorldPlaceEntities(universe, world, level, facility, null);
                    facility.initialize(uwpe);
                    level.facilities.push(facility);
                    this.entityToPlace = null;
                }
            }
        }
        else {
            var entitiesAtPos = level.entitiesAtPos(world, this.pos, []);
            for (var i = 0; i < entitiesAtPos.length; i++) {
                var entityAtPos = entitiesAtPos[i];
                if (entityAtPos != this.entitySelected) {
                    this.entitySelected = entityAtPos;
                    break;
                }
            }
        }
    }
    cancel(world, level) {
        this.entitySelected = null;
    }
    locatable() {
        return this._locatable;
    }
    selectInDirection(world, level, direction) {
        var facilityDefns = world.facilityDefns;
        var facilityDefnsByName = world.facilityDefnsByName;
        if (this.entityToPlace == null) {
            var facilityDefn = facilityDefns[0];
            var facility = new Facility(facilityDefn.name, this.posInCells.clone());
            this.entityToPlace = facility;
        }
        else {
            var facility = this.entityToPlace;
            if (facility != null) {
                var facilityDefn = facilityDefnsByName.get(facility.defnName);
                var facilityDefnIndex = facilityDefns.indexOf(facilityDefn);
                facilityDefnIndex = NumberHelper.wrapToRangeMax(facilityDefnIndex + direction, facilityDefns.length - 1);
                facility.defnName = facilityDefns[facilityDefnIndex].name;
            }
        }
        this.entitySelected = this.entityToPlace;
    }
    moveInDirection(level, direction) {
        this.posInCells.add(direction);
        level.map.boundsInCellsMinusOnes.trimCoords(this.posInCells);
    }
    // entity
    initialize(uwpe) {
        var place = uwpe.place;
        var level = place;
        var mapCellSizeInPixels = level.map.cellSizeInPixels;
        this.pos.overwriteWith(this.posInCells).add(Coords.Instances().Halves).multiply(mapCellSizeInPixels);
        this.sizeInPixels = mapCellSizeInPixels.clone();
        this.visual = new VisualRectangle(this.sizeInPixels, null, // colorFill
        Color.byName("Red"), // colorBorder
        null // ?
        );
        return this;
    }
    updateForTimerTick(uwpe) {
        var place = uwpe.place;
        var level = place;
        var mapCellSizeInPixels = level.map.cellSizeInPixels;
        var halves = Coords.Instances().Halves;
        this.pos.overwriteWith(this.posInCells).add(halves).multiply(mapCellSizeInPixels);
        return this;
    }
    // drawable
    draw(universe, world, display, level) {
        var uwpe = new UniverseWorldPlaceEntities(universe, world, null, this, null);
        this.visual.draw(uwpe, display);
        var textColor = Color.byName("Gray");
        var timeAsString = level.timeOfDay(world);
        var visualText = VisualText.fromTextImmediateFontAndColor("Time: " + timeAsString, null, // fontNameAndHeight
        textColor);
        var visual = new VisualAnchor(visualText, Coords.fromXY(0, 0), null);
        visual.draw(uwpe, level.paneStatus);
        var selectionAsText = "[none]";
        if (this.entitySelected != null) {
            selectionAsText = this.entitySelected.toString();
            if (this.entityToPlace != null) {
                var entityToPlacePos = this.entityToPlace.locatable().loc.pos;
                entityToPlacePos.overwriteWith(this.pos);
                this.entityToPlace.drawToDisplay(universe, world, display, level);
            }
        }
        var selectedText = "Selected:\n" + selectionAsText;
        visualText._text.contextSet(selectedText);
        var uwpe = new UniverseWorldPlaceEntities(universe, world, null, this, null);
        visual.draw(uwpe, level.paneSelection);
    }
}
