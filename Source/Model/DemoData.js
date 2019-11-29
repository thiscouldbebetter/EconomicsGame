
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
		].addLookups("code");

		var mapEmplacementDefns = 
		[
			new MapEmplacementDefn
			(
				"Path",
				"x",
				.2, // costToTraverseMultiplier
				new VisualGroup
				([
					new VisualPath
					(
						[
							new Coords(0, 0).multiply(mapCellSizeInPixels),
							new Coords(0, 1).multiply(mapCellSizeInPixels),
						],
						false, // isClosed
						null, // colorFill
						"Tan"
					),
					new VisualPath
					(
						[
							new Coords(0, 0).multiply(mapCellSizeInPixels),
							new Coords(1, 0).multiply(mapCellSizeInPixels),
						],
						false, // isClosed
						null, // colorFill
						"Tan"
					),

				])				
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

		].addLookups("name");

		var facilitySize = mapCellSizeInPixels.clone().multiplyScalar(.6);

		var facilityDefns = this.world_FacilityDefns(facilitySize)

		var agentColor = "LightGreen";
		var agentDefns = 
		[
			new AgentDefn
			(
				"AgentDefn0",
				new VisualCircle
				(
					facilitySize.x / 2, agentColor, agentColor
				),
				0, // wealthInitial
				// resourcesWeighted
				[
					new Resource(resourceDefns["ResourceDefn0"].name, .1),
					new Resource(resourceDefns["ResourceDefn1"].name, .2),
				]
			)
		].addLookups("name");

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
					[
						new Coords(.5, 0).multiply(facilitySize),
						new Coords(1, .5).multiply(facilitySize),
						new Coords(1, 1).multiply(facilitySize),
						new Coords(0, 1).multiply(facilitySize),
						new Coords(0, .5).multiply(facilitySize),

					], 
					true, // isClosed
					null, houseColor // colors
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
					[
						new Coords(.5, 0).multiply(facilitySize),
						new Coords(.75, .05).multiply(facilitySize),
						new Coords(1, .5).multiply(facilitySize),
						new Coords(1, 1).multiply(facilitySize),
						new Coords(0, 1).multiply(facilitySize),
						new Coords(0, .5).multiply(facilitySize),
						new Coords(.25, .05).multiply(facilitySize),
					],
					true, // isClosed 
					null, farmColor // colors
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
		].addLookups("name");

		return facilityDefns;
	}
}
