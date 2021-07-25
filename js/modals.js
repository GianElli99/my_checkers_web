var modal = document.getElementById('modal');
var closeBtn = document.getElementById('close-modal');

modal.classList.add('active-modal');

closeBtn.addEventListener('click', HandleClose);
window.addEventListener('click', HandleClose);

function HandleClose(e) {
  if (e.target == modal || e.target == closeBtn) {
    modal.classList.remove('active-modal');
  }
}
