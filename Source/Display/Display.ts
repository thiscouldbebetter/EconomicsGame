
class Display2
{
	sizeInPixels: Coords;
	fontHeightInPixels: number;
	colorFore: Color;
	colorBack: Color;

	drawPos: Coords;
	drawableDummy: DrawableDummy;

	canvas: any;
	graphics: any;

	constructor
	(
		sizeInPixels: Coords,
		fontHeightInPixels: number,
		colorFore: Color,
		colorBack: Color
	)
	{
		this.sizeInPixels = sizeInPixels;
		this.fontHeightInPixels = fontHeightInPixels;
		this.colorFore = colorFore;
		this.colorBack = colorBack;

		// helper variables

		this.drawPos = Coords.create();
		this.drawableDummy = new DrawableDummy();
	}

	// constants

	static RadiansPerCycle: number = Math.PI * 2;

	// methods

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
		this.graphics.beginPath();
		this.graphics.arc
		(
			centerPos.x, centerPos.y,
			radius,
			0, Display2.RadiansPerCycle
		);

		if (colorFill != null)
		{
			this.graphics.fillStyle = colorFill;
			this.graphics.fill();
		}

		if (colorBorder != null)
		{
			this.graphics.strokeStyle = colorBorder;
			this.graphics.stroke();
		}
	}

	drawPath
	(
		pos: Coords, vertices: Coords[], isClosed: boolean,
		colorFill: Color, colorBorder: Color
	): void
	{
		this.graphics.beginPath();

		var vertex = vertices[0];
		this.graphics.moveTo(pos.x + vertex.x, pos.y + vertex.y);

		for (var i = 1; i < vertices.length; i++)
		{
			vertex = vertices[i];
			this.graphics.lineTo
			(
				pos.x + vertex.x, pos.y + vertex.y
			);
		}

		if (isClosed)
		{
			this.graphics.closePath();

			if (colorFill != null)
			{
				this.graphics.fillStyle = colorFill;
				this.graphics.fill();
			}
		}

		if (colorBorder != null)
		{
			this.graphics.strokeStyle = colorBorder;
			this.graphics.stroke();
		}
	}


	drawRectangle
	(
		pos: Coords, size: Coords, colorFill: Color, colorBorder: Color
	): void
	{
		if (colorFill != null)
		{
			this.graphics.fillStyle = colorFill;
			this.graphics.fillRect
			(
				pos.x, pos.y,
				size.x, size.y
			);
		}

		if (colorBorder != null)
		{
			this.graphics.strokeStyle = colorBorder;
			this.graphics.strokeRect
			(
				pos.x, pos.y,
				size.x, size.y
			);
		}
	}

	drawText(textToDraw: string, color: Color, pos: Coords): void
	{
		this.graphics.fillStyle = color;

		var textLines = textToDraw.split("\n");
		for (var i = 0; i < textLines.length; i++)
		{
			var textLine = textLines[i];
			this.graphics.fillText
			(
				textLine,
				pos.x,
				pos.y + ( (i + 1) * this.fontHeightInPixels )
			);
		}
	}

	initialize(): void
	{
		this.canvas = document.createElement("canvas");
		this.canvas.width = this.sizeInPixels.x;
		this.canvas.height = this.sizeInPixels.y;

		var divMain = document.getElementById("divMain");
		divMain.appendChild(this.canvas);

		this.graphics = this.canvas.getContext("2d");

		this.graphics.font =
			this.fontHeightInPixels + "px sans-serif";
	}
}
