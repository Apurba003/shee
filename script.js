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

// ===== Gift box open =====
const giftBox = document.getElementById('giftBox');
const giftScreen = document.getElementById('gift-screen');
const site = document.getElementById('site');
let opened = false;

function burstConfetti(){
  const colors = ['#FFB37C','#E8763F','#D9A441','#FFFFFF','#C9506B'];
  const originX = window.innerWidth/2;
  const originY = window.innerHeight/2 - 40;
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
  }, 650);
}

document.body.style.overflow = 'hidden';
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
