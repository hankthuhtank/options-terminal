/* LOGOS · the case, second galley */
window.LOGOS_PROMPTS.push(

/* ───────────────────────── CODE & ENGINEERING ───────────────────────── */
{
  id: 'code-root-cause',
  box: 'code',
  title: 'Debug by root cause, not by symptom',
  blurb: 'Stops the model from patching the first thing it sees.',
  tech: ['Hypothesis ranking', 'Uncertainty license'],
  fit: 'Any frontier coding model. Extended thinking helps.',
  weight: 3,
  vars: ['SYMPTOM', 'EXPECTED', 'CODE', 'ENVIRONMENT', 'ALREADY_TRIED'],
  body: `Bug report.

What happens: [SYMPTOM]
What should happen: [EXPECTED]
Environment: [ENVIRONMENT]
What I already tried and ruled out: [ALREADY_TRIED]

<code>
[CODE]
</code>

Find the root cause. Do not propose a fix until you have one, because a fix applied to a symptom usually moves the bug rather than removing it.

Work like this.

Restate the failure precisely, in terms of what the program is actually doing rather than what it appears to do from the outside. If the symptom description is ambiguous about timing, ordering, or scope, say which reading you are assuming and why.

List every hypothesis that could produce this exact symptom. Aim for at least five, including ones that look unlikely. Include the categories people skip: state left over from a previous run, an assumption that holds in development and not in production, a silently swallowed error, a type coercion, a race, an off-by-one in a boundary condition, a dependency that changed behaviour between versions, and the possibility that the code is correct and the expectation is wrong.

Rank them by probability given the specific evidence I gave you, and say what in my description drives each ranking. If something I said rules a hypothesis out, name it.

For the top three, give me the single cheapest diagnostic that discriminates between them. A print statement in a specific place, a specific value to inspect, a specific input to try. Tell me what result would confirm and what would eliminate.

Only then, propose the fix for the most likely cause. Explain why the bug produces this symptom, so the explanation is falsifiable. Then say what else in the codebase probably has the same bug, since root causes are rarely unique.

Finally: if the evidence is genuinely insufficient to narrow it down, say so and tell me what to collect instead of guessing.`
},
{
  id: 'code-review',
  box: 'code',
  title: 'Code review that ranks by consequence',
  blurb: 'Severity-ordered, with the reasoning attached.',
  tech: ['Severity grading', 'Output shaping'],
  fit: 'Any frontier coding model.',
  weight: 2,
  vars: ['CODE', 'CONTEXT', 'STAKES'],
  body: `<code>
[CODE]
</code>

Context this runs in: [CONTEXT]
What breaks if this is wrong: [STAKES]

Review this. Order everything by consequence, not by line number, because I may only have time for the top three items.

Use these severities and be honest about the boundary between them:

BREAKS. Will fail, corrupt data, or expose something. Certain or near certain.
RISK. Fine today, will break under a condition that will plausibly occur. Name the condition explicitly.
SMELL. Works, but makes the next change harder or the next bug more likely.
TASTE. My preference, not a defect. Keep this section short and clearly labelled, and feel free to say there is nothing here.

For each item: the specific lines, what goes wrong, the concrete circumstance under which it goes wrong, and the fix.

Then answer these separately.

What input did the author not consider? Empty, enormous, malformed, hostile, concurrent, duplicated, out of order.
Where does this trust something it should not? External input, a return value not checked, an assumption about ordering, a value that could be null.
What happens when the thing this depends on is slow, or down, or returns something unexpected?
If this handles anything sensitive: where does it leak? Logs, error messages, timing, cache.

Then, and this matters: tell me what is well done. Specifically and technically. If someone made a good decision here I want to know so I do not undo it later.

Finally, if the overall structure is wrong in a way that individual fixes will not address, say that up front rather than reviewing the details of something that should be rebuilt.`
},
{
  id: 'code-explain-unfamiliar',
  box: 'code',
  title: 'Understand code you did not write',
  blurb: 'Intent and history, not a line-by-line narration.',
  tech: ['Intent reconstruction', 'Progressive depth'],
  fit: 'Any frontier coding model. Large context helps.',
  weight: 2,
  vars: ['CODE', 'WHY_IM_READING'],
  body: `<code>
[CODE]
</code>

Why I am reading this: [WHY_IM_READING]

Explain this the way a senior engineer would explain it to a new team member, which is nothing like a line-by-line narration.

Start with intent. What problem does this solve, and what would break if it were simply deleted?

Then the shape. What are the main pieces, what does each own, and how do they talk to each other? A short description of the flow through the code beats a description of the code.

Then the parts that are not obvious. Every non-trivial codebase has decisions that look strange until you know why. Point at the strange ones and give your best reconstruction of the reason. Where a piece of code looks like it is defending against something, name what.

Then the assumptions it makes about the world. What has to be true elsewhere for this to work? These are the tripwires.

Then, given why I am reading it, tell me exactly which parts I need to understand deeply and which I can treat as a black box for now. This is the most useful thing you can do and most explanations skip it.

Then the modification hazards. If I change this, what is most likely to break somewhere else?

Where you are genuinely guessing at intent rather than reading it off the code, mark it as a guess. A confident wrong explanation of why code exists is worse than an admitted gap.`
},
{
  id: 'code-test-design',
  box: 'code',
  title: 'Test cases from the failure side',
  blurb: 'Design tests around how it breaks, not around what it does.',
  tech: ['Adversarial enumeration', 'Boundary analysis'],
  fit: 'Any frontier coding model.',
  weight: 2,
  vars: ['CODE_OR_SPEC', 'FRAMEWORK', 'CRITICALITY'],
  body: `<subject>
[CODE_OR_SPEC]
</subject>

Test framework: [FRAMEWORK]
How critical is this: [CRITICALITY]

Design the test suite. Start from how this fails, not from what it does, because tests written from the happy path mostly confirm the author's existing assumptions.

Enumerate first, code second.

List the failure modes across these axes, and be specific to this code rather than generic:
Boundaries. Zero, one, exactly at the limit, one over, negative, maximum representable.
Emptiness and absence. Empty collection, empty string, null, undefined, missing field, missing file.
Type and format. Wrong type, right type wrong shape, unicode, whitespace, very long, encoding.
Ordering and timing. Out of order, duplicated, delayed, concurrent, retried, arriving twice.
External failure. Dependency down, slow, returning an error, returning something malformed, returning success with a wrong body.
State. First run, repeat run, run after a failed run, partial state left over.
Adversarial. What would a malicious input look like here?

Then mark which of these actually matter for this code given the criticality I stated. Do not write a hundred tests for a script. Say plainly which ones you are skipping and why.

Then write the tests for the ones that matter, in the framework named. Each test gets a name that states the behaviour being asserted, so a failure message is self-explanatory.

Then tell me which failure modes cannot be reasonably unit tested and would need integration or manual testing.

Then tell me the one test that, if it passes, gives me the most confidence in this code overall.`
},
{
  id: 'code-refactor-plan',
  box: 'code',
  title: 'Plan a refactor before touching anything',
  blurb: 'Sequenced steps, each one shippable and reversible.',
  tech: ['Planning before execution', 'Risk sequencing'],
  fit: 'Any frontier coding model. Use with a plan mode if available.',
  weight: 3,
  vars: ['CURRENT_STATE', 'DESIRED_STATE', 'CONSTRAINTS'],
  body: `Current state:
<current>
[CURRENT_STATE]
</current>

Where I want to get to: [DESIRED_STATE]
Constraints, including what cannot break and what cannot be down: [CONSTRAINTS]

Produce a refactor plan. Do not write the final code yet.

Begin by challenging the premise. Is this refactor worth doing? What specifically gets better, and is that improvement worth the risk of touching working code? If the honest answer is that the current version is ugly but fine, say so. If there is a smaller change that captures most of the benefit, propose it.

Assuming it is worth doing, sequence it. Every step must satisfy three conditions: the system works at the end of the step, the step can be shipped independently, and the step can be reverted without unwinding the ones before it. If a step cannot meet all three, split it further or explain why it genuinely cannot be split.

For each step: what changes, what could break, how I would know it broke, and how I would undo it.

Order the steps so that the riskiest, most information-revealing step comes as early as it safely can. Discovering the plan is wrong on step two is much cheaper than discovering it on step nine.

Identify the point of no return, if there is one. Some refactors have a step after which reverting is impractical. Name it and say what must be verified before crossing it.

Name what you would need to see in the codebase to be more confident in this plan. Do not pretend to certainty about code you have not been shown.

Finally, define done. What observable condition tells me the refactor is complete, as opposed to abandoned partway?`
},
{
  id: 'code-perf',
  box: 'code',
  title: 'Performance work in the right order',
  blurb: 'Measure, then fix the thing that actually dominates.',
  tech: ['Measurement-first', 'Cost modelling'],
  fit: 'Any frontier coding model.',
  weight: 2,
  vars: ['CODE', 'SYMPTOM', 'SCALE', 'TARGET'],
  body: `<code>
[CODE]
</code>

Observed problem: [SYMPTOM]
Scale it runs at: [SCALE]
Target: [TARGET]

Before optimising anything, tell me what to measure and how. Most performance work fails because it optimises something that was never the bottleneck, and the only defence is measurement.

Then, from reading the code, give me your ranked theory of where the time or memory actually goes at the stated scale. Reason about it in terms of complexity and constant factors, and be explicit about which matters at this scale. An O(n squared) loop over twelve items is not the problem. An O(n) loop that makes a network call each iteration usually is.

Look specifically for these, since they dominate real systems far more often than algorithmic elegance:
Work repeated inside a loop that could be done once outside it.
A call across a boundary (network, disk, process, database) inside a loop.
Data loaded, converted, or copied more times than necessary.
Something recomputed that could be cached, and separately, something cached that should not be.
Serial work that has no dependency between iterations.
An index or lookup structure that is missing.

For each candidate: expected size of the win, effort to implement, and what it costs in readability or correctness risk. Some optimisations are not worth the complexity they add and I want that stated.

Then tell me which single change to make first, and what to measure afterward to confirm it worked. If your theory is that the bottleneck is not in this code at all, say so, and say where you think it is.`
},
{
  id: 'code-migration',
  box: 'code',
  title: 'Translate code across languages or frameworks',
  blurb: 'Ports the intent, flags what does not have an equivalent.',
  tech: ['Idiom mapping', 'Gap flagging'],
  fit: 'Any frontier coding model.',
  weight: 2,
  vars: ['CODE', 'FROM', 'TO', 'PRIORITY'],
  body: `<code>
[CODE]
</code>

From: [FROM]
To: [TO]
What matters most in the target: [PRIORITY]

Port this. Write idiomatic target code, not transliterated source code, because a mechanical translation carries over patterns that are wrong in the new environment and will confuse whoever maintains it.

Before the code, tell me the three or four places where the source language does something the target does not do the same way. Error handling, concurrency, memory, null semantics, type coercion, iteration, and standard library differences are the usual suspects. Say how you plan to handle each.

Then write the ported code.

Then give me the honest gaps list:
Anything with no clean equivalent, and what you did instead.
Anything where behaviour will subtly differ. Subtle differences are the dangerous ones, so be thorough here even if the difference seems academic.
Anything in the source that was working around a limitation that does not exist in the target, which should therefore be removed rather than ported.
Anything in the source that was relying on undefined or implementation-specific behaviour.

Then tell me what to test first to catch a bad port, and specifically what a bad port of this code would look like when it fails.`
},

/* ───────────────────────── DATA & ANALYSIS ───────────────────────── */
{
  id: 'data-interrogate',
  box: 'data',
  title: 'Interrogate a dataset before trusting it',
  blurb: 'Find out what the data cannot tell you before you ask it questions.',
  tech: ['Limitation-first', 'Provenance'],
  fit: 'Best on models with code execution. Attach the file.',
  weight: 3,
  vars: ['DATA_DESCRIPTION', 'QUESTION', 'HOW_COLLECTED'],
  body: `Dataset: [DATA_DESCRIPTION]
How it was collected, as far as I know: [HOW_COLLECTED]
What I want to learn from it: [QUESTION]

Do not answer my question yet. First tell me whether this data can answer it.

Establish the following.

What each row actually represents. Not the column names, the unit of observation. Ambiguity here invalidates everything downstream.

What is missing, and whether the missingness is random. Data that is missing for a reason is a much bigger problem than data that is missing at random, and the pattern of missingness is often the most informative thing in a dataset.

Who or what is not in here at all. Every dataset is a sample of something, and the selection mechanism determines what conclusions are legitimate. Name the population this actually represents, as opposed to the population I probably think it represents.

Where the definitions are unstable. Did a column mean the same thing across the whole time range? Was there a system change, a policy change, a rename? Sudden level shifts in a series are usually a definition change, not a real event.

What is measured versus what is inferred versus what is imputed. These carry very different amounts of trust.

The obvious quality problems. Duplicates, impossible values, values that are suspiciously round, timestamps in mixed timezones, encoding damage, defaults masquerading as data (zero where null was meant).

Then answer this directly: can this dataset answer my question? Options are yes, yes with a specific caveat, only a weaker version of the question, or no. If it is no, say what data would be needed.

Only after all of that, and only if the answer was yes, proceed to the analysis.`
},
{
  id: 'data-hypothesis',
  box: 'data',
  title: 'Explain a pattern without jumping to a cause',
  blurb: 'Generates rival explanations and tells you how to distinguish them.',
  tech: ['Rival hypothesis generation', 'Confound surfacing'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['OBSERVATION', 'CONTEXT', 'MY_HUNCH'],
  body: `Observation: [OBSERVATION]
Context: [CONTEXT]
What I currently think is causing it: [MY_HUNCH]

Do not confirm my hunch. Generate rival explanations, then tell me how to tell them apart.

Produce at least six candidate explanations, and make sure you cover these categories, since people almost always stop after the first two:

The causal story I proposed.
A different causal story with the same signature.
Reverse causation, where the thing I think is the effect is actually the cause.
A common cause driving both.
A measurement or definitional artifact, meaning nothing changed in the world and something changed in how it was recorded.
A selection or survivorship effect, meaning the pattern is created by who or what is in the data rather than by anything real.
Regression to the mean or ordinary noise, which explains an enormous share of apparent patterns and gets proposed far too rarely.
A composition shift, where each subgroup is stable and the mix changed.

For each: what would have to be true for it to be the explanation, and the single most discriminating check I could run.

Then rank them by plausibility given what I told you, and be explicit about what in my description drives that ranking.

Then tell me the one check that eliminates the most candidates at once.

If my description does not contain enough to rank them, say so and ask for the specific detail you need.`
},
{
  id: 'data-viz-choice',
  box: 'data',
  title: 'Choose the right chart and say why',
  blurb: 'Match the visual encoding to the question, not to habit.',
  tech: ['Encoding rationale', 'Audience modelling'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['DATA_SHAPE', 'QUESTION', 'AUDIENCE', 'MEDIUM'],
  body: `Data shape: [DATA_SHAPE]
The question the chart must answer: [QUESTION]
Audience: [AUDIENCE]
Where it will be seen: [MEDIUM]

Recommend the visualisation, and reason from perception rather than from convention.

Start by classifying the task. Is the reader comparing magnitudes, seeing a trend over time, finding a distribution, spotting a relationship between two variables, seeing part-to-whole, finding an outlier, or locating something in space? The task determines the encoding, and getting this step wrong is why so many charts are technically correct and useless.

Recommend one primary chart. Say what visual channel carries the main comparison (position, length, angle, area, colour, shape) and why that channel suits this task. Position along a common axis is the most accurately read channel and area and colour are among the least, so justify any use of the weaker ones.

Then give me the specifics that make or break it: what goes on each axis, whether the axis starts at zero and why, sort order, how many categories before it becomes unreadable, what to do with the long tail, and what to label directly rather than putting in a legend.

Then name two alternatives and say specifically what each one would show better and what it would hide.

Then tell me what chart people commonly reach for in this situation that would actively mislead here, and why.

Then flag the honesty risks: any choice in this chart that could make the data look like it says something it does not.

Given the medium, note anything that will not survive: small text, fine lines, colour that fails when printed or when seen by someone with colour vision deficiency, detail that vanishes on a phone.`
},
{
  id: 'data-metric-design',
  box: 'data',
  title: 'Design a metric that will not be gamed',
  blurb: 'Every metric becomes a target. Design for that from the start.',
  tech: ['Incentive analysis', 'Adversarial design'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['GOAL', 'WHO_IS_MEASURED', 'CONSEQUENCES'],
  body: `What I actually want to improve: [GOAL]
Who or what will be measured: [WHO_IS_MEASURED]
What follows from the number: [CONSEQUENCES]

Design the metric, and design it assuming it will be gamed, because any metric with consequences attached will be.

First, separate the goal from the measurement. State the thing I actually care about in plain language, then acknowledge that any metric is a proxy for it. The gap between the goal and the proxy is where all the trouble lives, so name that gap explicitly.

Propose two or three candidate metrics. For each, work through the following.

How would someone improve this number without improving the underlying thing? Be specific and creative. Assume the person is smart, under pressure, and not malicious, since that describes most gaming.

What behaviour does this metric discourage that I actually want? Metrics do not just reward, they suppress.

What does it fail to see? Who or what falls outside it.

How stable is it? Can it swing on something unrelated, like a seasonal effect, a single large account, or a change upstream?

Then recommend a set rather than a single number, because single metrics are almost always gameable and a well-chosen pair is much harder to distort. Specifically, pair each primary metric with a guardrail metric that would move in the wrong direction if the primary were being gamed.

Then say what to review qualitatively, since some things should not be turned into a number at all and pretending otherwise causes more damage than not measuring.

Finally, name the review cadence and the condition under which the metric should be retired or replaced.`
},

/* ───────────────────────── BUSINESS & STRATEGY ───────────────────────── */
{
  id: 'biz-kill-the-idea',
  box: 'business',
  title: 'Try to kill the idea',
  blurb: 'Adversarial diligence from someone with no stake in your feelings.',
  tech: ['Adversarial framing', 'Evidence demands'],
  fit: 'Any frontier model.',
  weight: 3,
  vars: ['IDEA', 'CUSTOMER', 'HOW_IT_MAKES_MONEY', 'WHAT_EXISTS_NOW'],
  body: `Idea: [IDEA]
Who it is for: [CUSTOMER]
How it makes money: [HOW_IT_MAKES_MONEY]
What those people do today instead: [WHAT_EXISTS_NOW]

Your job is to kill this. Not to balance it, not to end on an encouraging note. If it survives a serious attempt to kill it, that tells me something. If it dies easily, I would rather find out now.

Attack in this order.

The problem. Is this a real problem or an observed inconvenience? Real problems have evidence: people already spend money, time, or effort working around them. What is the workaround today, and does its existence prove the problem or prove that the problem is tolerable? A tolerable problem is the most common reason products fail.

The customer. Can you actually name a specific person or role who has this problem, has budget, and has the authority to buy? Vague markets are a warning sign. If the answer to "who exactly" is a demographic rather than a job or a situation, say so.

Why now. What changed that makes this possible or necessary now? If nothing changed, then either someone already tried this and it failed, or the market does not want it. Which is it?

The competition, honestly. Include the ones people forget: doing nothing, a spreadsheet, an intern, an existing tool used sideways. Most ideas lose to a spreadsheet, not to a funded competitor.

The economics. What does it cost to acquire one customer and what do they pay over their lifetime? At what scale does this work, and is that scale realistic in this market? Where does the money actually leak?

The moat, or the absence of one. If this works, what stops the obvious incumbent from doing it next quarter? "Execution" is not a moat.

The founder-shaped hole. What does the person building this need to be good at, and what happens if they are not?

Then name the single assumption on which everything rests, and the cheapest experiment that tests it in under two weeks.

Then, only at the very end, and only if it is true, say what is genuinely strong here.`
},
{
  id: 'biz-positioning',
  box: 'business',
  title: 'Positioning that says no to someone',
  blurb: 'If your positioning does not exclude anyone it is not positioning.',
  tech: ['Constraint forcing', 'Competitive framing'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['PRODUCT', 'BEST_CUSTOMERS', 'ALTERNATIVES', 'WHAT_WE_DO_DIFFERENTLY'],
  body: `Product: [PRODUCT]
The customers we serve best, and why they are the best: [BEST_CUSTOMERS]
What they would use otherwise: [ALTERNATIVES]
What we do differently: [WHAT_WE_DO_DIFFERENTLY]

Build the positioning. The test of positioning is whether it makes someone say "that is not for me". If it does not exclude anyone it is not positioning, it is a description.

Work through this.

Name the specific alternative we are competing against, singular. Not a category. The actual thing a buyer would do instead. Positioning is always relative to a specific alternative and being vague here is why most positioning statements are interchangeable.

Identify the attribute where we win against that alternative. Then say what we give up in exchange. There must be a tradeoff. If we claim to be better on every dimension the claim is not credible and buyers know it.

Name who should not buy this, specifically. Write it as though it will appear on the website, because it should. This is the highest-signal thing a company can publish.

State the value the winning attribute delivers, in the buyer's terms, not ours. What can they now do, avoid, or stop worrying about?

Identify the buyer who cares most about that value, and what makes them different from buyers who do not. Usually it is a situation rather than a demographic.

Then draft the positioning statement in plain language. No adjective stacks. It should be a sentence a salesperson could say out loud without wincing.

Then pressure test it: could our closest competitor say the exact same sentence? If yes, it is not positioning yet, so revise until they cannot.`
},
{
  id: 'biz-pricing',
  box: 'business',
  title: 'Price from value, not from cost',
  blurb: 'Works out what the thing is worth before working out what to charge.',
  tech: ['Value modelling', 'Structured options'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['PRODUCT', 'CUSTOMER', 'VALUE_DELIVERED', 'ALTERNATIVES_AND_PRICES', 'MY_COSTS'],
  body: `Product: [PRODUCT]
Customer: [CUSTOMER]
What it is worth to them, as best I can tell: [VALUE_DELIVERED]
What alternatives cost: [ALTERNATIVES_AND_PRICES]
My costs: [MY_COSTS]

Help me price this properly. Cost-plus pricing is the default and it is almost always wrong, because it prices my effort rather than their outcome.

Start with the value model. In the customer's own numbers, what is this worth per month or per use? Money saved, time saved converted at a defensible rate, revenue enabled, risk avoided. If I cannot quantify it, say so, and say what I would need to ask a customer to find out.

Then establish the reference price. What number is already in the buyer's head when they hear my price? That reference is usually the alternative they currently use, and it anchors everything.

Then propose the pricing metric, which matters more than the number. What am I charging per? Seat, usage, outcome, tier, flat. The right metric scales with the value the customer receives and is something they can predict. Say what each candidate metric rewards and what it punishes, including what it does to my own incentives.

Then give me three structures rather than one price:
An entry point that removes the reason to say no.
A main tier where most customers should land, priced against the value model.
A high tier that exists partly to make the main tier look reasonable and partly to capture the customers for whom this is worth far more.

For each, say who it is for and what makes someone move up.

Then tell me the three most likely objections to the price and the honest answer to each. Not a rebuttal script, the actual answer.

Then tell me what I would need to change about the product for the price to be obviously fair rather than arguable.`
},
{
  id: 'biz-meeting-to-decision',
  box: 'business',
  title: 'Turn a meeting into decisions and owners',
  blurb: 'Separates what was decided from what was merely discussed.',
  tech: ['Extraction', 'Ambiguity flagging'],
  fit: 'Any frontier model. Paste the transcript or notes.',
  weight: 2,
  vars: ['TRANSCRIPT', 'MY_ROLE'],
  body: `<transcript>
[TRANSCRIPT]
</transcript>

My role in this: [MY_ROLE]

Turn this into something actionable. The most common failure of meeting notes is treating discussion as decision, so separate those carefully.

Give me:

DECIDED. Things that were actually settled. For each: what was decided, who decided it, and whether anyone in the room dissented or stayed quiet in a way that suggests they are not on board.

DISCUSSED, NOT DECIDED. Topics raised that reached no conclusion. For each, say what would be needed to close it and who should close it. This section is usually longer than people expect and pretending otherwise is how things fall through.

ACTIONS. Each with an owner, the specific next step, and a date. If the transcript does not name an owner or a date, write UNASSIGNED or NO DATE rather than inventing one. Do not soften this. An action without an owner is not an action.

DISAGREEMENTS. Where people wanted different things. Say whether it was resolved, deferred, or papered over. Papered over is worth flagging, since it will come back.

ASSUMPTIONS. Things stated as fact that nobody verified in the room.

RISKS RAISED. Including any that got raised and then dropped without a response.

FOR ME. Given my role, the three things I specifically need to do or watch.

Then: the one question that should have been asked in this meeting and was not.

Quote directly where the exact wording matters, especially for commitments.`
},
{
  id: 'biz-process-audit',
  box: 'business',
  title: 'Find the automatable part of a process',
  blurb: 'Separates judgement from mechanics, then targets the mechanics.',
  tech: ['Decomposition', 'Automation triage'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['PROCESS', 'FREQUENCY', 'WHO_DOES_IT', 'TOOLS_AVAILABLE'],
  body: `Process: [PROCESS]
How often it runs: [FREQUENCY]
Who does it now: [WHO_DOES_IT]
Tools I have access to: [TOOLS_AVAILABLE]

Work out what should be automated here, what should be assisted, and what should stay human.

First, break the process into discrete steps. For each step, classify the work:
MECHANICAL. Same input produces same output. No judgement.
PATTERN. Judgement, but of a kind that is consistent and could be described in rules or learned from examples.
JUDGEMENT. Requires context, taste, relationship knowledge, or accountability.
And separately mark any step where being wrong is expensive, since that changes the answer regardless of category.

Then, for each step, give the honest recommendation:
Automate fully. Mechanical, low stakes, high frequency.
AI-assisted with human approval. Pattern work, or mechanical work where an error is costly.
Leave human. Judgement, relationship, accountability, or anything where the person doing it is also the person who would be blamed.
Delete. Some steps exist because of history and produce nothing. Look for these specifically, because removing a step beats automating it every time.

Then estimate the payoff. Time per run multiplied by frequency, against the effort to build and maintain the automation. Be honest about maintenance, since automation that breaks silently is worse than no automation.

Then tell me where to start. One step, chosen for the ratio of value to difficulty, ideally one that is easy to verify so I find out fast if it is wrong.

Then name the failure mode of automating this process, and what monitoring would catch it.`
},

/* ───────────────────────── MARKETING & SALES ───────────────────────── */
{
  id: 'market-message-test',
  box: 'market',
  title: 'Generate and stress-test messaging',
  blurb: 'Several angles, each with the assumption it rests on made explicit.',
  tech: ['Divergent generation', 'Assumption surfacing'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['PRODUCT', 'AUDIENCE', 'CURRENT_MESSAGE', 'WHAT_THEY_BELIEVE_NOW'],
  body: `Product: [PRODUCT]
Audience: [AUDIENCE]
What we say now: [CURRENT_MESSAGE]
What this audience currently believes about this problem: [WHAT_THEY_BELIEVE_NOW]

Generate six distinct messaging angles. Distinct means they rest on different beliefs about why the customer buys, not six rewrites of one idea.

Cover at least these mechanisms and label which is which: relief from a specific pain, a gain they can picture, a fear of the status quo continuing, identity ("people like me use this"), a contrast against a named alternative, and a reframe that changes how they see the problem itself.

For each angle, give me:
The core line, in the customer's language, under fifteen words.
Two or three supporting points.
The assumption it depends on. Every message assumes something about what the customer already believes or wants, and naming that assumption is how you find out which message to test first.
Who it will not work on, and why.

Then rank them by how testable they are, cheapest first, since the right move is usually to test rather than to argue.

Then tell me which single line I could put in front of twenty real customers this week to find out whether the underlying assumption holds.

Avoid: superlatives, "revolutionary", "game-changing", "seamless", "empower", and any sentence that would work equally well for a completely different product. If a line passes that last test only weakly, flag it.`
},
{
  id: 'market-objections',
  box: 'market',
  title: 'Handle objections without being slippery',
  blurb: 'Real answers, including when the objection is correct.',
  tech: ['Adversarial simulation', 'Honesty constraint'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['PRODUCT', 'BUYER', 'OBJECTIONS', 'TRUE_WEAKNESSES'],
  body: `Product: [PRODUCT]
Buyer: [BUYER]
Objections I keep hearing: [OBJECTIONS]
Things about my product that are genuinely weak: [TRUE_WEAKNESSES]

Help me answer these honestly. I am not looking for deflection scripts, because buyers can hear those and it costs more trust than the objection cost.

For each objection, do the following.

Diagnose it first. What is the objection actually about? Price objections are usually value objections, timing objections are usually priority objections, and "send me some information" usually means no. Say what you think is underneath.

Say whether the objection is correct. Sometimes it is, and pretending otherwise is how deals die later and loudly. If it is correct, the answer is to acknowledge it and reframe around who this is right for, not to argue.

Give the honest response. Short, specific, no hedging.

Give the question I should ask back, because the fastest way through an objection is usually understanding it better rather than answering it faster.

Say when to walk away. Some objections mean this buyer is a bad fit, and continuing wastes both our time.

Then separately: for each of the genuine weaknesses I listed, write how I would raise it myself before they find it. Naming your own weakness early costs less than having it discovered late, and it buys credibility for everything else you say.

Nothing here should sound like a script. If a response would feel rehearsed when said out loud, rewrite it.`
},
{
  id: 'market-cold-outreach',
  box: 'market',
  title: 'Cold outreach that earns the reply',
  blurb: 'Specific, short, and about them.',
  tech: ['Constraint forcing', 'Specificity requirement'],
  fit: 'Any frontier model. Give it real research on the recipient.',
  weight: 2,
  vars: ['RECIPIENT', 'WHAT_I_KNOW_ABOUT_THEM', 'WHAT_I_WANT', 'WHY_ME'],
  body: `Recipient: [RECIPIENT]
What I actually know about them and their situation: [WHAT_I_KNOW_ABOUT_THEM]
What I want from them: [WHAT_I_WANT]
Why I am credible here: [WHY_ME]

Write the outreach. Under 120 words. The bar is simple: would a busy person who does not know me reply to this?

Requirements.

Open with something that proves I looked. Not flattery, not "I loved your recent post". Something specific enough that it could not be sent to anyone else. If what I gave you above is too thin to do this, tell me what to go find out rather than writing a generic opener.

State what I want in one clear sentence. Do not bury it, do not ask for "a quick chat" without saying about what. Vagueness reads as a waste of their time because usually it is.

Make the ask small and specific. A yes or no question is easier to answer than an open one. A fifteen minute call is easier than a meeting.

Give them a genuine reason to care, framed around their situation rather than my product.

Make it easy to say no. Counterintuitively this increases replies, because it lowers the cost of engaging.

Do not: open with my own name and company, use the word "just", apologise for reaching out, include more than one link, use a subject line that could be spam, or write anything that sounds like it came from a sequence.

Give me two versions with genuinely different angles, and tell me which you would send and why.

Then write the one-line follow-up for seven days later, which should add something new rather than saying "bumping this".`
},
{
  id: 'market-landing',
  box: 'market',
  title: 'Landing page copy from the visitor inward',
  blurb: 'Structured around what a stranger needs to decide, in order.',
  tech: ['Audience modelling', 'Sequenced structure'],
  fit: 'Any frontier model.',
  weight: 3,
  vars: ['PRODUCT', 'VISITOR', 'WHERE_THEY_CAME_FROM', 'THE_ACTION', 'PROOF'],
  body: `Product: [PRODUCT]
Visitor: [VISITOR]
Where they just came from: [WHERE_THEY_CAME_FROM]
What I want them to do: [THE_ACTION]
Proof I actually have: [PROOF]

Write the page. Structure it around the sequence of questions a stranger asks, in the order they ask them, because a page that answers them out of order loses people at the point of confusion.

The sequence:
What is this? Answer in the first five seconds of reading, in plain words. Not a tagline. If a visitor cannot say what it is after the headline and subhead, nothing else matters.
Is it for me? The visitor needs to recognise themselves. Be specific enough to exclude people.
What does it actually do? Concrete, not abstract capability language.
Why should I believe you? This is where the proof goes, and only real proof. If I gave you thin proof above, say so rather than writing placeholder social proof.
What does it cost me? Money, time, effort, risk, and what happens if it does not work out.
What do I do now? One action, unambiguous.

Write each section. Keep the whole thing shorter than feels comfortable.

Rules. The headline states what the product does or what changes for the visitor, not a mood. No "unlock", "supercharge", "transform", "effortless", "revolutionise". Every claim either has evidence behind it or gets softened to something honest. Buttons say what happens when clicked.

Then flag: any place I will need an asset I do not have, and any claim I would need to verify before publishing.

Then give me the one thing on this page that most needs A/B testing and why.`
}

);
