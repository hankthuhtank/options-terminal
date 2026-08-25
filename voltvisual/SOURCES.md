# Research Notes / Primary Sources

The prototype content was checked primarily against manufacturer and standards-body documentation, especially for Rockwell-specific terms.

## Rockwell Automation

### Studio 5000 / Logix project structure
- Studio 5000 Logix Designer online help
  https://www.rockwellautomation.com/en-us/docs/studio-5000-logix-designer/38-01/contents-ditamap/studio-5000-logix-designer.html
- Tasks, programs, and routines
  https://www.rockwellautomation.com/en-us/docs/studio-5000-logix-designer/38-01/contents-ditamap/studio-5000-logix-designer/controller-organizer/use-the-controller-organizer/use-tasks--programs--and-routines.html

Key checks:
- Tasks schedule programs.
- Programs contain routines and program-scoped tags.
- Routines contain executable code.
- Supported programming languages include ladder, structured text, function block, and sequential function chart depending on controller/context.

### Logix I/O timing
- Logix 5000 Controllers I/O and Tag Data
  https://literature.rockwellautomation.com/idc/groups/literature/documents/pm/1756-pm004_-en-p.pdf
- Logix 5000 Controllers Design Considerations Reference Manual
  https://literature.rockwellautomation.com/idc/groups/literature/documents/rm/1756-rm094_-en-p.pdf

Key check:
- Logix I/O values can update asynchronously to logic execution at the configured Requested Packet Interval (RPI). This is why the site does not present the classic PLC scan mental model as literal Logix behavior.

### ControlLogix / GuardLogix
- ControlLogix 5580 system
  https://www.rockwellautomation.com/en-us/docs/technical/logix5000/_online/1756-um543/controllogix-5580-and-guardlogix-5580-controllers-/controllogix-and-guardlogix-systems/controllogix-system.html
- ControlLogix / GuardLogix 5580 product overview
  https://www.rockwellautomation.com/en-us/products/hardware/programmable-controllers/1756controllogix5580.html.html
- GuardLogix safety controller checklist
  https://www.rockwellautomation.com/en-us/docs/technical/logix5000/_online/1756-rm012/guardlogix-5580-and-compact-guardlogix-5580-safety/checklists-for-safety-applications/checklist-for-safety-controller-system.html

Key checks:
- ControlLogix is chassis-based.
- Controllers can occupy numbered chassis slots; a fixed “CPU must be slot 0” rule is not taught.
- GuardLogix integrates standard and safety control and requires safety-specific validation practices.

### I/O
- ControlLogix I/O
  https://www.rockwellautomation.com/en-us/products/hardware/i-o/1756-controllogix-i-o.html
- POINT I/O (1734)
  https://www.rockwellautomation.com/en-us/products/hardware/i-o/1734-point-i-o.html
- FLEX I/O (1794) documentation
  https://www.rockwellautomation.com/en-us/support/documentation/technical/i-o/1794-flex-i-o-modules.html
- POINT Guard I/O
  https://www.rockwellautomation.com/en-us/products/hardware/i-o/1734-point-guard-i-o.html

### Drives / motion
- PowerFlex 755
  https://www.rockwellautomation.com/en-us/products/hardware/vfds-variable-frequency-drives/powerflex-755.html
- Kinetix 5700
  https://www.rockwellautomation.com/en-us/products/hardware/motion-control/kinetix-5700.html
- Kinetix 6000 product information
  https://literature.rockwellautomation.com/idc/groups/literature/documents/pc/2094-pc003_-en-p.pdf

## ODVA

- EtherNet/IP technology
  https://www.odva.org/technology-standards/key-technologies/ethernet-ip/
- EtherNet/IP technology overview
  https://www.odva.org/publication_download/ethernet-ip-technology-overview/
- DeviceNet
  https://www.odva.org/technology-standards/key-technologies/devicenet/
- ControlNet
  https://www.odva.org/technology-standards/other-technologies/controlnet/

Key checks:
- EtherNet/IP uses standard Ethernet/IP technology and CIP for industrial automation services.
- EtherNet/IP, DeviceNet, and ControlNet all use CIP at upper layers.
- ControlNet targets deterministic time-critical I/O / peer transport.
- DeviceNet is a CIP network based on CAN technology.

## Pilz

- Function of a safety relay
  https://www.pilz.com/en-INT/support/lexicon/articles/072106
- PNOZ safety relays
  https://www.pilz.com/en-US/products/relay-modules/safety-relays-protection-relays

Key check:
- Safety relays are used for functions such as E-stop, safety gates, light curtains, pressure-sensitive devices, and two-hand control; they use redundancy/self-monitoring concepts unavailable in a normal control relay.

## OSHA

- 29 CFR 1910.147 — control of hazardous energy (lockout/tagout)
  https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.147
- OSHA LOTO tutorial
  https://www.osha.gov/etools/lockout-tagout/tutorial

Key check:
- Lockout/tagout is an energy-control program/procedure for servicing/maintenance hazards and is distinct from ordinary stop controls or a drive safety function such as STO.

## Safety boundary

This project is educational. It does not provide equipment-specific wiring instructions, live-work instructions, energy-isolation procedures, machine-safety calculations, SIL/PL design, arc-flash calculations, commissioning procedures, or authority to bypass safety systems.

For real work: use the current drawings, machine risk assessment, manufacturer manual, site electrical/safety standards, applicable OSHA/NFPA/IEC requirements, and qualified personnel.
