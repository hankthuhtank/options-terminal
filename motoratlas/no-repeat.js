(()=>{
'use strict';
const D=window.MOTOR_ATLAS;
if(!D)return;
const $=(s,c=document)=>c.querySelector(s);
function activePart(){
  const name=$('#partTitle')?.textContent.trim();
  if(!name)return null;
  for(const system of D.systems||[]){
    const part=(system.parts||[]).find(p=>p.name===name);
    if(part)return part;
  }
  return null;
}
function clean(){
  const sheet=$('#detailView .beginner-sheet');
  if(!sheet)return;
  const part=activePart();
  const label=$('.plain-label',sheet);
  if(label)label.textContent='PLAIN ENGLISH';

  const basics=$('.beginner-basics',sheet);
  if(basics){
    const blocks=[...basics.children];
    if(blocks[0]){
      const heading=$('span',blocks[0]);
      if(heading)heading.textContent='WHERE IS IT?';
    }
    if(blocks[1]){
      if(part?.connects){
        const heading=$('span',blocks[1]);
        const copy=$('p',blocks[1]);
        if(heading)heading.textContent='WORKS WITH';
        if(copy)copy.textContent=part.connects;
      }else blocks[1].remove();
    }
  }

  /* The system job is already explained beside the visual/flow diagram. Repeating it
     inside every single part made the library feel longer without teaching more. */
  $('.system-in-one',sheet)?.remove();
}
const detail=$('#detailView');
if(detail)new MutationObserver(()=>requestAnimationFrame(clean)).observe(detail,{childList:true,subtree:true});
new MutationObserver(()=>requestAnimationFrame(clean)).observe(document.body,{childList:true,subtree:true});
addEventListener('load',clean);
clean();
})();