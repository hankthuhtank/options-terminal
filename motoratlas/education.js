(function(){
'use strict';
const qs=(s,c=document)=>c.querySelector(s), qsa=(s,c=document)=>[...c.querySelectorAll(s)];

const systems=[
 {id:'engine',name:'Engine core',summary:'The engine turns combustion pressure into rotating crankshaft torque. These are the hard parts that seal the cylinders, control airflow and convert piston motion into rotation.',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Turbocharger.jpg?width=900',source:'https://commons.wikimedia.org/wiki/File:Turbocharger.jpg',sourceLabel:'NASA turbocharger cutaway · public domain'},
 {id:'airfuel',name:'Air + fuel',summary:'An engine can only make useful power when it receives the right amount of clean air and correctly metered fuel. Sensors tell the computer what is happening; injectors and airflow hardware do the physical work.',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Fuelinjector.png?width=900',source:'https://commons.wikimedia.org/wiki/File:Fuelinjector.png',sourceLabel:'Fuel injector cutaway · Wikimedia Commons'},
 {id:'cooling',name:'Cooling',summary:'Combustion creates far more heat than the engine can keep. Coolant carries unwanted heat out of the engine and the radiator transfers it to outside air.',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Automobile%20radiator.jpg?width=800',source:'https://commons.wikimedia.org/wiki/File:Automobile_radiator.jpg',sourceLabel:'Automobile radiator · Wikimedia Commons'},
 {id:'lubrication',name:'Lubrication',summary:'Pressurized oil creates a protective film between moving metal surfaces, carries heat away and keeps bearings, journals, cams and timing components alive.',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Engine_oil_system.svg?width=900',source:'https://commons.wikimedia.org/wiki/Category:Engine_lubrication_systems',sourceLabel:'Engine lubrication reference · Wikimedia Commons'},
 {id:'transmission',name:'Transmission',summary:'The transmission changes the relationship between engine speed and wheel speed. Low ratios multiply torque; high ratios reduce engine speed once the vehicle is moving.',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Automatic%20transmission%20cutaway.jpg?width=900',source:'https://commons.wikimedia.org/wiki/Category:Cutaways_of_automobile_transmissions',sourceLabel:'Transmission cutaway reference · Wikimedia Commons'},
 {id:'drivetrain',name:'Drivetrain',summary:'Everything after the transmission carries, redirects or divides torque on its way to the driven wheels. Layout changes depending on FWD, RWD, AWD or 4WD.',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Differential%20Gear%20%28PSF%29.png?width=850',source:'https://commons.wikimedia.org/wiki/File:Differential_Gear_(PSF).png',sourceLabel:'Differential diagram · public domain'},
 {id:'suspension',name:'Suspension + steering',summary:'Suspension lets the wheels move while controlling the body. Steering changes wheel angle. Together they keep the tire pointed and planted where the driver expects.',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Steering-rack-and-pinion.png?width=850',source:'https://commons.wikimedia.org/wiki/Category:Rack_and_pinion_steering',sourceLabel:'Rack-and-pinion reference · Wikimedia Commons'},
 {id:'brakes',name:'Brakes',summary:'Your foot creates hydraulic pressure. That pressure clamps friction material against a spinning surface, converting vehicle motion into heat.',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Disc_brake_dsc03682.jpg?width=850',source:'https://commons.wikimedia.org/wiki/Category:Disc_brakes',sourceLabel:'Disc brake hardware · Wikimedia Commons'},
 {id:'electrical',name:'Electrical',summary:'The electrical system starts the engine, keeps the battery charged, powers accessories and lets dozens of control modules and sensors communicate.',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Automobile%20starter%202.JPG?width=900',source:'https://commons.wikimedia.org/wiki/File:Automobile_starter_2.JPG',sourceLabel:'Exploded starter motor · Wikimedia Commons'},
 {id:'hvac',name:'Heating + A/C',summary:'Cabin climate control moves heat. The heater uses hot engine coolant; air conditioning circulates refrigerant through compression, condensation, expansion and evaporation.',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Climatizacao-automotiva-air-conditioning.jpg?width=900',source:'https://commons.wikimedia.org/wiki/File:Climatizacao-automotiva-air-conditioning.jpg',sourceLabel:'Automotive A/C system · CC licensed'},
 {id:'exhaust',name:'Exhaust + emissions',summary:'After combustion, gases must leave the cylinders, be monitored and cleaned, then exit quietly. Modern exhaust hardware is part plumbing, part chemistry and part sensor network.',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Catalytic_converter.jpg?width=900',source:'https://commons.wikimedia.org/wiki/Category:Automobile_catalytic_converters',sourceLabel:'Catalytic converter reference · Wikimedia Commons'},
 {id:'wheels',name:'Wheels + tires',summary:'The tire is the only part of the vehicle meant to touch the road. Its construction, pressure, alignment and available grip determine how well every other system can do its job.',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Tire_cross_section.jpg?width=850',source:'https://commons.wikimedia.org/wiki/Category:Cross-sections_of_tires',sourceLabel:'Tire construction reference · Wikimedia Commons'},
 {id:'body',name:'Body + chassis',summary:'The structure supports the drivetrain, suspension, occupants and cargo. Unibody cars integrate body and structure; many trucks mount a separate body onto heavy frame rails.',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Car_chassis.jpg?width=900',source:'https://commons.wikimedia.org/wiki/Category:Automobile_chassis',sourceLabel:'Automobile chassis reference · Wikimedia Commons'},
 {id:'truck',name:'Truck-specific',truckOnly:true,summary:'Heavy-duty trucks add hardware for load, towing, low-speed traction and diesel aftertreatment. The basic physics stay the same, but the parts are built for much higher duty.',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Differential%20gear%20001.JPG?width=900',source:'https://commons.wikimedia.org/wiki/File:Differential_gear_001.JPG',sourceLabel:'Heavy-truck differential · Wikimedia Commons'}
];

const parts={
engine:[
 ['Engine block','The main structural casting that contains the cylinders, coolant passages and oil galleries.','Center of the engine assembly.','Cylinder head, crankshaft, pistons, oil pan','Cracks, coolant/oil mixing, damaged cylinder walls','car+truck'],
 ['Cylinder head','Seals the top of the cylinders and carries the valves, ports and often camshafts.','Bolted to the top of the engine block.','Valves, camshaft, head gasket, intake/exhaust manifolds','Overheating, warping, coolant loss, low compression','car+truck'],
 ['Head gasket','Seals combustion pressure, coolant and oil between the block and cylinder head.','Clamped between block and cylinder head.','Block, head, coolant passages, oil passages','Overheating, white exhaust smoke, bubbling coolant, oil/coolant mixing','car+truck'],
 ['Piston','Receives combustion pressure and moves up and down inside the cylinder.','Inside each cylinder.','Piston rings, wrist pin, connecting rod','Knock, scoring, compression loss, oil burning','car+truck'],
 ['Piston rings','Seal combustion pressure above the piston and control oil on the cylinder wall.','Grooves around each piston.','Piston, cylinder wall, crankcase','Blue smoke, oil consumption, blow-by, low compression','car+truck'],
 ['Connecting rod','Links the piston to the crankshaft and transfers combustion force into crank rotation.','Inside the crankcase between piston and crankshaft.','Piston pin, rod bearing, crankshaft','Rod knock, low oil pressure damage, catastrophic failure','car+truck'],
 ['Crankshaft','Turns the pistons reciprocating motion into continuous rotation that can drive the transmission.','Lower engine block / crankcase.','Connecting rods, main bearings, flywheel/flexplate, harmonic balancer','Deep knock, vibration, bearing damage, oil pressure loss','car+truck'],
 ['Camshaft','Opens the intake and exhaust valves at precise times as the engine rotates.','Cylinder head on OHC engines; block on many pushrod engines.','Valves, lifters/followers, timing chain/belt','Ticking, misfire, poor power, timing-related codes','car+truck'],
 ['Intake valve','Opens so fresh air or air/fuel mixture can enter the cylinder.','Cylinder head, at each intake port.','Camshaft, valve spring, intake port','Compression loss, misfire, poor airflow','car+truck'],
 ['Exhaust valve','Opens so burned gases can leave the cylinder after the power stroke.','Cylinder head, at each exhaust port.','Camshaft, valve spring, exhaust port','Burned valve, compression loss, misfire','car+truck'],
 ['Timing chain / belt','Keeps the crankshaft and camshaft synchronized so valves open at the correct piston position.','Front or side of the engine behind timing covers.','Crank sprocket, cam sprocket, guides/tensioners','Rattle, timing codes, no-start, internal engine damage on interference engines','car+truck'],
 ['Flywheel / flexplate','Connects engine rotation to the clutch or torque converter and adds rotational inertia.','Rear of crankshaft between engine and transmission.','Crankshaft, clutch or torque converter, starter ring gear','Vibration, starter grinding, cracked flexplate noise','car+truck'],
 ['Harmonic balancer','Damps torsional vibration in the crankshaft and often drives accessory belts.','Front end of the crankshaft.','Crankshaft, accessory belt','Wobble, belt misalignment, vibration, separated rubber damper','car+truck']
],
airfuel:[
 ['Air filter','Traps dirt before outside air enters the engine.','Air box near the front/side of the engine bay.','Intake duct, MAF sensor, throttle body','Restricted airflow, poor acceleration, reduced fuel economy','car+truck'],
 ['Mass airflow sensor','Measures how much air is entering so the engine computer can calculate fueling.','Intake tube after the air filter on many vehicles.','Air filter, PCM/ECU, injectors','Rough idle, hesitation, rich/lean codes, poor economy','car+truck'],
 ['Throttle body','Controls how much air enters a gasoline engine in response to driver demand.','At the entrance to the intake manifold.','Accelerator pedal sensor, intake manifold, PCM','Sticky throttle, unstable idle, reduced-power mode','car'],
 ['Intake manifold','Distributes incoming air from one throttle opening to individual cylinders.','Bolted to the intake side/top of the cylinder head.','Throttle body, intake ports, vacuum lines','Vacuum leak, lean codes, uneven idle','car+truck'],
 ['Fuel tank','Stores fuel safely and provides a reservoir for the pump.','Under the rear/middle of the vehicle.','Fuel pump, EVAP system, filler neck','Leaks, damaged venting, contamination','car+truck'],
 ['Fuel pump','Moves fuel from the tank toward the engine at the pressure the system requires.','Usually inside the fuel tank on gasoline vehicles.','Tank, filter, lines, fuel rail','Long crank, no-start, low pressure, whining pump','car+truck'],
 ['Fuel filter','Captures contamination before it reaches injectors or high-pressure components.','In tank, along the frame/body or under hood depending on design.','Fuel pump, lines, injectors','Low power under load, low fuel pressure, hard starting','car+truck'],
 ['Fuel rail','Acts as a pressurized manifold that supplies multiple injectors.','Along the intake ports/cylinder head.','Fuel line, pressure sensor/regulator, injectors','Leaks, pressure faults, hard starting','car+truck'],
 ['Fuel injector','An electrically controlled valve that meters and atomizes fuel into the intake port or cylinder.','Intake port or directly in cylinder head.','Fuel rail, ECU, intake/cylinder','Misfire, fuel smell, hard start, rich/lean cylinder','car+truck'],
 ['High-pressure pump','Raises fuel pressure dramatically for gasoline direct injection or common-rail diesel systems.','Engine-mounted and mechanically driven on many designs.','Low-pressure pump, fuel rail, injectors','Hard start, low rail pressure, power loss','car+truck'],
 ['Turbocharger','Uses exhaust energy to compress intake air so more oxygen can enter the engine.','Between exhaust manifold and intake plumbing.','Exhaust manifold, intercooler, oil supply, intake','Whine, smoke, boost loss, oil leaks, underboost codes','car+truck'],
 ['Intercooler','Cools compressed turbo air, making it denser before it enters the engine.','Front of vehicle or top/side depending on layout.','Turbocharger, charge pipes, intake manifold','Boost leak, oily residue, reduced power','car+truck']
],
cooling:[
 ['Radiator','Transfers heat from hot coolant into the air flowing through its fins.','Front of vehicle behind the grille.','Upper/lower hoses, fan, coolant reservoir','Overheating, leaks, clogged fins, cold spots','car+truck'],
 ['Water pump','Circulates coolant through the engine, radiator and heater circuit.','Engine-mounted, belt or electrically driven.','Engine passages, radiator, thermostat','Overheating, coolant leak, bearing noise','car+truck'],
 ['Thermostat','Restricts coolant flow while cold, then opens near operating temperature.','Coolant outlet between engine and radiator hose.','Engine, radiator, housing','Overheating stuck closed; slow warm-up/no cabin heat stuck open','car+truck'],
 ['Cooling fan','Pulls or pushes air through the radiator when road speed alone is not enough.','At radiator/condenser assembly.','Fan relay/module, temperature sensor, radiator','Overheating at idle, A/C weak at low speed','car+truck'],
 ['Coolant reservoir','Provides expansion space and lets coolant move in/out of the sealed system as temperature changes.','Engine bay near radiator.','Radiator, pressure cap, overflow/return hose','Low coolant, cracked tank, air entering system','car+truck'],
 ['Heater core','A small radiator that uses hot engine coolant to warm cabin air.','Inside dashboard/HVAC case.','Coolant hoses, blower, blend doors','Sweet smell, fogged windows, wet carpet, no heat','car+truck'],
 ['Radiator hose','Carries coolant between engine and radiator while allowing engine movement.','Upper and lower radiator connections.','Radiator, thermostat housing, water pump','Bulging, cracks, leaks, collapse under suction','car+truck']
],
lubrication:[
 ['Oil pan','Stores the engine oil supply below the crankshaft.','Bottom of engine.','Oil pickup, drain plug, block','Leaks, impact damage, low oil level','car+truck'],
 ['Oil pickup tube','Draws oil from the sump into the oil pump through a screened inlet.','Inside oil pan.','Oil pan, oil pump','Low oil pressure from blockage or air leak','car+truck'],
 ['Oil pump','Pressurizes engine oil and sends it through galleries to bearings and valvetrain.','Inside/front of engine, usually crank-driven.','Pickup tube, filter, oil galleries','Low oil pressure, bearing noise, engine damage','car+truck'],
 ['Oil filter','Captures particles in circulating oil before they reach precision bearings.','Engine block/filter housing.','Oil pump, oil galleries','Restricted flow, leaks, bypass operation','car+truck'],
 ['Main bearing','Supports the crankshaft on a pressurized oil film inside the block.','Between crankshaft main journals and engine block.','Crankshaft, oil galleries','Low oil pressure, deep knock, metal in oil','car+truck'],
 ['Rod bearing','Provides a low-friction oil-film surface between connecting rod and crank journal.','Big end of each connecting rod.','Connecting rod, crankshaft','Rod knock, bearing material in oil, seized engine','car+truck']
],
transmission:[
 ['Clutch','On a manual transmission, clamps engine and transmission together or separates them for starts and shifts.','Between engine flywheel and manual transmission.','Flywheel, pressure plate, release bearing, input shaft','Slipping, chatter, hard shifting, burning smell','car+truck'],
 ['Torque converter','Fluid-couples an automatic transmission to the engine and multiplies torque at low speed.','Inside bellhousing between engine and automatic transmission.','Flexplate, transmission pump, input shaft','Shudder, overheating, stall issues, lockup codes','car+truck'],
 ['Transmission','Provides selectable gear ratios and reverse between the engine and final drive.','Directly behind engine or integrated transaxle.','Clutch/converter, driveshaft/CV axles, control module','Slip, harsh shift, delayed engagement, noise','car+truck'],
 ['Planetary gearset','Compact gears inside many automatics that produce multiple ratios by holding/driving different members.','Inside automatic transmission.','Clutches, bands, shafts','Ratio codes, slipping, internal gear noise','car+truck'],
 ['Valve body','Hydraulic control center in many automatic transmissions; routes pressurized fluid to clutches.','Inside transmission above oil pan.','Solenoids, pump, clutch packs','Harsh/missing shifts, delayed engagement','car+truck'],
 ['Shift solenoid','Electrically controls hydraulic circuits so the transmission computer can command gear changes.','Valve body.','Transmission controller, valve body','Shift codes, limp mode, wrong gear','car+truck'],
 ['Transmission cooler','Removes heat from transmission fluid, especially important under towing/load.','Radiator tank or separate heat exchanger at front.','Transmission lines, radiator/airflow','Overheated fluid, leaks, shortened transmission life','car+truck']
],
drivetrain:[
 ['Driveshaft','Carries rotating torque from a longitudinal transmission/transfer case to an axle differential.','Underbody, running front-to-rear.','Transmission, U-joints/CV joints, differential','Vibration, clunk, balance or joint wear','car+truck'],
 ['U-joint','Allows a driveshaft to transmit torque while operating at an angle.','At driveshaft ends/sections.','Driveshaft, yokes, differential/transfer case','Clunk, squeak, vibration, looseness','car+truck'],
 ['Differential','Splits torque between left and right wheels while allowing them to rotate at different speeds in a turn.','Inside driven axle/final-drive housing.','Ring/pinion, axles, driveshaft','Whine, clunk, gear oil leak, metal debris','car+truck'],
 ['Ring and pinion','Final gear reduction that turns driveshaft rotation into axle rotation and multiplies torque.','Inside differential housing.','Driveshaft, differential carrier','Gear whine, backlash clunk, overheating','car+truck'],
 ['CV axle','Carries torque through changing steering and suspension angles on independent driven wheels.','Between transaxle/differential and wheel hub.','CV joints, hub, transmission/differential','Clicking on turns, vibration, torn boot, grease leak','car+truck'],
 ['Transfer case','On many 4WD/AWD vehicles, distributes transmission output to front and rear driveshafts.','Behind transmission.','Transmission, front/rear driveshafts','4WD not engaging, chain/gear noise, fluid leak','truck'],
 ['Locking differential','Can reduce or eliminate speed difference between axle shafts to improve traction.','Inside axle differential.','Axles, differential carrier, locker actuator','Binding, failure to lock/unlock, traction loss','truck']
],
suspension:[
 ['Coil spring','Supports vehicle weight and compresses/extends as the wheel moves.','Between control arm/axle and body, or around strut.','Control arm/strut, body/subframe','Sagging, broken coil, uneven ride height','car+truck'],
 ['Shock absorber','Damps spring motion by forcing oil through calibrated passages.','Between suspension and body/frame.','Spring, axle/control arm, body','Bouncing, leaking oil, poor tire contact','car+truck'],
 ['Strut','Combines a damper with a structural suspension member; often also carries the spring.','Front or rear wheel suspension.','Spring, steering knuckle, strut mount','Noise, leaking, poor handling, uneven tire wear','car'],
 ['Control arm','Locates the wheel/knuckle while allowing controlled suspension travel.','Between chassis/subframe and steering knuckle.','Bushings, ball joint, frame, knuckle','Clunk, alignment change, unstable braking','car+truck'],
 ['Ball joint','A spherical pivot that lets the suspension move while the steering knuckle turns.','Control-arm-to-knuckle connection.','Control arm, steering knuckle','Clunk, play, wandering, severe separation risk','car+truck'],
 ['Sway bar','Links left and right suspension to resist body roll during cornering.','Across the vehicle, connected to control arms/struts.','End links, bushings, suspension','Clunk, excessive body roll, broken end link','car+truck'],
 ['Tie rod','Transfers steering rack/gear movement to the steering knuckle.','Between steering gear and wheel knuckle.','Rack/center link, steering knuckle','Loose steering, toe wear, clunk','car+truck'],
 ['Steering rack','Converts steering-wheel rotation into left-right movement of the tie rods.','Mounted to front subframe/firewall area.','Steering shaft, tie rods, assist motor/hydraulics','Play, leaks, heavy steering, uneven assist','car+truck'],
 ['Wheel bearing / hub','Lets the wheel rotate with low friction while carrying radial and cornering loads.','At center of each wheel/knuckle.','Axle shaft, brake rotor, wheel','Growl/hum, play, ABS sensor issues','car+truck'],
 ['Leaf spring','A stack or single flexible leaf that supports load and can locate a solid axle.','Commonly rear suspension on pickups/heavy trucks.','Axle, shackles, frame','Sagging, broken leaf, bushing noise','truck'],
 ['Solid axle','A rigid housing connects both wheels; rugged and well-suited to heavy load/traction.','Front or rear of many trucks.','Differential, axle shafts, springs, hubs','Leaks, bearing wear, bent housing, gear noise','truck']
],
brakes:[
 ['Brake pedal','Provides the driver input and mechanical leverage that starts the braking process.','Driver footwell.','Booster, master cylinder','Excess travel, hard pedal, linkage issues','car+truck'],
 ['Brake booster','Uses vacuum or electric/hydraulic assist to multiply pedal force.','Firewall behind master cylinder.','Pedal, master cylinder, vacuum pump/manifold','Hard pedal, hissing, assist warning','car+truck'],
 ['Master cylinder','Converts pedal force into hydraulic pressure for the brake circuits.','Engine bay on firewall.','Booster, reservoir, brake lines','Sinking pedal, internal bypass, leaks','car+truck'],
 ['Brake line / hose','Carries pressurized brake fluid from master/ABS unit to each wheel brake.','Along body/frame and at each moving wheel.','Master cylinder, ABS unit, calipers/wheel cylinders','Fluid leak, hose swelling, pull, soft pedal','car+truck'],
 ['Brake caliper','Uses hydraulic piston force to squeeze brake pads against a rotor.','Mounted over disc brake rotor.','Brake hose, pads, rotor','Sticking, leak, uneven pad wear, pulling','car+truck'],
 ['Brake pad','Friction material that presses against the rotor to convert motion into heat.','Inside caliper around rotor.','Caliper, rotor','Squeal, grinding, thin material, fade','car+truck'],
 ['Brake rotor','Rotating iron disc clamped by pads. Its mass and airflow absorb/dissipate braking heat.','Bolted/clamped at wheel hub.','Pads, caliper, hub','Pulsation, scoring, cracks, thickness variation','car+truck'],
 ['ABS wheel-speed sensor','Measures wheel rotation so ABS/traction/stability systems can detect slip.','At wheel hub/knuckle.','Tone ring, ABS module','ABS light, traction-control faults, erratic speed signal','car+truck'],
 ['ABS hydraulic module','Rapidly holds, releases and reapplies brake pressure to prevent wheel lock.','Engine bay/frame area in brake hydraulic circuit.','Master cylinder, wheel circuits, controller','ABS warning, pump/valve codes, abnormal pedal during faults','car+truck']
],
electrical:[
 ['Battery','Stores electrical energy and supplies high current for starting plus stable system voltage when needed.','Engine bay, trunk or underbody depending on vehicle.','Starter, alternator, fuse box, grounds','Slow crank, low voltage, corrosion, repeated jump starts','car+truck'],
 ['Starter motor','Uses battery current to rotate the engine fast enough for it to begin running on its own.','Bolted where engine meets transmission.','Battery, solenoid, flywheel/flexplate','Click/no crank, slow crank, grinding','car+truck'],
 ['Starter solenoid','Electromagnetic switch that engages the starter drive and connects heavy current to the motor.','On starter or nearby.','Ignition/start circuit, starter motor','Single click, intermittent crank, burned contacts','car+truck'],
 ['Alternator','Turns engine rotation into electrical power and maintains battery charge while running.','Front/side of engine driven by belt.','Battery, belt, regulator, vehicle loads','Battery light, low/high voltage, whining','car+truck'],
 ['Fuse','Sacrificial overcurrent protection; opens a circuit before wiring overheats.','Fuse boxes in cabin/engine bay.','Protected circuit','Dead circuit; repeat blowing means a fault still exists','car+truck'],
 ['Relay','Electrically controlled switch that lets a low-current control circuit operate a higher-current load.','Fuse/relay boxes or near component.','Control module/switch, powered component','Intermittent/no operation, clicking, burned contacts','car+truck'],
 ['ECU / PCM','Computer that reads sensors and commands fuel, ignition, throttle, emissions and sometimes transmission functions.','Protected engine bay/cabin location.','Sensors, injectors, coils, network','Multiple codes, no communication, control faults','car+truck'],
 ['Crankshaft position sensor','Reports crank position and speed so the computer knows when to fire injectors and ignition.','Near crank pulley, flywheel or engine block.','Trigger wheel, ECU','No-start, stall, tach drop, P0335-family codes','car+truck'],
 ['Camshaft position sensor','Reports cam position so the ECU can identify engine phase and control sequential events.','Cylinder head/timing area.','Cam trigger, ECU, variable valve timing','Long crank, misfire, timing/VVT codes','car+truck'],
 ['Ground strap / cable','Provides the low-resistance return path from engine/body electrical loads back to battery negative.','Battery-to-body and engine-to-body/frame.','Battery, chassis, engine','Slow crank, strange electrical behavior, voltage-drop problems','car+truck']
],
hvac:[
 ['A/C compressor','Compresses refrigerant vapor and circulates it through the air-conditioning loop.','Engine-driven or electric under hood.','Condenser, evaporator, refrigerant lines','No cooling, noise, clutch/control fault, metal contamination','car+truck'],
 ['Condenser','Releases heat from high-pressure refrigerant to outside air, condensing vapor into liquid.','Front of vehicle ahead of/near radiator.','Compressor, receiver/drier, airflow','Poor cooling, leaks, high pressure','car+truck'],
 ['Receiver-drier / accumulator','Stores refrigerant, filters debris and contains desiccant to remove moisture; exact design depends on system type.','In high- or low-side A/C plumbing.','Condenser/evaporator, expansion device, compressor','Moisture contamination, restriction, poor cooling','car+truck'],
 ['Expansion valve / orifice','Meters refrigerant into the evaporator and creates the pressure drop needed for cooling.','At evaporator inlet / A/C line.','Condenser side, evaporator','Icing, wrong pressures, poor cooling','car+truck'],
 ['Evaporator','Cold heat exchanger where refrigerant absorbs heat from cabin air.','Inside HVAC case behind dashboard.','Expansion device, blower, compressor suction line','Weak cooling, leak, odor, icing','car+truck'],
 ['Blower motor','Moves cabin air across the heater core or evaporator and through the vents.','HVAC housing under dash.','Blower resistor/module, vents, HVAC controls','No airflow, only some speeds, noise','car+truck'],
 ['Blend door','Directs air through/around heater core and mixes hot/cold air for requested temperature.','Inside HVAC case.','Actuator, heater core, evaporator','Wrong temperature, clicking actuator, one side hot/cold','car+truck']
],
exhaust:[
 ['Exhaust manifold','Collects exhaust from individual cylinders and directs it into the exhaust pipe or turbocharger.','Bolted to cylinder head exhaust ports.','Cylinder head, turbo/catalyst, oxygen sensor','Ticking leak, cracked manifold, exhaust smell','car+truck'],
 ['Oxygen sensor','Measures oxygen content in exhaust so the ECU can monitor mixture and catalyst performance.','Threaded into exhaust before/after catalyst.','ECU, catalytic converter','Check-engine light, mixture codes, poor economy','car+truck'],
 ['Catalytic converter','Uses precious-metal catalysts to convert harmful hydrocarbons, carbon monoxide and NOx into less harmful gases.','Exhaust system near engine and/or underbody.','O2 sensors, exhaust pipe','P0420-family code, rattle, restriction, excessive heat','car+truck'],
 ['Resonator','Uses tuned chambers to cancel specific exhaust sound frequencies.','Mid exhaust system.','Exhaust pipes, muffler','Rattle, leak, louder/drone-prone exhaust','car+truck'],
 ['Muffler','Reduces exhaust noise by routing pressure waves through chambers/tubes or absorption material.','Rear/mid exhaust.','Resonator, tailpipe','Loud exhaust, rust holes, internal rattle','car+truck'],
 ['EGR valve','Routes a controlled amount of exhaust back into the intake to reduce combustion temperature and NOx formation.','Between exhaust and intake circuits.','ECU, intake, exhaust','Rough idle, flow codes, soot buildup, knock/NOx issues','car+truck'],
 ['Diesel particulate filter','Traps diesel soot and periodically burns it off during regeneration.','Diesel exhaust after oxidation catalyst/turbo.','Pressure sensors, temperature sensors, ECU','Frequent regen, high backpressure, DPF warning','truck'],
 ['SCR / DEF system','Injects diesel exhaust fluid so the SCR catalyst can reduce NOx emissions.','Diesel exhaust downstream of engine.','DEF tank/pump/injector, NOx sensors, SCR catalyst','DEF warnings, derate, NOx efficiency codes','truck']
],
wheels:[
 ['Tire','Flexible air-filled structure that carries load and generates acceleration, braking and cornering force through a small contact patch.','Mounted on each wheel.','Wheel, suspension, road','Uneven wear, vibration, low pressure, cracking, puncture','car+truck'],
 ['Wheel','Rigid rim/disc that supports the tire and bolts to the hub.','At each corner.','Tire, hub, lug fasteners','Bent rim, vibration, cracks, bead leaks','car+truck'],
 ['Valve stem','Seals the inflation opening and lets tire pressure be adjusted.','Through wheel rim.','Tire/wheel, sometimes TPMS sensor','Slow leak, cracked rubber, damaged core','car+truck'],
 ['TPMS sensor','Measures tire pressure and transmits it to the vehicle on direct-monitoring systems.','Inside tire at valve stem/wheel.','Receiver/module, instrument cluster','TPMS light, dead sensor battery, inaccurate pressure','car+truck'],
 ['Lug nut / wheel bolt','Clamps the wheel to the hub with specified preload.','Wheel hub studs or threaded hub.','Wheel, hub','Loose wheel, damaged threads, warped rotor from improper torque','car+truck']
],
body:[
 ['Unibody structure','Combines body panels and structural stampings into one load-carrying shell.','Entire passenger-car body shell.','Subframes, suspension mounts, crash structures','Collision deformation, corrosion, alignment issues','car'],
 ['Subframe','Bolt-on structural cradle that carries engine, transmission or suspension loads.','Front/rear underside of many unibody vehicles.','Body, control arms, engine mounts','Clunks from bushings, corrosion, alignment changes','car+truck'],
 ['Frame rail','Long structural member carrying major bending/towing/payload loads on body-on-frame vehicles.','Front-to-rear under truck body.','Crossmembers, suspension, body mounts, hitch','Rust, collision bends, cracks under severe use','truck'],
 ['Crossmember','Links left/right structure and provides mounting points while resisting twist.','Across frame/unibody underside.','Frame rails, transmission, suspension','Corrosion, impact damage, mount failure','car+truck'],
 ['Engine mount','Rubber/hydraulic mount supports drivetrain while isolating vibration from the body.','Between engine and body/frame/subframe.','Engine, frame/subframe','Thump, excess vibration, engine movement','car+truck'],
 ['Body mount','Rubber/isolator pad separates a body-on-frame cab/body from the chassis.','Between body and frame.','Cab/body, frame','Cab movement, squeaks, vibration, misalignment','truck'],
 ['Crumple zone','Structure intentionally designed to deform and absorb crash energy before it reaches the occupant cell.','Front/rear structure around rigid passenger cell.','Bumpers, rails, body shell','Collision damage; not a maintenance wear item','car+truck']
],
truck:[
 ['Transfer case low range','Adds a deep gear reduction for low-speed torque and vehicle control off-road or under severe load.','Behind transmission on many 4WD trucks.','Transmission, front/rear driveshafts','Won’t shift range, grinding, indicator faults','truck'],
 ['Manual locking hub','Disconnects/front-connects wheel hubs from front axle shafts on some 4WD systems.','Center of front wheel hubs.','Axle shaft, wheel hub','No front drive, difficult engagement, clicking','truck'],
 ['Full-floating rear axle','Wheel hub rides on its own bearings while axle shaft primarily transmits torque, ideal for heavy loads.','Rear axle on many heavy-duty pickups/trucks.','Hub bearings, axle shaft, differential','Hub leaks/noise, axle shaft issue without wheel support loss','truck'],
 ['Tow receiver','Structural hitch attachment that transfers trailer tongue/pull loads into the frame.','Rear of frame.','Frame rails, hitch ball/mount, trailer','Rust, cracks, loose hardware, overstress','truck'],
 ['Trailer brake controller','Commands electric/electric-over-hydraulic trailer brakes in proportion to vehicle braking.','Cab electronics integrated or aftermarket.','Brake signal, trailer connector, trailer brakes','No trailer braking, gain issues, connection warnings','truck'],
 ['Diesel common rail','Maintains extremely high fuel pressure available to electronically controlled diesel injectors.','On diesel engine cylinder head area.','High-pressure pump, injectors, pressure sensor','Hard start, rail-pressure codes, dangerous high-pressure leaks','truck'],
 ['Glow plug','Heats the diesel combustion chamber during cold starts because diesel ignition relies on compressed-air temperature.','Threaded into diesel cylinder head.','Glow module, combustion chamber','Hard cold start, white smoke, glow-system codes','truck'],
 ['Exhaust brake','Creates exhaust backpressure so the engine helps slow a heavy truck without relying only on service brakes.','Turbo/exhaust system depending on design.','Turbo vanes/valve, ECU, transmission','Weak engine braking, actuator codes, soot issues','truck'],
 ['Heavy-duty cooling stack','Larger radiator, charge-air cooler, transmission cooler and sometimes additional heat exchangers handle towing heat.','Front of truck behind grille.','Engine, turbo, transmission, A/C','Overheating under load, clogged fins, fluid leaks','truck']
]
};

const mount=qs('#diagnostics');
if(!mount) return;
const section=document.createElement('section');
section.className='section parts-manual';
section.id='parts';
section.innerHTML=`<div class="shell">
  <div class="section-head reveal in">
    <div class="section-index">Module 06 / Parts manual</div>
    <div><div class="kicker">What every part actually does</div><h2>Learn the parts.<br>Then learn the system.</h2><p>Pick a system, then open individual components. Every entry explains the part in plain language, where it lives, what it works with and the symptoms that show up when it stops doing its job.</p></div>
  </div>
  <div class="pm-topline"><div class="pm-count" id="pmCount"></div><label class="pm-search"><input id="pmSearch" type="search" placeholder="Search: thermostat, CV axle, relay…" autocomplete="off"></label></div>
  <div class="pm-layout">
    <aside class="pm-systems" id="pmSystems"></aside>
    <div class="pm-workbench">
      <div class="pm-system-visual">
        <figure class="pm-visual-img"><img id="pmSystemImg" alt=""></figure>
        <div class="pm-visual-copy"><span class="sys-kicker" id="pmSystemKicker"></span><h3 id="pmSystemTitle"></h3><p id="pmSystemSummary"></p><a class="pm-visual-source" id="pmSystemSource" target="_blank" rel="noopener">Open visual source ↗</a></div>
      </div>
      <div class="pm-body">
        <div class="pm-part-list"><div class="pm-list-head" id="pmListHead">Component index</div><div id="pmParts"></div></div>
        <article class="pm-detail" id="pmDetail"></article>
      </div>
    </div>
  </div>
  <div class="pm-legend"><div><b>What it does</b><span>The job the part performs.</span></div><div><b>Where it lives</b><span>Where to look for it on the vehicle.</span></div><div><b>Works with</b><span>The nearby parts that depend on it.</span></div><div><b>Failure signs</b><span>Symptoms a driver or technician may notice.</span></div></div>
</div>`;
mount.parentNode.insertBefore(section,mount);

// add Parts to primary navigation without changing the original HTML structure
const nav=qs('#navLinks');
if(nav && !qs('a[href="#parts"]',nav)){
 const li=document.createElement('li');li.innerHTML='<a href="#parts">Parts</a>';nav.insertBefore(li,nav.lastElementChild||null);
 li.querySelector('a').addEventListener('click',()=>nav.classList.remove('open'));
}

let vehicleMode='car';
let activeSystem='engine';
let activePart=0;

function allowed(part){
 const tag=part[5]||'car+truck';
 return vehicleMode==='truck' ? (tag==='truck'||tag==='car+truck') : (tag==='car'||tag==='car+truck');
}
function systemAllowed(s){return !s.truckOnly || vehicleMode==='truck'}
function totalCount(){return systems.filter(systemAllowed).reduce((sum,s)=>sum+(parts[s.id]||[]).filter(allowed).length,0)}
function renderSystems(){
 const box=qs('#pmSystems');box.innerHTML='';
 systems.filter(systemAllowed).forEach((s,i)=>{
  const b=document.createElement('button');b.className='pm-system'+(s.id===activeSystem?' active':'');b.dataset.system=s.id;
  const count=(parts[s.id]||[]).filter(allowed).length;
  b.innerHTML=`<span class="num">${String(i+1).padStart(2,'0')}</span><span><span class="name">${s.name}</span><span class="meta">${count} components</span></span>`;
  b.addEventListener('click',()=>{activeSystem=s.id;activePart=0;renderAll()});box.appendChild(b);
 });
 qs('#pmCount').textContent=`${totalCount()} components indexed · ${vehicleMode.toUpperCase()} view`;
}
function renderSystemVisual(){
 let s=systems.find(x=>x.id===activeSystem);
 if(!s || !systemAllowed(s)){activeSystem='engine';s=systems[0]}
 qs('#pmSystemImg').src=s.image;qs('#pmSystemImg').alt=s.name+' technical reference';
 qs('#pmSystemKicker').textContent=`${vehicleMode} / ${s.name}`;qs('#pmSystemTitle').textContent=s.name;qs('#pmSystemSummary').textContent=s.summary;
 const a=qs('#pmSystemSource');a.href=s.source;a.textContent=s.sourceLabel+' ↗';
}
function renderPartDetail(part,index){
 if(!part){qs('#pmDetail').innerHTML='<div class="pm-empty">No components match this search in the current vehicle mode.</div>';return}
 activePart=index;
 const badge=part[5]==='truck'?'Truck-specific':part[5]==='car'?'Car-focused':'Car + truck';
 qs('#pmDetail').innerHTML=`<div class="pm-detail-top"><div><span class="part-label">Component ${String(index+1).padStart(2,'0')} / ${activeSystem}</span><h3>${part[0]}</h3></div><span class="pm-vehicle-badge">${badge}</span></div>
 <p class="pm-purpose">${part[1]}</p>
 <div class="pm-facts"><div class="pm-fact"><span class="k">Where it lives</span><span class="v">${part[2]}</span></div><div class="pm-fact"><span class="k">Works with</span><span class="v">${part[3]}</span></div><div class="pm-fact"><span class="k">Common failure signs</span><span class="v">${part[4]}</span></div><div class="pm-fact"><span class="k">Why it matters</span><span class="v">A failure here changes the behavior of the entire ${systems.find(x=>x.id===activeSystem)?.name.toLowerCase()||'vehicle'} system, so symptoms should be tested in context instead of treating the part by itself.</span></div></div>
 <div class="pm-links">${part[3].split(',').map(x=>`<span>${x.trim()}</span>`).join('')}</div>`;
 qsa('.pm-part').forEach((b,i)=>b.classList.toggle('active',i===index));
}
function renderParts(query=''){
 const all=(parts[activeSystem]||[]).filter(allowed);
 const needle=query.trim().toLowerCase();
 const filtered=needle?all.filter(p=>p.slice(0,5).join(' ').toLowerCase().includes(needle)):all;
 const list=qs('#pmParts');list.innerHTML='';
 qs('#pmListHead').textContent=needle?`${filtered.length} search result${filtered.length===1?'':'s'}`:`${filtered.length} components / open one`;
 filtered.forEach((p,i)=>{
  const b=document.createElement('button');b.className='pm-part'+(i===0?' active':'');
  b.innerHTML=`<span class="bullet">${String(i+1).padStart(2,'0')}</span><span class="pname">${p[0]}</span><span class="ptype">${p[5]==='truck'?'HD':'part'}</span>`;
  b.addEventListener('click',()=>renderPartDetail(p,i));list.appendChild(b);
 });
 renderPartDetail(filtered[0],0);
}
function renderAll(){renderSystems();renderSystemVisual();renderParts(qs('#pmSearch')?.value||'')}
qs('#pmSearch').addEventListener('input',e=>renderParts(e.target.value));

// Make the top-level Car/Truck choice visually unmistakable.
const carHero={src:'https://commons.wikimedia.org/wiki/Special:FilePath/2000CS%20Side%20Technical%20View.jpg?width=1500',alt:'Technical cutaway side view of a BMW 2000C/CS',label:'01 / Passenger car — technical cutaway',source:'BMW AG technical cutaway · public domain in the U.S. · <a href="https://commons.wikimedia.org/wiki/File:2000CS_Side_Technical_View.jpg" target="_blank" rel="noopener">source ↗</a>'};
const truckHero={src:'https://commons.wikimedia.org/wiki/Special:FilePath/Ford%20F-350.jpg?width=1200',alt:'Ford F-350 pickup truck',label:'01 / Pickup truck — exterior reference',source:'Ford F-350 photograph · public domain · <a href="https://commons.wikimedia.org/wiki/File:Ford_F-350.jpg" target="_blank" rel="noopener">source ↗</a>'};
qsa('.mode-btn').forEach(btn=>btn.addEventListener('click',()=>{
 vehicleMode=btn.dataset.mode==='truck'?'truck':'car';
 const d=vehicleMode==='truck'?truckHero:carHero;
 setTimeout(()=>{const img=qs('#vehicleImg'),label=qs('#stageLabel'),source=qs('#stageSource');if(img){img.src=d.src;img.alt=d.alt}if(label)label.textContent=d.label;if(source)source.innerHTML=d.source},220);
 if(vehicleMode==='car' && systems.find(x=>x.id===activeSystem)?.truckOnly)activeSystem='engine';
 renderAll();
}));

renderAll();
})();
