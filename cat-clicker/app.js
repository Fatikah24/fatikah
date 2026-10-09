'use strict';

/* ===========================
   State
=========================== */
const state = {
  totalClicks: 0,
  bestScore:   0,
  combo:       0,
  comboTimer:  null,
  comboDuration: 2000,   // ms sebelum combo reset
  cpsClicks:   [],
  cpsInterval: null,
};

/* ===========================
   DOM References
=========================== */
const catImage      = document.getElementById('cat-image');
const catContainer  = document.getElementById('cat-container');
const ripple        = document.getElementById('click-ripple');
const totalScoreEl  = document.getElementById('total-score');
const cpsScoreEl    = document.getElementById('cps-score');
const bestScoreEl   = document.getElementById('best-score');
const comboTextEl   = document.getElementById('combo-text');
const comboBarEl    = document.getElementById('combo-bar');
const floatContainer= document.getElementById('float-container');
const btnNewCat     = document.getElementById('btn-new-cat');
const btnReset      = document.getElementById('btn-reset');

/* ===========================
   Cat images (fallback pool)
   Menggunakan cataas.com dengan seed random agar gambar bervariasi
=========================== */
function getCatUrl() {
  const seed = Math.floor(Math.random() * 99999);
  return `https://cataas.com/cat?seed=${seed}&width=300&height=300`;
}

/* ===========================
   Score Helpers
=========================== */
function updateScores() {
  totalScoreEl.textContent = formatNumber(state.totalClicks);
  bestScoreEl.textContent  = formatNumber(state.bestScore);

  // animasi pop
  totalScoreEl.classList.remove('pop');
  void totalScoreEl.offsetWidth; // reflow trick
  totalScoreEl.classList.add('pop');
}

function formatNumber(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
}

/* ===========================
   CPS (Clicks Per Second)
=========================== */
function startCpsTracker() {
  state.cpsInterval = setInterval(() => {
    const now = Date.now();
    // Simpan hanya klik dalam 1 detik terakhir
    state.cpsClicks = state.cpsClicks.filter(t => now - t < 1000);
    cpsScoreEl.textContent = state.cpsClicks.length;
  }, 200);
}

/* ===========================
   Combo System
=========================== */
function incrementCombo() {
  state.combo++;

  // Reset timer
  clearTimeout(state.comboTimer);
  state.comboTimer = setTimeout(resetCombo, state.comboDuration);

  // Update UI
  const pct = Math.min(state.combo / 50, 1); // max visual 50 klik
  comboBarEl.style.transform = `scaleX(${pct})`;

  const emoji = state.combo >= 30 ? '🚀' :
                state.combo >= 20 ? '💥' :
                state.combo >= 10 ? '🔥' : '⚡';
  comboTextEl.textContent = `${emoji} Combo x${state.combo}`;

  // Warna berubah saat combo tinggi
  if (state.combo >= 20) {
    comboTextEl.style.color = '#fbbf24';
  } else if (state.combo >= 10) {
    comboTextEl.style.color = '#f472b6';
  } else {
    comboTextEl.style.color = '';
  }
}

function resetCombo() {
  state.combo = 0;
  comboBarEl.style.transform = 'scaleX(0)';
  comboTextEl.textContent = '⚡ Combo x0';
  comboTextEl.style.color = '';
}

/* ===========================
   Floating Label on Click
=========================== */
function spawnFloatLabel(x, y) {
  const label = document.createElement('span');
  label.className = 'float-label';

  // Pesan bervariasi berdasarkan combo
  const messages = ['+1', '+1', '+1', '😸', '🐾', '+1 nyam!', '🐱'];
  const comboMessages = ['COMBO!', '🔥+1', '💥+1', '⚡+1'];

  let text = state.combo > 5
    ? comboMessages[Math.floor(Math.random() * comboMessages.length)]
    : messages[Math.floor(Math.random() * messages.length)];

  label.textContent = text;

  // Warna gradasi berdasarkan combo
  const colors = [
    '#d8b4fe', '#f9a8d4', '#fde68a',
    '#6ee7b7', '#93c5fd', '#fb923c'
  ];
  label.style.color = colors[state.combo % colors.length];

  // Posisi: dekat kursor, sedikit acak
  const offsetX = (Math.random() - 0.5) * 60;
  label.style.left = `${x + offsetX}px`;
  label.style.top  = `${y - 20}px`;
  label.style.fontSize = state.combo >= 10 ? '1.8rem' : '1.4rem';

  floatContainer.appendChild(label);
  label.addEventListener('animationend', () => label.remove());
}

