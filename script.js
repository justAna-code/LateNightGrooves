const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
}

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

const filtersToggle = document.getElementById('filtersToggle');
const filtersClose = document.getElementById('filtersClose');
const filtersOverlay = document.getElementById('filtersOverlay');
const catalogVisual = document.querySelector('.catalog-visual');

function openFilters() {
  catalogVisual.classList.add('is-open');
  filtersOverlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeFilters() {
  catalogVisual.classList.remove('is-open');
  filtersOverlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

filtersToggle.addEventListener('click', openFilters);
filtersClose.addEventListener('click', closeFilters);
filtersOverlay.addEventListener('click', closeFilters);
const spinButtons = document.querySelectorAll('.card__spin');
let currentAudio = null;
let currentButton = null;

spinButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.card');
    const audioSrc = card.dataset.audio;

    
    if (currentButton === button) {
      if (currentAudio.paused) {
        currentAudio.play();
        button.classList.add('is-playing');
      } else {
        currentAudio.pause();
        button.classList.remove('is-playing');
      }
      return;
    }

    
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      if (currentButton) currentButton.classList.remove('is-playing');
    }

    
    currentAudio = new Audio(audioSrc);
    currentAudio.volume = 0;
    currentAudio.play();

   
    let vol = 0;
    const fadeIn = setInterval(() => {
      if (vol < 0.7) {
        vol += 0.05;
        currentAudio.volume = vol;
      } else {
        clearInterval(fadeIn);
      }
    }, 50);

    button.classList.add('is-playing');
    currentButton = button;

    
    currentAudio.addEventListener('ended', () => {
      button.classList.remove('is-playing');
      currentButton = null;
      currentAudio = null;
    });
  });
});