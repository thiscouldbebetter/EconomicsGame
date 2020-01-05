
// extensions

function ArrayExtensions()
{
	// extension class
}

{
	Array.prototype.addLookupLists = function(keyName)
	{
		for (var i = 0; i < this.length; i++)
		{
			var element = this[i];
			var key = element[keyName];
			var listForKey = this[key];
			if (listForKey == null)
			{
				var listForKey = [];
				this[key] = listForKey;
			}
			listForKey.push(element);
		}

		return this;
	};

	Array.prototype.insertElementSortedByKeyName = function(elementToSort, keyName)
	{
		var keyValueToSort = elementToSort[keyName];

		var i;
		for (i = 0; i < this.length; i++)
		{
			var elementAlreadySorted = this[i];
			var keyValueAlreadySorted = elementAlreadySorted[keyName];

			if (keyValueToSort < keyValueAlreadySorted)
			{
				break;
			}
		}

		this.insertElementAt(elementToSort, i);
	};
}
