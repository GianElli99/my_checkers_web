var boardArray = CreateBoardArray();
var boardHTML = ArrayToBoard(boardArray);
boardHTML.id = 'board';

document
  .getElementById('game')
  .insertBefore(boardHTML, document.getElementById('player-2'));

function CreateBoardArray() {
  var boardArray = new Array(8);
  for (let i = 0; i < boardArray.length; i++) {
    boardArray[i] = Array.apply(null, Array(8));
  }
  return boardArray;
}
function ArrayToBoard(boardArray) {
  var board = document.createElement('div');

  boardArray.forEach(function (row, rowIndex) {
    var rowRealNumber = boardArray.length - rowIndex;
    var isRowEven = rowRealNumber % 2 === 0;

    var divRow = CreateRow(rowRealNumber);
    board.appendChild(divRow);

    row.forEach(function (cell, cellIndex) {
      var colRealNumber = cellIndex + 1;
      var isColEven = colRealNumber % 2 === 0;
      var divCell = CreateCell(
        rowRealNumber,
        colRealNumber,
        isRowEven,
        isColEven
      );
      divRow.appendChild(divCell);
    });
  });

  return board;
}
function CreateRow(number) {
  var divRow = document.createElement('div');
  divRow.id = 'row-' + number;
  divRow.className = 'row';
  return divRow;
}
function CreateCell(rowNumber, colNumber, isRowEven, isColEven) {
  var divCell = document.createElement('div');
  divCell.id = 'row-' + rowNumber + '-col-' + colNumber;
  divCell.className = 'cell';

  if (isRowEven === isColEven) {
    divCell.classList.add('dark');
  } else {
    divCell.classList.add('light');
  }

  return divCell;
}
/*<div id="board">
          <div id="row-8" class="row">
            <div id="row-8-col-a" class="cell light"></div>
            <div id="row-8-col-b" class="cell dark">
              <div class="piece-player-2 piece"></div>
            </div>
            <div id="row-8-col-c" class="cell light"></div>
            <div id="row-8-col-d" class="cell dark">
              <div class="piece-player-2 piece"></div>
            </div>
            <div id="row-8-col-e" class="cell light"></div>
            <div id="row-8-col-f" class="cell dark">
              <div class="piece-player-2 piece"></div>
            </div>
            <div id="row-8-col-g" class="cell light"></div>
            <div id="row-8-col-h" class="cell dark">
              <div class="piece-player-2 piece"></div>
            </div>
          </div>
          <div id="row-7" class="row">
            <div id="row-7-col-a" class="cell dark">
              <div class="piece-player-2 piece"></div>
            </div>
            <div id="row-7-col-b" class="cell light"></div>
            <div id="row-7-col-c" class="cell dark">
              <div class="piece-player-2 piece"></div>
            </div>
            <div id="row-7-col-d" class="cell light"></div>
            <div id="row-7-col-e" class="cell dark">
              <div class="piece-player-2 piece"></div>
            </div>
            <div id="row-7-col-f" class="cell light"></div>
            <div id="row-7-col-g" class="cell dark">
              <div class="piece-player-2 piece"></div>
            </div>
            <div id="row-7-col-h" class="cell light"></div>
          </div>
          <div id="row-6" class="row">
            <div id="row-6-col-a" class="cell light"></div>
            <div id="row-6-col-b" class="cell dark">
              <div class="piece-player-2 piece"></div>
            </div>
            <div id="row-6-col-c" class="cell light"></div>
            <div id="row-6-col-d" class="cell dark">
              <div class="piece-player-2 piece"></div>
            </div>
            <div id="row-6-col-e" class="cell light"></div>
            <div id="row-6-col-f" class="cell dark">
              <div class="piece-player-2 piece"></div>
            </div>
            <div id="row-6-col-g" class="cell light"></div>
            <div id="row-6-col-h" class="cell dark">
              <div class="piece-player-2 piece"></div>
            </div>
          </div>
          <div id="row-5" class="row">
            <div id="row-5-col-a" class="cell dark"></div>
            <div id="row-5-col-b" class="cell light"></div>
            <div id="row-5-col-c" class="cell dark"></div>
            <div id="row-5-col-d" class="cell light"></div>
            <div id="row-5-col-e" class="cell dark"></div>
            <div id="row-5-col-f" class="cell light"></div>
            <div id="row-5-col-g" class="cell dark"></div>
            <div id="row-5-col-h" class="cell light"></div>
          </div>
          <div id="row-4" class="row">
            <div id="row-4-col-a" class="cell light"></div>
            <div id="row-4-col-b" class="cell dark"></div>
            <div id="row-4-col-c" class="cell light"></div>
            <div id="row-4-col-d" class="cell dark"></div>
            <div id="row-4-col-e" class="cell light"></div>
            <div id="row-4-col-f" class="cell dark"></div>
            <div id="row-4-col-g" class="cell light"></div>
            <div id="row-4-col-h" class="cell dark"></div>
          </div>
          <div id="row-3" class="row">
            <div id="row-3-col-a" class="cell dark">
              <div class="piece-player-1 piece"></div>
            </div>
            <div id="row-3-col-b" class="cell light"></div>
            <div id="row-3-col-c" class="cell dark">
              <div class="piece-player-1 piece"></div>
            </div>
            <div id="row-3-col-d" class="cell light"></div>
            <div id="row-3-col-e" class="cell dark">
              <div class="piece-player-1 piece"></div>
            </div>
            <div id="row-3-col-f" class="cell light"></div>
            <div id="row-3-col-g" class="cell dark">
              <div class="piece-player-1 piece"></div>
            </div>
            <div id="row-3-col-h" class="cell light"></div>
          </div>
          <div id="row-2" class="row">
            <div id="row-2-col-a" class="cell light"></div>
            <div id="row-2-col-b" class="cell dark">
              <div class="piece-player-1 piece"></div>
            </div>
            <div id="row-2-col-c" class="cell light"></div>
            <div id="row-2-col-d" class="cell dark">
              <div class="piece-player-1 piece"></div>
            </div>
            <div id="row-2-col-e" class="cell light"></div>
            <div id="row-2-col-f" class="cell dark">
              <div class="piece-player-1 piece"></div>
            </div>
            <div id="row-2-col-g" class="cell light"></div>
            <div id="row-2-col-h" class="cell dark">
              <div class="piece-player-1 piece"></div>
            </div>
          </div>
          <div id="row-1" class="row">
            <div id="row-1-col-a" class="cell dark">
              <div class="piece-player-1 piece"></div>
            </div>
            <div id="row-1-col-b" class="cell light"></div>
            <div id="row-1-col-c" class="cell dark">
              <div class="piece-player-1 piece"></div>
            </div>
            <div id="row-1-col-d" class="cell light"></div>
            <div id="row-1-col-e" class="cell dark">
              <div class="piece-player-1 piece"></div>
            </div>
            <div id="row-1-col-f" class="cell light"></div>
            <div id="row-1-col-g" class="cell dark">
              <div class="piece-player-1 piece"></div>
            </div>
            <div id="row-1-col-h" class="cell light"></div>
          </div>
        </div>*/
