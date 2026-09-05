# Safi Solutions studio update — September 2026

SafiSolutions now presents the work through a compact studio workspace. Persistent navigation connects the studio, nine original projects, client website links, The Trading Desk, the founder profile, and the existing inquiry form. The original navy/blue identity, project logos, portrait, links, and form destination are retained.

The homepage replaces the rotating headline, large animated intro, repeated marketing sections, and counters with a readable introduction and a selectable project showcase. Sections have direct links and browser-history support. Mobile navigation, keyboard focus, reduced-motion preferences, and a motion pause control are included. The original projects keep their own visual identities.

## Original-project review

| Project | Finding | Applied improvement |
| --- | --- | --- |
| Vellum | The mobile notebook could remain attached to the wrong container after a viewport change. Escape was ignored inside text fields. | Reconcile the notebook container across the mobile breakpoint; preserve focus, keep keyboard navigation inside the open drawer, and allow Escape while editing a note. |
| MotorAtlas | Search selected only the first result with Enter and offered no keyboard route through other results. Menu state could become inaccurate. | Arrow-key search navigation, explicit result focus, one scroll to the selected component, synchronized menu state, and larger reference/search text. |
| The TradeSchool | A search with no matches displayed unrelated default topics. Results were mouse-only divs. | A truthful empty state, button results, keyboard navigation, a visible close control, and modal focus handling. |
| The Bench | The closed mobile curriculum could still receive keyboard focus. Expanding a module replaced the focused button. | Inert closed mobile navigation, restored focus after expansion, announced module state, more legible lesson labels, and a two-row small-screen header. |
| VoltVisual | Closing mobile navigation did not update its accessibility state. | Keep visibility, expanded state, and keyboard access synchronized; add Escape and outside-click dismissal. |
| Overtone | Opening a detail modal did not move focus into it or return focus on close. | Modal focus management, keyboard containment, a dialog name, and synchronized mobile-navigation state. Audio behavior is retained. |
| CarDesk | Responses for a previous vehicle could overwrite the current vehicle's recall/complaint results. The service date used UTC. | Ignore stale vehicle responses, clear old counts during loading, show the correct decoded state, and use the user's local calendar date. |
| MoveDesk | Ambiguous names silently selected the first city. Destination essentials independently resolved the city again. Older climate/essentials responses could overwrite a newer move. | Require a choice for ambiguous locations; keyboard-operable suggestions; persistent form errors; use the selected coordinates for essentials; reject stale responses. |
| The Trading Desk | Quick search only offered the first result from the keyboard; modal focus could escape; malformed stored progress could break opening a tool. | Keyboard-operable search results, restored focus, modal keyboard containment, resilient progress reads, clearer sidebar metadata, and mobile-menu dismissal. Changes live in the separate `hankthuhtank/thetradingdesk` repository. |

## Validation and limits

- Local assets, duplicate IDs, scripts, section links, form labels, and control targets checked across the studio and all nine project entrypoints.
- Changed external scripts and executable inline scripts pass JavaScript syntax checks.
- Eight targeted behavior checks pass for out-of-order VIN, climate, and destination responses; ambiguous and changed location input; and malformed saved progress.
- The existing TradeSchool integrity validator passes for its 428 concepts and referenced assets.
- Contact form destination and fields retained. No inquiry was submitted.
- This is a source and behavior review. No browser screenshot, device rendering, or full live-provider test was performed. Educational content, trading calculations, and every external service response have not been comprehensively re-audited.

The current public portfolio defines this pass's scope: Vellum, The Trading Desk, The TradeSchool, The Bench, VoltVisual, Overtone, MotorAtlas, CarDesk, and MoveDesk. Client repositories and the separate Takeover production application were not edited.

MoveDesk retains the provider's documented city/postal-code and administrative-area search format: [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api).
