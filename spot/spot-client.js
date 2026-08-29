(()=>{'use strict';
if(!window.supabase?.createClient)return;
const PROJECT_URL='https://xvfgiaxxvwdnmzzdfboc.supabase.co';
const originalCreate=window.supabase.createClient.bind(window.supabase);
let singleton=null;
window.supabase.createClient=(url,key,options={})=>{
  if(url!==PROJECT_URL)return originalCreate(url,key,options);
  if(singleton)return singleton;
  const merged={...options,auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,...(options.auth||{})}};
  singleton=originalCreate(url,key,merged);
  window.spotSb=singleton;
  const rawOnAuthStateChange=singleton.auth.onAuthStateChange.bind(singleton.auth);
  singleton.auth.onAuthStateChange=(callback)=>rawOnAuthStateChange((event,session)=>{
    setTimeout(()=>{
      try{callback(event,session)}catch(err){console.error('SPOT auth callback error',err)}
    },0);
  });
  return singleton;
};
})();