/* LOGOS · the case
 * Each prompt is a "sort": a single piece of type that sits in a compartment.
 * Schema:
 *   id      unique slug
 *   box     compartment id (see LOGOS_BOXES)
 *   title   what it does, in the user's words
 *   blurb   one line, plain
 *   tech    techniques it leans on (see codex)
 *   fit     model guidance
 *   weight  1 short  2 medium  3 long   (drives the visual em-quad meter)
 *   vars    fill-in placeholders present in body as [NAME]
 *   body    the prompt itself
 */

window.LOGOS_BOXES = [
  { id: 'thinking',  name: 'Thinking & Decisions', glyph: '?',  note: 'Pressure-test a call before you make it.' },
  { id: 'writing',   name: 'Writing & Editing',    glyph: 'W',  note: 'Drafting, cutting, and voice.' },
  { id: 'research',  name: 'Research & Synthesis', glyph: 'R',  note: 'Gather, verify, reconcile.' },
  { id: 'code',      name: 'Code & Engineering',   glyph: '{}', note: 'Build, debug, review, migrate.' },
  { id: 'data',      name: 'Data & Analysis',      glyph: '%',  note: 'Interrogate a dataset honestly.' },
  { id: 'business',  name: 'Business & Strategy',  glyph: '$',  note: 'Positioning, pricing, planning.' },
  { id: 'market',    name: 'Marketing & Sales',    glyph: '!',  note: 'Copy, campaigns, objections.' },
  { id: 'learning',  name: 'Learning & Teaching',  glyph: 'L',  note: 'Get a concept into your head and keep it.' },
  { id: 'career',    name: 'Career & Comms',       glyph: '@',  note: 'Hard conversations and self-advocacy.' },
  { id: 'creative',  name: 'Creative & Narrative', glyph: '&',  note: 'Fiction, worldbuilding, voice.' },
  { id: 'agents',    name: 'Agents & Systems',     glyph: '>',  note: 'System prompts, skills, harnesses.' },
  { id: 'meta',      name: 'Meta & Prompt Repair', glyph: '#',  note: 'Prompts that build and fix prompts.' },
  { id: 'visual',    name: 'Image & Multimodal',   glyph: '*',  note: 'Generation, reading, diagramming.' },
  { id: 'life',      name: 'Personal & Admin',     glyph: '~',  note: 'The unglamorous stuff, done faster.' }
];

