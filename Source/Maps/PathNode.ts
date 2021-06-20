
class PathNode
{
	constructor(cellPos, costFromStart, costToGoalEstimated, prev)
	{
		this.cellPos = cellPos;
		this.costFromStart = costFromStart;
		this.costToGoalEstimated = costToGoalEstimated;
		this.prev = prev;
	}

	id(mapSizeInCells)
	{
		var nodeToConsiderIndex =
			this.cellPos.y
			* mapSizeInCells.y
			+ this.cellPos.x;

		var returnValue = "_" + nodeToConsiderIndex;

		return returnValue;
	}

	neighbors(path)
	{
		var map = path.map;

		var returnValues = [];
		var mapBoundsInCellsMinusOnes = map.boundsInCellsMinusOnes;
		var costToGoalTemp = new Coords();
		var neighborPos = new Coords();

		var neighborOffsets = map.neighborOffsets;

		for (var i = 0; i < neighborOffsets.length; i++)
		{
			var neighborOffset = neighborOffsets[i];

			neighborPos.overwriteWith
			(
				this.cellPos
			).add
			(
				neighborOffset
			);

			if (mapBoundsInCellsMinusOnes.containsPoint(neighborPos))
			{
				var neighborMapCell = map.cellAtPosInCells(neighborPos);
				var neighborCostToTraverse = neighborMapCell.costToTraverse(map);

				var neighborCostFromStart =
					this.costFromStart
					+ neighborCostToTraverse;

				var neighborCostToGoalEstimated =
					neighborCostToTraverse
					+ costToGoalTemp.overwriteWith
					(
						path.goalPos
					).subtract
					(
						this.cellPos
					).absolute().sumOfDimensions();

				var neighborNode = new PathNode
				(
					neighborPos.clone(),
					neighborCostFromStart,
					neighborCostToGoalEstimated,
					this // prev
				);

				returnValues.push(neighborNode);
			}
		}

		return returnValues;
	}
}
