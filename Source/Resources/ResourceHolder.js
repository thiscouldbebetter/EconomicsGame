"use strict";
class ResourceHolder {
    constructor() {
        this.resources = [];
        this.resourcesByDefnName = new Map();
    }
    hasResources(resourcesToCheck) {
        var returnValue = true;
        for (var i = 0; i < resourcesToCheck.length; i++) {
            var resourceToCheck = resourcesToCheck[i];
            var resourceHeld = this.resourcesByDefnName.get(resourceToCheck.defnName);
            if (resourceHeld == null
                || resourceHeld.amount < resourceToCheck.amount) {
                returnValue = false;
            }
        }
        return returnValue;
    }
    resourceAdd(resourceToAdd) {
        var resourceDefnName = resourceToAdd.defnName;
        var resourceExisting = this.resourcesByDefnName.get(resourceDefnName);
        if (resourceExisting == null) {
            resourceExisting = new Resource(resourceDefnName, 0);
            this.resources.push(resourceExisting);
            this.resourcesByDefnName.set(resourceDefnName, resourceExisting);
        }
        resourceExisting.amount += resourceToAdd.amount;
        if (resourceExisting.amount <= 0) {
            ArrayHelper.remove(this.resources, resourceExisting);
            this.resourcesByDefnName.delete(resourceDefnName);
        }
    }
    resourceTransferToOther(resourceToTransfer, other) {
        if (this.hasResources([resourceToTransfer])) {
            other.resourceAdd(resourceToTransfer);
            resourceToTransfer.amount *= -1;
            this.resourceAdd(resourceToTransfer);
        }
    }
    resourcesAdd(resourcesToAdd) {
        for (var i = 0; i < resourcesToAdd.length; i++) {
            var resource = resourcesToAdd[i];
            this.resourceAdd(resource);
        }
    }
    // strings
    toString() {
        var returnValue = this.resources.toString().split(",").join("\n");
        return returnValue;
    }
}
