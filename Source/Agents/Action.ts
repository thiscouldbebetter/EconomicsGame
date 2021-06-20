
class Action
{
	constructor(name, perform)
	{
		this.name = name;
		this.perform = perform;
	}

	// instances

	static Instances()
	{
		if (Action._instances == null)
		{
			Action._instances = new Action_Instances();
		}
		return Action._instances;
	}
}

class Action_Instances
{
	constructor()
	{
		this.Activate = new Action
		(
			"Activate",
			function(world, level, actor)
			{
				level.cursor.activate(world, level);
			}
		);

		this.Cancel = new Action
		(
			"Cancel",
			function(world, level, actor)
			{
				level.cursor.cancel(world, level);
			}
		);

		this.MoveDown = new Action
		(
			"MoveDown",
			function(world, level, actor)
			{
				level.cursor.moveInDirection(level, new Coords(0, 1));
			}
		);

		this.MoveLeft = new Action
		(
			"MoveLeft",
			function(world, level, actor)
			{
				level.cursor.moveInDirection(level, new Coords(-1, 0));
			}
		);

		this.MoveRight = new Action
		(
			"MoveRight",
			function(world, level, actor)
			{
				level.cursor.moveInDirection(level, new Coords(1, 0));
			}
		);

		this.MoveUp = new Action
		(
			"MoveUp",
			function(world, level, actor)
			{
				level.cursor.moveInDirection(level, new Coords(0, -1));
			}
		);

		this.SelectNext = new Action
		(
			"SelectNext",
			function(world, level, actor)
			{
				level.cursor.selectInDirection(world, level, 1);
			}
		);

		this.SelectPrevious = new Action
		(
			"SelectPrevious",
			function(world, level, actor)
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
