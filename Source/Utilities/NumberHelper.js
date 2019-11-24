
function NumberHelper()
{
	// static class
}

{
	NumberHelper.wrapValueToRangeMinMax = function(valueToWrap, min, max)
	{
		var rangeSize = max - min;

		while (valueToWrap < min)
		{
			valueToWrap += rangeSize;
		}

		while (valueToWrap >= max)
		{
			valueToWrap -= rangeSize;
		}

		return valueToWrap;
	}
}
