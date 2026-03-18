const slides = document.querySelectorAll('.slide');
const counter = document.getElementById('counter');
const dotsEl = document.getElementById('dots');
const total = slides.length;
let cur = 0;

slides.forEach((_, i) => {
  const d = document.createElement('div');
  d.className = 'ndot' + (i === 0 ? ' active' : '');
  d.onclick = () => goTo(i);
  dotsEl.appendChild(d);
});

function pad(n) { return String(n).padStart(2,'0'); }
function goTo(n) {
  slides[cur].classList.remove('active');
  dotsEl.children[cur].classList.remove('active');
  cur = ((n % total) + total) % total;
  slides[cur].classList.add('active');
  dotsEl.children[cur].classList.add('active');
  counter.textContent = pad(cur+1) + ' / ' + pad(total);
}
function go(d) { goTo(cur + d); }
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(1);
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   go(-1);
});
function scaleDeck() {
  const deck = document.getElementById('deck');
  const sx = window.innerWidth / 1440;
  const sy = window.innerHeight / 900;
  deck.style.transform = `scale(${Math.min(sx, sy)})`;
}
window.addEventListener('resize', scaleDeck);
scaleDeck();
goTo(0);