window.LOGOS_PROMPTS = [

/* ───────────────────────── THINKING & DECISIONS ───────────────────────── */
{
  id: 'think-premortem',
  box: 'thinking',
  title: 'Pre-mortem a decision before you commit',
  blurb: 'Assume the decision already failed, then work backwards to the cause.',
  tech: ['Structured reasoning', 'Uncertainty license', 'Role framing (light)'],
  fit: 'Any frontier model. Turn on extended thinking if available.',
  weight: 3,
  vars: ['DECISION', 'HORIZON', 'CONTEXT', 'CONSTRAINTS'],
  body: `I am about to commit to a decision and I want it stress-tested before I do, not validated.

The decision: [DECISION]
Time horizon I care about: [HORIZON]
Relevant context: [CONTEXT]
Hard constraints I cannot change: [CONSTRAINTS]

Run a pre-mortem. Work in this order and show each stage.

1. Restate the decision in one sentence, and separately state the actual underlying goal it serves. If those two things have drifted apart, say so now, because that is often the whole problem.

2. Imagine it is the end of the horizon above and this decision has clearly failed. Do not hedge. Write four short failure narratives, each with a different root cause:
   a. a failure caused by something I could have known but did not check
   b. a failure caused by something nobody could have known
   c. a failure caused by my own predictable behaviour, not by the world
   d. a failure where the decision worked exactly as designed and the outcome was still bad

3. For each narrative, name the single earliest observable signal that it was happening. The signal must be something I could actually notice in ordinary life, not an abstraction. "Revenue declines" is not a signal. "Two consecutive weeks where nobody replies to a follow-up" is a signal.

4. Rank the four by a rough probability and say what drives your ranking.

5. Tell me the cheapest test I could run in the next seven days that would meaningfully move that ranking. Cheap means low money, low time, low reputational cost.

6. Finally, state the strongest honest case for making this decision anyway. Not a consolation paragraph. If after all of the above the decision still looks right, say that plainly.

Where you are reasoning from general patterns rather than from the specifics I gave you, mark that inline with (general pattern). If a section of my context is too thin to reason about, say which detail you need instead of filling the gap with a plausible guess.`
},
{
  id: 'think-steelman',
  box: 'thinking',
  title: 'Steelman the position you disagree with',
  blurb: 'Build the strongest version of the other side, then find where it actually breaks.',
  tech: ['Adversarial framing', 'Structured reasoning'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['MY_POSITION', 'OPPOSING_POSITION', 'DOMAIN'],
  body: `I hold this position: [MY_POSITION]
The position I disagree with: [OPPOSING_POSITION]
Domain: [DOMAIN]

Do not tell me I am balanced or that both sides have merit. Do this instead.

First, build the strongest possible version of the opposing position. Steelman means: state it the way its most rigorous and honest advocate would, using their best evidence and their real reasoning, with none of the weak arguments that make it easy to dismiss. If their best argument depends on a value judgement rather than a fact, name the value explicitly.

Second, identify what would have to be true about the world for that steelmanned version to be correct. List those load-bearing conditions plainly.

Third, assess each condition against what is actually known. Mark each one: well supported, contested, or unknown. Be specific about why.

Fourth, tell me which of my own beliefs would have to change if the steelman turned out to be right, and how much of my position survives.

Fifth, name the single strongest point the opposition makes that I have no good answer to. If there genuinely is not one, say so, but only after you have looked hard.

Where you are uncertain about the state of evidence, say so rather than asserting. I would rather have an honest gap than a confident sentence I have to go verify.`
},
{
  id: 'think-tradeoff',
  box: 'thinking',
  title: 'Force a real tradeoff table',
  blurb: 'Stops the model from listing pros and cons that never touch each other.',
  tech: ['Output shaping', 'Explicit constraints'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['OPTIONS', 'DECISION_CONTEXT', 'WHAT_I_OPTIMISE_FOR'],
  body: `Options on the table: [OPTIONS]
Context: [DECISION_CONTEXT]
What I am actually optimising for, in priority order: [WHAT_I_OPTIMISE_FOR]

Produce a genuine tradeoff analysis, not a pros and cons list. The difference matters: a pros and cons list lets every option look fine, a tradeoff analysis forces every gain to be paid for.

Give me a table where every row is a dimension that actually differs between the options. Skip any dimension where they are effectively the same, since that row carries no information. For each cell, give a concrete value or a short concrete phrase, never a vague rating like "good" or "high".

Below the table, do four things.

State what each option costs you that the others do not. Every option must have a real cost named. If you cannot find one, you have not looked hard enough at that option.

Name the dimension that should dominate given my stated priorities, and say whether my stated priorities look internally consistent. If I have asked for two things that pull against each other, tell me directly.

Identify the one piece of information I do not currently have that would most change the ranking, and how I could get it.

Give a recommendation with a confidence level and the specific condition under which you would change it.

If any option is dominated, meaning another option beats it on every dimension I care about, say so and remove it early rather than politely carrying it through the whole analysis.`
},
{
  id: 'think-first-principles',
  box: 'thinking',
  title: 'Strip a problem to first principles',
  blurb: 'Separate what is physically or economically necessary from what is just convention.',
  tech: ['Decomposition', 'Assumption surfacing'],
  fit: 'Any frontier model. Extended thinking helps.',
  weight: 2,
  vars: ['PROBLEM', 'HOW_IT_IS_USUALLY_DONE'],
  body: `Problem: [PROBLEM]
How it is currently or usually done: [HOW_IT_IS_USUALLY_DONE]

Take this apart to first principles.

Separate the current approach into three buckets and be strict about the boundaries.

Bucket one: constraints imposed by physics, mathematics, law, or hard economics. These cannot be negotiated away by being clever.

Bucket two: constraints imposed by the current technology, tooling, or supply chain. These are real today but they have expiry dates. For each, say roughly what would have to change to dissolve it.

Bucket three: constraints that are pure convention, habit, or path dependence. Nobody chose these on purpose. They are there because of how things happened to develop.

Now rebuild. Starting only from bucket one, describe what an approach designed from scratch today would look like. Ignore how it is currently done entirely.

Compare that rebuilt version to the status quo. Where they differ, say whether the difference is an improvement or whether the convention was quietly protecting against something the rebuild misses. Conventions are often load-bearing in ways that are not obvious, so look for that before declaring anything obsolete.

End with the smallest change to the current approach that captures the largest share of the rebuild's advantage.`
},
{
  id: 'think-second-order',
  box: 'thinking',
  title: 'Trace second and third order effects',
  blurb: 'What happens after the thing you expect to happen happens.',
  tech: ['Causal chaining', 'Structured reasoning'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['ACTION', 'SYSTEM', 'TIMEFRAME'],
  body: `Action being considered: [ACTION]
System or environment it lands in: [SYSTEM]
Timeframe: [TIMEFRAME]

Map the consequences in layers. Most analysis stops at the first layer, which is exactly where the interesting failures start.

First order: the direct, intended effect. State it in one sentence and note how confident you are that it will actually happen.

Second order: what the affected parties do in response to the first order effect. This is where incentives matter. For each affected party, name who they are, what they now want, and what they will plausibly do about it. Include parties who are not in the room and did not consent to the change.

Third order: what happens once those responses interact with each other. Look specifically for effects that cancel the original intent, for costs that get pushed onto whoever has the least power to refuse them, and for new equilibria that are hard to reverse.

Then flag anything that is a ratchet, meaning easy to do and very hard to undo. Ratchets deserve more caution than their first order impact suggests.

Finally, name the one second or third order effect that would most change whether this action is a good idea, and how early it would become visible.

Be concrete about mechanisms. "It could have unintended consequences" is not analysis. Name the party, the incentive, and the move.`
},
{
  id: 'think-honest-partner',
  box: 'thinking',
  title: 'A thought partner that will actually disagree',
  blurb: 'Reusable framing that stops the model from being agreeable.',
  tech: ['Behavioural framing', 'Context and motivation'],
  fit: 'Any frontier model. Works well as a Project instruction or custom instruction.',
  weight: 2,
  vars: ['TOPIC'],
  body: `I want you as a thought partner on [TOPIC], and I need to explain what I actually mean by that, because the default helpful mode is not it.

What I do not want: agreement by default, praise for the idea before it has been examined, a summary of what I just said handed back to me with more adjectives, or a list of considerations that never resolves into a view.

What I do want: you to have an actual opinion and defend it. If you think I am wrong, lead with that rather than burying it in the fourth paragraph. If I say something that does not follow from what I said before, stop me there rather than continuing politely. If I am solving the wrong problem, that is more useful to hear than help with the wrong problem.

The reason this matters: I am going to act on this. Flattery costs me real money and time. Being told my reasoning has a hole in it is the single most valuable thing you can give me, so treat it as the goal rather than as a risk to manage.

Three working rules. Say "I don't know" when you don't, instead of producing a confident-sounding paragraph. When you are pattern matching from general knowledge rather than reasoning about my specifics, mark it. When you change your mind mid-response because you thought of something better, say so out loud rather than quietly rewriting.

You can still be warm about it. Direct and unkind are different things. Start by asking me the one question whose answer would most change your view, then we will go from there.`
},
{
  id: 'think-regret',
  box: 'thinking',
  title: 'Regret-minimisation on a life-sized choice',
  blurb: 'For decisions where the spreadsheet does not settle it.',
  tech: ['Perspective shift', 'Value surfacing'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['CHOICE', 'WHAT_I_WOULD_GIVE_UP', 'WHAT_SCARES_ME'],
  body: `Choice in front of me: [CHOICE]
What I would be giving up: [WHAT_I_WOULD_GIVE_UP]
What I am afraid of: [WHAT_SCARES_ME]

This is a decision the numbers do not settle, so do not pretend they do. Help me think about it honestly.

Start by separating two different things that often get tangled: the risk of the outcome being bad, and the risk of me not being able to live with having chosen it. These are not the same and people routinely optimise for the wrong one.

Then work through it this way.

Describe the version of me at the far end of the horizon who took the leap and it did not work. What is that person's actual life like? Be specific and unsentimental. Most people catastrophise this and the real answer is usually more recoverable than the fear suggests, but sometimes it genuinely is not, so tell me which this is.

Describe the version who did not take it, and the thing worked out fine, and they are still fine. Is there a quiet cost there? Name it if so, and do not manufacture one if there isn't.

Ask me the two or three questions whose answers you would most need to say anything useful. Ask them plainly and wait. Do not answer them for me.

Throughout: do not tell me to follow my heart, do not tell me there is no wrong answer, and do not resolve the tension artificially. Some decisions are genuinely hard and the useful thing is a clearer view of the tradeoff, not a fake resolution of it.`
},

/* ───────────────────────── WRITING & EDITING ───────────────────────── */
{
  id: 'write-voice-match',
  box: 'writing',
  title: 'Extract and reuse your own voice',
  blurb: 'Two-stage: build a voice profile from your writing, then write with it.',
  tech: ['Prompt chaining', 'Few-shot from real samples'],
  fit: 'Any frontier model. Better on models with large context.',
  weight: 3,
  vars: ['SAMPLES', 'NEW_PIECE'],
  body: `STAGE ONE. Paste three to five samples of my own writing below, ideally in the register I want to reproduce.

<samples>
[SAMPLES]
</samples>

Analyse the voice in these samples and produce a voice profile. Be specific and technical, not impressionistic. "Conversational and engaging" is useless. I need things I could check against a draft.

Cover these:
Sentence rhythm. Average length, and more importantly the variance. Do I run long and then cut short, or stay even? Where do the short ones land?
Vocabulary register. Concrete versus abstract. Latinate versus Germanic. Any words I clearly avoid.
Punctuation habits. How I handle pauses, asides, and lists.
Structural habits. How I open, how I transition, how I close. Do I state the conclusion first or build to it?
Stance. Where do I hedge, where do I commit, and how do I signal the difference?
Tics. Anything I repeat that I probably do not notice.
Three phrases or constructions that would read as forged if you used them, because they are recognisably mine and would be conspicuous if overused.

STAGE TWO. Once the profile is agreed, write this: [NEW_PIECE]

Write it in that voice. Then, separately, list the three places where you were least confident the voice matched, and why. Do not smooth those over silently.

Do not use em dashes or en dashes as sentence-level pauses. Use commas, colons, parentheses, or separate sentences.`
},
{
  id: 'write-cut-third',
  box: 'writing',
  title: 'Cut a third with no loss',
  blurb: 'Ruthless editing pass that shows its work so you can veto.',
  tech: ['Constraint forcing', 'Transparent editing'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['DRAFT', 'AUDIENCE', 'PURPOSE'],
  body: `Draft:
<draft>
[DRAFT]
</draft>

Audience: [AUDIENCE]
What this piece has to accomplish: [PURPOSE]

Cut this by at least a third without losing anything the audience needs. Then show me the cuts so I can veto any of them.

Work in this order.

First, tell me in one sentence what this piece is actually trying to do, based only on what is on the page. If that differs from the purpose I stated, stop and tell me, because a length problem is often a focus problem wearing a costume.

Second, produce the cut version. Do not mark it up, just give me clean prose I could use.

Third, give me the cut log. Group the cuts by type so I can see my own patterns:
Throat-clearing, meaning sentences that announce what the next sentence will do.
Restatement, meaning ideas already made that reappear in new clothes.
Hedges that weaken a claim I have every right to make.
Filler adjectives and adverbs carrying no information.
Concrete detail that felt good to write and does not serve the reader.
Anything I cut that you think is a genuine judgement call rather than an obvious win. Flag these clearly, since these are the ones I most need to review.

Fourth, name the one thing in the original that was doing the most work, so I do not accidentally cut it in a later pass.

Preserve my voice. If a sentence is awkward but distinctly mine, prefer keeping it over replacing it with a smoother sentence that sounds like anyone.

Do not use em dashes or en dashes as sentence-level pauses.`
},
{
  id: 'write-line-edit',
  box: 'writing',
  title: 'Line edit with reasons, not rewrites',
  blurb: 'Get an editor who explains, so you get better instead of dependent.',
  tech: ['Explanation-first', 'Output shaping'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['DRAFT', 'GENRE'],
  body: `Line edit this. Genre and register: [GENRE]

<draft>
[DRAFT]
</draft>

I want to become a better writer, not to receive a better document. So the reasoning matters more than the replacement text.

For each edit, give me three things in this order: the original phrase, the problem in plain language, and one suggested alternative. One alternative, not three, because a menu makes me pick by taste instead of understanding the principle.

Order the edits by how much they improve the piece, not by where they appear in the text. I want the important ones first, in case I only have time for five.

Then step back and name the two or three habits underneath the individual edits. Individual fixes are worth less than seeing the pattern. Be specific about the habit and say roughly how often it occurs.

Then tell me what is genuinely working, and be specific about why it works technically rather than saying it is good. If something in here is better than I probably realise, point at it.

Finally, mark anything you deliberately left alone that another editor might have changed, and say why you left it. I want to know where the line between error and style sits in your judgement.

Do not use em dashes or en dashes as sentence-level pauses in anything you write.`
},
{
  id: 'write-explainer',
  box: 'writing',
  title: 'Explain something hard without dumbing it down',
  blurb: 'The hard part is keeping it accurate while making it land.',
  tech: ['Audience modelling', 'Progressive depth'],
  fit: 'Any frontier model.',
  weight: 3,
  vars: ['TOPIC', 'READER', 'LENGTH', 'WHY_THEY_CARE'],
  body: `Topic: [TOPIC]
Reader: [READER]
Why this reader cares, or why they should: [WHY_THEY_CARE]
Target length: [LENGTH]

Write an explainer. The failure mode I want you to avoid is the one where accuracy gets traded for accessibility and the reader ends up confidently holding a wrong model.

Method.

Start by naming the one idea the reader must leave with. Everything else in the piece serves that. If they remember nothing else, this is the thing.

Identify the specific misconception a reader like this most likely arrives with. Address it directly rather than talking around it. Explaining against a wrong prior is much more effective than explaining into a vacuum.

Build the explanation in layers. A first pass that is true but incomplete. Then the complication that the first pass papered over. Then the resolution. Do not present the simplified version as the whole truth and then quietly move on, because that is exactly how people end up misinformed by well-meaning explainers.

Use one central analogy and stay with it. Then explicitly state where the analogy breaks, because every analogy breaks and the break is usually the most instructive part.

Ground it in something concrete early. A number, an object, a scenario the reader can picture. Abstraction after grounding lands. Abstraction before grounding bounces.

Close by telling the reader what they can now do or notice that they could not before.

Where the field genuinely disagrees, say so and characterise the disagreement rather than picking a side silently. Where you are unsure of a fact, flag it rather than smoothing it in.

Write in flowing prose, not bullets. Do not use em dashes or en dashes as sentence-level pauses.`
},
{
  id: 'write-hook',
  box: 'writing',
  title: 'Openings that are not throat-clearing',
  blurb: 'Twelve real options with the mechanism behind each one named.',
  tech: ['Divergent generation', 'Mechanism labelling'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['PIECE', 'AUDIENCE', 'CORE_CLAIM'],
  body: `Piece: [PIECE]
Audience: [AUDIENCE]
The central claim or payoff: [CORE_CLAIM]

Write twelve possible openings. Two to four sentences each. Then tell me which one to use and why.

Make them genuinely different from each other, not twelve tonal variations of one idea. Use a different mechanism for each, and label the mechanism. Draw from things like: a concrete scene, a specific number that reframes, a widely held belief stated then undercut, a question the reader cannot answer, a confession, a piece of dialogue, a definition that turns out to be wrong, a small object, a moment of failure, a direct address, a historical parallel, a plain statement of the thesis with total confidence.

Rules. No opening may begin with "In today's world", "In an era of", "Imagine a scenario", or any variant. No rhetorical question that the reader would answer with a shrug. No sentence whose only job is announcing what the piece will cover.

After the twelve, rank the top three and say what each one commits the rest of the piece to. Openings are promises, so tell me what promise I would be making and whether the piece as described can keep it.

Do not use em dashes or en dashes as sentence-level pauses.`
},
{
  id: 'write-tone-shift',
  box: 'writing',
  title: 'Retune a message for a specific reader',
  blurb: 'Same content, different reader, without turning into corporate mush.',
  tech: ['Audience modelling', 'Constraint preservation'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['MESSAGE', 'CURRENT_READER', 'NEW_READER', 'RELATIONSHIP'],
  body: `Existing message:
<message>
[MESSAGE]
</message>

Written for: [CURRENT_READER]
Needs to work for: [NEW_READER]
My relationship to the new reader: [RELATIONSHIP]

Rewrite this for the new reader. Before you do, tell me what actually has to change and what must not.

Things that usually have to change: how much background is assumed, what the reader's stake in this is, what they are afraid of, what would make them stop reading, how directly you can state a request, how much hedging is expected.

Things that usually must not change: the actual ask, any factual claim, any commitment I made, and anything that would look like I told two people different stories if they compared notes. That last one matters more than people think.

Give me the rewrite. Then list what you changed and why, grouped by whether it was an audience adaptation or a genuine improvement I should carry back into the original.

Flag anything in the original that was doing work I might not notice, so I do not lose it.

If the new reader would reasonably want something the original does not provide, say what and where to add it.

Do not use em dashes or en dashes as sentence-level pauses.`
},
{
  id: 'write-ai-tells',
  box: 'writing',
  title: 'Strip the AI tells out of a draft',
  blurb: 'Finds the specific constructions that make text read as machine-written.',
  tech: ['Pattern detection', 'Explicit ban list'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['DRAFT'],
  body: `<draft>
[DRAFT]
</draft>

This draft reads as machine-written and I want to know exactly why, then fix it.

Identify every instance of the following, quoting the actual text:

Em dashes and en dashes used as sentence-level pauses. These are the single clearest tell. Replace with commas, colons, parentheses, or a full stop.
The "it's not X, it's Y" construction, and its cousin "this isn't just X, it's Y".
Tricolon abuse, meaning three-item lists used as rhythm rather than because there are three things.
Sentences that begin by naming what the sentence is about to do.
Hedged claims that no human with a stake in the outcome would hedge.
Symmetrical paragraph structure, where every paragraph is the same length and shape.
Vocabulary that clusters: delve, tapestry, landscape, realm, navigate, leverage, robust, seamless, crucial, pivotal, testament, underscore, harness, unlock, elevate, foster.
Conclusions that summarise rather than land.
Bulleted lists where the items are not actually discrete.
Any sentence that would survive unchanged if the topic were completely different.

For each instance: quote it, name the pattern, and give the fix.

Then give me the cleaned draft.

Then tell me honestly whether the underlying content is thin. Often the surface reads as machine-written because there is nothing specific underneath, and cosmetic edits will not fix that. If that is the case here, say so and name what specific detail, example, or opinion would give it substance.`
},

/* ───────────────────────── RESEARCH & SYNTHESIS ───────────────────────── */
{
  id: 'research-methodology',
  box: 'research',
  title: 'Design the research before doing it',
  blurb: 'Plan sources and disconfirming evidence first, so you do not just collect agreement.',
  tech: ['Planning before execution', 'Disconfirmation'],
  fit: 'Best with a model that has search. Run this before the search prompt.',
  weight: 3,
  vars: ['QUESTION', 'DECISION_IT_FEEDS', 'TIME_BUDGET'],
  body: `Research question: [QUESTION]
The decision this research feeds: [DECISION_IT_FEEDS]
Time I can spend: [TIME_BUDGET]

Before any searching happens, design the research. Bad research is usually not a search-skill problem, it is a design problem, and the most common failure is collecting evidence that agrees with a view already held.

Produce a research plan covering the following.

Sharpen the question. My phrasing above is probably too broad or subtly loaded. Rewrite it as a question that could actually come back with an answer I did not expect. If my question presupposes something contestable, name the presupposition.

Decompose it. What are the three to six sub-questions that together answer the main one? Mark which are factual (checkable), which are interpretive (contested), and which are predictive (unknowable, only forecastable).

Map source types. For each sub-question, say what kind of source would be authoritative and what kind would look authoritative but is not. Name specific categories: primary filings, peer-reviewed work, regulator publications, trade press, vendor content, aggregator sites. Note where vendor incentives would distort what I find.

Design for disconfirmation. State explicitly: what evidence would show the likely answer is wrong? Where would that evidence live? Plan to look there deliberately, because it will not show up on its own.

Name the recency requirement. Which parts of this go stale in months, which in years, and which are stable? This determines how hard to weight publication date.

Flag the known traps. Where in this topic does the internet contain a widely repeated claim that traces back to a single weak source? Where is the terminology ambiguous enough that searches will return the wrong thing?

Set a stopping rule. What would tell me I have enough, so I do not research forever instead of deciding?

Do not answer the research question yet. Give me the plan.`
},
{
  id: 'research-source-conflict',
  box: 'research',
  title: 'Reconcile sources that disagree',
  blurb: 'For when four articles give four numbers and you need the real one.',
  tech: ['Evidence weighting', 'Provenance tracing'],
  fit: 'Best with a model that has search or with sources pasted in.',
  weight: 2,
  vars: ['CLAIM', 'SOURCES'],
  body: `Claim under investigation: [CLAIM]

Sources found so far:
<sources>
[SOURCES]
</sources>

These do not agree. Work out what is actually going on rather than averaging them or picking the most recent.

For each source, establish: who published it, what their incentive is, whether they are reporting original work or repeating someone else, and what date the underlying data is from (which is often much older than the publication date).

Then trace provenance. Follow each claim back as far as you can. Very often several apparently independent sources are all downstream of one original, which means the apparent corroboration is an illusion. Say explicitly which sources are independent and which are echoes.

Then diagnose the disagreement. It is almost always one of these: different definitions of the same term, different measurement periods, different populations or scopes, different methodologies, a transcription or unit error propagating, or genuine unresolved uncertainty in the field. Name which applies here.

Then give me your best estimate of the truth, with a range rather than a point where a range is honest, and state your confidence.

Then say what single additional source would most resolve this, and where I would find it.

If the honest answer is that this is not currently knowable at the precision I am asking for, say that plainly. That is a useful finding, not a failure.`
},
{
  id: 'research-lit-map',
  box: 'research',
  title: 'Map a field you know nothing about',
  blurb: 'Orient fast: the camps, the vocabulary, the settled and the live.',
  tech: ['Structured overview', 'Consensus mapping'],
  fit: 'Any frontier model. Verify specifics with search.',
  weight: 3,
  vars: ['FIELD', 'MY_BACKGROUND', 'WHY_IM_LOOKING'],
  body: `Field: [FIELD]
My background: [MY_BACKGROUND]
Why I am looking into this: [WHY_IM_LOOKING]

I need to get oriented quickly enough to ask intelligent questions and to tell a serious source from a shallow one. Map the territory.

Cover these.

The vocabulary I need. Ten to fifteen terms, with the definition that practitioners actually use rather than the dictionary one. Flag any term that means noticeably different things in different sub-communities, since those cause the most confusion for newcomers.

The shape of the field. What are the main sub-areas and how do they relate? Which are mature and which are still forming?

What is settled. Things essentially nobody in the field disputes. These are the foundation and I should not waste time evaluating them.

What is genuinely contested. The live disagreements, who holds which position, and what the disagreement actually turns on. Distinguish between empirical disputes (a fact is unknown) and framework disputes (people are asking different questions).

What outsiders reliably get wrong. The specific misconceptions that mark someone as not having read the field.

Who to read. Names, institutions, publications, and importantly the specific work that is most cited or most foundational. Note where a well-known popular source misrepresents the field.

Where the money and incentives are. Who funds this work, and how does that shape what gets studied and published?

The last three to five years. What has changed recently enough that older material is now misleading?

Given my background, tell me which parts will transfer and which will actively mislead me because a familiar word means something different here.

Where you are uncertain or where your knowledge may be out of date, say so explicitly rather than presenting everything at uniform confidence.`
},
{
  id: 'research-doc-interrogate',
  box: 'research',
  title: 'Interrogate a long document',
  blurb: 'Get what is actually in it, including what is conspicuously missing.',
  tech: ['Long context handling', 'Omission detection'],
  fit: 'Best on large-context models. Attach the document.',
  weight: 2,
  vars: ['DOCUMENT_TYPE', 'MY_INTEREST'],
  body: `I have attached a [DOCUMENT_TYPE]. What I care about: [MY_INTEREST]

Do not summarise it in the usual way. Summaries flatten documents and hide the parts that matter. Do this instead.

Tell me what this document is for. Not what it says, what it is trying to accomplish and for whom. Documents are artifacts with purposes and reading them without that frame is how people miss the point.

Pull out the load-bearing claims, meaning the ones that other parts depend on. If one of these turned out to be wrong, what else collapses?

Quote the specific passages relevant to my stated interest, with locations, so I can go read them in context. Quote sparingly and accurately.

Tell me what is conspicuously absent. For a document of this type, what would you normally expect to see that is not here? Absence is frequently the most informative thing in a document and it is invisible in a normal summary.

Flag the hedged language. Where does the document soften a claim, and what would the unhedged version have said? Pay attention to passive constructions that hide who did something.

Identify any internal inconsistency, meaning places where two parts of the document do not sit comfortably together.

Note where the document's own evidence does not support the strength of its conclusion.

Finally, give me the five questions I should ask whoever produced this.

If a section is ambiguous, say it is ambiguous rather than resolving it silently.`
},
{
  id: 'research-verify',
  box: 'research',
  title: 'Fact-check a piece of writing',
  blurb: 'Separates verified, unverifiable, wrong, and misleading-but-technically-true.',
  tech: ['Claim extraction', 'Graded verification'],
  fit: 'Best with search enabled.',
  weight: 2,
  vars: ['TEXT'],
  body: `<text>
[TEXT]
</text>

Fact-check this properly.

First, extract every checkable claim. A checkable claim is a statement about the world that could in principle be shown false. Skip opinions and predictions, but do include predictions presented as though they were established facts, since that framing is itself a problem.

For each claim, assign one of these five and say why:

VERIFIED. Supported by a source I can name.
UNSUPPORTED. Plausible, but I could not find a source. This is not the same as false.
WRONG. Contradicted by a reliable source. Give the correction.
MISLEADING. Technically accurate, materially deceptive. This category matters most, so be thorough. Examples: a real number stripped of the context that changes its meaning, a correlation phrased to imply causation, an outdated fact stated in the present tense, a percentage where the base is not stated.
UNCHECKABLE. Cannot be verified with available sources. Say what would be needed.

Then step back and assess the piece overall. Are the errors random, or do they lean in one direction? Errors that all favour the same conclusion suggest something different from errors scattered in both directions.

Then flag anything the piece leaves out that a reader would need in order to evaluate its claims fairly.

Be precise about your own confidence. If you are relying on your training rather than a source you actually retrieved, say so. Do not invent citations under any circumstances. If you cannot find a source, the answer is UNSUPPORTED, not a plausible-looking reference.`
}

];
