/* ═══════════════════════════
   BACKGROUND ANIMATIONS
═══════════════════════════ */
function makeStars() {
  const c = document.getElementById('stars');
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const sz = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
      width:${sz}px; height:${sz}px;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      animation-duration:${2+Math.random()*4}s;
      animation-delay:${Math.random()*4}s;
    `;
    c.appendChild(s);
  }
}

function makePetals() {
  const petals = ['🌸','🌺','🌹','🌷','✿','❀'];
  const c = document.getElementById('petals');
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = petals[Math.floor(Math.random()*petals.length)];
    p.style.cssText = `
      left:${Math.random()*100}%;
      animation-duration:${8+Math.random()*10}s;
      animation-delay:${Math.random()*10}s;
      font-size:${0.9+Math.random()*0.9}rem;
    `;
    c.appendChild(p);
  }
}

function makeFloatingHearts() {
  const c = document.getElementById('heartsFloat');
  for (let i = 0; i < 18; i++) {
    const h = document.createElement('div');
    h.className = 'heart-float';
    h.textContent = '♥';
    h.style.cssText = `
      left:${Math.random()*100}%;
      animation-duration:${12+Math.random()*14}s;
      animation-delay:${Math.random()*12}s;
      font-size:${0.7+Math.random()*1.2}rem;
      color:rgba(232,84,122,${0.1+Math.random()*0.3});
    `;
    c.appendChild(h);
  }
}

makeStars();
makePetals();
makeFloatingHearts();

/* ═══════════════════════════
   PASSWORD
═══════════════════════════ */
const CORRECT = '09/03/25';
const pwdInput = document.getElementById('pwdInput');

pwdInput.addEventListener('input', function () {
  let v = this.value.replace(/\D/g, '');
  if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
  if (v.length > 5) v = v.slice(0, 5) + '/' + v.slice(5);
  this.value = v.slice(0, 8);
});

pwdInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') checkPassword();
});

function checkPassword() {
  const val = pwdInput.value.trim();
  const errEl = document.getElementById('errorMsg');

  if (val === CORRECT) {
    errEl.classList.add('hidden');
    launchFireworks();
    setTimeout(() => {
      document.getElementById('password-screen').classList.add('hide');
      const mc = document.getElementById('main-content');
      mc.classList.add('show');
      startCountdown();
      startSurpriseCountdown();
    }, 700);
  } else {
    errEl.classList.remove('hidden');
    pwdInput.classList.add('error-shake');
    setTimeout(() => pwdInput.classList.remove('error-shake'), 500);
    pwdInput.value = '';
    pwdInput.focus();
  }
}

function launchFireworks() {
  const emojis = ['💕','🌹','✨','💫','🎉','💖','🌸'];
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const fw = document.createElement('div');
      fw.className = 'firework';
      fw.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      fw.style.cssText = `
        left:${Math.random()*100}vw;
        top:${Math.random()*100}vh;
        animation-delay:${Math.random()*0.4}s;
      `;
      document.body.appendChild(fw);
      setTimeout(() => fw.remove(), 1200);
    }, i * 40);
  }
}

/* ═══════════════════════════
   CAROUSEL
═══════════════════════════ */
const captions = [
  'Walking through the Colosseum together 🏟️',
  'Forever in my memory with you on vespa 💕',
  'You are my champion 🎉',
  'Eating at the best pizza ever 🍕',
  'Fontana di Trevi · making a wish 💧'
];

let slides = [
  'images/one.jpeg',
  'images/two.jpeg',
  'images/three.jpeg',
  'images/four.jpeg',
  'images/five.jpeg',
];
let current = 0;
let autoTimer;

function buildSlides() {
  const track = document.getElementById('carouselTrack');
  const dots  = document.getElementById('dotsContainer');
  track.innerHTML = '';
  dots.innerHTML  = '';

  if (slides.length === 0) {
    const placeholders = [
      { icon: '🏛️', label: 'The Eternal City · upload your photos' },
      { icon: '🕌', label: 'The Vatican · your memories here' },
      { icon: '💧', label: 'Fontana di Trevi · your photos here' },
    ];
    placeholders.forEach((ph, i) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      slide.innerHTML = `<div class="slide-placeholder">
        <span class="ph-icon">${ph.icon}</span>
        <span>${ph.label}</span>
      </div>`;
      track.appendChild(slide);

      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.onclick = () => goTo(i);
      dots.appendChild(dot);
    });
    current = 0;
    updateCarousel();
    startAuto();
    return;
  }

  slides.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    const img = document.createElement('img');
    img.src = src;
    img.alt = captions[i % captions.length];
    slide.appendChild(img);
    const cap = document.createElement('div');
    cap.className = 'slide-caption';
    cap.textContent = captions[i % captions.length];
    slide.appendChild(cap);
    track.appendChild(slide);

    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goTo(i);
    dots.appendChild(dot);
  });
  current = 0;
  updateCarousel();
  startAuto();
}

function getSlideCount() {
  return document.getElementById('carouselTrack').children.length;
}

function updateCarousel() {
  document.getElementById('carouselTrack').style.transform = `translateX(-${current * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
}

function goTo(n) {
  current = (n + getSlideCount()) % getSlideCount();
  updateCarousel();
}

function nextSlide() { goTo(current + 1); resetAuto(); }
function prevSlide() { goTo(current - 1); resetAuto(); }

function startAuto() {
  clearInterval(autoTimer);
  clearTimeout(autoTimer);
  autoTimer = setTimeout(() => {
    goTo(current + 1);
    autoTimer = setInterval(() => { goTo(current + 1); }, 4500);
  }, 4000);
}
function resetAuto() { startAuto(); }

function handleFileUpload(e) {
  const files = Array.from(e.target.files);
  const readers = files.map(f => new Promise(res => {
    const r = new FileReader();
    r.onload = ev => res(ev.target.result);
    r.readAsDataURL(f);
  }));
  Promise.all(readers).then(results => {
    slides = [...slides, ...results];
    buildSlides();
  });
}

buildSlides();

/* ═══════════════════════════
   COUNTDOWN
═══════════════════════════ */
function startCountdown() {
  const start = new Date('2025-03-09T00:00:00');
  function update() {
    const now  = new Date();
    const diff = now - start;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cdDays').textContent  = d;
    document.getElementById('cdHours').textContent = String(h).padStart(2, '0');
    document.getElementById('cdMins').textContent  = String(m).padStart(2, '0');
    document.getElementById('cdSecs').textContent  = String(s).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
}

/* ═══════════════════════════
   SURPRISE TEASER COUNTDOWN
═══════════════════════════ */
function startSurpriseCountdown() {
  const START_HOUR = 17; // 5 PM
  const END_HOUR   = 19; // 7 PM
  const countdownEl = document.getElementById('surpriseCountdown');
  const activeEl    = document.getElementById('surpriseActiveMsg');

  function update() {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Amsterdam',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    }).formatToParts(new Date());
    const get = type => parseInt(parts.find(p => p.type === type).value, 10);
    const nowSec = get('hour') * 3600 + get('minute') * 60 + get('second');
    const startSec = START_HOUR * 3600;
    const endSec   = END_HOUR * 3600;

    if (nowSec >= startSec && nowSec < endSec) {
      countdownEl.classList.add('sp-hidden');
      activeEl.classList.remove('sp-hidden');
      return;
    }

    countdownEl.classList.remove('sp-hidden');
    activeEl.classList.add('sp-hidden');

    const diff = nowSec < startSec
      ? startSec - nowSec
      : (86400 - nowSec) + startSec;

    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;
    document.getElementById('spHours').textContent = String(h).padStart(2, '0');
    document.getElementById('spMins').textContent  = String(m).padStart(2, '0');
    document.getElementById('spSecs').textContent  = String(s).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ── Touch / swipe support ── */
let touchStartX = 0;
document.getElementById('carouselTrack').addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });
document.getElementById('carouselTrack').addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) dx < 0 ? nextSlide() : prevSlide();
});
