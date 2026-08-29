(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
const spots={
1:{bid:125,size:'3.8 × 2.2 IN',position:'UPPER LEFT',brand:null,bids:[['@northstar','$125','8 min ago'],['@studio42','$115','22 min ago'],['@milesco','$100','1 hr ago']]},
2:{bid:260,size:'3.4 × 2.0 IN',position:'UPPER MID-LEFT',brand:'SUPA',bids:[['@supa','$260','4 min ago'],['@orbit','$245','17 min ago'],['@stacked','$220','51 min ago']]},
3:{bid:170,size:'3.8 × 2.2 IN',position:'UPPER RIGHT',brand:null,bids:[['@juno','$170','11 min ago'],['@pixelhaus','$155','39 min ago'],['@vero','$140','2 hr ago']]},
4:{bid:420,size:'3.2 × 2.0 IN',position:'MID LEFT',brand:'NXO',bids:[['@nxo','$420','2 min ago'],['@frame','$395','14 min ago'],['@west','$360','48 min ago']]},
5:{bid:315,size:'3.2 × 2.0 IN',position:'MID RIGHT',brand:'FIG',bids:[['@fig','$315','7 min ago'],['@thread','$290','31 min ago'],['@mono','$260','1 hr ago']]},
6:{bid:150,size:'3.8 × 2.1 IN',position:'LOWER LEFT',brand:null,bids:[['@glow','$150','6 min ago'],['@deskco','$135','28 min ago'],['@field','$120','55 min ago']]},
7:{bid:375,size:'3.4 × 2.0 IN',position:'LOWER MID-LEFT',brand:'APEX',bids:[['@apex','$375','9 min ago'],['@roam','$350','21 min ago'],['@proto','$320','1 hr ago']]},
8:{bid:290,size:'3.4 × 2.0 IN',position:'LOWER MID-RIGHT',brand:'DATA',bids:[['@data','$290','5 min ago'],['@north','$275','25 min ago'],['@alpha','$250','46 min ago']]},
9:{bid:110,size:'3.8 × 2.1 IN',position:'LOWER RIGHT',brand:null,bids:[['@local','$110','13 min ago'],['@kiln','$100','37 min ago'],['@maker','$90','1 hr ago']]},
10:{bid:450,size:'2.8 × 1.7 IN',position:'CENTER PREMIUM',brand:'STRIPE',bids:[['@stripe','$450','1 min ago'],['@neon','$425','18 min ago'],['@grid','$400','44 min ago']]}
};
let current=1,totalBids=31;
const boot=$('#boot');window.addEventListener('load',()=>setTimeout(()=>boot?.classList.add('out'),650),{once:true});setTimeout(()=>boot?.classList.add('out'),1800);

function total(){return Object.values(spots).reduce((s,x)=>s+x.bid,0)}
function claimed(){return Object.values(spots).filter(x=>x.brand).length}
function syncStats(){$('#totalBid').textContent=money(total());$('#claimed').textContent=`${claimed()} / 10`;$('#bidCount').textContent=totalBids}

const board=$('#boardGrid');
function renderBoard(){board.innerHTML=Object.entries(spots).map(([id,s])=>`<article class="board-card ${s.brand?'':'available'}"><header><span>SPOT ${String(id).padStart(2,'0')}</span><b>${s.brand?'LEADING':'OPEN'}</b></header><div class="board-brand ${s.brand?.toLowerCase()||''}">${s.brand||'AVAILABLE'}</div><footer><span>${s.position}</span><b>${money(s.bid)}</b></footer><button data-open="${id}" aria-label="Open spot ${id}"></button></article>`).join('')}
renderBoard();syncStats();

const tickerItems=['NXO raised Spot 04 to $420','New bidder entered Spot 01','STRIPE leads the center premium spot','Spot 09 is still under $125','APEX defended Spot 07','31 bids across the board','6 of 10 placements currently claimed'];
const ticker=$('#tickerTrack');ticker.innerHTML=[...tickerItems,...tickerItems].map((x,i)=>`<span class="ticker-item">${i%2?'<b>LIVE</b>':'<i>●</i>'} ${x}</span><span class="ticker-dot"></span>`).join('');

const drawer=$('#bidDrawer'),scrim=$('#scrim');
function openSpot(id){current=+id;const s=spots[current];$$('.spot').forEach(x=>x.classList.toggle('active',+x.dataset.spot===current));$('#drawerSpot').textContent=`SPOT ${String(current).padStart(2,'0')}`;$('#spotSize').textContent=s.size;$('#spotPosition').textContent=s.position;$('#currentBid').textContent=money(s.bid);$('#nextBid').textContent=money(s.bid+10);$('#bidAmount').value=s.bid+10;$('#depositAmount').textContent=money(Math.ceil((s.bid+10)*.2));$('#historyCount').textContent=`${s.bids.length} BIDS`;$('#historyList').innerHTML=s.bids.map(x=>`<div class="history-row"><b>${x[0]}</b><span>${x[1]}</span><small>${x[2]}</small></div>`).join('');const p=$('#logoPreview');p.innerHTML=s.brand?`<span>${s.brand}</span>`:'<span>YOUR<br>LOGO</span>';drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');scrim.classList.add('on')}
function close(){drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');scrim.classList.remove('on');$$('.spot').forEach(x=>x.classList.remove('active'))}
$$('.spot').forEach(x=>x.addEventListener('click',()=>openSpot(x.dataset.spot)));board.addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(b)openSpot(b.dataset.open)});$('#closeDrawer').addEventListener('click',close);scrim.addEventListener('click',close);$('#openBidTop').addEventListener('click',()=>openSpot(1));addEventListener('keydown',e=>{if(e.key==='Escape')close()});

$('#quickPlus').addEventListener('click',()=>{$('#bidAmount').value=(+$ ('#bidAmount').value||spots[current].bid)+25;calcDeposit()});$('#bidAmount').addEventListener('input',calcDeposit);function calcDeposit(){const n=+$ ('#bidAmount').value||0;$('#depositAmount').textContent=money(Math.ceil(n*.2))}

$('#logoUpload').addEventListener('change',e=>{const f=e.target.files?.[0];if(!f)return;const r=new FileReader();r.onload=()=>{$('#logoPreview').innerHTML=`<img src="${r.result}" alt="Uploaded logo preview">`};r.readAsDataURL(f)});

let toastT;function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),2100)}
$('#submitBid').addEventListener('click',()=>{const s=spots[current],amount=+$ ('#bidAmount').value||0;if(amount<s.bid+10){toast(`Minimum bid is ${money(s.bid+10)}`);return}s.bid=amount;s.bids.unshift(['YOU',money(amount),'just now']);s.brand=s.brand||'YOU';totalBids++;const dom=$(`.spot[data-spot="${current}"]`);dom.classList.add('won');dom.querySelector('b').textContent=s.brand;dom.querySelector('b').className='brand-chip';dom.querySelector('small').textContent=money(amount);renderBoard();syncStats();openSpot(current);toast(`Demo bid placed on Spot ${String(current).padStart(2,'0')}`)});

$('#showProof').addEventListener('click',()=>{$('.inwild-card').classList.toggle('proof');toast($('.inwild-card').classList.contains('proof')?'Proof mode previewed':'Proof mode reset')});

/* subtle object tilt */
if(matchMedia('(hover:hover)').matches){const scene=$('#laptopScene');scene.addEventListener('mousemove',e=>{const r=scene.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;$('.lid').style.transform=`rotateX(${(-y*3).toFixed(1)}deg) rotateY(${(x*7-2).toFixed(1)}deg)`});scene.addEventListener('mouseleave',()=>$('.lid').style.transform='rotateX(2deg) rotateY(-5deg)')}

/* countdown */
const end=Date.now()+14*24*60*60*1000;function tick(){const d=Math.max(0,end-Date.now()),days=Math.floor(d/86400000),h=Math.floor(d/3600000)%24,m=Math.floor(d/60000)%60,s=Math.floor(d/1000)%60;$('#miniTimer').textContent=`${days}D ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`}tick();setInterval(tick,1000);
})();