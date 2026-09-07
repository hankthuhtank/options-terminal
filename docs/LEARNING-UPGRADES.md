# Learning and decision upgrades — September 7, 2026

This pass upgrades all nine original projects. Client websites and Takeover are outside this change.

| Project | What changed |
| --- | --- |
| Vellum | Guided observation → interpretation → revisit notebook beside the text, local drafts and text export; Luke 10 worked example; corrected or qualified misleading Chronicle hooks. |
| MotorAtlas | Interactive gearbox speed, torque, efficiency and power lesson with prediction feedback; more accurate actuator wording; empty diagnostic searches no longer show an unrelated guide. |
| TheTradeSchool | Six trade-specific evidence scenarios, explanation for every answer, source links and related labs; reviewed progress saved locally; resilient existing progress loading. |
| TheBench | Output prediction and comparison against the current program in executable lessons, saved predictions, clearer runtime limitations, C++ bounds-check distinction. |
| VoltVisual | Interactive 4–20 mA level model, open-wire and scaling faults, explanation separating process state from the received signal. |
| Overtone | Playable major/minor comparison that moves only the third, note positions and semitone explanation. Uses the existing audio engine and mute control. |
| CarDesk | Explicit VIN-specific recall action; separate fuel/electric cash-budget models; visible exclusions, cost composition, invalid-input handling and no false zero per-mile result. |
| MoveDesk | Next unfinished action and real checklist progress; road-distance/manual-distance fuel calculation; missing fuel excluded explicitly; complete archive checks; missing forecast values remain unknown; local-calendar countdown; more accurate OSM labels; legacy checklist migration. |
| TheTradingDesk | Stop/fill risk experiment; delta-aware hedge exposure model with zero and rounding handling; shared progress state migrating both old trackers; qualified financial claims and direct primary-source links. |

## Sources checked

Sources are also linked beside the relevant new learning content.

- [NHTSA recall lookup](https://www.nhtsa.gov/recalls): distinguish model searches from vehicle-specific open recall status.
- [EPA electric vehicle efficiency](https://www.epa.gov/greenvehicles/fuel-economy-and-ev-range-testing): use energy consumption for electric cost arithmetic, not MPG.
- [NOAA climate normals](https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals): distinguish a short recent-weather archive from 30-year normals.
- [Oriental Motor gearhead selection](https://blog.orientalmotor.com/gearhead-selection-for-stepper-motors): speed, torque, reduction and efficiency relationships.
- [Fluke current loops](https://www.fluke.com/en-us/learn/blog/calibration/what-is-a-4-20-ma-current-loop): live zero and transmitter/receiver fundamentals.
- [Yamaha chord structure](https://hub.yamaha.com/proaudio/recording/music-theory-for-producers-part-2/): major and minor triads.
- [OSHA control circuitry](https://www.osha.gov/etools/lockout-tagout/hot-topics/energy-control-program/energy-control-circuitry-prohibition) and [hazardous energy](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.147): stop commands, isolation and stored energy are distinct.
- [DOE cooling guide](https://www.energy.gov/sites/prod/files/2016/11/f34/Energy%20Saver%20101%20Infographic%20Home%20Cooling_0.pdf), [EPA cross-connections](https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=2000ZZB8.TXT), [OSHA welding ventilation](https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.353), [NASA drawing practices](https://ntrs.nasa.gov/citations/20205010487): trade scenario foundations.
- [Luke 10:25–37](https://www.biblegateway.com/passage/?search=Luke+10%3A25-37&version=WEB), Genesis 4 and 23, Exodus 24 and Luke 15: source-text checks for the guided example and revised editorial descriptions.
- [SEC stop-order bulletin](https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-15), [OIC option pricing](https://www.optionseducation.org/optionsoverview/options-pricing), [OIC Greeks](https://www.optionseducation.org/advancedconcepts/volatility-the-greeks), [S&P SPIVA](https://www.spglobal.com/spdji/en/spiva/article/spiva-us/): execution limitations, option sensitivities and performance attribution.

## Validation and limits

- Nine entry points checked for duplicate static IDs, local asset references and JavaScript syntax; 26 changed/inline scripts passed at this check.
- 23 numerical, failure-state and persistence checks passed: fuel/electric cash math, missing-road handling, incomplete archive rejection, gear power, current-loop faults, fill risk, delta exposure and progress migration/reset.
- All 41 C++/Java/JavaScript curriculum examples executed in TheBench teaching runtime: 39 completed; two examples intentionally produced the errors their lessons teach.
- Existing TradeSchool validator passed for all 428 concepts.
- Source and simulation checks do not establish a complete browser/device accessibility or visual review. No browser visual testing was performed in this pass.
- This is a targeted factual review of the changed material and important calculation paths, not a claim that every legacy statement, external image, API response or lesson has been independently verified. Service procedures, regulations, financial examples and third-party data retain their stated scope.
- Weekly monitoring is not active, per the latest request.
