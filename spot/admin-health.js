(()=>{'use strict';
const sb=supabase.createClient('https://xvfgiaxxvwdnmzzdfboc.supabase.co','sb_publishable_ShdZijibR7b6EvowZ1yN9Q_dIkGmcCZ');
const $=s=>document.querySelector(s);
const dot=(ok,warn=false)=>`<i class="health-dot ${ok?'ok':warn?'warn':'bad'}"></i>`;
let loading=false;
async function renderHealth(){const admin=$('#adminView');if(!admin||loading)return;loading=true;let panel=$('#launchHealth');if(!panel){panel=document.createElement('section');panel.id='launchHealth';panel.className='launch-health';const toolbar=admin.querySelector('.admin-toolbar');toolbar?.insertAdjacentElement('afterend',panel)}
  panel.innerHTML='<div class="health-loading">Checking SPOT systems…</div>';
  const {data,error}=await sb.functions.invoke('spot-launch-health',{body:{}});
  if(error||data?.error){panel.innerHTML=`<div class="health-loading">System check unavailable: ${error?.message||data?.error||'Unknown error'}</div>`;loading=false;return}
  const stripe=!!data.stripe_secret_configured&&!!data.stripe_webhook_secret_configured;
  const schedulerRan=!!data.scheduler?.last_finished_at;
  const email=!!data.email_configured;
  panel.innerHTML=`<div class="health-head"><div><span>LAUNCH STATUS</span><b>${stripe?'CORE READY':'SETUP REQUIRED'}</b></div><small>Live backend check</small></div><div class="health-grid">
    <div>${dot(stripe)}<span><b>Stripe payments</b><small>${stripe?'Secret + webhook configured':'Add Stripe secrets in Supabase'}</small></span></div>
    <div>${dot(schedulerRan,!schedulerRan)}<span><b>Automatic close</b><small>${schedulerRan?'Scheduler is running':'Scheduler awaiting first healthy run'}</small></span></div>
    <div>${dot(email,true)}<span><b>Email alerts</b><small>${email?'Transactional email configured':'Optional: add Resend + sender later'}</small></span></div>
    <div>${dot(Number(data.unpaid_winners||0)===0,Number(data.unpaid_winners||0)>0)}<span><b>Unpaid winners</b><small>${Number(data.unpaid_winners||0)} currently unresolved</small></span></div>
  </div>`;
  loading=false;
}
function cleanRows(){document.querySelectorAll('#adminAuctions .admin-row').forEach(row=>{const text=row.querySelector('small')?.textContent||'';const status=text.split('·').pop()?.trim().toLowerCase();const charge=row.querySelector('.charge-auction');if(charge){charge.hidden=!['live','ended'].includes(status);if(status==='ended')charge.textContent='RETRY PAYMENTS'}const del=row.querySelector('.delete-auction');if(del&&['ended','archived'].includes(status))del.title='Completed auctions with history are preserved';})}
const obs=new MutationObserver(()=>cleanRows());if($('#adminAuctions'))obs.observe($('#adminAuctions'),{childList:true,subtree:true});
$('#adminNav')?.addEventListener('click',()=>setTimeout(()=>{renderHealth();cleanRows()},180));
setInterval(()=>{if($('#adminView')?.classList.contains('active'))renderHealth()},60000);
})();