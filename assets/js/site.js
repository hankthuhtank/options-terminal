const root=document.documentElement;
const nav=document.querySelector('.nav');
const themeBtn=document.querySelector('.theme-toggle');
const saved=localStorage.getItem('safi-theme');
if(saved){root.dataset.theme=saved}else if(window.matchMedia('(prefers-color-scheme:dark)').matches){root.dataset.theme='dark'}
const syncTheme=()=>{if(themeBtn)themeBtn.textContent=root.dataset.theme==='dark'?'Light':'Dark'};syncTheme();
if(themeBtn){themeBtn.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';localStorage.setItem('safi-theme',root.dataset.theme);syncTheme()})}
window.addEventListener('scroll',()=>nav?.classList.toggle('scrolled',window.scrollY>24),{passive:true});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const bars=[42,78,55,94,68,112,48,88,72,124,63,98];
document.querySelectorAll('.bar').forEach((bar,i)=>bar.style.height=`${bars[i%bars.length]}px`);
setInterval(()=>{document.querySelectorAll('.bar').forEach((bar,i)=>{const base=bars[(i+Math.floor(Date.now()/1600))%bars.length];bar.style.height=`${Math.max(24,base+(Math.random()*24-12))}px`})},1600);

document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',e=>{const target=document.querySelector(link.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'})}}));
