(() => {
  'use strict';
  const views = [...document.querySelectorAll('.view')];
  const links = [...document.querySelectorAll('[data-view]')];
  const labels = {top: 'Studio', services: 'Projects', packages: 'Websites', desk: 'The Trading Desk', about: 'About', contact: 'Contact'};
  const aliases = {projects:'services', websites:'packages', trading:'desk'};
  const menu = document.getElementById('menu-toggle');
  const workspace = document.getElementById('workspace');
  const baseTitle = document.title;
  let active = '';
  function closeMenu(returnFocus = false) {
    document.body.classList.remove('nav-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
    if (returnFocus) menu.focus();
  }
  function route(focus = true) {
    const hash = location.hash.slice(1);
    const target = aliases[hash] || hash;
    const id = Object.hasOwn(labels, target) ? target : 'top';
    for (const view of views) view.hidden = view.id !== id;
    document.documentElement.classList.add('js-views');
    for (const link of links) {
      if (link.dataset.view === id) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
    document.getElementById('view-label').textContent = labels[id];
    document.title = id === 'top' ? baseTitle : labels[id] + ' — Safi Solutions';
    closeMenu();
    if (active !== id) {
      window.scrollTo({top: 0, behavior: 'instant'});
      if (focus) workspace.focus({preventScroll: true});
    }
    active = id;
    document.body.dataset.studioView = id;
  }
  menu.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (open) document.querySelector('.studio-nav [aria-current="page"]').focus();
  });
  document.addEventListener('keydown', event => {
    if (!document.body.classList.contains('nav-open')) return;
    if (event.key === 'Escape') { event.preventDefault(); closeMenu(true); }
    if (event.key === 'Tab') {
      const controls = [...document.querySelectorAll('.studio-nav a'), menu];
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {event.preventDefault(); last.focus();}
      else if (!event.shiftKey && document.activeElement === last) {event.preventDefault(); first.focus();}
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.sidebar, #menu-toggle')) closeMenu();
    const link = event.target.closest('a[href^="#"]');
    if (link?.classList.contains('skip-link')) {event.preventDefault(); workspace.focus(); return;}
    if (link && link.getAttribute('href') === location.hash && link.getAttribute('href') !== '#workspace') {
      route(); workspace.focus({preventScroll: true});
    }
  });
  const mobile = matchMedia('(max-width: 1100px)');
  mobile.addEventListener('change', () => closeMenu());
  window.addEventListener('hashchange', () => route());
  route(false);
  const selectors = [...document.querySelectorAll('[data-feature]')];
  let featured = 0;
  function selectFeature(index, focus = false) {
    featured = (index + selectors.length) % selectors.length;
    selectors.forEach((item, i) => {
      const selected = i === featured;
      item.setAttribute('aria-pressed', String(selected));
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
    const selected = selectors[featured];
    const name = document.querySelector('#feature-' + featured + ' .feature-copy .meta').textContent;
    document.getElementById('stage-name').textContent = String(featured + 1).padStart(2, '0') + ' / ' + name;
    if (focus) selected.focus({preventScroll:true});
    const strip = document.querySelector('.project-switcher');
    const left = selected.offsetLeft - strip.offsetLeft;
    if (left < strip.scrollLeft || left + selected.offsetWidth > strip.scrollLeft + strip.clientWidth) {
      strip.scrollTo({left: Math.max(0, left - (strip.clientWidth-selected.offsetWidth)/2), behavior:'auto'});
    }
  }
  selectors.forEach((button,i) => button.addEventListener('click', () => selectFeature(i)));
  document.getElementById('feature-prev').addEventListener('click', () => selectFeature(featured-1));
  document.getElementById('feature-next').addEventListener('click', () => selectFeature(featured+1));
  document.querySelector('.project-switcher').addEventListener('keydown', e => {
    if(!e.target.matches('[data-feature]')) return;
    let next;
    if(e.key==='ArrowRight') next=featured+1;
    else if(e.key==='ArrowLeft') next=featured-1;
    else if(e.key==='Home') next=0;
    else if(e.key==='End') next=selectors.length-1;
    else return;
    e.preventDefault(); selectFeature(next,true);
  });
  const motion = document.getElementById('motion-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches;
  try { paused = reduced.matches || localStorage.getItem('safi.motion') === 'paused'; } catch (_) {}
  function applyMotion() {
    document.documentElement.classList.toggle('motion-paused', paused);
    motion.setAttribute('aria-pressed', String(paused));
    motion.textContent = reduced.matches ? 'Reduced motion' : paused ? 'Resume motion' : 'Pause motion';
    motion.disabled = reduced.matches;
    document.dispatchEvent(new CustomEvent('studio:motion', {detail:{paused}}));
  }
  motion.addEventListener('click', () => {
    paused = !paused; applyMotion();
    try { localStorage.setItem('safi.motion', paused ? 'paused' : 'playing'); } catch (_) {}
  });
  reduced.addEventListener('change', () => {paused = reduced.matches; applyMotion();});
  applyMotion();
  document.getElementById('year').textContent = new Date().getFullYear();
})();

/* A projected dust field: no dependencies, no images, no layout work per frame. */
(() => {
  'use strict';
  const canvas=document.getElementById('studio-particles');
  const ctx=canvas?.getContext('2d',{alpha:true});
  if(!ctx)return;
  const fine=matchMedia('(pointer:fine)');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  let width=0,height=0,dots=[],frame=0,last=0,elapsed=0,paused=document.documentElement.classList.contains('motion-paused');
  let mouse={x:.7,y:.42,tx:.7,ty:.42},burst=0,resizeFrame=0;
  function resize(){
    width=innerWidth;height=innerHeight;
    const dpr=Math.min(devicePixelRatio||1,width<700?1.25:1.6);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
    const count=width<700?260:Math.min(850,Math.max(480,Math.round(width*height/1550)));
    dots=Array.from({length:count},(_,i)=>({x:Math.random(),y:Math.random(),z:Math.random(),angle:Math.random()*Math.PI*2,radius:.55+Math.random()*.6,speed:.35+Math.random()*.65,size:.4+Math.random()*1.25,phase:Math.random()*6.28,ring:i<count*.64}));
    draw();
  }
  function draw(){
    ctx.clearRect(0,0,width,height);
    const moving=!paused&&!reduce.matches,t=elapsed*.000055;
    const cx=width*(width<800?.59:.72)+(mouse.x-.5)*22,cy=height*.43+(mouse.y-.5)*20;
    const radius=Math.min(width*.43,height*.43),cos=Math.cos(-.42),sin=Math.sin(-.42);
    for(const p of dots){
      let x,y,depth;
      if(p.ring){
        const a=p.angle+t*p.speed,rr=radius*p.radius*(1+burst*.045);
        const px=Math.cos(a)*rr,py=Math.sin(a)*rr*.35;
        x=cx+px*cos-py*sin;y=cy+px*sin+py*cos+(p.z-.5)*radius*.5;
        depth=(Math.sin(a)+1)/2;
      }else{
        x=((p.x*width+t*28*p.speed)%(width+30))-15;
        y=((p.y*height-t*40*p.speed)%(height+30)+height+30)%(height+30)-15;
        depth=p.z;
      }
      const dx=x-mouse.x*width,dy=y-mouse.y*height,dist=Math.hypot(dx,dy);
      if(moving&&fine.matches&&dist<150&&dist>1){const force=(1-dist/150)*15;x+=dx/dist*force;y+=dy/dist*force;}
      const flicker=.76+.24*Math.sin(t*9+p.phase),alpha=(p.ring?.2+depth*.53:.18+depth*.45)*flicker;
      ctx.fillStyle=p.phase>5.4?`rgba(235,239,255,${alpha})`:`rgba(${115+Math.round(depth*50)},${168+Math.round(depth*40)},255,${alpha})`;
      const size=p.size*(.65+depth*.8);
      ctx.beginPath();ctx.arc(x,y,size,0,Math.PI*2);ctx.fill();
      if(depth>.88&&p.size>1.2){ctx.fillStyle=`rgba(109,173,255,${alpha*.07})`;ctx.beginPath();ctx.arc(x,y,size*4.5,0,Math.PI*2);ctx.fill();}
    }
  }
  function tick(now){
    frame=0;if(paused||reduce.matches||document.hidden)return;
    if(!last)last=now;
    if(now-last>=32){elapsed+=Math.min(now-last,70);last=now;mouse.x+=(mouse.tx-mouse.x)*.065;mouse.y+=(mouse.ty-mouse.y)*.065;burst*=.94;draw();}
    frame=requestAnimationFrame(tick);
  }
  function sync(){
    if(frame)cancelAnimationFrame(frame);frame=0;last=0;
    if(!paused&&!reduce.matches&&!document.hidden)frame=requestAnimationFrame(tick);else draw();
  }
  document.addEventListener('studio:motion',e=>{paused=e.detail.paused;sync()});
  document.addEventListener('visibilitychange',sync);
  window.addEventListener('resize',()=>{if(resizeFrame)cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(()=>{resizeFrame=0;resize()})},{passive:true});
  window.addEventListener('pointermove',e=>{if(!fine.matches||paused||reduce.matches)return;mouse.tx=e.clientX/width;mouse.ty=e.clientY/height},{passive:true});
  document.addEventListener('pointerdown',()=>{if(!paused&&!reduce.matches)burst=1},{passive:true});
  const stage=document.querySelector('.project-stage'),panel=document.querySelector('.project-window');
  stage?.addEventListener('pointermove',e=>{
    if(!fine.matches||paused||reduce.matches)return;
    const rect=stage.getBoundingClientRect();
    panel.style.setProperty('--tilt-x',((e.clientX-rect.left)/rect.width-.5)*5+'deg');
    panel.style.setProperty('--tilt-y',-((e.clientY-rect.top)/rect.height-.5)*4+'deg');
  },{passive:true});
  stage?.addEventListener('pointerleave',()=>{panel.style.setProperty('--tilt-x','0deg');panel.style.setProperty('--tilt-y','0deg')});
  resize();sync();
})();
