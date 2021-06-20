
class PathAgent
{
	map: MapOfCells;
	startPos: Coords;
	goalPos: Coords;

	nodes: PathNode[];

	constructor(map: MapOfCells, startPos: Coords, goalPos: Coords)
	{
		this.map = map;
		this.startPos = startPos;
		this.goalPos = goalPos;

		this.nodes = [];
	}

	calculate(): void
	{
		var nodesToConsider = this.calculate_1_InitializeListOfNodesToConsider();
		var nodesToConsiderById = new Map<string, PathNode>();
		var nodesAlreadyConsidered = new Map<string, PathNode>();

		while (nodesToConsider.length > 0)
		{
			var nodeToConsider = nodesToConsider[0];

			if (nodeToConsider.cellPos.equals(this.goalPos) )
			{
				this.nodes = this.calculate_3_BuildListOfNodesFromStartToGoal
				(
					nodeToConsider
				);
				break;
			}
			else
			{
				ArrayHelper.removeAt(nodesToConsider, 0);
				var nodeToConsiderID = nodeToConsider.id(this.map.sizeInCells);
				nodesAlreadyConsidered.set(nodeToConsiderID, nodeToConsider);

				this.calculate_2_AddNeighborsToListOfNodesToConsider
				(
					nodeToConsider,
					nodesToConsider,
					nodesToConsiderById,
					nodesAlreadyConsidered
				);
			}
		}
	}

	calculate_1_InitializeListOfNodesToConsider(): PathNode[]
	{
		var nodesToConsider = [];

		var displacementFromStartToGoal = Coords.create();

		displacementFromStartToGoal.overwriteWith
		(
			this.goalPos
		).subtract
		(
			this.startPos
		);

		var costFromStartToGoalEstimated =
			displacementFromStartToGoal.absolute().sumOfDimensions();

		var startNode = new PathNode
		(
			this.startPos, // cellPos
			0, // costFromStart
			costFromStartToGoalEstimated,
			null // prev
		);

		nodesToConsider.push(startNode);

		return nodesToConsider;
	}

	calculate_2_AddNeighborsToListOfNodesToConsider
	(
		nodeToFindNeighborsOf: PathNode,
		nodesToConsider: PathNode[],
		nodesToConsiderById: Map<string, PathNode>,
		nodesAlreadyConsidered: Map<string, PathNode>
	): void
	{
		var mapSizeInCells = this.map.sizeInCells;

		var nodesNeighboring = nodeToFindNeighborsOf.neighbors(this);

		for (var n = 0; n < nodesNeighboring.length; n++)
		{
			var nodeNeighbor = nodesNeighboring[n];
			var nodeNeighborID = nodeNeighbor.id(mapSizeInCells);

			var hasNodeNeighborNotYetBeenSeen =
			(
				nodesAlreadyConsidered.has(nodeNeighborID)
				&& nodesToConsiderById.has(nodeNeighborID)
			);

			if (hasNodeNeighborNotYetBeenSeen)
			{
				ArrayHelper2.insertElementSortedByKeyName
				(
					nodesToConsider,
					nodeNeighbor,
					"costToGoalEstimated"
				);

				nodesToConsider.push(nodeNeighbor);
				nodesToConsiderById.set(nodeNeighborID, nodeNeighbor);
			}
		}
	}

	calculate_3_BuildListOfNodesFromStartToGoal(nodeGoal: PathNode): PathNode[]
	{
		var returnValues = new Array<PathNode>();

		var nodeCurrent = nodeGoal;

		while (nodeCurrent != null)
		{
			ArrayHelper.insertElementAt(returnValues, nodeCurrent, 0);
			nodeCurrent = nodeCurrent.prev;
		}

		for (var i = 0; i < returnValues.length; i++)
		{
			var nodeCurrent = returnValues[i];
			if (nodeCurrent.costFromStart == Number.POSITIVE_INFINITY)
			{
				returnValues.length = i;
				break;
			}
		}

		return returnValues;
	}
}
