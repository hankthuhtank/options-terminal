(()=>{'use strict';
const sb=supabase.createClient('https://xvfgiaxxvwdnmzzdfboc.supabase.co','sb_publishable_ShdZijibR7b6EvowZ1yN9Q_dIkGmcCZ');
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let session=null,channel=null;
const when=x=>{const d=new Date(x),m=Math.max(0,Date.now()-d);if(m<60000)return'just now';if(m<3600000)return`${Math.floor(m/60000)}m ago`;if(m<86400000)return`${Math.floor(m/3600000)}h ago`;return d.toLocaleDateString()};
async function unread(){const btn=$('#noticeBtn'),badge=$('#noticeBadge');if(!btn||!badge)return;if(!session){btn.hidden=true;badge.hidden=true;return}btn.hidden=false;const {count}=await sb.from('spot_notifications').select('id',{count:'exact',head:true}).is('read_at',null);badge.textContent=String(count||0);badge.hidden=!(count>0)}
async function render(){if(!session)return;const list=$('#noticeList');if(!list)return;list.innerHTML='<div class="empty">Loading alerts…</div>';const {data,error}=await sb.from('spot_notifications').select('*').order('created_at',{ascending:false}).limit(40);if(error){list.innerHTML=`<div class="empty">${esc(error.message)}</div>`;return}list.innerHTML=(data||[]).length?(data||[]).map(n=>`<article class="notice-item ${n.read_at?'':'unread'}"><span class="notice-dot"></span><div><b>${esc(n.title)}</b><p>${esc(n.body)}</p><small>${when(n.created_at)}</small></div></article>`).join(''):'<div class="empty">No alerts yet.</div>';const {data:p}=await sb.from('profiles').select('email_notifications').eq('id',session.user.id).maybeSingle();const t=$('#emailNoticeToggle');if(t)t.checked=p?.email_notifications!==false}
async function markAll(){if(!session)return;await sb.from('spot_notifications').update({read_at:new Date().toISOString()}).eq('user_id',session.user.id).is('read_at',null);await Promise.all([render(),unread()])}
function open(){if(!session){$('#accountBtn')?.click();return}$('#scrim')?.classList.add('on');$('#notificationsPanel')?.classList.add('on');render();setTimeout(markAll,700)}
$('#noticeBtn')?.addEventListener('click',open);
$('#markNoticesRead')?.addEventListener('click',markAll);
$('#emailNoticeToggle')?.addEventListener('change',async e=>{if(!session)return;const {error}=await sb.from('profiles').update({email_notifications:e.target.checked}).eq('id',session.user.id);if(error)e.target.checked=!e.target.checked});
function subscribe(){if(channel)sb.removeChannel(channel);if(!session)return;channel=sb.channel(`spot-notices-${session.user.id}`).on('postgres_changes',{event:'INSERT',schema:'public',table:'spot_notifications',filter:`user_id=eq.${session.user.id}`},()=>{unread();if($('#notificationsPanel')?.classList.contains('on'))render()}).subscribe()}
async function sync(s){session=s;await unread();subscribe()}
sb.auth.getSession().then(({data})=>sync(data.session));
sb.auth.onAuthStateChange((_e,s)=>setTimeout(()=>sync(s),0));
setInterval(unread,30000);
})();