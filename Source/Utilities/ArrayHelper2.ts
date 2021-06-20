
class ArrayHelper2
{
	static addLookupLists(array: any[], keyName: string): Map<string, any[]>
	{
		var returnMap = new Map<string, any[]>();

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

	static insertElementSortedByKeyName
	(
		array: any[], elementToSort: any, keyName: string
	): void
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
