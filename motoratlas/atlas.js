(()=>{
'use strict';
const head=document.head;
const brand=document.querySelector('.topbar .brand');
if(brand){
  brand.setAttribute('aria-label','MotorAtlas home');
  brand.innerHTML='<img src="/assets/project-logos/motoratlas.svg" alt="MotorAtlas" class="site-brand-logo">';
  const brandStyle=document.createElement('style');
  brandStyle.textContent='.brand .site-brand-logo{display:block;width:232px;max-width:38vw;max-height:60px;object-fit:contain;object-position:left center}@media(max-width:720px){.brand .site-brand-logo{width:194px;max-width:56vw;max-height:52px}}';
  head.appendChild(brandStyle);
}
const addCss=href=>{const l=document.createElement('link');l.rel='stylesheet';l.href=href;head.appendChild(l)};
addCss('diagnostics-v2.css?v=1');
addCss('beginner-v1.css?v=1');
const typeFix=document.createElement('style');typeFix.textContent='.beginner-sheet h4,.word-answer b,.diff-head h3,.wheel-readout b{font-family:var(--head)}';head.appendChild(typeFix);
const load=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=()=>reject(new Error('Failed to load '+src));document.body.appendChild(s)});
load('diagnostics-data.js?v=1')
 .then(()=>load('beginner-data.js?v=1'))
 .then(()=>load('atlas-core.js?v=3'))
 .then(()=>load('beginner-ui.js?v=1'))
 .then(()=>load('no-repeat.js?v=1'))
 .then(()=>load('diagnostics-v2.js?v=1'))
 .catch(err=>{console.error('MotorAtlas loader:',err);document.body.setAttribute('data-load-error','true')});
})();