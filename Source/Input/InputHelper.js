
function InputHelper()
{
	this.keyPressed = null;
}

{
	InputHelper.prototype.initialize = function()
	{
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
		document.body.onkeyup = this.handleEventKeyUp.bind(this);
	}

	// events

	InputHelper.prototype.handleEventKeyDown = function(event)
	{
		this.keyPressed = event.key;
	}

	InputHelper.prototype.handleEventKeyUp = function(event)
	{
		this.keyPressed = null;
	}
}
