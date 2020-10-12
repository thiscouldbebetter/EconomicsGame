
class ResourceHolder
{
	constructor()
	{
		this.resources = [];
	}

	hasResources(resourcesToCheck)
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

	resourceAdd(resourceToAdd)
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

	resourceTransferToOther
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

	resourcesAdd(resourcesToAdd)
	{
		for (var i = 0; i < resourcesToAdd.length; i++)
		{
			var resource = resourcesToAdd[i];
			this.resourceAdd(resource);
		}
	}

	// strings

	toString()
	{
		var returnValue = this.resources.toString().split(",").join("\n");

		return returnValue;
	}


}
