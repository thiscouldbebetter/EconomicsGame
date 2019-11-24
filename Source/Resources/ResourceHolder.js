
function ResourceHolder()
{
	this.resources = [];
}

{
	ResourceHolder.prototype.hasResources = function(resourcesToCheck)
	{
		var returnValue = true;

		for (var i = 0; i < resourcesToCheck.length; i++)
		{
			var resourceToCheck = resourcesToCheck[i];
			var resourceHeld = this.resources[resourceToCheck.defnName];
			if 
			(
				resourceHeld == null 
				|| resourceHeld.amount < resourceToCheck.amount
			)
			{
				returnValue = false;
			}
		}

		return returnValue;
	}

	ResourceHolder.prototype.resourceAdd = function(resourceToAdd)
	{
		var resourceDefnName = resourceToAdd.defnName;
		var resourceExisting = this.resources[resourceDefnName];
		if (resourceExisting == null)
		{
			resourceExisting = new Resource(resourceDefnName, 0);
			this.resources.push(resourceExisting);
			this.resources[resourceDefnName] = resourceExisting;
		}

		resourceExisting.amount += resourceToAdd.amount;

		if (resourceExisting.amount <= 0)
		{
			this.resources.remove(resourceExisting);
			delete this.resources[resourceDefnName];
		}
		
	}

	ResourceHolder.prototype.resourceTransferToOther = function
	(
		resourceToTransfer, other
	)
	{
		if (this.hasResources(resourceToTransfer) == true)
		{
			other.resourceAdd(resourceToTransfer);
			resourceToTransfer.amount *= -1;
			this.resourceAdd(resourceToTransfer);
		}
	}

	ResourceHolder.prototype.resourcesAdd = function(resourcesToAdd)
	{
		for (var i = 0; i < resourcesToAdd.length; i++)
		{
			var resource = resourcesToAdd[i];
			this.resourceAdd(resource);
		}
	}

	// strings

	ResourceHolder.prototype.toString = function()
	{
		var returnValue = this.resources.toString().split(",").join("\n");
		
		return returnValue;
	}


}
