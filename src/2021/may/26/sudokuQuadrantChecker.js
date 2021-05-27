// Have the function SudokuQuadrantChecker(strArr) read the strArr parameter being passed which will represent a 9x9 Sudoku board of integers ranging from 1 to 9. The rules of Sudoku are to place each of the 9 integers integer in every row and column and not have any integers repeat in the respective row, column, or 3x3 sub-grid. The input strArr will represent a Sudoku board and it will be structured in the following format: ["(N,N,N,N,N,x,x,x,x)","(...)","(...)",...)] where N stands for an integer between 1 and 9 and x will stand for an empty cell. Your program will determine if the board is legal; the board also does not necessarily have to be finished. If the board is legal, your program should return the string legal but if it isn't legal, it should return the 3x3 quadrants (separated by commas) where the errors exist. The 3x3 quadrants are numbered from 1 to 9 starting from top-left going to bottom-right.
// For example, if strArr is: ["(1,2,3,4,5,6,7,8,1)","(x,x,x,x,x,x,x,x,x)","(x,x,x,x,x,x,x,x,x)","(1,x,x,x,x,x,x,x,x)","(x,x,x,x,x,x,x,x,x)","(x,x,x,x,x,x,x,x,x)","(x,x,x,x,x,x,x,x,x)","(x,x,x,x,x,x,x,x,x)","(x,x,x,x,x,x,x,x,x)"] then your program should return 1,3,4 since the errors are in quadrants 1, 3 and 4 because of the repeating integer 1.
// Another example, if strArr is: ["(1,2,3,4,5,6,7,8,9)","(x,x,x,x,x,x,x,x,x)","(6,x,5,x,3,x,x,4,x)","(2,x,1,1,x,x,x,x,x)","(x,x,x,x,x,x,x,x,x)","(x,x,x,x,x,x,x,x,x)","(x,x,x,x,x,x,x,x,x)","(x,x,x,x,x,x,x,x,x)","(x,x,x,x,x,x,x,x,9)"] then your program should return 3,4,5,9.




function sudokuQuadrantChecker(strArray) {

  var array = getEmbeddedArray(strArray);

  var currentCells = []; // array of cells items being checked
  var errorQuadrants = []; // quadrants with errors in them

  var i; // variable for iterating in for loops
  var j; // variable for iterating in for loops
  var m; // variable for iterating in for loops
  var n; // variable for iterating in for loops

  // check rows
  for (i = 0; i < array.length; ++i) {
    currentCells = [];
    for (j = 0; j < array[i].length; ++j) {
      var repeat = getRepeat(currentCells, array[i][j]);
      if (repeat !== null) {
        errorQuadrants.push(getQuadrant(i, repeat));
        errorQuadrants.push(getQuadrant(i, j));
      } else if (array[i][j] !== 'x') {
        currentCells.push(array[i][j]);
      }
    }
  }

  // check columns
  for (j = 0; j < array[0].length; ++j) {
    currentCells = [];
    for (i = 0; i < array.length; ++i) {
      var repeat = getRepeat(currentCells, array[i][j]);
      if (repeat !== null) {
        errorQuadrants.push(getQuadrant(repeat, j));
        errorQuadrants.push(getQuadrant(i, j));
      } else if (array[i][j] !== 'x') {
        currentCells.push(array[i][j]);
      }
    }
  }

  // check subgrids
  for (m = 0; m < 9; m += 3) {
    for (n = 0; n < 9; n += 3) {
      currentCells = [];
      for (i = m; i < m + 3; ++i) {
        for (j = n; j < n + 3; ++j) {
          var repeat = getRepeat(currentCells, array[i][j]);
          if (repeat !== null) {
            errorQuadrants.push(getQuadrant(i, j));
          }
          currentCells.push(array[i][j]);
        }
      }
    }
  }

  // clean up and return
  var representation = '';
  errorQuadrants = Array.from(new Set(errorQuadrants)).sort();
  for (i = 0; i < errorQuadrants.length; ++i) {
    representation += ',';
    representation += errorQuadrants[i];
  }
  if (representation === '') {
    return 'legal'
  } else {
    return representation.substring(1, representation.length);
  }

}





function getEmbeddedArray(strArray) {
  var array = [];
  var i;
  for (i = 0; i < strArray.length; ++i) {
    var substr = strArray[i];
    array.push(substr.substring(1, substr.length - 1).split(','));
  }
  return array;
}




function getRepeat(subArray, cell) {
  var i;
  for (i = 0; i < subArray.length; ++i) {
    if (subArray[i] === cell && cell !== 'x') {
      return i;
    }
  }
  return null;
}




function getQuadrant(i, j) {
    return 3 * Math.floor(i / 3) + Math.floor(j / 3) + 1;
}




module.exports = sudokuQuadrantChecker;
