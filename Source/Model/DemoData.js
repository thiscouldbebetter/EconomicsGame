"use strict";
class DemoData {
    world(mapSizeInPixels) {
        var mapSizeInCells = new Coords(16, 16, 1);
        var mapCellSizeInPixels = mapSizeInPixels.clone().divide(mapSizeInCells);
        var mapTerrains = [
            new MapTerrain("Floor", ".", 1, // costToTraverse
            new VisualRectangle(mapCellSizeInPixels, Color.byName("Green"), // colorFill
            Color.byName("LightGray"), // colorBorder
            null)),
            new MapTerrain("Wall", "x", 1000000, // costToTraverse
            new VisualRectangle(mapCellSizeInPixels, Color.byName("GrayLight"), // colorFill
            Color.byName("White"), // colorBorder
            null)),
        ];
        var visualPathColor = Color.byName("Tan");
        var visualPath = new VisualGroup([
            new VisualPath(new Path([
                Coords.fromXY(0, -.5).multiply(mapCellSizeInPixels),
                Coords.fromXY(0, .5).multiply(mapCellSizeInPixels),
            ]), visualPathColor, null, null // ?
            ),
            new VisualPath(new Path([
                Coords.fromXY(-.5, 0).multiply(mapCellSizeInPixels),
                Coords.fromXY(.5, 0).multiply(mapCellSizeInPixels),
            ]), visualPathColor, null, null // ?
            ),
        ]);
        var mapEmplacementDefns = [
            new MapEmplacementDefn("Path", "x", .2, // costToTraverseMultiplier
            visualPath),
        ];
        var map = new MapOfCells2(mapSizeInPixels, mapTerrains, mapEmplacementDefns, 
        // cellTerrainsAsStrings
        [
            "xxxxxxxxxxxxxxxx",
            "x..............x",
            "x..............x",
            "x..............x",
            "x..............x",
            "x..............x",
            "x..............x",
            "x..............x",
            "x..............x",
            "x..............x",
            "x..............x",
            "x..............x",
            "x..............x",
            "x..............x",
            "x..............x",
            "xxxxxxxxxxxxxxxx",
        ], 
        // cellEmplacementsAsStrings
        [
            "................",
            "................",
            "........x.......",
            "........x.......",
            "........x.......",
            "........x.......",
            "........x.......",
            "....xxxxxxxxx...",
            "........x.......",
            "........x.......",
            "........x.......",
            "........x.......",
            "........x.......",
            "................",
            "................",
            "................",
        ]);
        map.terrains = mapTerrains;
        var resourceDefns = [
            new ResourceDefn("ResourceDefn0", new VisualRectangle(mapCellSizeInPixels, null, // colorFill
            Color.byName("Red"), null // ?
            )),
            new ResourceDefn("ResourceDefn1", new VisualRectangle(mapCellSizeInPixels, null, // colorFill
            Color.byName("Orange"), null // ?
            )),
            new ResourceDefn("ResourceDefn2", new VisualRectangle(mapCellSizeInPixels, null, // colorFill
            Color.byName("Yellow"), null // ?
            ))
        ];
        var facilitySize = mapCellSizeInPixels.clone().multiplyScalar(.6);
        var facilityDefns = this.world_FacilityDefns(facilitySize);
        var agentColor = Color.byName("Gray");
        var agentRadius = facilitySize.x / 2;
        var agentVisual = 
        //new VisualCircle(facilitySize.x / 2, agentColor, agentColor);
        VisualBuilder.Instance().circleWithEyes(agentRadius, agentColor, agentRadius / 2, null);
        var agentDefns = [
            new AgentDefn("AgentDefn0", agentVisual)
        ];
        var actions = Action2.Instances2()._All;
        var level = new Level("Level0", map, new Owner("Owner0"), 
        // facilities
        [
            new Facility("House", Coords.fromXY(2, 2)),
            new Facility("House", Coords.fromXY(12, 4)),
            new Facility("Farm", Coords.fromXY(12, 12)),
            new Facility("Marketplace", Coords.fromXY(4, 5)),
        ], 
        // agents
        []);
        var world = new World2("World0", 60, // dayNightCyclePeriodInSeconds
        resourceDefns, mapEmplacementDefns, facilityDefns, agentDefns, actions, level);
        return world;
    }
    world_FacilityDefns(facilitySize) {
        var houseColor = Color.byName("GrayDark");
        var house = new FacilityDefn("House", new VisualGroup([
            new VisualPath(new Path([
                Coords.fromXY(0, -.5).multiply(facilitySize),
                Coords.fromXY(.5, 0).multiply(facilitySize),
                Coords.fromXY(.5, .5).multiply(facilitySize),
                Coords.fromXY(-.5, .5).multiply(facilitySize),
                Coords.fromXY(-.5, 0).multiply(facilitySize)
            ]), houseColor, 1, // lineThickness
            true),
            VisualText.fromTextAndColor("House", houseColor)
        ]), 
        // resourcesToBuild
        [], 
        // initialize
        (world, level, facility) => {
            var facilityPosInCells = facility.posInCells;
            var agentName = "Agent" + level.facilities.indexOf(facility);
            var agent = new Agent(agentName, "AgentDefn0", facilityPosInCells.clone());
            level.agents.push(agent);
        }, 
        // agentDirect
        (world, level, agent, facility) => {
            var isAtGoal = agent.approach(world, level, facility);
            if (isAtGoal == true) {
                agent.resourceHolder.resourceTransferToOther(new Resource("Food", 1), facility.resourceHolder);
            }
        }, null // interactWith
        );
        var farmColor = Color.byName("Blue");
        var farm = new FacilityDefn("Farm", new VisualGroup([
            new VisualPath(new Path([
                Coords.fromXY(0, -.5).multiply(facilitySize),
                Coords.fromXY(.25, -.45).multiply(facilitySize),
                Coords.fromXY(.5, 0).multiply(facilitySize),
                Coords.fromXY(.5, .5).multiply(facilitySize),
                Coords.fromXY(-.5, .5).multiply(facilitySize),
                Coords.fromXY(-.5, 0).multiply(facilitySize),
                Coords.fromXY(-.25, -.45).multiply(facilitySize),
            ]), farmColor, 1, // lineThickness
            true // isClosed
            ),
            VisualText.fromTextAndColor("Farm", farmColor)
        ]), 
        // resourcesToBuild
        [], null, // initialize
        // agentDirect
        (world, level, agent, facility) => {
            var isAtGoal = agent.approach(world, level, facility);
            if (isAtGoal == true) {
                facility.resourceHolder.resourceAdd(new Resource("Food", 1));
            }
        }, null // interactWith
        );
        var marketplaceColor = Color.byName("Orange");
        var marketplace = new FacilityDefn("Marketplace", new VisualGroup([
            new VisualRectangle(facilitySize, null, marketplaceColor, // colors
            null // ?
            ),
            VisualText.fromTextAndColor("Marketplace", marketplaceColor)
        ]), 
        // resourcesToBuild
        [], null, // initialize
        // agentDirect
        (world, level, agent, facility) => {
            var isAtGoal = agent.approach(world, level, facility);
            if (isAtGoal == true) {
                facility.resourceHolder.resourceTransferToOther(new Resource("Food", 1), agent.resourceHolder);
            }
        }, null // interactWith
        );
        var facilityDefns = [
            house,
            farm,
            marketplace,
        ];
        return facilityDefns;
    }
}
