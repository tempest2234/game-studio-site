// script.js

// small helpers
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// set year
document.getElementById('year').textContent = new Date().getFullYear();

// mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navList = document.getElementById('navList');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);
    navList.style.display = expanded ? 'none' : 'flex';
  });
}

// modal: watch trailer
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const closeButtons = document.querySelectorAll('[data-close]');

function openModalWithUrl(url){
  modalContent.innerHTML = `<iframe src="${url}?autoplay=1" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  modal.setAttribute('aria-hidden','false');
}
function closeModal(){
  modal.setAttribute('aria-hidden','true');
  modalContent.innerHTML = '';
}

closeButtons.forEach(btn => btn.addEventListener('click', closeModal));
modal.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// attach trailer buttons
$$('.game-card .play-btn').forEach(btn => {
  // if button has href, leave it (link to game)
  if (btn.tagName.toLowerCase()==='a') return;
  btn.addEventListener('click', (e) => {
    const trailer = btn.getAttribute('data-trailer') || btn.dataset.trailer || btn.getAttribute('href');
    if (trailer) openModalWithUrl(trailer);
  });
});

// close modal when clicking backdrop
document.querySelectorAll('.modal-backdrop').forEach(b => b.addEventListener('click', closeModal));

// Intersection reveal animation for cards
const cards = document.querySelectorAll('.game-card');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.opacity = '1';
      io.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
cards.forEach(c => {
  c.style.transform = 'translateY(14px)';
  c.style.opacity = '0';
  io.observe(c);
});

// Embers particle canvas
(function emberParticles(){
  const canvas = document.getElementById('embers');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;
  const count = Math.round(Math.max(20, Math.min(80, w/20)));
  const particles = [];
  function rand(min,max){ return Math.random()*(max-min)+min }
  for(let i=0;i<count;i++){
    particles.push({
      x: Math.random()*w,
      y: Math.random()*h,
      vx: rand(-0.15,0.6),
      vy: rand(-0.3, -1.2),
      r: rand(0.6,2.6),
      life: rand(60,260),
      alpha: rand(0.05,0.35),
      color: `hsla(${rand(20,30)},100%,60%,`
    });
  }
  function resize(){ w=canvas.width=innerWidth; h=canvas.height=innerHeight; }
  addEventListener('resize', resize);

  function frame(){
    ctx.clearRect(0,0,w,h);
    for(let p of particles){
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      p.alpha *= 0.9995;
      if (p.y < -20 || p.life <= 0 || p.x < -40 || p.x > w+40){
        p.x = Math.random()*w;
        p.y = h + Math.random()*60;
        p.vx = rand(-0.15, 0.6);
        p.vy = rand(-0.3, -1.2);
        p.r = rand(0.6,2.6);
        p.life = rand(60,260);
        p.alpha = rand(0.05,0.35);
      }
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r*7);
      grad.addColorStop(0, `${p.color}${p.alpha})`);
      grad.addColorStop(0.5, `${p.color}${p.alpha*0.18})`);
      grad.addColorStop(1, `rgba(0,0,0,0)`);
      ctx.beginPath();
      ctx.fillStyle = grad;
      ctx.arc(p.x, p.y, p.r*5, 0, Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  frame();
})();


