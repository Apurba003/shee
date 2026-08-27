// ===== Floating petals =====
(function petals(){
  const wrap = document.getElementById('petals');
  const count = window.innerWidth < 700 ? 10 : 18;
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.className = 'petal';
    const size = 6 + Math.random()*10;
    p.style.width = size+'px';
    p.style.height = size+'px';
    p.style.left = Math.random()*100+'vw';
    p.style.animationDuration = (10 + Math.random()*14)+'s';
    p.style.animationDelay = (Math.random()*-20)+'s';
    p.style.opacity = 0.25 + Math.random()*0.4;
    wrap.appendChild(p);
  }
})();

// ===== Twinkling sparkles =====
(function sparkles(){
  const count = window.innerWidth < 700 ? 12 : 24;
  for(let i=0;i<count;i++){
    const s = document.createElement('div');
    s.className = 'sparkle';
    const size = 3 + Math.random()*4;
    s.style.width = size+'px';
    s.style.height = size+'px';
    s.style.left = Math.random()*100+'vw';
    s.style.top = Math.random()*100+'vh';
    s.style.animationDuration = (2.5 + Math.random()*3)+'s';
    s.style.animationDelay = (Math.random()*-5)+'s';
    document.body.appendChild(s);
  }
})();

// ===== Gift box open =====
const giftBox = document.getElementById('giftBox');
const giftScreen = document.getElementById('gift-screen');
const site = document.getElementById('site');
let opened = false;

function burstConfetti(originX, originY){
  const colors = ['#FFB37C','#E8763F','#D9A441','#FFFFFF','#C9506B'];
  originX = originX ?? window.innerWidth/2;
  originY = originY ?? (window.innerHeight/2 - 40);
  for(let i=0;i<46;i++){
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    const size = 6 + Math.random()*8;
    c.style.width = size+'px';
    c.style.height = size*0.6+'px';
    c.style.background = colors[Math.floor(Math.random()*colors.length)];
    c.style.left = originX+'px';
    c.style.top = originY+'px';
    document.body.appendChild(c);

    const angle = Math.random()*Math.PI*2;
    const dist = 120 + Math.random()*260;
    const dx = Math.cos(angle)*dist;
    const dy = Math.sin(angle)*dist - 80;
    const rot = Math.random()*720 - 360;

    c.animate([
      { transform:'translate(0,0) rotate(0deg)', opacity:1 },
      { transform:`translate(${dx}px, ${dy + 260}px) rotate(${rot}deg)`, opacity:0 }
    ], {
      duration: 1400 + Math.random()*900,
      easing: 'cubic-bezier(.2,.7,.3,1)',
      fill: 'forwards'
    });

    setTimeout(()=> c.remove(), 2500);
  }
}

function openGift(){
  if(opened) return;
  opened = true;
  giftBox.classList.add('open');
  burstConfetti();
  setTimeout(()=>{
    giftScreen.classList.add('opened');
    site.removeAttribute('aria-hidden');
    document.body.style.overflow = 'auto';
    initReveal();
    initGarland();
    initTilt();
    initCursorHearts();
    initProgressRail();
    initTypewriter();
    initLetterFinale();
  }, 650);
}

document.body.style.overflow = 'hidden';

document.addEventListener('DOMContentLoaded', ()=>{
  initGalleryPlaceholders();
  initLightbox();
  initHeroParallax();
});

// ===== Magnetic gift box =====
const giftBoxWrap = document.getElementById('giftBoxWrap');
giftScreen.addEventListener('mousemove', (e)=>{
  if(opened) return;
  const rect = giftScreen.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  giftBoxWrap.style.transform = `translate(${x*14}px, ${y*14}px)`;
});
giftScreen.addEventListener('mouseleave', ()=>{
  if(!opened) giftBoxWrap.style.transform = '';
});

giftBox.addEventListener('click', openGift);
giftBox.addEventListener('keypress', (e)=>{
  if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openGift(); }
});

// ===== Scroll reveal =====
function initReveal(){
  const items = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold:0.15, rootMargin:'0px 0px -60px 0px' });
  items.forEach(el=> obs.observe(el));
}

// ===== Photo placeholder detection =====
function initGalleryPlaceholders(){
  document.querySelectorAll('.polaroid').forEach(fig=>{
    const r = fig.getAttribute('data-rotate');
    if(r) fig.style.setProperty('--r', r+'deg');
    const img = fig.querySelector('img');
    if(!img) return;
    const markMissing = ()=> fig.classList.add('img-missing');
    if(img.complete){
      if(img.naturalWidth === 0) markMissing();
    }
    img.addEventListener('error', markMissing);
  });
}

