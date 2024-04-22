"use strict";
class World2 extends World {
    constructor(name, dayNightCyclePeriodInSeconds, resourceDefns, mapEmplacementDefns, facilityDefns, agentDefns, actions, level) {
        super(name, null, // timeCreated
        null, // worldDefn
        (name) => level, // placeGetByName
        null // placeInitialName
        );
        this.dayNightCyclePeriodInSeconds = dayNightCyclePeriodInSeconds;
        this.resourceDefns = resourceDefns;
        this.resourceDefnsByName =
            ArrayHelper.addLookupsByName(this.resourceDefns);
        this.mapEmplacementDefns = mapEmplacementDefns;
        this.mapEmplacementDefnsByName =
            ArrayHelper.addLookupsByName(this.mapEmplacementDefns);
        this.facilityDefns = facilityDefns;
        this.facilityDefnsByName =
            ArrayHelper.addLookupsByName(this.facilityDefns);
        this.agentDefns = agentDefns;
        this.agentDefnsByName =
            ArrayHelper.addLookupsByName(this.agentDefns);
        this.actions = actions;
        this.actionsByName = ArrayHelper.addLookupsByName(this.actions);
        this.level = level;
        this.timerTicksSoFar = 0;
    }
    initialize2(universe) {
        this.level.initialize2(universe, this);
    }
    updateForTimerTick(uwpe) {
        var universe = uwpe.universe;
        this.level.updateForTimerTick2(universe, this);
        this.timerTicksSoFar++;
    }
}
