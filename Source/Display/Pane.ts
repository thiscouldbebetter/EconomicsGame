
class Pane implements Display
{
	pos: Coords;
	sizeInPixels: Coords;

	drawPos: Coords;
	drawableDummy: DrawableDummy;

	constructor(pos: Coords, sizeInPixels: Coords)
	{
		this.pos = pos;
		this.sizeInPixels = sizeInPixels;

		// helper variables

		this.drawPos = Coords.create();
		this.drawableDummy = new DrawableDummy();
	}

	clear(): void
	{
		this.drawRectangle
		(
			Coords.Instances().Zeroes, this.sizeInPixels,
			this.colorBack, this.colorFore
		);
	}

	drawCircle
	(
		centerPos: Coords, radius: number, colorFill: Color,
		colorBorder: Color
	): void
	{
		var drawPos = this.drawPos;
		drawPos.overwriteWith(this.pos).add(centerPos);
		var display = Globals.Instance().display;
		display.drawCircle
		(
			drawPos, radius,
			colorFill, colorBorder, null // borderThickness
		);
	}

	drawPath
	(
		vertices: Coords[], color: Color, lineThickness: number,
		isClosed: boolean
	): void
	{
		var display = Globals.Instance().display;
		display.drawPath(vertices, color, lineThickness, isClosed);
	}

	drawRectangle
	(
		pos: Coords, size: Coords, colorFill: Color, colorBorder: Color
	): void
	{
		var drawPos = this.drawPos;
		drawPos.overwriteWith(this.pos).add(pos);
		var display = Globals.Instance().display;
		display.drawRectangle
		(
			drawPos, size,
			colorFill, colorBorder, null // ?
		);
	}

	drawText
	(
		textToDraw: string, fontHeightInPixels: number, pos: Coords,
		color: Color
	): void
	{
		var drawPos = this.drawPos;
		drawPos.overwriteWith(this.pos).add(pos);
		var display = Globals.Instance().display;
		display.drawText
		(
			textToDraw, fontHeightInPixels, drawPos, color,
			null, null, null, null // ?
		);
	}

	// Display implementation.

	colorBack: Color;
	colorFore: Color;
	fontHeightInPixels: number;
	fontName: string;
	sizeInPixelsHalf: Coords;
	sizesAvailable: Coords[];

	displayToUse() : Display { return this; }
	drawArc
	(
		center: Coords, radiusInner: number, radiusOuter: number,
		angleStartInTurns: number, angleStopInTurns: number, colorFill: Color,
		colorBorder: Color
	): void {}
	drawBackground(colorBack: Color, colorBorder: Color): void {}
	drawCircleWithGradient
	(
		center: Coords, radius: number, gradientFill: ValueBreakGroup,
		colorBorder: Color
	): void {}
	drawCrosshairs(center: Coords, radius: number, color: Color): void {}
	drawEllipse
	(
		center: Coords, semimajorAxis: number, semiminorAxis: number,
		rotationInTurns: number, colorFill: Color, colorBorder: Color
	): void {}
	drawImage(imageToDraw: Image2, pos: Coords): void {}
	drawImagePartial
	(
		imageToDraw: Image2, pos: Coords, regionToDrawAsBox: Box
	): void {}
	drawImagePartialScaled
	(
		imageToDraw: Image2, pos: Coords, regionToDrawAsBox: Box, sizeToDraw: Coords
	): void {}
	drawImageScaled(imageToDraw: Image2, pos: Coords, size: Coords): void {}
	drawLine(fromPos: Coords, toPos: Coords, color: Color, lineThickness: number): void {}
	drawMeshWithOrientation(mesh: MeshTextured, meshOrientation: Orientation): void {}
	drawPixel(pos: Coords, color: Color): void {}
	drawPolygon(vertices: Coords[], colorFill: Color, colorBorder: Color): void {}
	drawRectangleCentered
	(
		pos: Coords, size: Coords, colorFill: Color, colorBorder: Color
	): void {}
	drawWedge
	(
		center: Coords, radius: number, angleStartInTurns: number,
		angleStopInTurns: number, colorFill: Color, colorBorder: Color
	): void {}
	eraseModeSet(value: boolean): void {}
	fontSet(fontName: string, fontHeightInPixels: number): void {}
	flush(): void {}
	hide(universe: Universe): void {}
	initialize(universe: Universe): Display { return this; }
	rotateTurnsAroundCenter(turnsToRotate: number, centerOfRotation: Coords): void {}
	sizeDefault(): Coords { return this.sizeInPixels; }
	scaleFactor(): Coords { return Coords.Instances().Ones }
	stateRestore(): void {}
	stateSave(): void {}
	textWidthForFontHeight(textToMeasure: string, fontHeightInPixels: number): number { return 0; }
	toImage(): Image2 { return null; }
	toDomElement(): HTMLElement { return null; }

}
