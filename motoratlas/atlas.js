(()=>{
'use strict';
const head=document.head;
const css=document.createElement('link');css.rel='stylesheet';css.href='diagnostics-v2.css?v=1';head.appendChild(css);
const load=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=()=>reject(new Error('Failed to load '+src));document.body.appendChild(s)});
load('diagnostics-data.js?v=1')
 .then(()=>load('atlas-core.js?v=3'))
 .then(()=>load('diagnostics-v2.js?v=1'))
 .catch(err=>{console.error('MotorAtlas loader:',err);const d=document.querySelector('#diagnostics');if(d)d.setAttribute('data-load-error','true')});
})();