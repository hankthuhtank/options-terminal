(function(){
'use strict';
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const parts=$('#parts'), main=$('main');
if(!parts||!main) return;

// 1) Parts manual is now the first real destination.
main.insertBefore(parts, main.firstElementChild);

// 2) Strip the homepage down to one obvious path.
const nav=$('#navLinks');
if(nav){
 nav.innerHTML='<li><a href="#parts">Parts manual</a></li><li><a href="#lessons">How systems work</a></li><li><a href="#diagnostics">Diagnostics</a></li>';
 $$('#navLinks a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
}
const overline=$('.hero-copy .overline');
if(overline) overline.textContent='Parts-first car + truck education';
const heroTitle=$('.hero h1');
if(heroTitle) heroTitle.innerHTML='Know the parts.<br><span>Understand the machine.</span>';
const heroP=$('.hero-sub p');
if(heroP) heroP.textContent='Start with a part. Learn what it does, where it lives, what it connects to and what failure looks like. Then drop into the system lesson and watch those parts work together.';
const heroNote=$('.hero-note');
if(heroNote) heroNote.innerHTML='Searchable parts manual<br>Real technical visuals<br>System lessons when you want them';
if(!$('.hero-actions')){
 const actions=document.createElement('div');
 actions.className='hero-actions';
 actions.innerHTML='<a class="hero-action primary" href="#parts">Open the parts manual →</a><a class="hero-action" href="#lessons">See how systems work ↓</a>';
 $('.hero-copy')?.appendChild(actions);
}

// 3) Make the manual explain itself in three steps.
const pmTop=$('.pm-topline');
if(pmTop && !$('.pm-guide')){
 const guide=document.createElement('div');
 guide.className='pm-guide';
 guide.innerHTML='<div class="pm-guide-step"><span class="gnum">01</span><div><b>Choose the vehicle</b><span>Car or truck changes which parts and heavy-duty hardware appear.</span></div></div><div class="pm-guide-step"><span class="gnum">02</span><div><b>Choose a system</b><span>Engine, cooling, brakes, electrical, drivetrain and the rest of the machine.</span></div></div><div class="pm-guide-step"><span class="gnum">03</span><div><b>Open a part</b><span>See its job, location, connections and common failure signs.</span></div></div>';
 pmTop.parentNode.insertBefore(guide,pmTop);
}

// Reword the manual around the parts-first concept.
const partsHead=$('#parts .section-head');
if(partsHead){
 const idx=$('.section-index',partsHead), kicker=$('.kicker',partsHead), h2=$('h2',partsHead), p=$('p',partsHead);
 if(idx) idx.textContent='Step 01 / Parts manual';
 if(kicker) kicker.textContent='Start here';
 if(h2) h2.innerHTML='Learn the parts.<br>Build the machine.';
 if(p) p.textContent='This is the center of MotorAtlas. Pick a vehicle type, choose a system and open any component. Once the individual parts make sense, the deeper lessons below show how they work together.';
}

// 4) Move Car / Truck choice into the parts manual instead of the hero.
if(pmTop && !$('.pm-mode-filter')){
 const mode=document.createElement('div');
 mode.className='pm-mode-filter';
 mode.innerHTML='<span class="label">Vehicle</span><button class="pm-mode-btn active" data-pm-mode="car">Car</button><button class="pm-mode-btn" data-pm-mode="truck">Truck</button>';
 pmTop.insertBefore(mode,pmTop.firstChild);
 $$('.pm-mode-btn').forEach(btn=>btn.addEventListener('click',()=>{
  const value=btn.dataset.pmMode;
  $$('.pm-mode-btn').forEach(b=>b.classList.toggle('active',b===btn));
  document.body.classList.toggle('truck-mode',value==='truck');
  const hidden=$(`.mode-btn[data-mode="${value}"]`);
  if(hidden) hidden.click();
 }));
}
document.body.classList.remove('truck-mode');

// 5) One clean bridge from the manual into the deeper lessons.
const engine=$('#engine');
if(engine && !$('#lessons')){
 const intro=document.createElement('section');
 intro.className='lesson-intro';
 intro.id='lessons';
 intro.innerHTML='<div class="shell lesson-intro-inner"><div class="step">Step 02 / System lessons</div><div><h2>Now watch the<br>parts work together.</h2><p>The manual teaches the components. These lessons teach the movement, flow and relationships: combustion, torque transfer, suspension travel, braking hydraulics, charging and diagnostics.</p></div></div>';
 main.insertBefore(intro,engine);
}

// 6) Give each part a contextual route to the relevant lesson instead of another global button strip.
const lessonMap={engine:'#engine',airfuel:'#engine',cooling:'#engine',lubrication:'#engine',transmission:'#systems',drivetrain:'#systems',suspension:'#chassis',brakes:'#chassis',electrical:'#electrical',truck:'#truck'};
const detail=$('#pmDetail');
function addLessonLink(){
 if(!detail||$('.pm-lesson-link',detail)) return;
 const active=$('.pm-system.active');
 const target=active?lessonMap[active.dataset.system]:null;
 if(!target) return;
 const a=document.createElement('a');
 a.className='pm-lesson-link';a.href=target;a.textContent='See how this system works ↓';
 detail.appendChild(a);
}
if(detail){
 const mo=new MutationObserver(()=>requestAnimationFrame(addLessonLink));
 mo.observe(detail,{childList:true,subtree:true});
 addLessonLink();
}

// Remove obsolete module numbering language so the page reads as a continuation of the manual.
const relabel=[['#engine','System lesson / Engine'],['#systems','System lesson / Drivetrain'],['#chassis','System lesson / Chassis'],['#electrical','System lesson / Electrical'],['#truck','Truck lesson / Heavy duty'],['#diagnostics','Practice bay / Diagnostics']];
relabel.forEach(([sel,text])=>{const el=$(`${sel} .section-index`);if(el)el.textContent=text});
})();
