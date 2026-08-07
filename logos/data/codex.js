/* LOGOS · the codex
 * Techniques, the then/now table, failure modes, routing, and the letterpress glossary.
 */

/* ── Setting: the techniques that still earn their keep ───────────────── */
window.LOGOS_TECHNIQUES = [
  {
    id: 'explicit',
    name: 'Be explicit',
    rank: 'Foundational',
    line: 'State what you want. Do not rely on the model inferring it.',
    detail: `Modern models take you literally. That is a design choice, not a limitation: Claude 4.x and later were rebuilt to follow instructions as written rather than expanding on vague requests. The practical effect is that under-specification now costs you more than it used to, because the model will not quietly fill the gap with an ambitious interpretation.

"Create an analytics dashboard" gets you a minimum viable answer. "Create an analytics dashboard. Include as many relevant features and interactions as possible. Go beyond the basics to a fully-featured implementation" gets you the thing you pictured.

Lead with the verb. Say what the output should contain, not just what topic it concerns. Name the depth you want.`,
    when: 'Always. This is the one that fixes the most problems.',
    cost: 'Free. Usually shortens the prompt rather than lengthening it.'
  },
  {
    id: 'motivation',
    name: 'Give the reason, not just the rule',
    rank: 'Foundational',
    line: 'A rule with a reason attached generalises. A bare rule does not.',
    detail: `"NEVER use bullet points" is a rule the model applies mechanically and cannot extend. "I prefer flowing paragraphs because I find prose easier to read and bullets feel too formal for my casual learning style" is a rule the model can reason from, so it makes sensible calls about the adjacent cases you did not think to mention.

This matters most for anything reusable. A system prompt, a project instruction, a style guide. The rule fires on the case you imagined. The reason fires on the cases you did not.

Same principle applies to context: say what the output is for, who reads it, and what happens next with it.`,
    when: 'Any instruction that will be applied more than once, or any constraint that has edge cases.',
    cost: 'A sentence.'
  },
  {
    id: 'positive-form',
    name: 'Say what to do, not what to avoid',
    rank: 'Foundational',
    line: 'Negative instructions leave the positive space undefined.',
    detail: `"Do not use markdown" tells the model what to stop doing and nothing about what to do instead, so it picks. "Compose your response in smoothly flowing prose paragraphs" specifies the target.

There is a second-order effect worth knowing: the formatting of your prompt influences the formatting of the response. A prompt written in heavy markdown tends to produce heavy markdown back. If you want prose, write prose.

Keep a small number of genuine prohibitions for things that are actually never acceptable, and convert the rest to positive specifications.`,
    when: 'Any time you catch yourself writing "do not" or "never" more than twice.',
    cost: 'Free.'
  },
  {
    id: 'uncertainty',
    name: 'License the model to not know',
    rank: 'Foundational',
    line: 'One sentence, large reduction in confident fabrication.',
    detail: `Add: "If the data is insufficient to draw a conclusion, say so rather than speculating." Or: "Where you are reasoning from general patterns rather than from the specifics I gave you, mark it inline."

Without explicit permission, a model's default is to produce a complete-looking answer, because that is what a complete-looking answer looks like. With permission, the gaps become visible, and a visible gap is enormously more useful than an invisible one.

Pair it with a rule against invented citations if the task involves sources: "If you cannot find a source, say unsupported. Do not produce a plausible-looking reference."`,
    when: 'Anything factual, analytical, or research-adjacent. Effectively always.',
    cost: 'One sentence. Highest return per token in this list.'
  },
  {
    id: 'examples',
    name: 'One example, then stop',
    rank: 'Situational',
    line: 'Show the format you cannot describe. Then resist adding more.',
    detail: `Examples are the right tool when the target is easier to demonstrate than to specify: a particular summary style, an unusual output shape, a tone you cannot name.

Two cautions, both current. Modern models attend very closely to example details, so any incidental property of your example gets treated as a requirement. Pick examples that are clean.

And Anthropic's own finding from building Claude Code: for the newest generation, examples can actively constrain the model to the example's exploration space. Their replacement is better interface design. If you are describing how to use a tool, express it in the parameter names and enums rather than in a worked example.

Start with one. Add a second only if the output still misses.`,
    when: 'Format is hard to describe. Tone is hard to name. Output must be consistent across runs.',
    cost: 'Tokens on every call, plus the risk of over-fitting to the example.'
  },
  {
    id: 'cot',
    name: 'Chain of thought',
    rank: 'Situational',
    line: 'Reasoning before answering, in three escalating strengths.',
    detail: `Basic: add "think step by step".
Guided: name the stages. "First consider X. Then identify Y. Finally produce Z."
Structured: separate reasoning from output with tags, so you can read the reasoning and ship only the answer.

The modern caveat: if the model has extended thinking, that generally replaces manual chain of thought. Use manual CoT when thinking is unavailable, when you need the reasoning visible and reviewable, or when you specifically want the model to consider factors it might otherwise skip. The two are complementary rather than exclusive.

Worth knowing before you reach for the heavier variants: the Economical Prompting Index work found Self-Consistency (sampling many reasoning paths and voting) often produces statistically insignificant gains at substantially higher cost. On strong models, plain chain of thought scored better once cost was counted. Complexity is not free and is not automatically better.`,
    when: 'Multi-step analysis. Tasks with a checkable answer. Anywhere you need to audit the reasoning.',
    cost: 'Latency and tokens. Self-consistency multiplies both for often marginal gain.'
  },
  {
    id: 'prefill',
    name: 'Prefill the response',
    rank: 'Situational',
    line: 'Start the answer for the model and it continues from there.',
    detail: `On the API, put a partial assistant turn at the end of your messages array. If it opens with a brace, you get JSON with no preamble. If it opens in a character's voice, the voice holds.

In a chat interface you cannot literally prefill, but you can approximate it: "Output only valid JSON with no preamble. Begin your response with an opening brace."

The most common use is stripping the conversational wrapper from structured output so it can be parsed without cleanup.`,
    when: 'Structured output. Format enforcement. Skipping preamble. Holding a persona.',
    cost: 'None. API only for the real version.'
  },
  {
    id: 'chaining',
    name: 'Prompt chaining',
    rank: 'Situational',
    line: 'Split the task. Each step does one thing well.',
    detail: `Draft, then critique the draft, then revise against the critique. Extract, then verify, then format. Each stage gets a focused prompt and a clean context.

The reason this still works even on models with excellent long-context handling is not a context limit, it is focus. A prompt asking for one thing with clear boundaries reliably produces better work than a prompt asking for four things at once, because the model is not splitting its effort against competing objectives.

Trade latency and cost for accuracy. Worth it when the task is genuinely multi-stage or when a single prompt gives inconsistent results.`,
    when: 'Complex multi-stage work. Iterative refinement. When one prompt keeps producing mixed quality.',
    cost: 'Multiple calls. More latency. More orchestration to maintain.'
  },
  {
    id: 'progressive',
    name: 'Progressive disclosure',
    rank: 'Current practice',
    line: 'Load context when it is needed, not in case it is needed.',
    detail: `The instinct with a reusable instruction file is to put everything in it that might ever come up. That instinct is wrong, and it is the single most common context engineering mistake.

Everything permanently in context competes for attention with everything else and costs tokens on every request forever. The alternative is a tree: a short main file that points at detail loaded on demand. Skills work this way. Deferred tool loading works this way, where the agent searches for a tool definition rather than carrying every definition all the time.

Anthropic applied this to Claude Code itself and moved verification and code review out of the system prompt into skills that get called selectively.

Practical test for anything in your CLAUDE.md or system prompt: is this needed on most requests? If not, it belongs in a file that gets read when relevant.`,
    when: 'Any reusable context: system prompts, project instruction files, skills, agent harnesses.',
    cost: 'Some design work up front. Pays back on every subsequent call.'
  },
  {
    id: 'context-order',
    name: 'Context before instruction',
    rank: 'Current practice',
    line: 'Give the material first, then say what to do with it.',
    detail: `Put the document, the data, the samples before the task. The model reads the whole prompt before responding either way, but leading with context establishes the frame the instruction gets interpreted in.

For long inputs, put the most critical detail near the beginning or the end. The lost-in-the-middle problem is much reduced on current models but the ends still carry slightly more weight, and it costs nothing to place things well.

If you are including several distinct kinds of material, a clear label or a tag is worth it. Not for structure's sake, for boundary clarity: so it is unambiguous where the document stops and your instruction starts.`,
    when: 'Any prompt containing supplied material.',
    cost: 'Free.'
  },
  {
    id: 'interface',
    name: 'Design the interface, not the instruction',
    rank: 'Current practice',
    line: 'For agents: expressive parameters teach usage better than prose does.',
    detail: `This is the newest shift and the least widely known. When Anthropic rebuilt Claude Code's prompting for the Claude 5 generation, the number one rule for tool usage used to be "give examples". They found examples now constrain the model to the example's shape.

The replacement: make the tool itself expressive. A status field typed as an enum of pending, in_progress, completed communicates the intended usage without a paragraph explaining it. A well-named parameter is worth several sentences of description.

Corollary: put tool instructions in the tool description, not in the system prompt, and not in both. Duplication across the two creates conflicts the model has to spend effort resolving.`,
    when: 'Building agents, tools, MCP servers, or anything with a callable surface.',
    cost: 'Design time. Saves context on every call.'
  }
];

