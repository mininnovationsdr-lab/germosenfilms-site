const hero = document.querySelector('.hero-video');
const motion = document.querySelector('#motion');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
function updateMotion(){ const english=document.documentElement.lang==='en'; const text=hero.paused?(english?'Play video':'Reproducir video'):(english?'Pause video':'Pausar video');motion.innerHTML=text+' <span aria-hidden="true">'+(hero.paused?'▷':'Ⅱ')+'</span>';motion.setAttribute('aria-label',text); }
document.addEventListener('languagechange',updateMotion);updateMotion();
if(reduced.matches){hero.pause(); motion.hidden=true;}
hero.addEventListener('play',updateMotion);hero.addEventListener('pause',updateMotion);
motion.addEventListener('click',()=>{if(hero.paused)hero.play().catch(updateMotion);else hero.pause();});
const dialog=document.querySelector('#player-dialog');
const player=document.querySelector('#film-player');
let previousFocus, resumeHero=false;
document.querySelectorAll('.film-open').forEach(button=>button.addEventListener('click',()=>{
 previousFocus=button; resumeHero=!hero.paused; hero.pause();
 document.querySelector('#film-title').textContent=button.dataset.title;
 player.src='assets/'+button.dataset.film+'.mp4';
 player.poster='assets/'+button.dataset.film+'.jpg';
 dialog.showModal();document.body.classList.add('modal-open');player.play().catch(()=>{});
}));
document.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{player.pause();player.removeAttribute('src');player.load();document.body.classList.remove('modal-open');previousFocus?.focus();if(resumeHero&&!reduced.matches)hero.play().catch(()=>{});});
document.querySelector('#year').textContent=new Date().getFullYear();
