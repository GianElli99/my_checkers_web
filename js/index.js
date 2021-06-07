//ESTADO
var boardArray = CreateBoardArray();
var turn = 2;
var validOptionsToMove = [];
var validOptionsToMoveEating = [];
var cellIdOfSelectedPiece = '';
var canSelectOtherPieces = true;
//ESTADO

RenderState(boardArray, true);

function CreateBoardArray() {
  var boardArray = new Array(8);
  for (let i = 0; i < boardArray.length; i++) {
    boardArray[i] = Array.apply(null, Array(8));
  }

  return boardArray;
}
function RenderState(boardArray, isTurnFinished) {
  var boardHTML = BoardArrayToBoardHTML(boardArray);
  RenderBoard(boardHTML);
  UpdatePiecesCounter(boardArray);
  if (isTurnFinished) {
    canSelectOtherPieces = true;
    ChangeTurn();
  } else {
    canSelectOtherPieces = false;
    var selectedPiece = document.getElementById(
      cellIdOfSelectedPiece
    )?.firstElementChild;
    RenderEatingOptions(selectedPiece, turn);
  }
}
function BoardArrayToBoardHTML(boardArray) {
  var board = document.createElement('div');
  board.id = 'board';
  boardArray.reverse();
  boardArray.forEach(function (row, rowIndex) {
    var rowNumberBeforeReverse = boardArray.length - rowIndex - 1;
    var isRowEvenInHTML = rowIndex % 2 === 1;

    var divRow = CreateRow(rowNumberBeforeReverse);
    board.appendChild(divRow);

    row.forEach(function (cell, cellIndex) {
      var isColEvenInHTML = cellIndex % 2 === 0;
      var divCell = CreateCell(
        rowNumberBeforeReverse,
        cellIndex,
        isRowEvenInHTML,
        isColEvenInHTML
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
function RenderBoard(newBoard) {
  document.getElementById('board').remove();
  document
    .getElementById('game')
    .insertBefore(newBoard, document.getElementById('player-2'));
}
function UpdatePiecesCounter(boardArray) {
  var player1pieces = 0;
  var player2pieces = 0;
  for (let r = 0; r < boardArray.length; r++) {
    for (let c = 0; c < boardArray.length; c++) {
      switch (boardArray[r][c]) {
        case 1:
        case 10:
          player1pieces++;
          break;
        case 2:
        case 20:
          player2pieces++;
          break;

        default:
          break;
      }
    }
  }
  RenderPiecesCounter(player1pieces, player2pieces);
}
function RenderPiecesCounter(player1pieces, player2pieces) {
  document.getElementById('remaining-pieces-player-1').textContent =
    player1pieces;
  document.getElementById('remaining-pieces-player-2').textContent =
    player2pieces;
}
function ChangeTurn() {
  turn = turn === 1 ? 2 : 1;
  RenderNewTurn(turn);
}
function RenderNewTurn(turn) {
  if (turn === 2) {
    document.getElementById('player-1-turn').classList.add('not-visible');
    document.getElementById('player-2-turn').classList.remove('not-visible');
  } else {
    document.getElementById('player-2-turn').classList.add('not-visible');
    document.getElementById('player-1-turn').classList.remove('not-visible');
  }
}
function CreateRow(number) {
  var divRow = document.createElement('div');
  divRow.id = CreateRowIdFromArrayPos(number);
  divRow.className = 'row';
  return divRow;
}
function CreateRowIdFromArrayPos(rowNumber) {
  return 'row-' + (rowNumber + 1);
}
function CreateCell(rowNumber, colNumber, isRowEven, isColEven) {
  var divCell = document.createElement('div');
  divCell.id = CreateCellIdFromArrayPos(rowNumber, colNumber);
  divCell.className = 'cell';

  if (isRowEven === isColEven) {
    divCell.classList.add('dark');
  } else {
    divCell.classList.add('light');
  }
  divCell.addEventListener('click', function () {
    HandleCellClick(this);
  });

  return divCell;
}
function HandleCellClick(cell) {
  if (
    cellIdOfSelectedPiece &&
    cellIdOfSelectedPiece !== cell.id &&
    IsValidOption(cell)
  ) {
    MovePieceHere(cell);
  }
}
function CreateCellIdFromArrayPos(rowNumber, colNumber) {
  return 'row-' + (rowNumber + 1) + '-col-' + (colNumber + 1);
}
function CreatePiece(player) {
  var piece = document.createElement('div');
  piece.classList.add('piece');
  var playerNumber = player.toString().substr(0, 1);
  piece.classList.add('piece-player-' + playerNumber);

  if (player === 10 || player === 20) {
    var dama = CreateDama();
    piece.appendChild(dama);
  }
  piece.addEventListener('click', function () {
    if (canSelectOtherPieces) {
      RenderAllOptions(this, parseInt(playerNumber));
    }
  });
  return piece;
}
function CreateDama() {
  var dama = document.createElement('img');
  dama.src = './images/crowns.png';
  dama.classList.add('dama');
  return dama;
}
function IsValidOption(cell) {
  var eatingOptionDestinations = [];
  validOptionsToMoveEating.forEach(function (x) {
    return eatingOptionDestinations.push(x[1]);
  });
  var allOptions = validOptionsToMove.concat(eatingOptionDestinations);
  var result = allOptions.find(function (x) {
    return x === cell.id;
  });

  return result ? true : false;
}
function isEatingMovement(cell) {
  return validOptionsToMoveEating.find(function (x) {
    return x[1] === cell.id;
  })
    ? true
    : false;
}
function GetEatenPieceId(finalPosId) {
  var option = validOptionsToMoveEating.find(function (x) {
    return x[1] === finalPosId;
  });
  if (option) {
    return option[0];
  }
  return undefined;
}
function ConvertToDamaIfNecessary(row, col) {
  var pieceOwner = boardArray[row][col];
  if (row === 0 && pieceOwner === 2) {
    boardArray[row][col] = 20;
    return true;
  }
  if (row === 7 && pieceOwner === 1) {
    boardArray[row][col] = 10;
    return true;
  }
  return false;
}
function MovePieceHere(cell) {
  var initialPos = ParseIdToArrayPosition(cellIdOfSelectedPiece);
  var initialRow = initialPos[0];
  var initialCol = initialPos[1];

  var finalPos = ParseIdToArrayPosition(cell.id);
  var finalRow = finalPos[0];
  var finalCol = finalPos[1];

  var isEatingMov = isEatingMovement(cell);
  if (isEatingMov) {
    var eatenPieceId = GetEatenPieceId(cell.id);
    var eatenPos = ParseIdToArrayPosition(eatenPieceId);
    var eatenRow = eatenPos[0];
    var eatenCol = eatenPos[1];

    boardArray[eatenRow][eatenCol] = null;
  }
  boardArray[finalRow][finalCol] = boardArray[initialRow][initialCol];
  boardArray[initialRow][initialCol] = null;

  var willBeDama = ConvertToDamaIfNecessary(finalRow, finalCol);

  var isTurnFinished = !isEatingMov || willBeDama;

  if (isEatingMov) {
    cellIdOfSelectedPiece = cell.id;
  } else {
    cellIdOfSelectedPiece = '';
  }
  DeleteOldOptions();
  RenderState(boardArray, isTurnFinished);
}

function CellExists(cellId) {
  var pos = ParseIdToArrayPosition(cellId);
  var row = pos[0];
  var col = pos[1];
  if (row < 8 && row >= 0 && col < 8 && col >= 0) {
    return true;
  }
  return false;
}
function AddEatingOption(cellId, nextRow, nextCol) {
  var pos = ParseIdToArrayPosition(cellId);
  var row = pos[0] + nextRow;
  var col = pos[1] + nextCol;
  var nextCell = ParseArrayPositionToId(row, col);
  if (
    CellExists(nextCell) &&
    !HasPiece(nextCell) &&
    HasDifferentOwner(cellIdOfSelectedPiece, cellId)
  ) {
    validOptionsToMoveEating.push([cellId, nextCell]);
  }
}
function HasDifferentOwner(cell1, cell2) {
  var owner1 = document.getElementById(cell1).firstElementChild?.className;
  var owner2 = document.getElementById(cell2).firstElementChild?.className;
  if (owner1 !== owner2 && owner2 !== undefined) {
    return true;
  }
  return false;
}
function AddOption(cellId, nextRow, nextCol) {
  if (CellExists(cellId)) {
    if (HasPiece(cellId)) {
      AddEatingOption(cellId, nextRow, nextCol);
    } else {
      validOptionsToMove.push(cellId);
    }
  }
}
function AddOptionRecursive(cellId, nextRow, nextCol) {
  if (CellExists(cellId) && !HasPiece(cellId)) {
    validOptionsToMove.push(cellId);
    var pos = ParseIdToArrayPosition(cellId);
    var row = pos[0] + nextRow;
    var col = pos[1] + nextCol;
    var nextCell = ParseArrayPositionToId(row, col);
    AddOptionRecursive(nextCell, nextRow, nextCol);
  }
  if (CellExists(cellId) && HasPiece(cellId)) {
    AddEatingOption(cellId, nextRow, nextCol);
  }
  return;
}
function FindOptionsRecursive(cellId) {
  var pos = ParseIdToArrayPosition(cellId);
  var row = pos[0];
  var col = pos[1];
  var upperLeft = CreateCellIdFromArrayPos(row + 1, col - 1);
  var upperRight = CreateCellIdFromArrayPos(row + 1, col + 1);
  var bottomLeft = CreateCellIdFromArrayPos(row - 1, col - 1);
  var bottomRight = CreateCellIdFromArrayPos(row - 1, col + 1);

  AddOptionRecursive(upperLeft, 1, -1);
  AddOptionRecursive(upperRight, 1, 1);
  AddOptionRecursive(bottomLeft, -1, -1);
  AddOptionRecursive(bottomRight, -1, 1);
}
function FindOptions(cellId, isDama) {
  var pos = ParseIdToArrayPosition(cellId);
  var row = pos[0];
  var col = pos[1];
  var upperLeft = CreateCellIdFromArrayPos(row + 1, col - 1);
  var upperRight = CreateCellIdFromArrayPos(row + 1, col + 1);
  var bottomLeft = CreateCellIdFromArrayPos(row - 1, col - 1);
  var bottomRight = CreateCellIdFromArrayPos(row - 1, col + 1);

  if (isDama) {
    FindOptionsRecursive(cellId);
  } else {
    if (turn === 1) {
      AddOption(upperLeft, 1, -1);
      AddOption(upperRight, 1, 1);
    } else {
      AddOption(bottomLeft, -1, -1);
      AddOption(bottomRight, -1, 1);
    }
  }
  validOptionsToMove.forEach(function (x) {
    document.getElementById(x).classList.add('valid-movement');
  });
  validOptionsToMoveEating.forEach(function (x) {
    document.getElementById(x[1]).classList.add('valid-movement-eating');
  });
}
function RenderAllOptions(piece, PieceOwner) {
  DeleteOldOptions();
  if (PieceOwner === turn) {
    cellIdOfSelectedPiece = piece.parentElement.id;
    var isDama = piece.firstElementChild ? true : false;
    FindOptions(cellIdOfSelectedPiece, isDama);
  }
}
function RenderEatingOptions(piece, PieceOwner) {
  DeleteOldOptions();
  var pos = ParseIdToArrayPosition(piece.parentElement.id);
  var row = pos[0];
  var col = pos[1];
  var upperLeft = CreateCellIdFromArrayPos(row + 1, col - 1);
  var upperRight = CreateCellIdFromArrayPos(row + 1, col + 1);
  var bottomLeft = CreateCellIdFromArrayPos(row - 1, col - 1);
  var bottomRight = CreateCellIdFromArrayPos(row - 1, col + 1);
  if (piece.firstElementChild) {
    //isDama
    FindOptionsRecursive(piece.parentElement.id);
  } else {
    if (turn === 1) {
      AddEatingOption(upperLeft, 1, -1);
      AddEatingOption(upperRight, 1, 1);
    } else {
      AddEatingOption(bottomLeft, -1, -1);
      AddEatingOption(bottomRight, -1, 1);
    }
  }
  validOptionsToMove = [];
  validOptionsToMoveEating.forEach(function (x) {
    document.getElementById(x[1]).classList.add('valid-movement-eating');
  });
  if (validOptionsToMoveEating.length === 0) {
    RenderState(boardArray, true);
  }
}
function DeleteOldOptions() {
  validOptionsToMove.forEach(function (x, i) {
    if (x) {
      document.getElementById(x).classList.remove('valid-movement');
    }
  });
  validOptionsToMoveEating.forEach(function (x, i) {
    if (x[1]) {
      document.getElementById(x[1]).classList.remove('valid-movement-eating');
    }
  });
  validOptionsToMoveEating = [];
  validOptionsToMove = [];
}
function ParseIdToArrayPosition(id) {
  var splittedId = id.split('-');
  var row = parseInt(splittedId[1]) - 1;
  var col = parseInt(splittedId[3]) - 1;
  return [row, col];
}
function ParseArrayPositionToId(row, col) {
  return CreateCellIdFromArrayPos(row, col);
}
function HasPiece(cellId) {
  if (cellId === null) {
    return false;
  }
  var pos = ParseIdToArrayPosition(cellId);
  var row = pos[0];
  var col = pos[1];
  if (boardArray[row][col]) {
    return true;
  } else {
    return false;
  }
}

document.getElementById('start-match').onclick = function () {
  boardArray = CreateBoardArray();
  boardArray[0][0] = 1;
  boardArray[0][2] = 1;
  boardArray[0][4] = 1;
  boardArray[0][6] = 1;

  boardArray[1][1] = 1;
  boardArray[1][3] = 1;
  boardArray[1][5] = 1;
  boardArray[1][7] = 1;

  boardArray[2][0] = 1;
  boardArray[2][2] = 1;
  boardArray[2][4] = 1;
  boardArray[2][6] = 1;

  boardArray[5][1] = 2;
  boardArray[5][3] = 2;
  boardArray[5][5] = 2;
  boardArray[5][7] = 2;

  boardArray[6][0] = 2;
  boardArray[6][2] = 2;
  boardArray[6][4] = 2;
  boardArray[6][6] = 2;

  boardArray[7][1] = 2;
  boardArray[7][3] = 2;
  boardArray[7][5] = 2;
  boardArray[7][7] = 2;

  turn = 2;
  RenderState(boardArray, true);
};
