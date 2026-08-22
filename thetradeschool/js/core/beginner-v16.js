(() => {
  'use strict';
  const D = window.TRADE_DATA;
  const B = window.TRADE_BEGINNER;
  const app = document.getElementById('app');
  if (!D || !B || !app) return;

  const $ = (s,c=document) => c.querySelector(s);
  const $$ = (s,c=document) => [...c.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const norm = s => String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const worldOf = c => c?.world || 'electrical';
  const conceptById = id => D.concepts.find(c=>c.id===id);

  function simplify(text){
    let s = String(text||'').trim();
    B.replacements.forEach(([re,to]) => s=s.replace(re,to));
    s=s.replace(/\butilizes?\b/gi,'uses')
       .replace(/\bprovides?\b/gi,'gives')
       .replace(/\bapproximately\b/gi,'about')
       .replace(/\bsubsequent\b/gi,'next')
       .replace(/\bprior to\b/gi,'before')
       .replace(/\bvia\b/gi,'through')
       .replace(/\btherefore\b/gi,'so')
       .replace(/\bin order to\b/gi,'to');
    return s;
  }

  function friendly(c){
    if(!c) return '';
    const direct=B.friendly[norm(c.title)];
    if(direct) return direct;
    let s=simplify(c.oneLine || c.plain || '');
    if(s.length>260) s=s.slice(0,257).replace(/\s+\S*$/,'')+'…';
    return s;
  }

  function why(c){
    if(!c) return '';
    let s=simplify(c.why || '');
    if(!s){
      const places=(c.where||[]).slice(0,2);
      s=places.length ? `You will run into this around ${places.join(' and ')}. Knowing its job makes the rest of the system easier to follow.` : `Knowing this part of the system makes the related equipment and troubleshooting steps easier to understand.`;
    }
    if(s.length>320) s=s.slice(0,317).replace(/\s+\S*$/,'')+'…';
    return s;
  }

  function glossaryHits(c, extra=''){
    if(!c) return [];
    const blob=' '+norm([c.title,c.oneLine,c.plain,c.why,c.analogy,(c.where||[]).join(' '),(c.failures||[]).join(' '),extra].join(' '))+' ';
    const out=[];
    Object.entries(B.glossary).sort((a,b)=>b[0].length-a[0].length).forEach(([term,definition])=>{
      if(out.length>=5) return;
      if(norm(term)===norm(c.title)) return;
      const t=norm(term);
      if(!t || !blob.includes(' '+t+' ')) return;
      if(out.some(x=>norm(x.term).includes(t)||t.includes(norm(x.term)))) return;
      out.push({term,definition});
    });
    return out;
  }

  function wordHelper(words, uid){
    if(!words.length) return '';
    return `<div class="v16-words" data-word-group="${uid}">
      <span>NEW WORDS HERE</span>
      <div class="v16-word-chips">${words.map((w,i)=>`<button type="button" data-word-index="${i}">${esc(w.term)}</button>`).join('')}</div>
      <div class="v16-word-answer"><b>${esc(words[0].term)}</b><p>${esc(words[0].definition)}</p></div>
    </div>`;
  }

  function wireWords(host, words){
    $$('.v16-word-chips button',host).forEach(btn=>btn.addEventListener('click',()=>{
      const w=words[+btn.dataset.wordIndex]; if(!w) return;
      $$('.v16-word-chips button',host).forEach(x=>x.classList.toggle('active',x===btn));
      const answer=$('.v16-word-answer',host);
      if(answer) answer.innerHTML=`<b>${esc(w.term)}</b><p>${esc(w.definition)}</p>`;
    }));
    $('.v16-word-chips button',host)?.classList.add('active');
  }

  function conceptForPath(key,world){
    let c=conceptById(key);
    if(c && worldOf(c)===world) return c;
    const q=norm(key);
    return D.concepts.find(x=>worldOf(x)===world && (norm(x.title)===q || norm(x.title).includes(q))) || null;
  }

  function enhanceHome(){
    const copy=$('.home-copy');
    if(!copy || copy.dataset.v16) return;
    copy.dataset.v16='1';
    const note=document.createElement('div');
    note.className='v16-home-zero';
    note.innerHTML=`<b>NO EXPERIENCE REQUIRED.</b><span>Every trade now starts by explaining the basic words and system idea before it asks you to read technician-level material.</span>`;
    const actions=$('.hero-actions',copy);
    actions?.insertAdjacentElement('afterend',note);
  }

  function enhanceWorld(){
    const hero=$('.course-hero');
    if(!hero || hero.dataset.v16) return;
    const raw=location.hash.replace(/^#\/?/,'').split('?')[0].split('/');
    if(raw[0]!=='world' || !raw[1] || raw[2]==='unit') return;
    const world=raw[1], data=B.worldIntro[world];
    if(!data) return;
    hero.dataset.v16='1';
    const path=data.path.map(k=>conceptForPath(k,world)).filter((c,i,a)=>c&&a.indexOf(c)===i).slice(0,9);
    const panel=document.createElement('section');
    panel.className='v16-zero-path';
    panel.innerHTML=`<div class="v16-zero-copy"><small>NEW TO ${esc((D.worlds.find(w=>w.id===world)||{}).name||world)}?</small><h2>${esc(data.title)}</h2><p>${esc(data.text)}</p><div class="v16-zero-rule"><b>THE RULE</b><span>You never need to know a technical word before the page explains it.</span></div></div><div class="v16-zero-steps">${path.map((c,i)=>`<button type="button" onclick="go('concept/${c.id}')"><span>${String(i+1).padStart(2,'0')}</span><div><b>${esc(c.title)}</b><small>${esc(friendly(c))}</small></div></button>`).join('')}</div>`;
    hero.insertAdjacentElement('afterend',panel);
  }

  function unitConcept(id){
    return conceptById(String(id||'').replace(/^topic-/,''));
  }

  function enhanceUnit(){
    const hero=$('.unit-hero');
    const article=$('.unit-article');
    if(!hero || !article || hero.dataset.v16) return;
    const raw=location.hash.replace(/^#\/?/,'').split('?')[0].split('/');
    if(raw[0]!=='world' || raw[2]!=='unit') return;
    hero.dataset.v16='1';
    const world=raw[1], intro=B.worldIntro[world];
    const topics=$$('.inline-topic',article).map(x=>unitConcept(x.id)).filter(Boolean);
    const firstWords=[];
    topics.slice(0,4).forEach(c=>glossaryHits(c).forEach(w=>{if(firstWords.length<5&&!firstWords.some(x=>x.term===w.term))firstWords.push(w)}));
    const unitIntro=$('.unit-intro',article);
    if(unitIntro){
      unitIntro.classList.add('v16-unit-intro');
      unitIntro.innerHTML=`<small>BEFORE THE TERMINOLOGY</small><h2>Here is the idea first.</h2><p>${esc(intro?.text || 'Start with what the system is trying to accomplish. The individual terms make more sense once you know the job they are doing together.')}</p>${firstWords.length?wordHelper(firstWords,'unit-'+world):''}`;
      wireWords(unitIntro,firstWords);
    }

    $$('.inline-topic',article).forEach((topic,index)=>{
      if(topic.dataset.v16) return;
      const c=unitConcept(topic.id); if(!c) return;
      topic.dataset.v16='1';
      const words=glossaryHits(c);
      const headP=$('header p',topic); if(headP) headP.textContent=friendly(c);
      const refBtn=$('header button',topic); if(refBtn) refBtn.textContent='Open full topic ↗';
      const simple=document.createElement('div');
      simple.className='v16-inline-simple';
      simple.innerHTML=`<div><small>WHAT IS IT?</small><p>${esc(friendly(c))}</p></div><div><small>WHY SHOULD I CARE?</small><p>${esc(why(c))}</p></div>${words.length?wordHelper(words,'topic-'+index):''}`;
      const body=$('.inline-topic-body',topic);
      topic.insertBefore(simple,body||topic.firstChild?.nextSibling||null);
      wireWords(simple,words);

      const technical=[];
      const prose=$('.topic-prose',topic); if(prose) technical.push(prose);
      const field=$('.field-strip',topic); if(field) technical.push(field);
      const scenario=$('.inline-scenario',topic); if(scenario) technical.push(scenario);
      if(technical.length){
        const details=document.createElement('details');
        details.className='v16-unit-more';
        details.innerHTML='<summary><span>GO DEEPER</span><b>Field detail, measurements, and failure clues</b></summary><div class="v16-unit-more-body"></div>';
        const target=$('.v16-unit-more-body',details);
        technical.forEach(n=>target.appendChild(n));
        topic.appendChild(details);
      }
    });
  }

  function enhanceConcept(){
    const article=$('.reference-article');
    const hero=$('.reference-hero');
    if(!article || !hero || article.dataset.v16) return;
    const raw=location.hash.replace(/^#\/?/,'').split('?')[0].split('/');
    if(raw[0]!=='concept' || !raw[1]) return;
    const c=conceptById(raw[1]); if(!c) return;
    article.dataset.v16='1';
    const world=worldOf(c), intro=B.worldIntro[world];
    const words=glossaryHits(c);
    const failures=(c.failures||[]).slice(0,2).map(simplify);
    const where=(c.where||[]).slice(0,3);

    const plate=$('.nameplate',hero);
    if(plate){
      plate.classList.add('v16-nameplate');
      const rows=$('.plate-rows',plate); if(rows) rows.hidden=true;
      const note=document.createElement('div');
      note.className='v16-plate-note';
      note.innerHTML=`<small>START HERE / PLAIN ENGLISH</small><p>${esc(friendly(c))}</p>`;
      plate.appendChild(note);
    }

    const original=[...article.children];
    const visual=original.find(n=>n.classList?.contains('evidence-visual'));
    const simple=document.createElement('section');
    simple.className='v16-concept-simple';
    simple.innerHTML=`<div class="v16-simple-main"><small>01 / WHAT IS IT?</small><h2>${esc(c.title)}</h2><p>${esc(friendly(c))}</p></div><div class="v16-simple-grid"><div><small>WHY IT MATTERS</small><p>${esc(why(c))}</p></div>${where.length?`<div><small>WHERE YOU'LL SEE IT</small><p>${esc(where.join(' · '))}</p></div>`:''}${failures.length?`<div><small>IF SOMETHING GOES WRONG</small><p>${esc(failures.join(' '))}</p></div>`:''}</div>${words.length?wordHelper(words,'concept-'+c.id):''}<div class="v16-system-picture"><small>THE BIG PICTURE</small><p>${esc(intro?.text || 'This term is one piece of a larger working system. Learn its job first, then follow what comes before and after it.')}</p></div>`;
    article.prepend(simple);
    wireWords(simple,words);

    if(visual){
      visual.classList.add('v16-visible-visual');
      simple.insertAdjacentElement('afterend',visual);
      const title=$('.evidence-visual-head h2',visual); if(title) title.textContent='See the real thing.';
      const desc=$('.evidence-visual-head p',visual); if(desc) desc.textContent='Use the photo or diagram to connect the new word to actual equipment.';
    }

    const deepNodes=original.filter(n=>n!==visual && n.isConnected);
    if(deepNodes.length){
      const details=document.createElement('details');
      details.className='v16-deeper';
      details.innerHTML='<summary><span>GO DEEPER</span><b>How it behaves, how it fails, and how technicians prove it</b><i>+</i></summary><div class="v16-deeper-body"></div>';
      const body=$('.v16-deeper-body',details);
      deepNodes.forEach(n=>body.appendChild(n));
      article.appendChild(details);
      details.addEventListener('toggle',()=>{const i=$('summary i',details);if(i)i.textContent=details.open?'−':'+'});
    }
  }

  function enhance(){
    requestAnimationFrame(()=>{
      enhanceHome();
      enhanceWorld();
      enhanceUnit();
      enhanceConcept();
    });
  }

  let timer=0;
  const schedule=()=>{clearTimeout(timer);timer=setTimeout(enhance,25)};
  new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
  addEventListener('hashchange',schedule);
  addEventListener('load',schedule);
  schedule();
})();
