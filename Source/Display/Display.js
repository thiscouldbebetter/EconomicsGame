
function Display(sizeInPixels, fontHeightInPixels, colorFore, colorBack)
{
	this.sizeInPixels = sizeInPixels;
	this.fontHeightInPixels = fontHeightInPixels;
	this.colorFore = colorFore;
	this.colorBack = colorBack;

	// helper variables

	this.drawPos = new Coords();
	this.drawableDummy = new DrawableDummy();
}

{
	// constants

	Display.RadiansPerCycle = Math.PI * 2;

	// methods

	Display.prototype.clear = function()
	{
		this.drawRectangle
		(
			Coords.Instances.Zeroes, this.sizeInPixels,
			this.colorBack, this.colorFore
		);
	}

	Display.prototype.drawCircle = function(centerPos, radius, colorFill, colorBorder)
	{
		this.graphics.beginPath();
		this.graphics.arc
		(
			centerPos.x, centerPos.y,
			radius,
			0, Display.RadiansPerCycle
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

	Display.prototype.drawPath = function
	(
		pos, vertices, isClosed, colorFill, colorBorder
	)
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
	
		if (isClosed == true)
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


	Display.prototype.drawRectangle = function
	(
		pos, size, colorFill, colorBorder
	)
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

	Display.prototype.drawText = function(textToDraw, color, pos)
	{
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

	Display.prototype.initialize = function()
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
