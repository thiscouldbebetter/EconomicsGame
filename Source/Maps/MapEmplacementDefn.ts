
class MapEmplacementDefn
{
	name: string;
	code: string;
	costToTraverseMultiplier: number;
	visual: VisualBase;

	constructor
	(
		name: string,
		code: string,
		costToTraverseMultiplier: number,
		visual: VisualBase
	)
	{
		this.name = name;
		this.code = code;
		this.costToTraverseMultiplier = costToTraverseMultiplier;
		this.visual = visual;
	}
}
