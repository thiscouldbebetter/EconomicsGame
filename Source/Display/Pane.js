"use strict";
class Pane {
    constructor(pos, sizeInPixels) {
        this.pos = pos;
        this.sizeInPixels = sizeInPixels;
        // helper variables
        this.drawPos = Coords.create();
        this.drawableDummy = new DrawableDummy();
    }
    clear() {
        this.drawRectangle(Coords.Instances().Zeroes, this.sizeInPixels, this.colorBack, this.colorFore);
    }
    drawCircle(centerPos, radius, colorFill, colorBorder) {
        var drawPos = this.drawPos;
        drawPos.overwriteWith(this.pos).add(centerPos);
        var display = Globals.Instance().display;
        display.drawCircle(drawPos, radius, colorFill, colorBorder, null // borderThickness
        );
    }
    drawPath(vertices, color, lineThickness, isClosed) {
        var display = Globals.Instance().display;
        display.drawPath(vertices, color, lineThickness, isClosed);
    }
    drawRectangle(pos, size, colorFill, colorBorder) {
        var drawPos = this.drawPos;
        drawPos.overwriteWith(this.pos).add(pos);
        var display = Globals.Instance().display;
        display.drawRectangle(drawPos, size, colorFill, colorBorder // ?
        );
    }
    drawText(textToDraw, fontHeightInPixels, pos, color) {
        var drawPos = this.drawPos;
        drawPos.overwriteWith(this.pos).add(pos);
        var display = Globals.Instance().display;
        display.drawText(textToDraw, fontHeightInPixels, drawPos, color, null, null, null // ?
        );
    }
    displayToUse() { return this; }
    drawArc(center, radiusInner, radiusOuter, angleStartInTurns, angleStopInTurns, colorFill, colorBorder) { }
    drawBackground(colorBack, colorBorder) { }
    drawCircleWithGradient(center, radius, gradientFill, colorBorder) { }
    drawCrosshairs(center, numberOfLines, radiusOuter, radiusInner, color, lineThickness) { }
    drawEllipse(center, semimajorAxis, semiminorAxis, rotationInTurns, colorFill, colorBorder) { }
    drawImage(imageToDraw, pos) { }
    drawImagePartial(imageToDraw, pos, regionToDrawAsBox) { }
    drawImagePartialScaled(imageToDraw, pos, regionToDrawAsBox, sizeToDraw) { }
    drawImageScaled(imageToDraw, pos, size) { }
    drawLine(fromPos, toPos, color, lineThickness) { }
    drawMeshWithOrientation(mesh, meshOrientation) { }
    drawPixel(pos, color) { }
    drawPolygon(vertices, colorFill, colorBorder) { }
    drawRectangleWithRoundedCorners(pos, size, colorFill, colorBorder, cornerRadius) { }
    drawRectangleCentered(pos, size, colorFill, colorBorder) { }
    drawWedge(center, radius, angleStartInTurns, angleStopInTurns, colorFill, colorBorder) { }
    eraseModeSet(value) { }
    fontSet(fontName, fontHeightInPixels) { }
    flush() { }
    hide(universe) { }
    initialize(universe) { return this; }
    rotateTurnsAroundCenter(turnsToRotate, centerOfRotation) { }
    sizeDefault() { return this.sizeInPixels; }
    scaleFactor() { return Coords.Instances().Ones; }
    stateRestore() { }
    stateSave() { }
    textWidthForFontHeight(textToMeasure, fontHeightInPixels) { return 0; }
    toImage() { return null; }
    toDomElement() { return null; }
}
