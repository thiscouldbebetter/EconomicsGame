
function Path(map, startPos, goalPos)
{
	this.map = map;
	this.startPos = startPos;
	this.goalPos = goalPos;
}

{
	Path.prototype.calculate = function()
	{
		var nodesToConsider = this.calculate_1_InitializeListOfNodesToConsider();
		var nodesAlreadyConsidered = [];
		 
		while (nodesToConsider.length > 0)
		{
			var nodeToConsider = nodesToConsider[0];
			 
			if (nodeToConsider.cellPos.equals(this.goalPos) == true)
			{   
				this.nodes = this.calculate_3_BuildListOfNodesFromStartToGoal
				(
					nodeToConsider
				);
				break;
			}
			else
			{
				nodesToConsider.removeAt(0);
				var nodeToConsiderID = nodeToConsider.id(this.map.sizeInCells);
				nodesAlreadyConsidered[nodeToConsiderID] = nodeToConsider;
				 
				this.calculate_2_AddNeighborsToListOfNodesToConsider
				(
					nodeToConsider,
					nodesToConsider,
					nodesAlreadyConsidered
				);
			}
		}
	}
 
	Path.prototype.calculate_1_InitializeListOfNodesToConsider = function()
	{
		var nodesToConsider = [];
		 
		var displacementFromStartToGoal = new Coords();
		 
		displacementFromStartToGoal.overwriteWith
		(
			this.goalPos
		).subtract
		(
			this.startPos
		);
		 
		var costFromStartToGoalEstimated = 
			displacementFromStartToGoal.absolute().sumOfXAndY();
		 
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
	 
	Path.prototype.calculate_2_AddNeighborsToListOfNodesToConsider = function
	(
		nodeToFindNeighborsOf,
		nodesToConsider,
		nodesAlreadyConsidered
	)
	{
		var mapSizeInCells = this.map.sizeInCells;
		 
		var nodesNeighboring = nodeToFindNeighborsOf.neighbors(this);
		 
		for (var n = 0; n < nodesNeighboring.length; n++)
		{
			var nodeNeighbor = nodesNeighboring[n];
			var nodeNeighborID = nodeNeighbor.id(mapSizeInCells);
			 
			var hasNodeNeighborNotYetBeenSeen = 
			(
				nodesAlreadyConsidered[nodeNeighborID] == null 
				&& nodesToConsider[nodeNeighborID] == null
			);
			 
			if (hasNodeNeighborNotYetBeenSeen == true)
			{
				nodesToConsider.insertElementSortedByKeyName
				(
					nodeNeighbor,
					"costToGoalEstimated"
				);
				 
				nodesToConsider[nodeNeighborID] = nodeNeighbor;
			}
		}
	}
		 
	Path.prototype.calculate_3_BuildListOfNodesFromStartToGoal = function(nodeGoal)
	{
		var returnValues = [];
		 
		var nodeCurrent = nodeGoal;
		 
		while (nodeCurrent != null)
		{
			returnValues.insertElementAt(nodeCurrent, 0);
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