/* ===========================
   Milestone Toast
=========================== */
const milestones = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000];
let shownMilestones = new Set();

function checkMilestone(n) {
  for (const m of milestones) {
    if (n >= m && !shownMilestones.has(m)) {
      shownMilestones.add(m);
      showToast(`🎉 ${formatNumber(m)} klik! Luar biasa!`);
      break;
    }
  }
}

let toastTimeout = null;
function showToast(msg) {
  // Hapus toast lama jika ada
  const old = document.querySelector('.milestone-toast');
  if (old) old.remove();
  clearTimeout(toastTimeout);

  const toast = document.createElement('div');
  toast.className = 'milestone-toast';
  toast.textContent = msg;
  document.body.appendChild(toast);

  // Trigger animasi masuk
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, 2500);
}

/* ===========================
   Main Click Handler
=========================== */
function handleCatClick(e) {
  // Update state
  state.totalClicks++;
  if (state.totalClicks > state.bestScore) {
    state.bestScore = state.totalClicks;
  }

  // CPS tracking
  state.cpsClicks.push(Date.now());

  // Combo
  incrementCombo();

  // Scores UI
  updateScores();

  // Milestone check
  checkMilestone(state.totalClicks);

  // Cat bounce animation
  catImage.classList.remove('clicked');
  void catImage.offsetWidth;
  catImage.classList.add('clicked');

  // Ripple
  ripple.classList.remove('ripple-active');
  void ripple.offsetWidth;
  ripple.classList.add('ripple-active');

  // Floating label
  const rect = catContainer.getBoundingClientRect();
  const cx = (e.clientX ?? rect.left + rect.width / 2);
  const cy = (e.clientY ?? rect.top + rect.height / 2);
  spawnFloatLabel(cx, cy);
}

/* ===========================
   New Cat Button
=========================== */
function loadNewCat() {
  catImage.classList.add('loading');
  const newSrc = getCatUrl();
  const temp = new Image();
  temp.onload = () => {
    catImage.src = newSrc;
    catImage.classList.remove('loading');
  };
  temp.onerror = () => {
    // Fallback ke thispersondoesnotexist-style placeholder
    catImage.src = `https://placekitten.com/300/300?image=${Math.floor(Math.random()*16)+1}`;
    catImage.classList.remove('loading');
  };
  temp.src = newSrc;
}

/* ===========================
   Reset Button
=========================== */
function resetGame() {
  state.totalClicks = 0;
  state.combo = 0;
  state.cpsClicks = [];
  shownMilestones.clear();
  clearTimeout(state.comboTimer);

  totalScoreEl.textContent = '0';
  cpsScoreEl.textContent   = '0';
  comboTextEl.textContent  = '⚡ Combo x0';
  comboBarEl.style.transform = 'scaleX(0)';
  comboTextEl.style.color  = '';

  // Jangan reset bestScore — pertahankan rekor
  showToast('🔄 Game direset!');
}

/* ===========================
   Keyboard Support (Space / Enter)
=========================== */
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'Enter') {
    e.preventDefault();
    const rect = catContainer.getBoundingClientRect();
    const fakeEvent = {
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2,
    };
    handleCatClick(fakeEvent);
  }
});

/* ===========================
   Event Listeners
=========================== */
catContainer.addEventListener('click', handleCatClick);
btnNewCat.addEventListener('click', loadNewCat);
btnReset.addEventListener('click', resetGame);

// Animasi klik selesai → hapus class
catImage.addEventListener('animationend', () => {
  catImage.classList.remove('clicked');
});
ripple.addEventListener('animationend', () => {
  ripple.classList.remove('ripple-active');
});

/* ===========================
   Init
=========================== */
function init() {
  startCpsTracker();
  // Reset combo bar awal
  comboBarEl.style.transform = 'scaleX(0)';
  // Pastikan gambar awal sudah terbebani
  catImage.addEventListener('load', () => catImage.classList.remove('loading'), { once: true });
}

init();