// ===== Lightbox =====
function initLightbox(){
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  if(!lightbox) return;

  document.querySelectorAll('.polaroid').forEach(fig=>{
    fig.addEventListener('click', ()=>{
      if(fig.classList.contains('img-missing')) return;
      const img = fig.querySelector('img');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCaption.textContent = fig.getAttribute('data-caption') || '';
      lightbox.classList.add('is-open');
      lightbox.removeAttribute('aria-hidden');
    });
  });

  function close(){
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden','true');
  }
  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) close(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close(); });
}

// ===== Tilt on hover (cards + polaroids) =====
function initTilt(){
  const els = document.querySelectorAll('.tl-card, .shayari-card, .polaroid');
  els.forEach(el=>{
    el.addEventListener('mousemove', (e)=>{
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const isPolaroid = el.classList.contains('polaroid');
      const maxTilt = isPolaroid ? 8 : 5;
      const base = isPolaroid ? 'rotate(0deg) translateY(-8px) scale(1.04)' : '';
      el.style.transform = `${base} perspective(700px) rotateX(${(-y*maxTilt).toFixed(2)}deg) rotateY(${(x*maxTilt).toFixed(2)}deg)`;
    });
    el.addEventListener('mouseleave', ()=>{
      el.style.transform = '';
    });
  });
}

// ===== Cursor heart trail (desktop only, throttled) =====
function initCursorHearts(){
  if(window.matchMedia('(pointer: coarse)').matches) return; // skip on touch devices
  let last = 0;
  const symbols = ['♥','✦','❁'];
  document.addEventListener('mousemove', (e)=>{
    const now = Date.now();
    if(now - last < 90) return;
    last = now;
    const heart = document.createElement('div');
    heart.className = 'cursor-heart';
    heart.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    document.body.appendChild(heart);

    heart.animate([
      { transform:'translate(-50%,-50%) scale(1)', opacity:.9 },
      { transform:`translate(-50%, -140%) scale(0.6)`, opacity:0 }
    ], { duration:900, easing:'ease-out', fill:'forwards' });

    setTimeout(()=> heart.remove(), 950);
  });
}

// ===== Hero parallax orbs =====
function initHeroParallax(){
  const hero = document.getElementById('hero');
  const orb1 = document.querySelector('.hero-orb-1');
  const orb2 = document.querySelector('.hero-orb-2');
  if(!hero || !orb1 || !orb2) return;
  hero.addEventListener('mousemove', (e)=>{
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    orb1.style.transform = `translate(${x*40}px, ${y*40}px)`;
    orb2.style.transform = `translate(${x*-50}px, ${y*-50}px)`;
  });
}

// ===== Scroll progress rail =====
function initProgressRail(){
  const fill = document.getElementById('progressFill');
  const heart = document.getElementById('progressHeart');
  const rail = document.getElementById('progressRail');
  if(!fill || !heart || !rail) return;
  function update(){
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
    fill.style.height = (pct*100)+'%';
    heart.style.top = (pct*100)+'%';
  }
  window.addEventListener('scroll', update, { passive:true });
  update();
}

// ===== Typewriter =====
function initTypewriter(){
  const els = document.querySelectorAll('[data-typewriter]');
  if(!els.length) return;
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const text = el.getAttribute('data-typewriter');
        el.textContent = '';
        el.style.borderRight = '2px solid var(--deep-orange)';
        let i = 0;
        const speed = 65;
        const tick = ()=>{
          if(i <= text.length){
            el.textContent = text.slice(0,i);
            i++;
            setTimeout(tick, speed);
          } else {
            setTimeout(()=>{ el.style.borderRight = 'none'; }, 400);
          }
        };
        tick();
        obs.unobserve(el);
      }
    });
  }, { threshold:0.6 });
  els.forEach(el=> obs.observe(el));
}

// ===== Letter finale confetti =====
function initLetterFinale(){
  const letter = document.getElementById('letter');
  if(!letter) return;
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const rect = entry.target.getBoundingClientRect();
        burstConfetti(rect.left + rect.width/2, rect.top + rect.height/3);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold:0.5 });
  obs.observe(letter);
}

// ===== Garland draw-on-scroll =====
function initGarland(){
  const path = document.getElementById('garlandPath');
  if(!path) return;
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  const wrap = document.querySelector('.garland-wrap');

  function updateGarland(){
    const rect = wrap.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height + vh;
    const scrolled = Math.min(Math.max(vh - rect.top, 0), total);
    const progress = Math.min(scrolled / total, 1);
    path.style.strokeDashoffset = length - (length * progress);
  }

  window.addEventListener('scroll', updateGarland, { passive:true });
  updateGarland();
}
