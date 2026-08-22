(()=>{
'use strict';
const D=window.TRADE_DATA;
const app=document.getElementById('app');
if(!D||!app)return;
const $=(s,c=document)=>c.querySelector(s);
const $$=(s,c=document)=>[...c.querySelectorAll(s)];
const byId=id=>D.concepts.find(c=>c.id===id);

function cleanUnit(){
  $$('.inline-topic[data-v16="1"]',app).forEach(topic=>{
    if(topic.dataset.v17)return;
    topic.dataset.v17='1';
    const c=byId(topic.id.replace(/^topic-/,''));

    /* The title already identifies the topic. Do not repeat the same definition
       immediately underneath and again inside the beginner card. */
    $('header p',topic)?.remove();

    const simple=$('.v16-inline-simple',topic);
    if(!simple)return;
    const blocks=[...simple.children].filter(x=>!x.classList.contains('v16-words'));
    if(blocks[0]){
      const label=$('small',blocks[0]);
      if(label)label.textContent='PLAIN ENGLISH';
    }
    if(blocks[1]){
      const places=(c?.where||[]).slice(0,2);
      if(places.length){
        const label=$('small',blocks[1]);
        const copy=$('p',blocks[1]);
        if(label)label.textContent="WHERE YOU'LL SEE IT";
        if(copy)copy.textContent=places.join(' · ');
      }else blocks[1].remove();
    }
  });
}

function cleanConcept(){
  const article=$('.reference-article[data-v16="1"]',app);
  if(!article||article.dataset.v17)return;
  article.dataset.v17='1';

  /* The old beginner pass put the definition in the nameplate and then repeated
     it in the article. Keep it once, in the article where the learner reads. */
  $('.v16-plate-note',app)?.remove();

  const main=$('.v16-simple-main',article);
  const label=$('small',main);
  if(label)label.textContent='PLAIN ENGLISH';

  const grid=$('.v16-simple-grid',article);
  if(grid){
    const blocks=[...grid.children];
    const whyBlock=blocks.find(b=>/WHY IT MATTERS/i.test($('small',b)?.textContent||''));
    whyBlock?.remove();
    grid.style.gridTemplateColumns='repeat(auto-fit,minmax(220px,1fr))';
  }

  /* The trade/course page already establishes the system context. Repeating the
     same world-level paragraph on every topic adds reading weight, not clarity. */
  $('.v16-system-picture',article)?.remove();
}

function clean(){cleanUnit();cleanConcept();}
let timer=0;
const schedule=()=>{clearTimeout(timer);timer=setTimeout(clean,35)};
new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
addEventListener('hashchange',schedule);
addEventListener('load',schedule);
schedule();
})();