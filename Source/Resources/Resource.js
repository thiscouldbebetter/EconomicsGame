
function Resource(defnName, amount)
{
	this.defnName = defnName;
	this.amount = amount;
}

{
	Resource.prototype.defn = function(world)
	{
		return world.resourceDefns[this.defnName];
	}

	// cloneable

	Resource.prototype.clone = function()
	{
		return new Resource(this.defnName, this.amount);
	}
}

{
	// strings

	Resource.prototype.toString = function()
	{
		return this.defnName + ":" + this.amount;
	}
}
