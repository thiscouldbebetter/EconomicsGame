"use strict";
class Globals {
    static Instance() {
        if (Globals._instance == null) {
            Globals._instance = new Globals();
        }
        return Globals._instance;
    }
    // methods
    initialize(timerTicksPerSecond, display, world) {
        this.timerTicksPerSecond = timerTicksPerSecond;
        this.display = display;
        this.world = world;
        this.inputHelper = new InputHelper();
        this.display.initialize(null);
        this.world.initialize2(null);
        var millisecondsPerTimerTick = Math.floor(1000 / this.timerTicksPerSecond);
        this.timer = setInterval(this.handleEventTimerTick.bind(this), millisecondsPerTimerTick);
        this.inputHelper.initialize(null);
    }
    // events
    handleEventTimerTick() {
        this.world.updateForTimerTick(null);
    }
}
