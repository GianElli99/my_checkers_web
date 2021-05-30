//ESTADO
var boardArray = CreateBoardArray();
boardArray[0][0] = 1;
boardArray[0][2] = 1;
boardArray[0][4] = 1;
boardArray[0][6] = 1;
boardArray[2][2] = 1;
boardArray[4][4] = 1;

boardArray[7][1] = 2;
boardArray[7][3] = 2;
boardArray[7][5] = 2;
boardArray[6][6] = 2;
boardArray[5][7] = 2;
boardArray[4][6] = 2;

var turn = 2;
var validOptions = [];
var selectedPieceCell = '';
//ESTADO
RenderBoard(boardArray, turn);

function RenderBoard(boardArray, turn) {
  var boardHTML = ArrayToBoard(boardArray);
  boardHTML.id = 'board';
  document.getElementById('board').remove();
  document
    .getElementById('game')
    .insertBefore(boardHTML, document.getElementById('player-2'));
  UpdatePiecesCounter(boardArray);
  ChangeTurn(turn);
}
function CreateBoardArray() {
  var boardArray = new Array(8);
  for (let i = 0; i < boardArray.length; i++) {
    boardArray[i] = Array.apply(null, Array(8));
  }

  return boardArray;
}
function ArrayToBoard(boardArray) {
  var board = document.createElement('div');
  boardArray.reverse();
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
      if (cell) {
        divCell.appendChild(CreatePiece(cell));
      }
      divRow.appendChild(divCell);
    });
  });
  boardArray.reverse();

  return board;
}
function CreateRow(number) {
  var divRow = document.createElement('div');
  divRow.id = CreateRowId(number);
  divRow.className = 'row';
  return divRow;
}
function CreateRowId(rowNumber) {
  return 'row-' + rowNumber;
}
function CreateCell(rowNumber, colNumber, isRowEven, isColEven) {
  var divCell = document.createElement('div');
  divCell.id = CreateCellId(rowNumber, colNumber);
  divCell.className = 'cell';

  if (isRowEven === isColEven) {
    divCell.classList.add('dark');
  } else {
    divCell.classList.add('light');
  }
  divCell.addEventListener('click', function (e) {
    if (
      selectedPieceCell &&
      selectedPieceCell !== this.id &&
      IsValidOption(divCell)
    ) {
      MovePieceHere(this);
    }
  });

  return divCell;
}
function IsValidOption(cell) {
  var result = validOptions.find(function (x) {
    return x === cell.id;
  });
  if (result) {
    return true;
  } else {
    return false;
  }
}
function CreateCellId(rowNumber, colNumber) {
  return 'row-' + rowNumber + '-col-' + colNumber;
}
function MovePieceHere(cell) {
  var initialPos = ParseIdToArrayPosition(selectedPieceCell);
  var initialRow = initialPos[0];
  var initialCol = initialPos[1];

  var finalPos = ParseIdToArrayPosition(cell.id);
  var finalRow = finalPos[0];
  var finalCol = finalPos[1];

  boardArray[initialRow][initialCol] = null;
  boardArray[finalRow][finalCol] = turn;
  selectedPieceCell = '';
  RenderBoard(boardArray);
}
function CreatePiece(player, number) {
  var piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add('piece-player-' + player);
  piece.addEventListener('click', function () {
    RenderOptions(this, player);
  });
  return piece;
}
function UpdatePiecesCounter(boardArray) {
  var player1pieces = 0;
  var player2pieces = 0;
  for (let r = 0; r < boardArray.length; r++) {
    for (let c = 0; c < boardArray.length; c++) {
      switch (boardArray[r][c]) {
        case 1:
          player1pieces++;
          break;
        case 2:
          player2pieces++;
          break;

        default:
          break;
      }
    }
  }
  document.getElementById('remaining-pieces-player-1').textContent =
    player1pieces;
  document.getElementById('remaining-pieces-player-2').textContent =
    player2pieces;
}
function ChangeTurn() {
  if (turn === 1) {
    document.getElementById('player-1-turn').classList.add('not-visible');
    document.getElementById('player-2-turn').classList.remove('not-visible');
    turn = 2;
  } else {
    document.getElementById('player-2-turn').classList.add('not-visible');
    document.getElementById('player-1-turn').classList.remove('not-visible');
    turn = 1;
  }
}
function RenderOptions(piece, PieceOwner) {
  DeleteOldOptions();
  if (PieceOwner === turn) {
    selectedPieceCell = piece.parentElement.id;
    var pos = ParseIdToArrayPosition(piece.parentElement.id);
    var row = pos[0];
    var col = pos[1];
    var upperLeft = CreateCellId(row + 2, col);
    var upperRight = CreateCellId(row + 2, col + 2);
    var bottomLeft = CreateCellId(row, col);
    var bottomRight = CreateCellId(row, col + 2);

    validOptions = [upperLeft, upperRight];
    document.getElementById(upperLeft).classList.add('valid-movement');
    document.getElementById(upperRight).classList.add('valid-movement');
  }
  return;
}
function DeleteOldOptions() {
  validOptions.forEach(function (x, i) {
    document.getElementById(x).classList.remove('valid-movement');
  });
  validOptions = [];
}
function ParseIdToArrayPosition(id) {
  var splittedId = id.split('-');
  var row = parseInt(splittedId[1]) - 1;
  var col = parseInt(splittedId[3]) - 1;
  return [row, col];
}
function ParseArrayPositionToId(row, col) {
  return CreateCellId(row + 1, col + 1);
}