/* ── Then / Now: advice that expired ──────────────────────────────────── */
window.LOGOS_THENNOW = [
  {
    then: 'Wrap everything in XML tags',
    now: 'Clear headings and plain language usually do the same job',
    body: `XML tags were genuinely load-bearing for earlier models. Modern models parse structure without them. Anthropic's current guidance lists this under techniques you may have heard about, with the note that clear headings, whitespace, and explicit phrasing ("using the athlete information below") work just as well with less overhead.

Still worth using when: the prompt mixes several distinct content types, you need an unambiguous boundary around supplied material that might itself contain instructions, or you are targeting an older model.

Not worth using for: a single short block, or every section of a short prompt.`,
    verdict: 'Situational, not default'
  },
  {
    then: 'Assign an expert persona',
    now: 'Say what perspective you want applied',
    body: `"You are a world-class financial analyst with 30 years of experience" was doing real work in 2023. Now it mostly adds tokens, and over-specified roles can actively limit the model by constraining tone and scope.

Anthropic's guidance is blunt about the failure mode: "You are a helpful assistant" beats "You are a world-renowned expert who only speaks in technical jargon and never makes mistakes."

The replacement is to name the lens directly. Instead of "you are a risk manager", write "analyse this focusing on downside scenarios and capital preservation". You get the analytical frame without the costume.

Role prompting still earns its place when you need a consistent persona across many outputs, or a specific voice in a product.`,
    verdict: 'Mostly replaced by explicit framing'
  },
  {
    then: 'Give the model rules',
    now: 'Give it judgement, and reserve rules for the genuine never',
    body: `The clearest single data point in current practice: Anthropic removed over 80% of Claude Code's system prompt for the Claude 5 generation with no measurable loss on their coding evaluations.

The old prompt said things like "default to writing no comments, never write multi-line comment blocks". That rule is right most of the time and wrong when the code genuinely needs documentation, or when the user has their own preference. The new version says: "Write code that reads like the surrounding code: match its comment density, naming, and idiom."

Rules that hold ninety percent of the time actively damage the other ten. Capable models handle a judgement criterion better than a prohibition. Keep hard rules for things that are actually never acceptable.`,
    verdict: 'Reversed'
  },
  {
    then: 'Put everything upfront so the model can find it',
    now: 'Progressive disclosure',
    body: `The myth is that a project instruction file should be a central repository of every practice you might ever need, because otherwise the model will not find it.

That is no longer true and it is expensive. Everything in permanent context costs tokens on every request and competes for attention with the parts that matter on this request.

Structure it as a tree instead. A short main file, with detail in files that get loaded when relevant. Skills exist for exactly this. Some tools now use deferred loading, where the full definition is searched for rather than carried.`,
    verdict: 'Reversed'
  },
  {
    then: 'Repeat important instructions',
    now: 'Say it once, in the right place',
    body: `Earlier models attended unevenly across a long context and sometimes weighted the end more heavily, so practitioners repeated key instructions and referenced tools in both the system prompt and the tool description.

Current models do not need that, and the duplication creates a specific harm: when the two copies drift apart even slightly, the model has to resolve a conflict. Anthropic found exactly this in their own transcripts, with "leave documentation as appropriate" in one place and "DO NOT add comments" in another.

Put tool instructions in tool descriptions. Say each thing once.`,
    verdict: 'Reversed'
  },
  {
    then: 'Longer prompts are better prompts',
    now: 'The best prompt is the shortest one that reliably works',
    body: `Length correlates with effort, not with quality. Every added instruction competes for attention and adds surface area for internal contradiction.

There is also an old and often-cited finding that reasoning performance begins degrading well below the advertised context maximum. Current models handle long context far better than they did, and Anthropic notes real improvements on the lost-in-the-middle problem, but the underlying advice holds for a different reason: a focused task with clear boundaries produces better work than an overloaded one, regardless of whether the window can hold it.

Start minimal. Add only what testing shows is needed.`,
    verdict: 'Still true, for a better reason'
  },
  {
    then: 'Self-consistency: sample many paths and vote',
    now: 'Usually not worth the cost on strong models',
    body: `Sampling multiple reasoning paths and taking the most common answer is a real technique with real published gains on weaker models.

The Economical Prompting Index study evaluated six advanced prompting techniques across ten models and four datasets, scoring accuracy against token consumption. Self-consistency frequently produced statistically insignificant gains while becoming cost-prohibitive. On a strong model, plain chain of thought scored better once cost concern was factored in.

Reach for it when correctness genuinely dominates cost and the answer is discrete enough to vote on. Otherwise a single strong pass, or a chained critique step, gives more per dollar.`,
    verdict: 'Overrated in most contexts'
  },
  {
    then: 'Save things to memory manually',
    now: 'Increasingly automatic, and specs can be richer than markdown',
    body: `The pattern of manually writing notes into a persistent instruction file is giving way to systems that save relevant memory automatically.

Related shift: a specification does not have to be a markdown file. Current guidance is that a spec can be a test suite, a function in another codebase to port, an HTML mockup, or a rubric that a verifier agent checks against. For a design, an HTML mockup produces better results than a description or a screenshot of one.

Prefer references that live in code, because code is a high-fidelity instruction in a language the model knows very well.`,
    verdict: 'Evolving'
  }
];

