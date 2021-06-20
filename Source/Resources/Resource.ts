
class Resource //
{
	defnName: string;
	amount: number;

	constructor(defnName: string, amount: number)
	{
		this.defnName = defnName;
		this.amount = amount;
	}

	defn(world: World2): ResourceDefn
	{
		return world.resourceDefnsByName.get(this.defnName);
	}

	// cloneable

	clone(): Resource
	{
		return new Resource(this.defnName, this.amount);
	}

	// strings

	toString(): string
	{
		return this.defnName + ":" + this.amount;
	}
}
