"use strict";
class Resource //
 {
    constructor(defnName, amount) {
        this.defnName = defnName;
        this.amount = amount;
    }
    defn(world) {
        return world.resourceDefnsByName.get(this.defnName);
    }
    // cloneable
    clone() {
        return new Resource(this.defnName, this.amount);
    }
    // strings
    toString() {
        return this.defnName + ":" + this.amount;
    }
}
