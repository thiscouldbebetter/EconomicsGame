
class MapTerrain
{
	name: string;
	code: string;
	costToTraverse: number;
	visual: Visual;

	constructor
	(
		name: string,
		code: string,
		costToTraverse: number,
		visual: Visual
	)
	{
		this.name = name;
		this.code = code;
		this.costToTraverse = costToTraverse;
		this.visual = visual;
	}
}
