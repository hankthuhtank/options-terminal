(function(){
'use strict';
const refs={
 'Engine core':{img:'https://commons.wikimedia.org/wiki/Special:FilePath/Turbocharger.jpg?width=900',href:'https://commons.wikimedia.org/wiki/File:Turbocharger.jpg',label:'NASA turbocharger cutaway · public domain'},
 'Air + fuel':{img:'https://commons.wikimedia.org/wiki/Special:FilePath/Fuelinjector.png?width=900',href:'https://commons.wikimedia.org/wiki/File:Fuelinjector.png',label:'Fuel injector cutaway · Wikimedia Commons'},
 'Cooling':{img:'https://commons.wikimedia.org/wiki/Special:FilePath/Automobile%20radiator.jpg?width=800',href:'https://commons.wikimedia.org/wiki/File:Automobile_radiator.jpg',label:'Automobile radiator · Wikimedia Commons'},
 'Lubrication':{img:'https://commons.wikimedia.org/wiki/Special:FilePath/Engine%20oil%20filter%20cutaway.JPG?width=900',href:'https://commons.wikimedia.org/wiki/File:Engine_oil_filter_cutaway.JPG',label:'Engine oil-filter cutaway · public domain'},
 'Transmission':{img:'https://commons.wikimedia.org/wiki/Special:FilePath/Automatic%20transmission%20cut.jpg?width=900',href:'https://commons.wikimedia.org/wiki/File:Automatic_transmission_cut.jpg',label:'Automatic-transmission cutaway · Wikimedia Commons'},
 'Drivetrain':{img:'https://commons.wikimedia.org/wiki/Special:FilePath/Differential%20Gear%20%28PSF%29.png?width=850',href:'https://commons.wikimedia.org/wiki/File:Differential_Gear_(PSF).png',label:'Differential gear diagram · public domain'},
 'Suspension + steering':{img:'https://commons.wikimedia.org/wiki/Special:FilePath/Rack-And-Pinion%20Steering%20Linkage.gif',href:'https://commons.wikimedia.org/wiki/File:Rack-And-Pinion_Steering_Linkage.gif',label:'Rack-and-pinion steering animation · CC BY-SA 4.0'},
 'Brakes':{img:'https://commons.wikimedia.org/wiki/Special:FilePath/Disc%20brake.jpg?width=900',href:'https://commons.wikimedia.org/wiki/File:Disc_brake.jpg',label:'Automobile disc brake · Wikimedia Commons'},
 'Electrical':{img:'https://commons.wikimedia.org/wiki/Special:FilePath/Automobile%20starter%202.JPG?width=900',href:'https://commons.wikimedia.org/wiki/File:Automobile_starter_2.JPG',label:'Exploded automobile starter · Wikimedia Commons'},
 'Heating + A/C':{img:'https://commons.wikimedia.org/wiki/Special:FilePath/Climatizacao-automotiva-air-conditioning.jpg?width=900',href:'https://commons.wikimedia.org/wiki/File:Climatizacao-automotiva-air-conditioning.jpg',label:'Automotive A/C system · CC licensed'},
 'Exhaust + emissions':{img:'https://commons.wikimedia.org/wiki/Special:FilePath/Catalyst%20Structure.svg?width=900',href:'https://commons.wikimedia.org/wiki/File:Catalyst_Structure.svg',label:'Three-way catalytic-converter structure · Wikimedia Commons'},
 'Wheels + tires':{img:'https://commons.wikimedia.org/wiki/Special:FilePath/Tire.gif',href:'https://commons.wikimedia.org/wiki/File:Tire.gif',label:'Automotive tire cross-section · Wikimedia Commons'},
 'Body + chassis':{img:'https://commons.wikimedia.org/wiki/Special:FilePath/CarFrame.jpg?width=900',href:'https://commons.wikimedia.org/wiki/File:CarFrame.jpg',label:'Automobile chassis frame · CC BY-SA 4.0'},
 'Truck-specific':{img:'https://commons.wikimedia.org/wiki/Special:FilePath/Differential%20gear%20001.JPG?width=900',href:'https://commons.wikimedia.org/wiki/File:Differential_gear_001.JPG',label:'Heavy-truck differential hardware · Wikimedia Commons'}
};
function apply(){
 const title=document.getElementById('pmSystemTitle');
 const img=document.getElementById('pmSystemImg');
 const source=document.getElementById('pmSystemSource');
 if(!title||!img||!source)return;
 const ref=refs[title.textContent.trim()];
 if(!ref)return;
 if(img.getAttribute('src')!==ref.img){img.style.opacity='.15';img.src=ref.img;img.onload=()=>img.style.opacity='1';}
 source.href=ref.href;source.textContent=ref.label+' ↗';
 img.onerror=()=>{img.removeAttribute('src');img.alt='Reference image unavailable';img.style.opacity='0';};
}
apply();
document.addEventListener('click',e=>{if(e.target.closest('.pm-system'))setTimeout(apply,0)});
})();
