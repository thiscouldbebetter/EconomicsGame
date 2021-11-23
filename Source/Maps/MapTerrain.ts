
class MapTerrain
{
	name: string;
	code: string;
	costToTraverse: number;
	visual: VisualBase;

	constructor
	(
		name: string,
		code: string,
		costToTraverse: number,
		visual: VisualBase
	)
	{
		this.name = name;
		this.code = code;
		this.costToTraverse = costToTraverse;
		this.visual = visual;
	}
}
