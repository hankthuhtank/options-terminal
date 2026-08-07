/* LOGOS · the case, third galley */
window.LOGOS_PROMPTS.push(

/* ───────────────────────── LEARNING & TEACHING ───────────────────────── */
{
  id: 'learn-socratic',
  box: 'learning',
  title: 'A tutor that makes you do the work',
  blurb: 'Refuses to hand you the answer, which is the entire point.',
  tech: ['Behavioural constraint', 'Turn discipline'],
  fit: 'Any frontier model. Works well as a Project instruction.',
  weight: 2,
  vars: ['TOPIC', 'MY_LEVEL', 'WHY_IM_LEARNING'],
  body: `Topic: [TOPIC]
Where I am now: [MY_LEVEL]
Why I am learning this: [WHY_IM_LEARNING]

Teach me this, and teach me properly, which means you do not give me the answer.

How this works.

Ask me one question at a time and wait for my answer. Do not ask three questions in one message and do not answer your own question in the next paragraph. The waiting is the whole mechanism.

Start by finding the edge of what I already know. Ask something that will reveal whether my foundation is solid, because building on a shaky foundation is how people get stuck later without knowing why.

When I get something wrong, do not correct me immediately. Ask a question that makes the error visible to me. If I still do not see it, narrow the question. Only explain directly if I have tried twice and I am frustrated rather than thinking.

When I get something right, ask me why it is right. Getting the right answer for the wrong reason is very common and it looks identical from the outside.

Push toward transfer. Once I can do the standard case, give me a case where the standard method fails, so I learn the boundary of the idea rather than a procedure.

Periodically ask me to explain a piece of it back to you in my own words, without jargon. If I cannot, I do not know it yet, and we should go back rather than forward.

Tell me plainly when I am ready to move on. Do not be encouraging about progress I have not made, because that is how people build confidence that outruns their competence.

Start now with your first question, and nothing else.`
},
{
  id: 'learn-syllabus',
  box: 'learning',
  title: 'Build a learning path with real checkpoints',
  blurb: 'Sequenced by dependency, with a way to prove each stage.',
  tech: ['Dependency ordering', 'Assessment design'],
  fit: 'Any frontier model.',
  weight: 3,
  vars: ['GOAL', 'STARTING_POINT', 'TIME_PER_WEEK', 'DEADLINE'],
  body: `What I want to be able to do: [GOAL]
Where I am starting: [STARTING_POINT]
Time available per week: [TIME_PER_WEEK]
Deadline or target date: [DEADLINE]

Build me a learning path. Note that my goal above is stated as a capability, and if it is vague, sharpen it first into something I could demonstrate, because you cannot design a path to a fuzzy destination.

Structure it this way.

Order by dependency, not by convention. What must be understood before what? Textbook order is often historical rather than pedagogical, so say where you are deviating from the usual sequence and why.

Cut aggressively. Given my specific goal, name what is traditionally taught in this subject that I can skip or defer. Most curricula are built for a general audience and carry a lot that is irrelevant to any particular goal. This section is as valuable as the inclusions.

For each stage, give me: what to learn, roughly how long at my pace, one or two specific resources, and a checkpoint.

The checkpoint is the important part. It must be something I produce or do, not something I feel. "Understand recursion" is not a checkpoint. "Write a function that flattens an arbitrarily nested list without using a library, and explain why the base case is where it is" is a checkpoint. Design each one so that passing it is real evidence.

Mark the two or three stages where people typically stall, and say what the stall looks like and how to get through it.

Be realistic about the timeline given my hours. If my deadline is not achievable, say so directly and tell me what a realistic version of the goal would be, or what would have to change.

Then tell me what I should build or do alongside the study, since capability comes from application and study alone produces a fragile kind of knowing.`
},
{
  id: 'learn-feynman',
  box: 'learning',
  title: 'Find the holes in your own explanation',
  blurb: 'You explain it, the model finds where the understanding is thin.',
  tech: ['Gap detection', 'Adversarial questioning'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['CONCEPT', 'MY_EXPLANATION'],
  body: `Concept: [CONCEPT]

My explanation of it:
<explanation>
[MY_EXPLANATION]
</explanation>

Find the holes. Be strict. I am doing this specifically to find out what I do not actually understand, so being generous with me defeats the purpose.

Go through my explanation and mark:

Where I used a technical term without unpacking it, in a way that hides rather than conveys. Using the jargon correctly is not the same as understanding it, and this is the most common way people fool themselves.

Where I described what happens but not why. Mechanism versus narration. If I can only say what happens next, I have memorised a sequence.

Where I stated something that is true but that I appear to have taken on authority rather than derived. Ask me why it is true.

Where my explanation would break down if a slightly different case were substituted. Give me the case.

Where I skipped a step and the explanation still reads smoothly, which is how gaps hide.

Where I am subtly wrong. Distinguish clearly between a simplification that is fine for the level I am at, and an error that will cause trouble later. These get confused constantly.

Then ask me three questions, in increasing difficulty, that would test whether I actually have this. Wait for my answers before evaluating them.

Then tell me: on a scale from "can recite" to "can apply to a novel case", where does my explanation put me?`
},
{
  id: 'learn-retention',
  box: 'learning',
  title: 'Turn material into questions worth remembering',
  blurb: 'Generates recall items that test understanding, not recognition.',
  tech: ['Assessment design', 'Format constraint'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['MATERIAL', 'DEPTH_NEEDED'],
  body: `<material>
[MATERIAL]
</material>

How deeply I need to know this: [DEPTH_NEEDED]

Turn this into recall questions I can actually use.

Rules for what makes a good question here.

One idea per question. If a question has an "and" in the answer, split it.
The question must be answerable from memory without the material in front of me.
Prefer questions that require reconstruction over questions that require recognition. "What is X?" tests recognition. "Why does X work when Y does not?" tests understanding.
No question where the answer is obvious from the phrasing of the question.
Include the connective questions, meaning ones that ask how two ideas relate, since isolated facts decay much faster than connected ones.
Include at least a few application questions, where I have to use the idea on a case that is not in the material.

Give me the questions grouped into three tiers:
FOUNDATION. If I do not know these, nothing else will stick.
CORE. The main content.
EDGE. Boundaries, exceptions, and the cases where the standard answer is wrong.

For each question, give the answer separately, and where the answer has a common wrong version, name that too, because knowing the attractive wrong answer is part of knowing the right one.

Then tell me which three questions in this set are the ones that, if I can answer them cold in a month, mean I have retained the important part.`
},

/* ───────────────────────── CAREER & COMMS ───────────────────────── */
{
  id: 'career-hard-message',
  box: 'career',
  title: 'Write the message you are dreading',
  blurb: 'Three strategies with different outcomes, not three tones.',
  tech: ['Strategy divergence', 'Consequence framing'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['SITUATION', 'RECIPIENT', 'RELATIONSHIP', 'WHAT_I_WANT', 'WHAT_I_FEAR'],
  body: `Situation: [SITUATION]
Who I am writing to: [RECIPIENT]
Our relationship and the power dynamic: [RELATIONSHIP]
What I actually want to happen: [WHAT_I_WANT]
What I am afraid of: [WHAT_I_FEAR]

Before writing anything, tell me what you think is really going on here, including anything in how I framed it that suggests I am optimising for avoiding discomfort rather than for the outcome I said I want. Those two goals conflict more often than people notice.

Then give me three drafts. Not three tones of the same message, three genuinely different strategies that lead to different outcomes. Label what each one prioritises and what it costs. For example: one that preserves the relationship at the cost of getting a clear answer, one that forces a decision at the cost of some warmth, one that leaves the door open but risks the issue drifting.

For each draft:
The message itself, ready to send.
What it is optimising for.
The most likely reply, and how I would handle it.
The risk. What is the worst realistic outcome of sending this one?

Then recommend one and say why, given what I told you I want.

Constraints for all drafts. No apologising for existing or for taking up their time. No burying the ask beneath three paragraphs of context. No passive voice hiding who did what. Say the difficult thing in the first half, not the last line. Keep it short, because length reads as anxiety.

If the honest advice is that this should be a conversation rather than a message, say so and give me the opening line instead.`
},
{
  id: 'career-interview-prep',
  box: 'career',
  title: 'Interview prep that finds your weak answers',
  blurb: 'Probing follow-ups, not a list of common questions.',
  tech: ['Adversarial simulation', 'Turn discipline'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['ROLE', 'COMPANY', 'MY_BACKGROUND', 'MY_WORRY'],
  body: `Role: [ROLE]
Company and what I know about them: [COMPANY]
My background: [MY_BACKGROUND]
What I am worried they will ask: [MY_WORRY]

Run this as a real interview, not a list of questions.

Ask one question. Wait for my answer. Then, and this is the part that matters, ask the follow-up a good interviewer would ask. Real interviews are won or lost in the follow-up, where a rehearsed answer runs out and you find out whether the person actually did the thing they described.

Follow-up patterns to use on me: ask for the specific number, ask what I would do differently, ask what the hardest part was, ask who disagreed with me and what happened, ask what I got wrong, ask how I knew it worked.

After each exchange, give me a short assessment before moving on:
What landed.
Where I was vague, and the specific detail I should have given.
Whether I answered the question they asked or the question I wanted them to ask, which is the most common failure.
Whether my answer would survive someone who actually knows this domain.

Cover the gap I named as a worry directly. Do not go easy on it. I would rather be uncomfortable now.

Start with the opening question and nothing else. Do not preview the plan.`
},
{
  id: 'career-narrative',
  box: 'career',
  title: 'Build the through-line in your career story',
  blurb: 'Finds the real pattern instead of inventing a tidy one.',
  tech: ['Pattern extraction', 'Honesty constraint'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['HISTORY', 'TARGET', 'AWKWARD_PARTS'],
  body: `My history: [HISTORY]
What I am trying to move toward: [TARGET]
The parts that are awkward to explain: [AWKWARD_PARTS]

Help me find the actual through-line, not a manufactured one. Manufactured narratives are transparent, and interviewers have heard hundreds of them.

First, look at what I have actually done and tell me what the real pattern is. Not the pattern I would like there to be. Look at the kinds of problems I keep returning to, the type of work I chose when I had a choice, and what the transitions have in common. Sometimes the pattern is not about a domain at all, it is about a mode of working.

Then tell me honestly whether that pattern points toward my target or away from it. If the honest read is that my history does not obviously lead where I say I want to go, say so, because knowing that is what lets me address it rather than hope nobody notices.

Then handle the awkward parts. For each, give me the version that is true, brief, and does not invite a follow-up. The failure modes here are over-explaining (which signals shame) and being evasive (which signals something worse). Aim for a sentence or two that closes the topic naturally.

Then give me the through-line in three forms: one sentence, one paragraph, and two minutes spoken.

Then name the strongest objection someone could raise to my story, and the honest answer.

Do not inflate anything. If a role was small, the story should not imply it was not. Overclaiming is discovered in the follow-up questions and it costs everything.`
},
{
  id: 'career-negotiate',
  box: 'career',
  title: 'Prepare a negotiation you have leverage in',
  blurb: 'Work out what you actually want before deciding what to ask for.',
  tech: ['Interest mapping', 'Scenario rehearsal'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['WHAT_IM_NEGOTIATING', 'THEIR_POSITION', 'MY_ALTERNATIVES', 'WHAT_I_KNOW'],
  body: `What I am negotiating: [WHAT_IM_NEGOTIATING]
Their current position: [THEIR_POSITION]
My alternatives if this does not work out: [MY_ALTERNATIVES]
What I know about their situation and constraints: [WHAT_I_KNOW]

Prepare me. Start with the parts people skip.

Separate my positions from my interests. A position is what I am asking for. An interest is why I want it. Interests are where deals get made, because two people with incompatible positions often have compatible interests. List mine, and rank them, because I probably have not.

Do the same for them, as best you can infer. What are they actually trying to protect? Budget, precedent, fairness against other people in the same situation, their own standing with their boss, speed. Note that precedent and internal fairness constrain negotiators far more than outsiders assume, and understanding that changes what to ask for.

Assess my leverage honestly. What do I actually have? Alternatives are the main source and mine are listed above. If my leverage is weaker than I think, say so, because negotiating from imagined strength is how people damage relationships for nothing.

Then find the tradeable dimensions. Anything beyond the headline number that they might value differently than I do. These are where a stuck negotiation opens up.

Then give me: my opening, my target, and my walk-away. Be specific and say what each is anchored to.

Then rehearse the three hardest moments: when they say no, when they say "that is not something we do", and when they make an offer that is close but not enough. Give me the actual words for each.

Then tell me what I should not say, and why.`
},

/* ───────────────────────── CREATIVE & NARRATIVE ───────────────────────── */
{
  id: 'creative-scene',
  box: 'creative',
  title: 'Write a scene with real subtext',
  blurb: 'Constrains against the on-the-nose dialogue models default to.',
  tech: ['Negative constraint', 'Craft specification'],
  fit: 'Any frontier model. Creative-leaning models do better here.',
  weight: 3,
  vars: ['CHARACTERS', 'SITUATION', 'WHAT_IS_UNSAID', 'POV', 'LENGTH'],
  body: `Characters: [CHARACTERS]
The situation on the surface: [SITUATION]
What is actually going on underneath, which nobody says out loud: [WHAT_IS_UNSAID]
Point of view: [POV]
Length: [LENGTH]

Write this scene. The whole task is the gap between what is said and what is meant, so the constraints below are the assignment rather than decoration.

Constraints.

Nobody states the underlying thing. Not once, not at the end, not in narration. If the subtext surfaces as text, the scene has failed.

Characters talk past each other the way people actually do. They answer a different question than the one asked. They return to a safe topic when it gets close. They are interrupted, or they interrupt themselves.

Give me at least one physical action that carries emotional weight without being explained. Someone does something with their hands. Do not tell me what it means.

No character says what they are feeling. No narration names an emotion directly. Emotions are inferred from behaviour, rhythm, and what gets avoided.

Dialogue attribution is "said" almost always. No "he exclaimed", no adverbs propping up dialogue that should carry itself.

The scene ends before the resolution. Cut on the line that changes the temperature.

Write in flowing prose. Do not use em dashes or en dashes as sentence-level pauses; use commas, full stops, or paragraph breaks.

After the scene, and only after, give me three short notes: the line you think is doing the most work, the one place you were most tempted to make it explicit, and one thing a reader might miss.`
},
{
  id: 'creative-world',
  box: 'creative',
  title: 'Build a world from one consequence outward',
  blurb: 'Start with a single change, then follow it honestly.',
  tech: ['Causal chaining', 'Consistency enforcement'],
  fit: 'Any frontier model.',
  weight: 3,
  vars: ['THE_CHANGE', 'SETTING', 'TONE'],
  body: `The one thing that is different about this world: [THE_CHANGE]
Setting and era: [SETTING]
Tone: [TONE]

Build outward from that single change. The rule is that everything else follows from it, and nothing gets added just because it seems cool.

Work in layers.

Immediate consequences. What directly changes for an ordinary person's day because of this?

Then economics. Who gets rich, who gets poor, what work disappears and what work appears. Follow the money honestly, because it constrains everything else and most worldbuilding skips it.

Then power. Who controls the thing, how do they keep control, and who is trying to take it. Every valuable and scarce thing generates a political structure around it.

Then daily texture. Food, housing, travel, what people complain about, what is expensive that we consider cheap and what is cheap that we consider expensive. This layer is what makes a world feel inhabited.

Then language. What words exist here that do not exist for us? What has a name because it is common enough to need one? Give me five, with their meanings.

Then belief. What do people think this change means about the world, and are they right?

Then the losers. Every change makes someone worse off, and worlds where nobody lost are not believable. Who lost, and what do they do about it?

Throughout, flag any place where you are adding something because it feels appropriate to the genre rather than because it follows from the premise. Those are the seams and I want to see them.

Finish with the two most interesting story situations this world creates that could not exist in ours.`
},
{
  id: 'creative-voice-character',
  box: 'creative',
  title: 'Give a character a voice you can hear',
  blurb: 'Specific verbal fingerprints, not adjectives about personality.',
  tech: ['Specification over description', 'Contrast testing'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['CHARACTER', 'BACKGROUND', 'THE_SITUATION'],
  body: `Character: [CHARACTER]
Background: [BACKGROUND]
Where they are in the story: [THE_SITUATION]

Build this character's voice as a set of concrete, checkable traits. "Sardonic and guarded" is a description of a personality, not a voice, and it does not help me write a line.

Give me:

Sentence length and rhythm. Do they run on or clip short? Where does the break fall?
Vocabulary sources. What world do their words come from? Trade, region, era, class, a former job. Give five words or phrases that would only come from this person.
What they will not say. Everyone has topics they route around and words they avoid. This shapes speech more than what they do say.
How they handle a direct question. Answer it, dodge it, answer a better one, ask one back.
How they show affection and how they show anger, given that most characters do not do either directly.
Their tell. The verbal habit they do not know they have.
What changes about their speech under pressure. Voices are not constant, and the way they deform is characterising.

Then write the same short exchange three times: once at ease, once under pressure, once when they are lying. Same information conveyed, three different deliveries.

Then write four lines of dialogue and, for each, say what a lesser writer would have had them say instead and why the version you wrote is better.

Do not use em dashes or en dashes as sentence-level pauses.`
},

/* ───────────────────────── AGENTS & SYSTEMS ───────────────────────── */
{
  id: 'agent-system-prompt',
  box: 'agents',
  title: 'Write a system prompt for an agent',
  blurb: 'Modern shape: fewer rules, better interfaces, progressive disclosure.',
  tech: ['Context engineering', 'Progressive disclosure', 'Interface design'],
  fit: 'For building on the API or in an agent harness.',
  weight: 3,
  vars: ['AGENT_PURPOSE', 'USERS', 'TOOLS', 'MUST_NEVER', 'SUCCESS'],
  body: `I am building an agent and need a system prompt. Purpose: [AGENT_PURPOSE]
Who uses it: [USERS]
Tools it has: [TOOLS]
Things it must never do: [MUST_NEVER]
What good performance looks like: [SUCCESS]

Write the system prompt using the current approach rather than the 2023 one. The current approach is materially different, so apply these principles deliberately and tell me where you applied each.

Principles to follow.

Give the model judgement, not a rulebook. Rules that are right ninety percent of the time actively hurt in the other ten, and capable models handle "match the surrounding context" better than they handle a list of prohibitions. Reserve hard rules for things that are genuinely never acceptable.

Put tool instructions in the tool descriptions, not in the system prompt. Repeating them in both places creates conflicts and wastes context.

Design the interface rather than supplying examples. Well-named parameters and constrained enums teach usage more reliably than examples, and examples narrow the model to the shape of the example.

Use progressive disclosure. Anything needed only sometimes should be loadable on demand rather than sitting in context permanently. Say which parts of this prompt should actually be separate files or skills.

State the product context. What surface is this running on, what does the user see, what can the agent assume about the environment. This is the part that genuinely belongs in a system prompt.

Avoid conflicting instructions. Read your own draft for places where two lines could pull against each other, and against what a user might reasonably ask for.

Deliver: the system prompt, then a short note on what you deliberately left out and why, then a list of what should live elsewhere (tool descriptions, skills, or reference files), then the three failure modes this prompt is most likely to have and how I would detect them in testing.`
},
{
  id: 'agent-claude-md',
  box: 'agents',
  title: 'Write a project instruction file that earns its tokens',
  blurb: 'For CLAUDE.md, AGENTS.md, cursor rules, or Project instructions.',
  tech: ['Context engineering', 'Signal density'],
  fit: 'For coding agents and long-running projects.',
  weight: 2,
  vars: ['PROJECT', 'STACK', 'GOTCHAS', 'CONVENTIONS'],
  body: `Project: [PROJECT]
Stack: [STACK]
Non-obvious things that trip people up: [GOTCHAS]
Conventions I care about: [CONVENTIONS]

Write the project instruction file. Optimise for signal per token, because this file is loaded on every single request and every wasted line costs me on every task forever.

Rules for what goes in.

Include what the agent cannot work out by looking. Gotchas, hard-won knowledge, decisions that look wrong until you know why, the reason that weird file exists. This is the highest value content and most instruction files bury it under boilerplate.

Exclude anything discoverable from the file tree, the package manifest, or reading two files. Do not describe the directory structure. Do not list the dependencies. The agent can see those.

Exclude generic engineering advice. "Write clean code", "add tests", "follow best practices" are noise that dilutes the signal around them.

For conventions, state them once, positively, and only where the codebase is genuinely inconsistent or unusual. If the convention is visible from any existing file, the agent will match it without being told.

Anything long or conditionally relevant should be a separate file that gets loaded when needed, not inline here. Tell me which sections should be split out that way.

Keep it short. If it is over a page, justify every paragraph past the first page.

Deliver the file, then a separate list of what you deliberately left out and why, so I can check your judgement. Then flag anything in what I told you that reads like it might conflict with something else, since conflicting guidance costs more than missing guidance.`
},
{
  id: 'agent-skill',
  box: 'agents',
  title: 'Author a reusable skill',
  blurb: 'A procedure the agent loads only when it is relevant.',
  tech: ['Progressive disclosure', 'Trigger design'],
  fit: 'For Claude Skills, custom GPT instructions, or any modular agent capability.',
  weight: 2,
  vars: ['CAPABILITY', 'WHEN_IT_APPLIES', 'THE_PROCEDURE', 'QUALITY_BAR'],
  body: `Capability: [CAPABILITY]
When it should trigger: [WHEN_IT_APPLIES]
The procedure as I currently do it: [THE_PROCEDURE]
What separates a good result from a mediocre one: [QUALITY_BAR]

Write this as a skill. The point of a skill is that it stays out of context until it is needed, so two things matter most: the trigger description and the density of what is inside.

The description. This is what the agent reads to decide whether to load the skill, and it is the single highest leverage part. It must name the concrete situations and artifacts that should trigger it, using the words a user would actually use, including near-misses and adjacent phrasings. Write it so that it fires reliably on the right cases and does not fire on plausible-looking wrong ones. Give me the description first and flag any ambiguity you see in my trigger conditions.

The body. Encode the opinions, not the obvious. A skill is valuable because it carries specific knowledge the model would not otherwise have: my preferences, the gotchas, the quality bar, the order things have to happen in. Generic procedure that any capable model would produce anyway is wasted space.

Do not over-constrain. Rules that are usually right and occasionally wrong will produce confident wrong output in the occasional case. Where judgement is better than a rule, say so and give the judgement criteria instead.

Split it. If the content is long, or if parts of it apply only to certain cases, structure it so the main file is short and the detail lives in files that get read on demand. Tell me what the split should be.

Include the quality bar as something checkable. What does the agent look at to know whether the output is good?

Deliver: the description line, the skill body, the proposed file split, and three test cases (one that should trigger it, one that should not, and one genuinely borderline).`
},
{
  id: 'agent-pipeline-design',
  box: 'agents',
  title: 'Design an agent workflow before building it',
  blurb: 'Picks the orchestration pattern and the human checkpoints.',
  tech: ['Pattern selection', 'Failure design'],
  fit: 'For n8n, LangGraph, Agent SDKs, or any orchestration layer.',
  weight: 3,
  vars: ['JOB', 'INPUTS', 'OUTPUTS', 'VOLUME', 'COST_OF_ERROR'],
  body: `The job to automate: [JOB]
What comes in: [INPUTS]
What must come out: [OUTPUTS]
Volume: [VOLUME]
What it costs when it gets one wrong: [COST_OF_ERROR]

Design this before I build it.

Start with the split. Which parts of this genuinely need a model, and which are deterministic logic that should never touch one? The most common design error is putting a model where an if-statement would do, which adds cost, latency, and nondeterminism for nothing. Be strict here.

Then choose the orchestration pattern and justify it against the alternatives:
Single call. One model call, structured output. Correct far more often than people assume.
Sequential pipeline. Fixed stages, each output feeding the next.
Router. Classify first, then dispatch to a specialised path.
Parallel fan-out and merge. Independent subtasks run at once, results combined.
Orchestrator with subagents. A planner delegates and synthesises. Expensive, use only when the subtasks genuinely differ.
Evaluator-optimiser loop. Generate, score against criteria, revise if below threshold. Good when quality is checkable and the first attempt is often close.

Say which one, and specifically why the simpler option below it is not enough. Complexity in agent systems is where reliability goes to die, so the burden of proof is on the more complex pattern.

Then design the failure behaviour, which is the part that determines whether this survives contact with production:
Where does it stop and ask a human? Given the cost of error I stated, be concrete.
What happens when a step returns something malformed?
What happens when an external tool is slow or down?
How do I know it failed, as opposed to quietly producing something wrong? Silent wrong output is the real danger, so say what makes it detectable.
Where does state live between steps, and what happens on a retry?

Then the cost and latency shape. Which step dominates each, and which steps could run on a smaller model without hurting quality.

Then tell me the smallest version I could build this week that would tell me whether the whole approach works.`
},
{
  id: 'agent-eval',
  box: 'agents',
  title: 'Build an eval before you tune the prompt',
  blurb: 'Stop judging prompt changes by vibes.',
  tech: ['Measurement design', 'Rubric construction'],
  fit: 'For anyone running a prompt more than a handful of times.',
  weight: 2,
  vars: ['TASK', 'CURRENT_PROMPT', 'WHAT_GOOD_LOOKS_LIKE', 'FAILURES_SEEN'],
  body: `Task: [TASK]
Current prompt:
<prompt>
[CURRENT_PROMPT]
</prompt>
What a good output looks like: [WHAT_GOOD_LOOKS_LIKE]
Failures I have seen so far: [FAILURES_SEEN]

Help me build an evaluation before I touch the prompt again. Without one I am tuning by vibes, and vibes cannot detect a change that improves the case in front of me while breaking three cases I am not looking at.

Design the following.

The test set. Give me the categories of input this prompt must handle, including the awkward ones: minimal input, overloaded input, input that is subtly out of scope, input containing an instruction (which should be treated as data, not obeyed), and input in an unexpected format. Tell me roughly how many cases per category is enough to be informative without being a project.

The grading criteria. For each, say whether it can be checked programmatically (format valid, required field present, length in range, no forbidden string) or needs judgement. Push as much as possible into the programmatic bucket, because those checks are cheap, repeatable, and do not drift.

For the judgement criteria, write the rubric. Each criterion needs a concrete definition of pass and fail, specific enough that two different graders would agree. Vague rubrics produce noisy scores that hide real regressions.

The regression set. Specifically: the failures I already listed become permanent test cases, so that a future change cannot silently reintroduce them.

The baseline. Run the current prompt against the set first and record the result. Without a baseline, every subsequent change is unfalsifiable.

The stopping rule. What score is good enough, so I stop optimising a prompt that is already fine?

Then tell me the one input category most likely to be missing from what I described, based on the task.`
},
{
  id: 'agent-injection-audit',
  box: 'agents',
  title: 'Audit an agent for injection exposure',
  blurb: 'Checks for the combination that makes prompt injection dangerous.',
  tech: ['Threat modelling', 'Trifecta analysis'],
  fit: 'Essential before giving any agent tool access.',
  weight: 3,
  vars: ['AGENT_DESCRIPTION', 'TOOLS', 'DATA_ACCESS', 'CONTENT_SOURCES'],
  body: `Agent: [AGENT_DESCRIPTION]
Tools it can call: [TOOLS]
Data it can reach: [DATA_ACCESS]
Untrusted content it processes: [CONTENT_SOURCES]

Audit this for prompt injection exposure. Prompt injection has no reliable fix at the model layer, so the analysis has to be architectural rather than a question of better instructions.

Start with the core check. Does this agent have all three of these at once:
1. Access to private or sensitive data
2. Exposure to content it did not author and cannot trust
3. A way to communicate outward (send, post, write, call an external endpoint, or even render a URL that gets fetched)

If all three are present, this is exploitable, and the analysis is about which one to remove or gate rather than how to instruct the model better. Say clearly which of the three is present here.

Then enumerate the untrusted surfaces specifically. Everything the agent reads that a third party could influence: web pages, emails, file contents, PDF text (including invisible text), tickets, code comments, tool responses, search results, and the output of any other agent.

Then, for each tool, ask what an attacker would do with it if they controlled the agent's next action for one turn. Rank tools by blast radius. Anything that writes, sends, pays, deletes, or grants access sits at the top.

Then check the exfiltration paths, including the non-obvious ones: an image URL with data in the query string, a link the user is likely to click, a markdown reference that auto-fetches, an error message, a file written to a synced location.

Then recommend controls in order of effectiveness:
Remove the capability. Most effective, most often skipped.
Split the agent, so the component reading untrusted content has no tools and no data access, and passes only structured, validated results onward.
Gate the dangerous actions behind explicit human confirmation, and specify what the human is shown so the confirmation is meaningful rather than a reflex click.
Constrain outbound destinations to an allowlist.
Apply least privilege on credentials and scopes.
Log everything, and monitor for the specific patterns that would indicate an attempt.

Detection and filtering come last and should never be the only defence, since scanners are routinely bypassed.

Finish with the single change that most reduces risk here, and what it costs in capability.`
},

/* ───────────────────────── META & PROMPT REPAIR ───────────────────────── */
{
  id: 'meta-build-prompt',
  box: 'meta',
  title: 'Have the model interview you, then write the prompt',
  blurb: 'The single highest-leverage prompt in this whole library.',
  tech: ['Elicitation', 'Meta-prompting'],
  fit: 'Any frontier model. Use this when you are stuck.',
  weight: 2,
  vars: ['ROUGH_GOAL'],
  body: `I want a really good prompt for this, but I have not thought it through properly yet: [ROUGH_GOAL]

Do not write the prompt yet. Interview me first.

Ask me questions one at a time, in order of how much the answer would change the final prompt. Wait for each answer. This ordering matters: most of the quality comes from two or three details, and asking about them first means we can stop early if I run out of patience.

The things you probably need to establish, though use your judgement about which actually matter here: what the output is genuinely for and who reads it, what a great result looks like versus a merely acceptable one, what a bad result looks like specifically (this is often more informative than the good case), what context or source material exists, what constraints are real, what I have already tried and how it fell short, and whether this runs once or many times.

Stop asking when further questions would produce marginal improvement. Tell me when you have reached that point rather than continuing out of thoroughness.

Then write the prompt. Structure it clearly, be explicit about the output format, include permission for the model to say it does not know, and put any context before the instruction.

Then, separately from the prompt itself, tell me three things:
Which parts of the prompt are load-bearing, so I know what not to casually edit.
Which parts you were least sure about, so I know where to iterate first.
What I should look at in the output to tell whether the prompt is working, as opposed to whether I happen to like the answer.`
},
{
  id: 'meta-diagnose',
  box: 'meta',
  title: 'Diagnose a prompt that is not working',
  blurb: 'Find out why the output is wrong before rewriting blindly.',
  tech: ['Failure analysis', 'Minimal intervention'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['PROMPT', 'OUTPUT_I_GOT', 'WHAT_I_WANTED'],
  body: `My prompt:
<prompt>
[PROMPT]
</prompt>

What I got:
<output>
[OUTPUT_I_GOT]
</output>

What I actually wanted: [WHAT_I_WANTED]

Diagnose before prescribing. Rewriting a prompt without understanding the failure usually produces a longer prompt with the same problem.

Identify which of these is happening, and quote the specific part of my prompt responsible:

The prompt is ambiguous, and the output is a legitimate reading of what I wrote. This is the most common cause by a wide margin, and it feels like the model misunderstood when actually I underspecified.
The prompt asks for two things that pull against each other, so the model split the difference.
The prompt says what not to do without saying what to do instead, which leaves the model guessing at the positive form.
Missing context. The model could not have known something it needed.
The task is genuinely too large for one pass and should be split.
An example I gave is pulling the output toward the shape of the example rather than the shape of the task.
Over-constraint. So many rules that the model spent its effort on compliance instead of quality.
The prompt is fine and this is a model limitation or a sampling artifact, in which case the fix is a different model or a retry rather than a rewrite.

Say which, with the evidence.

Then give me the minimum change that fixes it. Minimum matters: adding paragraphs to a prompt is how prompts become bloated and fragile. If one sentence fixes it, give me one sentence.

Then tell me what to check in the next output to confirm the fix worked rather than the model happening to do better this time.`
},
{
  id: 'meta-compress',
  box: 'meta',
  title: 'Compress a bloated prompt',
  blurb: 'Remove what the model no longer needs told.',
  tech: ['Subtraction', 'Redundancy detection'],
  fit: 'Any frontier model. Test before and after.',
  weight: 2,
  vars: ['PROMPT', 'WHAT_IT_MUST_KEEP_DOING'],
  body: `<prompt>
[PROMPT]
</prompt>

This must keep doing: [WHAT_IT_MUST_KEEP_DOING]

Cut this down. Long prompts accumulate instructions that were needed once, or that were never needed, and each one competes for attention with the ones that matter.

Identify and mark each of these:

Instructions that duplicate each other in different words.
Instructions that contradict each other. These are worse than either duplication or absence, because the model has to resolve the conflict and may resolve it differently each run.
Instructions telling the model to do something it does reliably by default. A lot of prompt content is defending against behaviours that stopped happening two model generations ago.
Scaffolding that is not doing structural work. Tags around a single short block, headings for one-line sections, formatting that adds tokens without adding clarity.
Examples that constrain more than they teach. If an example is narrowing the model to that example's shape, it may be costing more than it gives.
Politeness and preamble.
Rules stated negatively that would be shorter and more effective stated positively.
Anything that would be better as an on-demand reference than as permanent context.

Then give me the compressed version, with a note on how much shorter it is.

Then, importantly, list what you removed that you are least confident about, so I can test those specifically. Compression should be verified, not assumed.

Then suggest how I would check that the compressed version still does the thing, in a way that would catch a regression rather than just looking fine.`
},

/* ───────────────────────── IMAGE & MULTIMODAL ───────────────────────── */
{
  id: 'visual-image-brief',
  box: 'visual',
  title: 'Write an image prompt like a photo brief',
  blurb: 'Subject, optics, light, and composition, in the order that matters.',
  tech: ['Specification layering', 'Domain vocabulary'],
  fit: 'Image models. Also useful for briefing a human photographer or illustrator.',
  weight: 2,
  vars: ['SUBJECT', 'PURPOSE', 'MOOD', 'FORMAT'],
  body: `Subject: [SUBJECT]
What the image is for: [PURPOSE]
Mood: [MOOD]
Aspect and format: [FORMAT]

Write me an image generation prompt, built the way a photographer or art director would brief a shoot rather than the way a keyword list is assembled. Keyword soup produces generic results because it gives the model no hierarchy.

Build it in this order, since the order signals priority:

The subject and what it is doing. Specific, concrete, singular focus. What is the one thing the eye should land on.
The moment. Images are stronger when something is mid-happening rather than posed.
The setting, described in terms of what is actually visible in frame, not in terms of a location name.
The light. This does more work than anything else and is the most commonly omitted. Direction, quality (hard or soft), colour temperature, time of day, what is in shadow.
The optics. Focal length and what that does to the perspective, depth of field, camera height and angle. Say the effect, not just the number.
Composition. Where the subject sits in frame, what fills the negative space, what the eye does after landing.
Palette. Three or four colours that dominate, described as materials or references rather than as hex values.
Medium and finish. Film stock, print process, render style, or whatever is true to the intent. Be specific rather than saying "photorealistic".

Then give me the prompt as a single flowing paragraph, since most current image models read prose better than they read comma-separated tags.

Then give me a short list of what to add if the first result is too generic, and separately, what to remove if it is too busy.

Do not include: "masterpiece", "8k", "highly detailed", "trending on artstation", or any artist's name as a style shortcut.`
},
{
  id: 'visual-read-image',
  box: 'visual',
  title: 'Read an image or screenshot carefully',
  blurb: 'Separates what is visible from what is inferred.',
  tech: ['Observation discipline', 'Inference marking'],
  fit: 'Any multimodal model. Attach the image.',
  weight: 2,
  vars: ['WHAT_I_NEED_TO_KNOW'],
  body: `I have attached an image. What I need to know from it: [WHAT_I_NEED_TO_KNOW]

Read it carefully and keep observation separate from inference throughout, because they get blended constantly and that is how confident misreadings happen.

Give me:

OBSERVED. What is actually visible. Be systematic rather than jumping to whatever is most salient: work across the frame, and include the background and the edges, since those often carry the detail that matters and are the first thing skipped.

TEXT. Transcribe any text exactly as it appears, including anything small, partial, or cut off. If something is illegible, say illegible rather than guessing at it.

INFERRED. What you conclude from the observations, with the reasoning attached so I can check it. Mark your confidence on each.

UNCERTAIN. Anything ambiguous, obscured, or that could reasonably be read two ways. Give both readings.

RELEVANT TO MY QUESTION. Pull together what actually bears on what I asked, and say plainly if the image does not contain enough to answer it.

NOTABLE. Anything that seems out of place, inconsistent, or that I probably have not noticed.

Do not describe the image in general terms first. Go straight to the substance. And do not fill gaps with what would typically be there in an image of this type, because that is how a detail that is not present gets reported as present.`
},

/* ───────────────────────── PERSONAL & ADMIN ───────────────────────── */
{
  id: 'life-triage',
  box: 'life',
  title: 'Triage a week that got away from you',
  blurb: 'Sorts by consequence and finds what can be dropped entirely.',
  tech: ['Prioritisation', 'Elimination'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['EVERYTHING_ON_MY_PLATE', 'HARD_DEADLINES', 'TIME_AVAILABLE', 'WHATS_DRAINING_ME'],
  body: `Everything currently on my plate: [EVERYTHING_ON_MY_PLATE]
Actual hard deadlines: [HARD_DEADLINES]
Time I realistically have: [TIME_AVAILABLE]
What is draining me most: [WHATS_DRAINING_ME]

Triage this. Do not build me a schedule that assumes I will be a perfectly efficient person, because I will not be, and a plan that requires that is a plan that fails on Tuesday.

Work through it this way.

First, sort by what actually happens if each item does not get done. Be specific: real consequence, someone is mildly annoyed, or nothing at all. A surprising share of any list falls into the third category and stays on the list purely through inertia.

Second, identify what can be dropped, delegated, or done at twenty percent quality without anyone caring. Say which. Doing something badly on purpose is a legitimate strategy and it is underused.

Third, find the items that are blocking other items. These go first regardless of their own importance, because their cost is compounding while they sit.

Fourth, find anything where a two-minute message unblocks a multi-hour task. These are usually the highest return actions available and they get postponed because they are uncomfortable rather than because they are hard.

Fifth, be honest about capacity. Given my stated hours, tell me what will not fit. Do not fit everything in by shrinking the estimates. If the list exceeds the time, the useful output is knowing what is being cut, deliberately, rather than finding out on Friday.

Then give me the plan: what to do first, what to do if the day goes sideways, and the one thing that if I only do that, the week was not wasted.

Then say what on this list is a symptom of something structural, meaning it will be back next week unless something changes.`
},
{
  id: 'life-second-opinion',
  box: 'life',
  title: 'Prepare for a professional appointment',
  blurb: 'Get your questions and your account in order beforehand.',
  tech: ['Elicitation', 'Structured preparation'],
  fit: 'Any frontier model. This prepares you to talk to a professional, it does not replace one.',
  weight: 2,
  vars: ['SITUATION', 'WHO_IM_SEEING', 'WHAT_I_WANT_FROM_IT', 'WHAT_I_ALREADY_KNOW'],
  body: `Situation: [SITUATION]
Who I am seeing: [WHO_IM_SEEING]
What I want to come out of the appointment: [WHAT_I_WANT_FROM_IT]
What I already know or have been told: [WHAT_I_ALREADY_KNOW]

Help me prepare. To be clear about the scope: you are helping me use a limited appointment well, not substituting for the professional's judgement. Keep to that.

Help me with:

My account of the situation. Professionals work from what I tell them, and people routinely leave out the detail that mattered or bury it after the less important things. Help me organise it: what happened, when it started, what changed it, what I have already tried, and what I have not mentioned to anyone because it seemed irrelevant. Ask me for the details you would expect a professional to want.

The questions to ask. Prioritised, because appointments run short and people ask the small questions first out of politeness and run out of time before the one that mattered. Include the questions people typically forget: what are the alternatives, what happens if we do nothing, what would change your recommendation, and what should I watch for afterwards.

What to bring. Documents, records, dates, numbers.

What to write down while I am there, since I will not remember it afterwards and people consistently overestimate that they will.

The follow-up questions to have ready depending on which way the conversation goes.

Then tell me what you would want to know that I have not told you, and ask me for it now rather than assuming.`
},
{
  id: 'life-explain-to-family',
  box: 'life',
  title: 'Explain something technical to someone you love',
  blurb: 'Without condescension and without losing the truth.',
  tech: ['Audience modelling', 'Register control'],
  fit: 'Any frontier model.',
  weight: 2,
  vars: ['THING', 'PERSON', 'WHY_THEY_NEED_TO_KNOW', 'WHAT_THEY_ALREADY_THINK'],
  body: `What I need to explain: [THING]
Who I am explaining it to: [PERSON]
Why it matters to them: [WHY_THEY_NEED_TO_KNOW]
What they currently believe about it: [WHAT_THEY_ALREADY_THINK]

Help me explain this well. The two failure modes are talking down to them and losing them in accuracy, and both damage trust, so aim between.

Give me:

The opening. Start from something they already understand and care about, not from the technical entry point. Where you start determines whether they stay.

The core explanation, in the register a person actually uses out loud. Short sentences. Concrete nouns. If a technical term is genuinely necessary, introduce it after the concept rather than before, so it becomes a label for something they already grasp instead of a hurdle.

How to handle their existing belief. If they currently believe something that is not quite right, do not open by correcting it. Say what is true about their view first, since almost every wrong belief contains something real, and then extend it. Being told you are wrong makes people defend their position.

The part where I say what I do not know. Being straight about the limits of my own understanding builds more trust than sounding certain, and it makes it safe for them to ask.

What they might be actually worried about underneath the question. Often the technical question is standing in for a practical or emotional one, and answering the surface question well while missing that is a wasted conversation.

Then give me two or three questions they are likely to ask, with answers.

Keep it warm and do not be patronising. No "think of it like a recipe" unless the analogy genuinely holds.`
}

);
