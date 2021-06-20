
class MapEmplacementDefn
{
	name: string;
	code: string;
	costToTraverseMultiplier: number;
	visual: Visual;

	constructor
	(
		name: string,
		code: string,
		costToTraverseMultiplier: number,
		visual: Visual
	)
	{
		this.name = name;
		this.code = code;
		this.costToTraverseMultiplier = costToTraverseMultiplier;
		this.visual = visual;
	}
}
