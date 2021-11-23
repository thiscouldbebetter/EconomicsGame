
class Action2 extends Action
{
	perform2: (w: World2, l: Level, a: Actor2) => void;

	constructor
	(
		name: string,
		perform2: (w: World2, l: Level, a: Actor2) => void
	)
	{
		super(name, null);
		this.perform2 = perform2;
	}

	// instances

	static _instances2: Action2_Instances;
	static Instances2(): Action2_Instances
	{
		if (Action2._instances2 == null)
		{
			Action2._instances2 = new Action2_Instances();
		}
		return Action2._instances2;
	}
}

class Action2_Instances
{
	Activate: Action2;
	Cancel: Action2;
	MoveDown: Action2;
	MoveLeft: Action2;
	MoveRight: Action2;
	MoveUp: Action2;
	SelectNext: Action2;
	SelectPrevious: Action2;

	_All: Action2[];

	constructor()
	{
		this.Activate = new Action2
		(
			"Activate",
			(world: World2, level: Level, actor: Actor2) =>
			{
				level.cursor.activate(null, world, level);
			}
		);

		this.Cancel = new Action2
		(
			"Cancel",
			(world: World2, level: Level, actor: Actor2) =>
			{
				level.cursor.cancel
				(
					world, level
				);
			}
		);

		this.MoveDown = new Action2
		(
			"MoveDown",
			(world: World2, level: Level, actor: Actor2) =>
			{
				level.cursor.moveInDirection(level, Coords.fromXY(0, 1));
			}
		);

		this.MoveLeft = new Action2
		(
			"MoveLeft",
			(world: World2, level: Level, actor: Actor2) =>
			{
				level.cursor.moveInDirection(level, Coords.fromXY(-1, 0));
			}
		);

		this.MoveRight = new Action2
		(
			"MoveRight",
			(world: World2, level: Level, actor: Actor2) =>
			{
				level.cursor.moveInDirection(level, Coords.fromXY(1, 0));
			}
		);

		this.MoveUp = new Action2
		(
			"MoveUp",
			(world: World2, level: Level, actor: Actor2) =>
			{
				level.cursor.moveInDirection(level, Coords.fromXY(0, -1));
			}
		);

		this.SelectNext = new Action2
		(
			"SelectNext",
			(world: World2, level: Level, actor: Actor2) =>
			{
				level.cursor.selectInDirection(world, level, 1);
			}
		);

		this.SelectPrevious = new Action2
		(
			"SelectPrevious",
			(world: World2, level: Level, actor: Actor2) =>
			{
				level.cursor.selectInDirection(world, level, -1);
			}
		);

		this._All =
		[
			this.Activate,
			this.Cancel,
			this.MoveDown,
			this.MoveLeft,
			this.MoveRight,
			this.MoveUp,
			this.SelectNext,
			this.SelectPrevious,
		];
	}
}
