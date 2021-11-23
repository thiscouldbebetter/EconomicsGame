
class FacilityDefn
{
	name: string;
	visual: VisualBase;
	resourcesToBuild: Resource[];
	initialize: any;
	agentDirect: any;
	interactWith: any;

	constructor
	(
		name: string,
		visual: VisualBase,
		resourcesToBuild: Resource[],
		initialize: any,
		agentDirect: any,
		interactWith: any
	)
	{
		this.name = name;
		this.visual = visual;
		this.resourcesToBuild = resourcesToBuild;
		this.initialize = initialize;
		this.agentDirect = agentDirect;
		this.interactWith = interactWith;
	}
}
