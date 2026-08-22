(()=>{
'use strict';
const head=document.head;
const addCss=href=>{const l=document.createElement('link');l.rel='stylesheet';l.href=href;head.appendChild(l)};
addCss('diagnostics-v2.css?v=1');
addCss('beginner-v1.css?v=1');
const load=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=()=>reject(new Error('Failed to load '+src));document.body.appendChild(s)});
load('diagnostics-data.js?v=1')
 .then(()=>load('beginner-data.js?v=1'))
 .then(()=>load('atlas-core.js?v=3'))
 .then(()=>load('beginner-ui.js?v=1'))
 .then(()=>load('diagnostics-v2.js?v=1'))
 .catch(err=>{console.error('MotorAtlas loader:',err);document.body.setAttribute('data-load-error','true')});
})();