/* ── Lockup: how it goes wrong ────────────────────────────────────────── */
window.LOGOS_FAILURES = [
  {
    id: 'trifecta',
    name: 'The lethal trifecta',
    severity: 'critical',
    line: 'Private data plus untrusted content plus an outbound channel equals exploitable.',
    body: `Simon Willison's formulation, now adopted into OWASP's agentic skills work, identifies the architectural pattern rather than the individual bug. An agent is exploitable when it has all three of:

1. Access to private or sensitive data
2. Exposure to content it did not author (web pages, emails, documents, tickets, tool responses, other agents' output)
3. Any way to communicate outward

Any two are usually fine. All three, and untrusted content can instruct the agent to take your data and send it somewhere.

The reason this framing matters is that it locates the fix in architecture rather than in instructions. You cannot prompt your way out of it. You remove one of the three, or you gate the third behind a meaningful human confirmation.`,
    fix: 'Split the agent. The component that reads untrusted content gets no tools and no data access, and passes only validated structured output onward.'
  },
  {
    id: 'injection',
    name: 'Prompt injection',
    severity: 'critical',
    line: 'Ranked LLM01 by OWASP. Still unsolved at the model layer.',
    body: `An attacker puts instructions into content your model reads, and the model cannot reliably distinguish those instructions from yours. Direct injection comes through user input. Indirect injection, which is the one that matters in agent systems, comes through a document, a web page, an email body, a code comment, or invisible text in a PDF.

OWASP's position is that neither RAG nor fine-tuning fully mitigates this class, and that the answer is defence in depth: least-privilege tooling, input and output filtering, human approval on high-risk actions, and regular adversarial testing.

Concrete numbers on why filtering alone is insufficient: Anthropic's own Opus 4.5 system card reports indirect injection attack success in agentic coding environments at roughly 4.7% at one attempt, 33.6% at ten, and 63.0% at a hundred. Attackers get to retry.`,
    fix: 'Least privilege on every tool. Human approval before anything that writes, sends, pays, or deletes. Allowlist outbound destinations. Treat scanners as one layer, never the only one.'
  },
  {
    id: 'skill-supply-chain',
    name: 'The skill supply chain',
    severity: 'high',
    line: 'Installing a skill or an MCP server is installing code you did not read.',
    body: `Agent skills spread fast in 2025 and 2026 and the security picture caught up quickly. OWASP maintains an Agentic Skills Top 10 as an incubator project specifically because of it.

The research findings are worth knowing before you install anything. Trail of Bits reported in June 2026 that every public skill scanner they tested was bypassed within an hour, through payload padding that forces truncation, logic hidden in binary and archive formats, and injecting the scanner's own judging model. Air Security reported a researcher-built malicious skill reaching over 26,000 agents while scanners cleared it, with the payload served from an attacker-controlled external URL. A follow-up scan of 142,836 live skills found 12.4% resting on at least one untrusted external instruction source.

The pattern to watch for specifically: a skill whose instructions tell the agent to fetch further instructions from a URL. That indirection is the vector.`,
    fix: 'Read skills before installing. Refuse any that fetch instructions from an external URL at runtime. Pin versions. Sandbox anything with filesystem or network access.'
  },
  {
    id: 'confident-wrong',
    name: 'Confident fabrication',
    severity: 'high',
    line: 'The failure mode with no visible signal.',
    body: `A model producing a fluent, well-structured, entirely wrong answer looks identical to one producing a correct answer. There is no tell in the output, which is precisely what makes it dangerous in workflows where nobody checks.

It concentrates in predictable places: specific numbers, citations and references, quotes, dates, version numbers, API signatures, legal and regulatory specifics, and anything that changed after the model's training cutoff. It is worse when the question presupposes something false, because the model tends to accept the premise.

The single most effective mitigation is explicit permission to not know, which costs one sentence. The second is asking for the reasoning or the source alongside the claim, which makes the answer checkable rather than merely assertable.`,
    fix: 'License uncertainty explicitly. Demand sources for factual claims and treat unsourced ones as unverified. Never accept a citation without checking it exists.'
  },
  {
    id: 'perception-gap',
    name: 'The productivity perception gap',
    severity: 'medium',
    line: 'People are unreliable judges of whether AI sped them up.',
    body: `This one is about your own evaluation rather than the model's output, and it deserves a place here because it distorts every decision downstream.

METR ran a randomised controlled trial in early 2025 with experienced open-source developers working in their own repositories. Measured result: tasks took 19% longer with AI tools. Self-reported result from the same developers afterward: roughly 20% faster. The gap between measurement and perception was the finding, not the slowdown.

The honest epilogue matters as much as the headline. In February 2026, METR published an update saying selection effects in their follow-up study were severe enough that they were redesigning the experiment, and they do not have a clean answer. Their later self-report survey of 349 technical workers found a median 1.4 to 2x claimed increase in value of work, while noting reasons to be sceptical of the magnitude.

So the correct read is not "AI makes you slower". It is that self-assessment is not evidence, in either direction, and that anyone quoting either number as settled is overreaching.`,
    fix: 'Measure something. Time a real task with and without. Build an eval before tuning a prompt. Do not trust the feeling of speed.'
  },
  {
    id: 'context-rot',
    name: 'Context accumulation',
    severity: 'medium',
    line: 'Long agent runs fill the window with their own exhaust.',
    body: `Agents run in loops. Each tool call returns output, each step of reasoning stays in context, and the window fills with intermediate material that mattered for one step and is now noise.

This is why context engineering became the discipline rather than prompt engineering. LangChain's framing of the four strategies is a useful checklist: write (persist state outside the window), select (retrieve only what is relevant now), compress (summarise and compact), isolate (give separate agents separate contexts).

The failure is gradual rather than sudden. Quality degrades, the agent starts repeating work it already did, and instructions from early in the run get outweighed by a hundred tool results.`,
    fix: 'Compact between phases. Persist state to a file rather than carrying it. Give subagents clean contexts rather than passing the whole history down.'
  },
  {
    id: 'over-agentic',
    name: 'Reaching for an agent too early',
    severity: 'medium',
    line: 'Most tasks labelled agentic are one call with structured output.',
    body: `Every layer of orchestration adds latency, cost, failure surface, and a place for state to go wrong. Multi-agent architectures are frequently deployed where a single well-specified call would have worked.

Guidance from teams doing this at scale converges on the same shape: default to the simplest pattern that works, and make the more complex pattern justify itself. Hierarchies deeper than two delegation levels tend to show diminishing returns against meaningfully more latency. Watch for the hollow middle, meaning a mid-level agent that only dispatches and collects without adding synthesis. Either give it real work or flatten the hierarchy.

Also worth separating properly: the deterministic parts of your workflow should be code, not a model. Putting a model where an if-statement belongs buys nondeterminism for no benefit.`,
    fix: 'Start with one call. Escalate only when you can name what the simpler version fails at.'
  }
];

