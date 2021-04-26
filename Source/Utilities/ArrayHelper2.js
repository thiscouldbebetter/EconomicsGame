
class ArrayHelper2
{
	static addLookupLists(array, keyName)
	{
		var returnMap = new Map();

		for (var i = 0; i < array.length; i++)
		{
			var element = array[i];
			var key = element[keyName];
			var listForKey = returnMap.get(key);
			if (listForKey == null)
			{
				var listForKey = [];
				returnMap.set(key, listForKey);
			}
			listForKey.push(element);
		}

		return returnMap;
	}

	static insertElementSortedByKeyName(array, elementToSort, keyName)
	{
		var keyValueToSort = elementToSort[keyName];

		var i;
		for (i = 0; i < array.length; i++)
		{
			var elementAlreadySorted = array[i];
			var keyValueAlreadySorted = elementAlreadySorted[keyName];

			if (keyValueToSort < keyValueAlreadySorted)
			{
				break;
			}
		}

		ArrayHelper.insertElementAt(array, elementToSort, i);
	}
}
