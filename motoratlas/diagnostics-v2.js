(()=>{
'use strict';
const D=window.MOTOR_ATLAS;if(!D?.diagnostics?.length)return;
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));
const norm=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const section=$('#diagnostics'), shell=$('.diag-shell',section);if(!section||!shell)return;
let active=D.diagnostics[0], category='All', query='';
const heading=$('.section-heading',section);
if(heading){
 $('.index',heading).textContent='03 / COMMON DIAGNOSTICS';
 $('.eyebrow-text',heading).textContent='20 PROBLEMS PEOPLE ACTUALLY RUN INTO';
 $('h2',heading).innerHTML='Something feels wrong.<br>Start with the symptom.';
 $('p',heading).textContent='Search what the vehicle is doing, then work through the likely causes, checks and fixes in a sensible order. These guides are symptom-first so you do not have to know the part name before you begin.';
}
const toolbar=document.createElement('div');toolbar.className='dx-toolbar';toolbar.innerHTML='<label class="dx-search"><span>SEARCH A SYMPTOM</span><input id="dxSearch" type="search" autocomplete="off" placeholder="Try: clicking, shakes when braking, warm A/C, losing coolant…"></label><div class="dx-count" id="dxCount"></div>';
shell.parentNode.insertBefore(toolbar,shell);
const filters=document.createElement('div');filters.className='dx-filters';filters.id='dxFilters';shell.parentNode.insertBefore(filters,shell);
shell.className='diag-shell dx-shell';shell.innerHTML='<aside class="dx-list" id="dxList"></aside><section class="dx-detail" id="dxDetail"></section>';
const grouped=x=>['Starting','Electrical','Engine','Cooling','Brakes','Tires','Transmission','Climate','Steering','Leaks','Noise'].includes(x)?x:'Other';
const categories=['All',...new Set(D.diagnostics.map(x=>grouped(x.category)))];
function filtered(){const q=norm(query);return D.diagnostics.filter(x=>(category==='All'||grouped(x.category)===category)&&(!q||norm([x.title,x.complaint,x.category,x.causes?.join(' '),x.firstMove,x.fixes?.flat().join(' ')].join(' ')).includes(q)))}
function urgencyLabel(u){return u==='critical'?'STOP / SAFETY':u==='high'?'ATTENTION':u==='low'?'COMFORT / CONVENIENCE':'CHECK SOON'}
function renderFilters(){filters.innerHTML=categories.map(x=>`<button type="button" class="dx-filter${x===category?' active':''}" data-cat="${esc(x)}">${esc(x)}</button>`).join('');$$('.dx-filter',filters).forEach(b=>b.addEventListener('click',()=>{category=b.dataset.cat;renderAll()}))}
function renderList(){const arr=filtered();$('#dxCount').textContent=`${arr.length} OF ${D.diagnostics.length} GUIDES`;$('#dxList').innerHTML=`<div class="dx-list-head">COMMON PROBLEM INDEX</div>`+(arr.length?arr.map(x=>`<button class="dx-case${x.id===active.id?' active':''}" data-id="${esc(x.id)}" data-urgency="${esc(x.urgency)}" type="button"><span class="rank">${String(D.diagnostics.indexOf(x)+1).padStart(2,'0')}</span><span><span class="cat"><i class="dot"></i>${esc(grouped(x.category))}</span><b>${esc(x.title)}</b><small>${esc(x.complaint)}</small></span></button>`).join(''):'<div class="dx-empty">NO DIAGNOSTIC GUIDE MATCHES THIS SEARCH.</div>');$$('.dx-case').forEach(b=>b.addEventListener('click',()=>{active=D.diagnostics.find(x=>x.id===b.dataset.id)||active;renderList();renderDetail()}));}
function renderDetail(){const x=active;const tools=x.tools?.length?`<div class="dx-tools">${x.tools.map(t=>`<span>${esc(t)}</span>`).join('')}</div>`:'';$('#dxDetail').innerHTML=`
<div class="dx-top"><span class="dx-code">${esc(x.code)}</span><span class="dx-urgency ${esc(x.urgency)}">${urgencyLabel(x.urgency)}</span></div>
<h3>${esc(x.title)}</h3><p class="dx-complaint">${esc(x.complaint)}</p>
<div class="dx-first"><b>Start here</b><span>${esc(x.firstMove)}</span></div>
<div class="dx-section"><div class="dx-section-title"><span>01</span> Most likely causes</div><div class="dx-causes">${x.causes.map(v=>`<div class="dx-cause">${esc(v)}</div>`).join('')}</div></div>
<div class="dx-section"><div class="dx-section-title"><span>02</span> Check in this order</div><div class="dx-checks">${x.tests.map((t,i)=>`<div class="dx-check"><span class="n">${String(i+1).padStart(2,'0')}</span><div class="what">${esc(t[0])}</div><div class="meaning"><b>${esc(t[1])}</b>${esc(t[2])}</div></div>`).join('')}</div></div>
<div class="dx-section"><div class="dx-section-title"><span>03</span> Common fixes — after confirmation</div><div class="dx-fixes">${x.fixes.map(f=>`<div class="dx-fix"><b>${esc(f[0])}</b><span>${esc(f[1])}</span></div>`).join('')}</div></div>
<div class="dx-bottomline"><span>Bottom line</span><p>${esc(x.conclusion)}</p></div>
${x.stop?`<div class="dx-stop"><b>Stop driving / safety:</b>${esc(x.stop)}</div>`:''}${tools}
<div class="dx-source-note"><span>COMMON-PROBLEM PRIORITIES INFORMED BY</span><a href="https://www.aaa.com/autorepair/articles/13-common-car-problems-explained" target="_blank" rel="noopener">AAA ↗</a><a href="https://www.consumerreports.org/car-reliability-owner-satisfaction/car-reliability-histories/" target="_blank" rel="noopener">Consumer Reports reliability categories ↗</a><span>Use model-specific service specifications for actual repair work.</span></div>`;}
function renderAll(){const arr=filtered();if(!arr.includes(active)&&arr.length)active=arr[0];renderFilters();renderList();renderDetail()}
$('#dxSearch').addEventListener('input',e=>{query=e.target.value;renderAll()});
renderAll();
})();
