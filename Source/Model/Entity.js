"use strict";
class Entity2 extends Entity {
    constructor() {
        super("", []);
    }
    drawToDisplay(u, w, d, l) {
        throw new Error("Must be implemented in subclass!");
    }
}
