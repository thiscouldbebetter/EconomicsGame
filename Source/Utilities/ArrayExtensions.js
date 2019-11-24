
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
	}

	Array.prototype.addLookups = function(keyName)
	{
		for (var i = 0; i < this.length; i++)
		{
			var element = this[i];
			var key = element[keyName];
			this[key] = element;
		}

		return this;
	}

	Array.prototype.clone = function()
	{
		var returnValues = [];

		for (var i = 0; i < this.length; i++)
		{
			var elementToClone = this[i];
			var elementCloned = elementToClone.clone();
			returnValues.push(elementCloned);
		}

		return returnValues;
	}

	Array.prototype.insertElementAt = function(element, index)
	{
		this.splice(index, 0, element);
	}
 
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
	}

	Array.prototype.remove = function(element)
	{
		var index = this.indexOf(element);
		if (index >= 0)
		{
			this.splice(index, 1);
		}
		return this;
	}

	Array.prototype.removeAt = function(index)
	{
		this.splice(index, 1);
		return this;
	}

}
