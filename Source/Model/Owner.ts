
class Owner
{
	name: string;
	resourceHolder: ResourceHolder;

	constructor(name: string)
	{
		this.name = name;

		this.resourceHolder = new ResourceHolder();
	}
}