/* ── Routing: choosing a model without a leaderboard ──────────────────── */
window.LOGOS_ROUTING = {
  preamble: `Model leaderboards change monthly and any specific ranking written here would be wrong within a quarter. What does not change is the shape of the decision. Route on task characteristics, then verify with your own eval on your own data.

The universal finding across every comparison published in 2026: there is no single best model, output tokens cost far more than input tokens, and budget tiers are dramatically cheaper rather than slightly cheaper. That pricing asymmetry means work that reads a lot and answers briefly is cheap, while work that takes a short question and generates a lot is expensive. The same model can produce wildly different bills across two workflows.`,
  axes: [
    {
      axis: 'Stakes of being wrong',
      low: 'Small, fast model. Classification, extraction, routing, tagging, first-pass drafts.',
      high: 'Frontier model, and add a verification step regardless of which model.'
    },
    {
      axis: 'Volume',
      low: 'Use the best model. At low volume the cost difference is irrelevant and quality is not.',
      high: 'Route. Classify cheaply first, escalate only the hard cases. This is where the money is.'
    },
    {
      axis: 'Input size versus output size',
      low: 'Long input, short output is the cheap shape. Summarising, extracting, classifying.',
      high: 'Short input, long output is the expensive shape. Generation, drafting, code writing.'
    },
    {
      axis: 'Steps required',
      low: 'One-shot tasks run fine on mid-tier models.',
      high: 'Long agentic loops need strong instruction-following and consistency across many turns. This is where models differ most and where the frontier tier earns its price.'
    },
    {
      axis: 'Constraint density',
      low: 'Few constraints, any capable model.',
      high: 'Many simultaneous constraints is where models diverge sharply. Some drop constraints late in a complex prompt. Test this specifically with your real constraints.'
    },
    {
      axis: 'Latency sensitivity',
      low: 'Batch or background work can use a slow reasoning model.',
      high: 'Interactive and user-facing work needs a fast tier, or a fast first response with escalation behind it.'
    }
  ],
  rules: [
    'Build model-agnostic. Do not hardcode one provider into your system, because the ranking will change and you want to be able to switch.',
    'Route rather than pick. Classify with a cheap model, dispatch to the appropriate tier.',
    'Benchmarks tell you a model improved. They do not tell you it will work on your data, in your product, under your constraints. Only your eval does.',
    'Test the boring failure: give it your longest real prompt with all your real constraints and see which constraint gets dropped.',
    'Recheck quarterly, not weekly. The churn is faster than the value of reacting to it.'
  ]
};

