"use strict";
function main() {
    var display = new Display2D([Coords.fromXY(400, 300)], new FontNameAndHeight("sans-serif", 8), Color.byName("GrayLight"), // colorFore
    Color.byName("White"), // colorBack
    false // isInvisible
    );
    //display.drawableDummy = new DrawableDummy();
    //display.drawableDummy.pos = Coords.create();
    var mapSizeInPixels = display.sizeInPixels.clone().multiply(Coords.fromXY(.75, 1));
    var world = new DemoData().world(mapSizeInPixels);
    Globals.Instance().initialize(10, // timerTicksPerSecond
    display, world);
}
