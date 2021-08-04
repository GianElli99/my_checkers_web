var modal = document.getElementById('modal');
var closeBtn = document.getElementById('close-modal');
var historyBtn = document.getElementById('see-history');
var table = document.getElementById('history');

closeBtn.addEventListener('click', HandleClose);
window.addEventListener('click', HandleClose);

function HandleClose(e) {
  if (e.target === modal || e.target === closeBtn) {
    modal.classList.remove('active-modal');
  }
}

historyBtn.addEventListener('click', HandleOpenHistory);

function HandleOpenHistory(e) {
  modal.classList.add('active-modal');
  GetHistory();
}
function GetHistory() {
  try {
    var savedData = JSON.parse(localStorage.getItem('history'));
    if (savedData) {
      ConvertHistoryArrayToTable(savedData);
    }
  } catch (error) {
    console.log('An error occurred');
  }
}
function ConvertHistoryArrayToTable(array) {
  table.innerHTML =
    '<tr><th>Player 1</th><th>Points</th><th>Player 2</th><th>Result</th><th>Date</th></tr>';
  array.forEach(function (game) {
    console.log(game.date);
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td>' +
      game.player1name +
      '</td><td>' +
      game.points +
      '</td><td>' +
      game.player2name +
      '</td><td>' +
      game.result +
      '</td><td>' +
      new Date(game.date).toLocaleDateString('en-US') +
      '</td>';
    table.appendChild(tr);
  });
}
