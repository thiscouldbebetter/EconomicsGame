
// demo

function DemoData()
{
	// do nothing
}
{
	DemoData.prototype.world = function(mapSizeInPixels)
	{
		var mapSizeInCells = new Coords(16, 16);
		var mapCellSizeInPixels = mapSizeInPixels.clone().divide
		(
			mapSizeInCells
		);

		var mapTerrains =
		[
			new MapTerrain
			(
				"Floor",
				".",
				1, // costToTraverse
				new VisualRectangle
				(
					mapCellSizeInPixels,
					"Green", // colorFill
					"LightGray" // colorBorder
				)
			),
			new MapTerrain
			(
				"Wall",
				"x",
				1000000, // costToTraverse
				new VisualRectangle
				(
					mapCellSizeInPixels,
					"LightGray", // colorFill
					"White" // colorBorder
				)

			),
		].addLookups(x => x.code);

		var visualPathColor = "Tan";
		var visualPath = new VisualGroup
		([
			new VisualPath
			(
				new Path
				([
					new Coords(0, -.5).multiply(mapCellSizeInPixels),
					new Coords(0, .5).multiply(mapCellSizeInPixels),
				]),
				visualPathColor
			),
			new VisualPath
			(
				new Path
				([
					new Coords(-.5, 0).multiply(mapCellSizeInPixels),
					new Coords(.5, 0).multiply(mapCellSizeInPixels),
				]),
				visualPathColor
			),
		]);

		var mapEmplacementDefns =
		[
			new MapEmplacementDefn
			(
				"Path",
				"x",
				.2, // costToTraverseMultiplier
				visualPath
			),
		];

		var map = new Map
		(
			mapSizeInPixels,
			mapTerrains,
			mapEmplacementDefns,
			// cellTerrainsAsStrings
			[
				"xxxxxxxxxxxxxxxx",
				"x..............x",
				"x..............x",
				"x..............x",
				"x..............x",
				"x..............x",
				"x..............x",
				"x..............x",
				"x..............x",
				"x..............x",
				"x..............x",
				"x..............x",
				"x..............x",
				"x..............x",
				"x..............x",
				"xxxxxxxxxxxxxxxx",
			],

			// cellEmplacementsAsStrings
			[
				"................",
				"................",
				"........x.......",
				"........x.......",
				"........x.......",
				"........x.......",
				"........x.......",
				"....xxxxxxxxx...",
				"........x.......",
				"........x.......",
				"........x.......",
				"........x.......",
				"........x.......",
				"................",
				"................",
				"................",
			]

		);

		map.terrains = mapTerrains;

		var resourceDefns =
		[
			new ResourceDefn
			(
				"ResourceDefn0",
				new VisualRectangle
				(
					mapCellSizeInPixels,
					null, // colorFill
					"Red"
				)
			),

			new ResourceDefn
			(
				"ResourceDefn1",
				new VisualRectangle
				(
					mapCellSizeInPixels,
					null, // colorFill
					"Orange"
				)
			),

			new ResourceDefn
			(
				"ResourceDefn2",
				new VisualRectangle
				(
					mapCellSizeInPixels,
					null, // colorFill
					"Yellow"
				)
			),

		].addLookupsByName();

		var facilitySize = mapCellSizeInPixels.clone().multiplyScalar(.6);

		var facilityDefns = this.world_FacilityDefns(facilitySize)

		var agentColor = "Gray";
		var agentRadius = facilitySize.x / 2;
		var agentVisual =
			//new VisualCircle(facilitySize.x / 2, agentColor, agentColor);
			VisualBuilder.Instance().circleWithEyes
			(
				agentRadius, agentColor, agentRadius / 2
			);

		var agentDefns =
		[
			new AgentDefn
			(
				"AgentDefn0",
				agentVisual,
				0, // wealthInitial
				// resourcesWeighted
				[
					new Resource(resourceDefns["ResourceDefn0"].name, .1),
					new Resource(resourceDefns["ResourceDefn1"].name, .2),
				]
			)
		].addLookupsByName();

		var actions = Action.Instances._All;

		var level = new Level
		(
			"Level0",
			map,
			new Owner("Owner0"),
			// facilities
			[
				new Facility("House", new Coords(2, 2)),
				new Facility("House", new Coords(12, 4)),
				new Facility("Farm", new Coords(12, 12)),
				new Facility("Marketplace", new Coords(4, 5)),
			],
			// agents
			[]
		);

		var world = new World
		(
			"World0",
			60, // dayNightCyclePeriodInSeconds
			resourceDefns,
			mapEmplacementDefns,
			facilityDefns,
			agentDefns,
			actions,
			level
		);

		return world;
	}

	DemoData.prototype.world_FacilityDefns = function(facilitySize)
	{
		var houseColor = "DarkGray";
		var house = new FacilityDefn
		(
			"House",
			new VisualGroup
			([
				new VisualPath
				(
					new Path
					([
						new Coords(0, -.5).multiply(facilitySize),
						new Coords(.5, 0).multiply(facilitySize),
						new Coords(.5, .5).multiply(facilitySize),
						new Coords(-.5, .5).multiply(facilitySize),
						new Coords(-.5, 0).multiply(facilitySize)
					]),
					houseColor,
					1, // lineThickness
					true, // isClosed
				),
				new VisualText("House", houseColor)
			]),
			// resourcesToBuild
			[],
			// initialize
			function(world, level, facility)
			{
				var facilityPosInCells = facility.posInCells;
				var agentName = "Agent" + level.facilities.indexOf(facility);
				var agent = new Agent(agentName, "AgentDefn0", facilityPosInCells.clone());
				level.agents.push(agent);
			},
			// agentDirect
			function(world, level, agent, facility)
			{
				var isAtGoal = agent.approach
				(
					world, level, facility
				);

				if (isAtGoal == true)
				{
					agent.resourceHolder.resourceTransferToOther
					(
						new Resource("Food", 1),
						facility.resourceHolder
					);
				}
			}
		);

		var farmColor = "LightBlue";
		var farm = new FacilityDefn
		(
			"Farm",
			new VisualGroup
			([
				new VisualPath
				(
					new Path
					([
						new Coords(0, -.5).multiply(facilitySize),
						new Coords(.25, -.45).multiply(facilitySize),
						new Coords(.5, 0).multiply(facilitySize),
						new Coords(.5, .5).multiply(facilitySize),
						new Coords(-.5, .5).multiply(facilitySize),
						new Coords(-.5, 0).multiply(facilitySize),
						new Coords(-.25, -.45).multiply(facilitySize),
					]),
					farmColor,
					1, // lineThickness
					true // isClosed
				),
				new VisualText("Farm", farmColor)
			]),
			// resourcesToBuild
			[],
			null, // initialize
			// agentDirect
			function(world, level, agent, facility)
			{
				var isAtGoal = agent.approach
				(
					world, level, facility
				);

				if (isAtGoal == true)
				{
					facility.resourceHolder.resourceAdd
					(
						new Resource("Food", 1)
					);
				}
			}
		);

		var marketplaceColor = "Orange";
		var marketplace = new FacilityDefn
		(
			"Marketplace",
			new VisualGroup
			([
				new VisualRectangle
				(
					facilitySize,
					null, marketplaceColor // colors
				),
				new VisualText("Marketplace", marketplaceColor)
			]),
			// resourcesToBuild
			[],
			null, // initialize
			// agentDirect
			function(world, level, agent, facility)
			{
				var isAtGoal = agent.approach
				(
					world, level, facility
				);

				if (isAtGoal == true)
				{
					facility.resourceHolder.resourceTransferToOther
					(
						new Resource("Food", 1),
						agent.resourceHolder
					);
				}
			}
		);

		var facilityDefns =
		[
			house,
			farm,
			marketplace,
		].addLookupsByName();

		return facilityDefns;
	}
}
