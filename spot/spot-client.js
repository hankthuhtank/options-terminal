(()=>{'use strict';
if(!window.supabase?.createClient)return;
const PROJECT_URL='https://xvfgiaxxvwdnmzzdfboc.supabase.co';
const originalCreate=window.supabase.createClient.bind(window.supabase);
let singleton=null;
window.supabase.createClient=(url,key,options={})=>{
  if(url!==PROJECT_URL)return originalCreate(url,key,options);
  if(singleton)return singleton;
  const merged={
    ...options,
    auth:{
      persistSession:true,
      autoRefreshToken:true,
      detectSessionInUrl:true,
      storageKey:'spot-auth-session-v1',
      ...(options.auth||{})
    }
  };
  singleton=originalCreate(url,key,merged);
  window.spotSb=singleton;

  // Supabase warns against awaiting database work directly inside auth callbacks.
  // Always release the auth lock first, then let SPOT update its UI/profile.
  const rawOnAuthStateChange=singleton.auth.onAuthStateChange.bind(singleton.auth);
  singleton.auth.onAuthStateChange=(callback)=>rawOnAuthStateChange((event,session)=>{
    setTimeout(()=>{
      try{callback(event,session)}catch(err){console.error('SPOT auth callback error',err)}
    },0);
  });

  // v3.js historically relied only on the follow-up auth event to adopt a new
  // session. If that event is delayed, users see “Signed in” while the page still
  // behaves like a guest. A successful password login now reloads once after the
  // session has been persisted; startup loadSession() then reads that exact session
  // and resolves the account/admin profile deterministically.
  const rawSignIn=singleton.auth.signInWithPassword.bind(singleton.auth);
  singleton.auth.signInWithPassword=async(credentials)=>{
    const result=await rawSignIn(credentials);
    if(!result?.error&&result?.data?.session){
      sessionStorage.setItem('spot-login-complete','1');
      setTimeout(()=>location.reload(),450);
    }
    return result;
  };

  return singleton;
};
})();