"use strict";
class FacilityDefn {
    constructor(name, visual, resourcesToBuild, initialize, agentDirect, interactWith) {
        this.name = name;
        this.visual = visual;
        this.resourcesToBuild = resourcesToBuild;
        this.initialize = initialize;
        this.agentDirect = agentDirect;
        this.interactWith = interactWith;
    }
}