/* ── The stack: what connects a model to your work ────────────────────── */
window.LOGOS_STACK = [
  {
    id: 'mcp',
    name: 'MCP',
    expand: 'Model Context Protocol',
    role: 'How a model reaches your tools and data',
    body: `An open protocol for connecting model applications to external tools and data sources, using a host, client, and server architecture with primitives for tools, resources, prompts, sampling, roots, and elicitation. The common shorthand is USB-C for AI applications: one connector standard instead of a bespoke integration per tool.

Anthropic open-sourced it in late 2024 and donated it to the Linux Foundation in December 2025, forming the Agentic AI Foundation with support from AWS, Google, and Microsoft. By mid-2026 it had passed 97 million SDK downloads with thousands of servers in the official registry, and native support across the major model providers, the main agent frameworks, and the AI-native IDEs.

The 2026 roadmap is about production hardening rather than new capability: transport scalability, server discovery, long-running tasks, enterprise authentication, event triggers, streaming, and a skills primitive.`,
    use: 'When your agent needs to touch a real system: a database, a repo, a calendar, a broker, an internal API.',
    caution: 'Every server you connect widens the attack surface. Sandbox anything with filesystem or network access. Version your tool schemas, because clients cache capabilities and an unversioned breaking change will crash workflows.'
  },
  {
    id: 'skills',
    name: 'Skills',
    expand: 'SKILL.md and equivalents',
    role: 'How a model knows your procedures',
    body: `A skill is a folder with instructions the agent loads only when relevant. Anthropic launched them in October 2025 specifically to solve context bloat, and the format spread quickly across the ecosystem.

The mechanism that matters is progressive disclosure. The agent reads only the short description to decide whether to load the skill, so the description is the highest-leverage part: it must fire on the right cases and not on plausible-looking wrong ones. The body then carries the opinions, gotchas, and quality bar that a general model would not otherwise have.

MCP and skills are complementary rather than competing. Skills structure what the agent knows and how it proceeds. MCP gives it hands to act with.`,
    use: 'Any procedure you repeat, any house style, any workflow with a specific order or quality bar.',
    caution: 'Read before installing. The documented attack pattern is a skill that instructs the agent to fetch further instructions from an external URL at runtime, which no scanner reliably catches.'
  },
  {
    id: 'instructions',
    name: 'Instruction files',
    expand: 'CLAUDE.md, AGENTS.md, rules files',
    role: 'The context that loads on every request',
    body: `A file the agent reads at the start of every session in a project. AGENTS.md emerged as a cross-tool convention; CLAUDE.md and various rules files serve the same purpose in their own ecosystems.

Current guidance is much more restrained than the original practice. Keep it lightweight. Briefly say what the repo is for, then spend most of the tokens on gotchas: the things that are not discoverable by looking at the file tree. Avoid stating the obvious, since the agent can read the repo.

Anything long or conditionally relevant should be split into a skill or a reference file and pointed at, not inlined.`,
    use: 'Per-project conventions, hard-won knowledge, the reason that strange file exists.',
    caution: 'This loads on every request forever, so every wasted line is a recurring cost. Watch specifically for instructions here that contradict your system prompt or your skills.'
  },
  {
    id: 'orchestration',
    name: 'Orchestration',
    expand: 'Pipelines, routers, supervisors',
    role: 'How multiple steps become one workflow',
    body: `Six patterns cover almost everything. Sequential pipeline: fixed stages, each feeding the next. Router: classify, then dispatch to a specialised path. Parallel fan-out and merge: independent subtasks at once, results combined. Supervisor or orchestrator with subagents: a planner delegates and synthesises. Hierarchical: supervisors of supervisors. Evaluator-optimiser: generate, score against criteria, revise below threshold.

Production systems typically combine two or three. The pattern determines latency, failure behaviour, cost, and how much complexity the system can carry before it stops being reliable.

The reported sweet spot for hierarchy is two delegation levels. A third adds latency and information loss for diminishing return.`,
    use: 'When a task genuinely has distinct stages with different requirements.',
    caution: 'Keep deterministic logic in code. A model where an if-statement belongs adds cost and nondeterminism for nothing. Passing full conversation history to every node is the fastest way to blow your token budget and degrade reasoning.'
  },
  {
    id: 'evals',
    name: 'Evals',
    expand: 'Systematic evaluation',
    role: 'How you know a change was an improvement',
    body: `A test set, grading criteria, and a baseline. Without them, every prompt change is judged by whether you like the one output you looked at, which cannot detect a change that fixes your case and breaks three others.

Push as much grading as possible into programmatic checks: valid format, required field present, length in range, forbidden string absent. Those are cheap, repeatable, and do not drift. Reserve judgement grading for what genuinely needs it, and write a rubric specific enough that two graders would agree.

Make every failure you have already seen a permanent regression case, so it cannot come back silently.`,
    use: 'Any prompt that runs more than a handful of times. Any agent going near production.',
    caution: 'A vague rubric produces noisy scores that hide real regressions. And set a stopping rule, or you will optimise a prompt that was already good enough.'
  },
  {
    id: 'context-eng',
    name: 'Context engineering',
    expand: 'The discipline around the prompt',
    role: 'Curating everything the model sees',
    body: `Anthropic's definition: the set of strategies for curating and maintaining the optimal set of tokens during inference, including all the information that lands there from outside the prompt.

Your system prompt, retrieved documents, tool outputs, memory, instruction files, and conversation history are all context. Managing that mix is the job. Prompt engineering did not go away; it is a component of this rather than a competitor to it. Anthropic's own framing is that prompting and context engineering are converging for the newest model generation, with less scaffolding and more curation.

LangChain's four strategies are the practical handles: write, select, compress, isolate.

The reason this became the headline skill is agents. A single-turn prompt is a rounding error next to a loop that accumulates dozens of tool outputs and intermediate steps.`,
    use: 'Anything running longer than one turn. Anything reusable across many requests.',
    caution: 'Treat context as infrastructure rather than a text file. Version it, review it, and know what went into any given answer.'
  }
];

