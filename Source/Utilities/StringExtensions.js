
function StringExtensions()
{
	// Extension class.
}
{
	String.prototype.padLeft = function(charToPadWith, lengthToPadTo)
	{
		var returnValue = this;
		while (returnValue.length < lengthToPadTo)
		{
			returnValue = charToPadWith + returnValue;
		}
		return returnValue;
	}
}