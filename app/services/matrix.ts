export function calcRowIndex(elementPosition, columns: number) {
  return Math.floor(elementPosition / columns);
}

export function calcColumnIndex(elementPosition, columns: number) {
  return elementPosition % columns;
}

export function getHeightOfHighestElementInRow(matrix, rowIndex: number) {
  let height = 0;
  matrix[rowIndex].forEach((element) => {
    let elementHeight = element.offsetHeight;
    if (elementHeight > height) {
      height = elementHeight;
    }
  });
  return height;
}

export function getHeightOfElement(matrix, rowIndex: number, columnIndex: number) {
  return matrix[rowIndex][columnIndex].offsetHeight;
}

function calculateHeightDifferenceBetweenRowElements(matrix, currentRowIndex: number, columnIndex: number) {
  if (currentRowIndex === 0) { return 0; }

  let heightOfHighestElementInPreviousRow = getHeightOfHighestElementInRow(matrix, currentRowIndex-1);
  let heightOfAboveElementInMatrix = getHeightOfElement(matrix, currentRowIndex-1, columnIndex);

  return heightOfHighestElementInPreviousRow-heightOfAboveElementInMatrix;
}

function getDistanceMovedOfAboveElement(matrix, currentRowIndex: number, columnIndex: number) {
  if (currentRowIndex === 0) { return 0; }

  return matrix[currentRowIndex-1][columnIndex].style.bottom;
}

export function distanceToMoveElement(matrix, currentRowIndex, columnIndex) {
  let heightDifference = calculateHeightDifferenceBetweenRowElements(matrix, currentRowIndex, columnIndex);
  let distanceMovedOfAboveElement = getDistanceMovedOfAboveElement(matrix, currentRowIndex, columnIndex);


  let convertedDistanceMovedOfAboveElement =
    Number(distanceMovedOfAboveElement.substr(0, distanceMovedOfAboveElement.indexOf('px')));
  
  let distanceToMoveElement = heightDifference + convertedDistanceMovedOfAboveElement;
  return distanceToMoveElement;
}