/* ── The glossary: pressroom terms this site uses on purpose ──────────── */
window.LOGOS_GLOSSARY = [
  { term: 'Sort',           press: 'A single piece of metal type.',                                     here: 'One prompt in the case.' },
  { term: 'The case',       press: 'The compartmented drawer sorts live in, sized by frequency of use.', here: 'The prompt library, with bins scaled to what they hold.' },
  { term: 'Composing stick', press: 'The handheld tray where a line is set, one sort at a time.',        here: 'The builder. Assemble a prompt from parts and watch it set.' },
  { term: 'Galley',         press: 'The tray holding type set but not yet locked up.',                   here: 'Your working selection, before you copy it out.' },
  { term: 'Chase',          press: 'The iron frame everything is locked into before printing.',          here: 'The context window. Fixed size. Everything competes for it.' },
  { term: 'Furniture',      press: 'Wood and metal spacing that fills the chase around the type.',       here: 'Scaffolding: tags, roles, boilerplate. Necessary less often than you think.' },
  { term: 'Quoin',          press: 'The expanding wedge that locks the forme tight.',                    here: 'The constraint that holds the whole prompt together.' },
  { term: 'Em quad',        press: 'A spacer as wide as the type size is tall. The unit of measure.',    here: 'The weight meter on each prompt.' },
  { term: 'Lockup',         press: 'Tightening the forme so nothing shifts under pressure.',             here: 'The safety section. What holds when the run goes wrong.' },
  { term: 'Out of sorts',   press: 'Having run out of a needed letter, unable to finish the line.',      here: 'Hitting the context limit mid-task.' },
  { term: 'Imposition',     press: 'Arranging pages so they read correctly once folded.',                here: 'Orchestration. The order steps have to run in.' },
  { term: 'Proof',          press: 'A test pull, checked before committing the press run.',              here: 'Your eval. Run it before you ship the prompt.' }
];
