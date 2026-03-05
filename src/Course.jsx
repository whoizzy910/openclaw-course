import { useState, useEffect, useRef } from "react";

const COURSE_DATA = {
  title: "Maximize OpenClaw",
  subtitle: "A 1.5-Hour Masterclass",
  totalMinutes: 90,
  modules: [
    {
      id: 1,
      title: "What OpenClaw Actually Is",
      duration: 10,
      emoji: "🦞",
      color: "#FF6B35",
      lessons: [
        {
          title: "Beyond the Chatbot",
          duration: 4,
          content: `OpenClaw is not a chat interface — it's a **local gateway process** that runs continuously on your machine (or a VPS) and connects to the messaging apps you already use. Every incoming message is routed through an LLM-powered agent that can reply *and* take real action in the world.

Think of it as "Claude with hands." It can read your files, run shell commands, send emails, browse the web, and manage your calendar — all without you being at your computer.

**The 5 design principles that make it special:**
- **Multi-channel gateway** — one inbox accepts WhatsApp, Telegram, Discord, iMessage, and more simultaneously
- **Persistent memory** — it remembers across every session via local Markdown files you own
- **Proactive heartbeat** — it wakes up on a schedule and checks things *without you prompting it*
- **Skill system** — extend capabilities by installing or writing SKILL.md files
- **Model-agnostic** — bring your own API key for Claude, GPT, Gemini, or a local Ollama model`,
        },
        {
          title: "The Architecture in 3 Minutes",
          duration: 3,
          content: `Everything flows through a single Node.js process called **the Gateway** — the "single source of truth" for sessions, routing, and channel connections.

\`\`\`
WhatsApp / Telegram / Discord / iMessage
           ↓
     Channel Adapters
           ↓
        Gateway
     (ws://127.0.0.1:18789)
           ↓
    Agent Runtime Loop:
    message → intent → context → tools → action → response
           ↓
    LLM Provider (Claude / GPT / Gemini / Ollama)
\`\`\`

**Key insight:** You don't expose raw LLM calls to user input. The Gateway is a controlled orchestration layer that handles routing, queuing, state, and tool execution. This is the pattern powering every serious AI agent today.`,
        },
        {
          title: "The Core Files You Must Know",
          duration: 3,
          content: `OpenClaw's behavior is defined by plain Markdown files in \`~/.openclaw/workspace/\`. These are the ones that matter most:

| File | Purpose | Loaded When |
|------|---------|-------------|
| **SOUL.md** | Agent identity, personality, values, rules | Every reasoning cycle |
| **MEMORY.md** | Long-term curated facts about you & your work | Every session |
| **HEARTBEAT.md** | Proactive scheduled checks | Every heartbeat poll |
| **AGENTS.md** | Multi-agent workspace routing | Session start |
| **CLAUDE.md** | Shared workspace instructions | Session start |

**The mental model:** SOUL.md is the constitution. MEMORY.md is the long-term diary. HEARTBEAT.md is the morning checklist. Skills are learned behaviors that layer on top of all of it.`,
        },
      ],
    },
    {
      id: 2,
      title: "Installation & First Run",
      duration: 12,
      emoji: "⚙️",
      color: "#4ECDC4",
      lessons: [
        {
          title: "Prerequisites & Hardware Choice",
          duration: 3,
          content: `**Minimum requirements:** A machine with 2GB+ RAM running Linux, macOS, or Windows, plus API access to your chosen LLM provider.

**Where to run it — your three options:**

1. **Your main computer** — easiest to start, but the agent sleeps when your laptop does. Good for experimenting.
2. **Dedicated local machine** — a Mac Mini (~$600) is the community favorite. It sits in your home, runs 24/7, and has access to your native Apple apps (Calendar, Reminders, Notes) with zero configuration.
3. **VPS / cloud server** — always-on from anywhere. DigitalOcean has a 1-Click OpenClaw Deploy with a hardened security image. Contabo and others are popular for cost reasons.

**Pro tip from power users:** Start on the computer you already have. Move to a dedicated device once you know which workflows you actually want running while you sleep.`,
        },
        {
          title: "Install & Connect a Channel",
          duration: 5,
          content: `**Installation (Node.js required):**
\`\`\`bash
npm install -g openclaw
openclaw gateway   # Start the gateway
openclaw chat      # Talk to it in terminal
\`\`\`

**Connect Telegram (easiest first channel):**
1. Message \`@BotFather\` on Telegram
2. Run \`/newbot\` and follow prompts → get your token
3. Add it to \`openclaw.json\`:
\`\`\`json
{
  "channels": {
    "telegram": { "token": "YOUR_BOT_TOKEN" }
  }
}
\`\`\`
4. Restart the gateway — you're now texting your agent from your phone.

**Useful slash commands once running:**
- \`/status\` — session info, model, token count
- \`/model claude-opus-4\` — switch models on the fly
- \`/update\` — pull latest version
- \`openclaw doctor\` — surface misconfigurations

**Keep it running 24/7 with PM2:**
\`\`\`bash
npm install -g pm2
pm2 start "openclaw gateway" --name openclaw
pm2 save && pm2 startup
\`\`\``,
        },
        {
          title: "Security Basics (Don't Skip This)",
          duration: 4,
          content: `OpenClaw can execute shell commands, read files, send emails, and make API calls on your behalf — on a loop, without asking. The attack surface is real.

**Non-negotiable rules:**

🔒 **Patch immediately** — CVE-2026-25253 (CVSS 8.8) was a WebSocket hijack bug giving one-click RCE. It was patched in 2026.1.29. Run \`/update\` now and regularly.

🔒 **Principle of least privilege** — run the agent as a non-root user with minimal permissions. Enable advanced tools (terminal_access) only after adding safeguards.

🔒 **Never put secrets in workspace files** — store API keys in environment variables or a secrets manager, not in SOUL.md or MEMORY.md.

🔒 **Vet every skill before installing** — 341 malicious skills were found on ClawHub in one audit. Run \`skill-vetter\` on any skill before installing it. Check the VirusTotal report on its ClawHub page. Review source code.

🔒 **Give the agent its own accounts** — set up separate email and storage for it, not your personal credentials.

🔒 **Don't expose the Gateway to the public internet** — if you need remote access, use an SSH tunnel or Tailscale.`,
        },
      ],
    },
    {
      id: 3,
      title: "Crafting Your SOUL.md",
      duration: 15,
      emoji: "🧠",
      color: "#A855F7",
      lessons: [
        {
          title: "Why SOUL.md Is Your Highest-Leverage File",
          duration: 4,
          content: `SOUL.md is the agent's **constitution** — the immutable principles read at the start of *every* reasoning cycle, before any skill instructions are processed. It determines:

- Communication style (formal vs casual, brief vs thorough)
- Confirmation rules (when to ask before acting)
- Privacy boundaries (what it can share, store, or access)
- Honesty policies (what to do when uncertain)
- Values and ethical guardrails

**The key insight:** Skills add capabilities. SOUL.md defines boundaries. A poorly written SOUL.md means the agent is inconsistent, unpredictable, or potentially unsafe. A great SOUL.md means every skill, every tool, every interaction feels coherent — like a trusted teammate who knows how you work.

OpenClaw has a \`soulcraft\` skill that guides you through building one via a structured conversation. Use it for new agents.`,
        },
        {
          title: "What a Strong SOUL.md Contains",
          duration: 6,
          content: `**The four sections every SOUL.md needs:**

**1. Identity block**
\`\`\`markdown
# Agent Identity
- **Name:** Zara
- **Personality:** Direct, pragmatic, builder mindset
- **Communication style:** Concise. Lead with the answer. Use bullet points for lists, prose for reasoning.
- **Tone:** Professional but never stuffy. Dry humor is fine.
\`\`\`

**2. Core values**
\`\`\`markdown
## Values
- Accuracy over speed — if uncertain, say so. Never fabricate.
- Privacy first — treat all user data as confidential.
- Always confirm before: sending external emails, deleting files, making purchases.
- Transparency — briefly note what tool you're using and why.
\`\`\`

**3. Operating rules**
\`\`\`markdown
## Rules
- Never store API keys or passwords in memory files.
- When summarizing emails, redact account numbers and passwords.
- If a task fails, report the exact error — do not sugarcoat.
- Do not commit code without explicit approval.
\`\`\`

**4. Context about you**
\`\`\`markdown
## About the User
- Works in software engineering, prefers technical depth
- Time zone: PST. Work hours: 9am–6pm
- Prefers Telegram for quick questions, email for detailed reports
- Dislikes excessive caveats — just answer the question
\`\`\`

**Keep SOUL.md concise.** It's injected every cycle — bloated files waste tokens and slow responses.`,
        },
        {
          title: "Common SOUL.md Mistakes",
          duration: 5,
          content: `**Mistake 1: Vague personality descriptors**
❌ "Be helpful and friendly"
✅ "Lead with the direct answer. Use 3 sentences or fewer for simple questions. Use structured Markdown for anything requiring multiple steps."

**Mistake 2: Contradicting instructions**
Saying "always confirm before acting" in SOUL.md but "act immediately on calendar requests" in a skill creates unpredictable behavior. SOUL.md wins — it loads first.

**Mistake 3: Storing sensitive context**
Putting client names, account numbers, or project details in SOUL.md means that data leaks into every session — including group chats where others might see it. Sensitive context belongs in project-specific memory files, loaded only in relevant sessions.

**Mistake 4: Bloating with excessive rules**
Every line in SOUL.md burns tokens on every cycle. 30 rules is too many. Distill down to 8–12 that genuinely change behavior.

**Mistake 5: Never updating it**
Your working style evolves. Schedule a quarterly "agent review" — run the OpenClaw MD Improver skill to audit SOUL.md, CLAUDE.md, and openclaw.json for inconsistencies, missing context, and exposed secrets.`,
        },
      ],
    },
    {
      id: 4,
      title: "Memory & HEARTBEAT Mastery",
      duration: 15,
      emoji: "💾",
      color: "#F59E0B",
      lessons: [
        {
          title: "The Memory Architecture",
          duration: 5,
          content: `OpenClaw's memory is split across two layers with different lifespans:

**Daily logs** (\`memory/YYYY-MM-DD.md\`) — raw session logs, tool outputs, meeting notes. High volume, short relevance. Think of these as your agent's working notebook.

**MEMORY.md** — curated long-term facts. Low volume, high permanence. Updated by the agent (or you) when something important needs to persist for months.

**The key workflow:**
\`\`\`
Daily work → memory/2026-03-03.md (raw)
     ↓ (weekly heartbeat review)
Important facts → MEMORY.md (curated)
     ↓ (monthly)
Stale info → archived or deleted
\`\`\`

**Project-specific memory** — for ongoing projects, create \`memory/project-name.md\`. Any agent can read the status of a project by reading one file.

**Critical security rule:** Only load MEMORY.md in your main private session. Never include it in shared contexts like Discord servers or group chats — it contains personal context that shouldn't leak.`,
        },
        {
          title: "Designing Your HEARTBEAT.md",
          duration: 5,
          content: `HEARTBEAT.md runs on every heartbeat poll — this is how your agent stays proactive. The trap is making it too large.

**The golden rule: Keep HEARTBEAT.md small.** It's injected on every poll. Rotate through checks rather than running everything every time.

**A lean, effective template:**
\`\`\`markdown
# HEARTBEAT

## Quick Checks (rotate through 2–4× daily)
- [ ] Urgent emails needing response within 4 hours?
- [ ] Calendar events in the next 2 hours with missing prep?
- [ ] Any failing cron jobs or error alerts?

## Daily (7am)
- [ ] Pull today's calendar and send morning brief to Telegram
- [ ] Check open GitHub PRs and summarize blockers
- [ ] Review yesterday's memory log for any open action items

## Weekly (Sunday 9am)
- [ ] Review past 7 days of memory/*.md files
- [ ] Update MEMORY.md with significant learnings
- [ ] Archive memory files older than 30 days
\`\`\`

**Disable native heartbeat for expensive health checks** — run an isolated lightweight heartbeat for monitoring instead. The native heartbeat carries full active-session context; an isolated one stays cheap and bounded.`,
        },
        {
          title: "Memory Retrieval & Compression",
          duration: 5,
          content: `As your agent accumulates history, raw memory files become expensive. Two techniques to manage this:

**Technique 1: memory_search before loading**
Instead of loading entire memory files into context, use \`memory_search\` to find relevant snippets first. This dramatically reduces token usage for agents with large knowledge bases. Include \`Source: <path#line>\` citations when referencing memory so you can trace facts back to their origin.

**Technique 2: Compression via heartbeat**
Your weekly heartbeat should actively compress:
\`\`\`
Weekly review task → read past 7 days logs →
extract key facts → update MEMORY.md with 3–5 bullet points →
delete or archive raw daily files
\`\`\`

**The context explosion problem:** The longer you use OpenClaw, the worse naive setups get. History grows, MEMORY.md grows, SOUL.md accumulates rules. Each session injects all of it — token costs compound exponentially. Power users recommend:
- Cap MEMORY.md at 500 lines; archive the rest
- Use per-agent model selection (lighter models for heartbeat, heavier for complex tasks)
- Cache API responses in memory files rather than re-fetching
- Store computed data locally rather than regenerating`,
        },
      ],
    },
    {
      id: 5,
      title: "Skills: Install, Vet & Build",
      duration: 18,
      emoji: "🛠️",
      color: "#10B981",
      lessons: [
        {
          title: "How the Skill System Works",
          duration: 4,
          content: `A skill is a folder containing a plain Markdown file called **SKILL.md**. That file has YAML frontmatter describing the skill's metadata, followed by step-by-step instructions that load into the agent's context when the skill is active.

\`\`\`markdown
---
name: My Calendar Assistant
description: Manage calendar events via natural language
version: 1.0.0
requirements:
  - icalBuddy  # macOS only
---

## Instructions
When the user asks to add a calendar event, do the following:
1. Extract: event name, date, time, duration, and any attendees
2. Confirm the details with the user before creating
3. Use the calendar tool to create the event
4. Confirm success and offer to add a reminder

## Rules
- Never create events in the past
- Always confirm the timezone if not specified
\`\`\`

**Skill precedence:** workspace skills > user skills > bundled skills. If you customize a bundled skill, put your version in the project folder — it takes priority automatically.

**Install via ClawHub:**
\`\`\`bash
openclaw skills install <skill-name>
clawhub list         # show installed
clawhub update --all # update everything
\`\`\``,
        },
        {
          title: "The Skills Worth Actually Installing",
          duration: 6,
          content: `ClawHub has 13,000+ skills. Most are low-effort API wrappers. The genuinely useful ones are concentrated in ~30–40, and half are bundled with OpenClaw already. The community guideline: **start with the five essentials, then add based on what you actually use.**

**Essential bundled skills (already installed):**
- \`web-search\` — browse the web, find current info
- \`memory-manager\` — structured memory read/write/search
- \`cron-scheduler\` — schedule recurring tasks
- \`file-manager\` — safe file operations with confirmation
- \`skill-vetter\` — scan skills for security issues before installing

**Best third-party skills (from @steipete, the creator):**
- \`apple-calendar\` — native macOS Calendar via AppleScript, no API key
- \`apple-reminders\` — native macOS Reminders
- \`apple-notes\` — read/write Notes
- \`apple-contacts\` — name lookup without credentials
- \`apple-mail\` — native Mail access
- \`apple-messages\` — iMessage integration

**If you're on a Mac, install all six Apple skills.** They require zero API configuration and turn a Mac Mini into a fully capable personal assistant.

**For developers:**
- \`github-skill\` — PRs, issues, code review summaries
- \`terminal-safe\` — shell access with whitelisted commands
- \`git-workflow\` — branch management, commit summaries`,
        },
        {
          title: "Vetting & Building Your Own",
          duration: 4,
          content: `**Before installing any third-party skill:**

1. Run \`skill-vetter\` on the skill name first
2. Check the VirusTotal report on its ClawHub page
3. Look at the author — @steipete skills are first-party. Unknown authors with 1 version and 0 stars: read source code manually.
4. Check version count and community stars — a skill with 12 versions and 338 stars has been maintained and battle-tested
5. If testing unknown skills, use a disposable VM or rental machine

**The malware pattern to recognize:** Skills with legitimate-looking SKILL.md files that contain malware commands buried in fake "prerequisites" sections, with 24–48 hour activation delays. They often have names like "smart-email-assistant."

**Building your own (the right way):**
Treat SKILL.md like a recipe for a very literal cook. The LLM executes what it reads — ambiguous instructions produce inconsistent behavior. Write with:
- **Explicit triggers** — exactly when should this activate?
- **Numbered steps** — no ambiguity about sequence
- **Edge case rules** — what to do when inputs are missing or malformed
- **Confirmation requirements** — when must the agent pause and ask?

Test every new skill in a fresh session to rule out context contamination from other active skills.`,
        },
        {
          title: "Real Workflow Examples",
          duration: 4,
          content: `**Workflow 1: Daily standup bot**
\`\`\`bash
# In HEARTBEAT.md (runs Mon–Fri at 9am):
## Weekday Morning (9am)
- [ ] Pull yesterday's GitHub commits for my repos
- [ ] Check calendar for today's meetings
- [ ] Post standup to #general Slack:
      Yesterday: [commits], Today: [meetings + planned work], Blockers: [any open issues]
\`\`\`

**Workflow 2: Intelligent email triage**
Install the \`gmail\` or \`apple-mail\` skill, then in HEARTBEAT.md:
\`\`\`markdown
## Every 4 hours
- [ ] Check for emails requiring response within 24 hours
- [ ] Flag urgent ones with a Telegram notification
- [ ] Draft responses for straightforward replies and ask for approval before sending
\`\`\`

**Workflow 3: Personal task capture**
Text your agent from your phone: "remind me to call Sarah Thursday 3pm about the contract" → it creates the calendar event, sets a reminder, and logs it in MEMORY.md under active action items.

**Workflow 4: Morning brief**
\`\`\`markdown
## Daily at 7:00 AM
- [ ] Fetch today's calendar events
- [ ] Check weather for my city
- [ ] Summarize top 3 unread emails
- [ ] Send formatted brief to Telegram
\`\`\``,
        },
      ],
    },
    {
      id: 6,
      title: "Model Selection & Cost Control",
      duration: 10,
      emoji: "💸",
      color: "#EF4444",
      lessons: [
        {
          title: "The Three-Stage Model Strategy",
          duration: 4,
          content: `OpenClaw assembles large prompts: system instructions, conversation history, tool schemas, skills, and memory. That context load is why most deployments need a strategy — not just the best model for everything.

**The three-stage approach:**

| Stage | Task | Model | Why |
|-------|------|-------|-----|
| **Ideation** | Generate options, brainstorm | Haiku / Flash | Fast, cheap, good enough for generation |
| **Review** | Quality check, risk identification | Opus / Sonnet | Strong reasoning, catches mistakes |
| **Execution** | Task completion | Context-dependent | Match capability to complexity |

**Per-agent model selection** is one of the highest-leverage cost optimizations. A "marketing agent" runs on Opus for creative work; cron-triggered health checks use Haiku. Use \`/status\` or \`sessions_history\` to see per-session token counts.

**Switch models mid-conversation:**
\`\`\`
/model claude-haiku-4   # quick questions
/model claude-opus-4    # complex analysis
/reasoning on            # enable extended thinking
\`\`\``,
        },
        {
          title: "Reducing Token Costs in Practice",
          duration: 3,
          content: `**The biggest cost drivers:**
1. Bloated HEARTBEAT.md running on every poll
2. Loading entire MEMORY.md into every session
3. Accumulated history in AGENTS.md
4. Redundant API calls fetching the same data

**Practical fixes:**

- **Disable native heartbeat** for health checks — run an isolated lightweight heartbeat instead. Native heartbeat carries the full session context.
- **Use memory_search** instead of loading full MEMORY.md — load only what's relevant
- **Cache results** — store API responses and computed data in memory files. Don't re-fetch.
- **Rotate heartbeat checks** — don't run all checks every poll. Run 2–4 checks per cycle and rotate through the full list over the day.
- **Archive old logs** — weekly compression of daily memory logs prevents exponential growth
- **Set weekly cost reviews** — identify which tasks consume the most tokens and optimize those first`,
        },
        {
          title: "Local vs Cloud Models",
          duration: 3,
          content: `**Running fully locally with Ollama (zero per-token cost):**
\`\`\`bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull a capable model (Qwen 2.5 is community favorite)
ollama pull qwen2.5:7b

# Configure OpenClaw to use it
openclaw models set ollama/qwen2.5:7b
\`\`\`

From the Gateway's perspective, cloud and local models look identical — they're both OpenAI-compatible endpoints. The trade-offs:

| | Cloud (Claude/GPT) | Local (Ollama) |
|--|--|--|
| Cost | Per token | Hardware only |
| Quality | Frontier | Good but behind |
| Privacy | Data leaves machine | 100% local |
| Speed | Fast on good internet | Depends on hardware |
| Context window | 200K+ | Model-dependent |

**The community hybrid:** Use Gemini Flash or Kimi K2.5 (via OpenRouter) for ideation and heartbeat tasks. Reserve Claude Opus for heavy reasoning and critical tasks. Use local Ollama for sensitive or high-volume operations.`,
        },
      ],
    },
    {
      id: 7,
      title: "Multi-Agent & Advanced Patterns",
      duration: 10,
      emoji: "🤝",
      color: "#6366F1",
      lessons: [
        {
          title: "Multi-Agent Architecture",
          duration: 4,
          content: `OpenClaw supports multiple isolated agent workspaces routed from a single Gateway. This is powerful for separating concerns and controlling costs.

**A practical multi-agent setup:**
\`\`\`
workspace/
  agents-workspaces/
    main/        ← Your primary personal agent
      SOUL.md
      MEMORY.md
      HEARTBEAT.md
    dev/         ← Engineering-focused agent
      SOUL.md    ← Focused on code, GitHub, terminal
    marketing/   ← Creative work agent
      SOUL.md    ← Tone, brand voice, content
\`\`\`

**Routing rules in AGENTS.md:**
\`\`\`markdown
## Routing
- Messages from #dev-team Slack → dev agent
- Messages from personal Telegram → main agent
- Messages from marketing Slack channel → marketing agent
\`\`\`

**Coordinator pattern:** Assign one agent (e.g., "Ana") as Head Coordinator. This agent reads SOUL.md, USER.md, and MEMORY.md at session start and delegates tasks to specialized agents. It maintains continuity and ensures context passes correctly.`,
        },
        {
          title: "Advanced Automation Patterns",
          duration: 3,
          content: `**Pattern 1: Webhook triggers**
Connect OpenClaw to GitHub webhooks, Zapier, or n8n. A PR opened in a repo triggers the dev agent to summarize changes and post a review request to Slack.

**Pattern 2: Cron-driven autonomous workflows**
\`\`\`bash
# In openclaw.json
"cron": {
  "morning_brief": "0 7 * * *",
  "pr_check": "0 */4 * * 1-5",
  "weekly_memory_review": "0 9 * * 0"
}
\`\`\`

**Pattern 3: Self-modifying agent (use with care)**
SOUL.md is writable. An agent with the right instructions and tool access can update its own identity, memory, and rules over time. This is powerful but needs guardrails — always require human approval for SOUL.md changes.

**Pattern 4: Cross-channel coordination**
The same message can trigger different behaviors depending on channel. A Telegram DM gets a casual response. The same question in a Slack #general channel gets a more formal response. Configure this in AGENTS.md routing rules.`,
        },
        {
          title: "Debugging & Monitoring",
          duration: 3,
          content: `**When something isn't working, start here:**
\`\`\`bash
openclaw status        # gateway running? healthy?
openclaw doctor        # surface misconfigurations
\`\`\`

**Session history:**
\`\`\`bash
# Full session visibility including tool calls
sessions_history --includeTools true
\`\`\`

**The Gateway Dashboard** — access it via browser at \`http://localhost:18789/#token=<your_token>\`. For remote servers, use an SSH tunnel:
\`\`\`bash
ssh -L 18789:localhost:18789 user@your-server
# Then open http://localhost:18789 locally
\`\`\`
The dashboard lets you visualize memory, tune model parameters, and monitor real-time tool execution without exposing your Gateway to the public internet.

**If a skill isn't working:** Test it in a fresh session to rule out context contamination. Check that all required environment variables are set. Review the SKILL.md for ambiguous instructions.

**The token explosion diagnostic:** If costs are suddenly spiking, check \`/status\` for session token counts. Usually the culprit is AGENTS.md or MEMORY.md growing without compression, or a heartbeat task accumulating history.`,
        },
      ],
    },
    {
      id: 8,
      title: "Putting It All Together",
      duration: 10,
      emoji: "🚀",
      color: "#EC4899",
      lessons: [
        {
          title: "The Power User Checklist",
          duration: 4,
          content: `After working through this course, here's the full checklist for a maximized OpenClaw setup:

**Foundation (Day 1)**
- [ ] Gateway running and stable (via PM2 or systemd)
- [ ] One messaging channel connected (start with Telegram)
- [ ] \`/update\` run — on the latest patched version
- [ ] SOUL.md written with identity, values, rules, and user context
- [ ] API keys stored in environment variables, not workspace files

**Memory (Week 1)**
- [ ] MEMORY.md seeded with 10–20 important facts about your work and preferences
- [ ] Daily memory logging pattern in place
- [ ] HEARTBEAT.md configured with 3–5 proactive checks
- [ ] Weekly compression task added to HEARTBEAT.md

**Skills (Week 2)**
- [ ] \`skill-vetter\` installed before anything else
- [ ] 5 essential bundled skills verified working
- [ ] macOS native skills installed (if on Mac)
- [ ] One custom skill written for a workflow you do repeatedly

**Optimization (Month 1)**
- [ ] Per-agent model selection configured
- [ ] Weekly cost review routine established
- [ ] Multi-agent routing set up if needed
- [ ] SSH tunnel or Tailscale configured for remote access`,
        },
        {
          title: "What the Best Setups Look Like",
          duration: 3,
          content: `From the community's most effective deployments:

**Brandon's household coordinator** — runs on an always-on Mac Mini via iMessage. Coordinates with a nanny (tracks hours via text), handles grocery ordering by scanning fridge photos, and books date nights. Personal use cases first.

**Austin's proactive metrics agent** — checks key performance metrics from internal dashboards on a schedule and proactively pings via Telegram with anomalies. Nobody asked it to — it just runs.

**Peter's court reservation bot** — the first nontrivial skill built by OpenClaw's creator. Monitors a local tennis court booking site and reserves slots automatically on a cron schedule. The insight: because it runs on a schedule, OpenClaw is no longer reactive to messages — it's proactive about affecting real life.

**The common thread in great setups:**
- Start with one annoying daily task. Automate it. Build from there.
- Personal use cases before professional ones — lower stakes to experiment
- The agent feels magical when it does something useful *without being asked*`,
        },
        {
          title: "What's Next",
          duration: 3,
          content: `**OpenClaw is moving fast.** Peter Steinberger (the creator) joined OpenAI in February 2026; the project is transitioning to an open-source foundation. The community is massive and active — skills, tutorials, and new integrations are being published daily.

**Where to go from here:**

- **openclaw.com/best-practices** — the official power user guide, updated regularly
- **awesome-openclaw-skills** on GitHub — 5,400+ curated skills across every category
- **OpenClaw Radar** (openclawradar.com) — community news, tutorials, optimization guides
- **r/openclaw** and the official Discord — most active troubleshooting community

**The bigger picture:**

One early user put it well: "I've been running OpenClaw for a week. Honestly it feels like it did to run Linux vs Windows 20 years ago. You're in control, you can hack it and make it yours instead of relying on some tech giant."

Personal AI agents that run locally, remember everything, act proactively, and integrate with the tools you already use — this is what AI assistance looks like when it actually works. OpenClaw is the clearest preview of that future we have right now.

**Start simple. Solve one daily annoyance. Build from there.**`,
        },
      ],
    },
  ],
};

const totalLessons = COURSE_DATA.modules.reduce((sum, m) => sum + m.lessons.length, 0);

export default function Course({ onBack }) {
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [view, setView] = useState("overview"); // overview | lesson
  const contentRef = useRef(null);

  const currentModule = COURSE_DATA.modules[activeModule];
  const currentLesson = currentModule?.lessons[activeLesson];

  const totalCompleted = completedLessons.size;
  const progressPct = Math.round((totalCompleted / totalLessons) * 100);

  function getLessonKey(mIdx, lIdx) {
    return `${mIdx}-${lIdx}`;
  }

  function markComplete(mIdx, lIdx) {
    setCompletedLessons(prev => new Set([...prev, getLessonKey(mIdx, lIdx)]));
  }

  function openLesson(mIdx, lIdx) {
    setActiveModule(mIdx);
    setActiveLesson(lIdx);
    setView("lesson");
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }

  function nextLesson() {
    markComplete(activeModule, activeLesson);
    const mod = COURSE_DATA.modules[activeModule];
    if (activeLesson < mod.lessons.length - 1) {
      openLesson(activeModule, activeLesson + 1);
    } else if (activeModule < COURSE_DATA.modules.length - 1) {
      openLesson(activeModule + 1, 0);
    } else {
      setView("overview");
    }
  }

  function renderMarkdown(text) {
    // Simple markdown renderer
    let html = text
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      // Code blocks
      .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
        `<pre class="code-block"><code>${code.trim()}</code></pre>`)
      // Tables
      .replace(/\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)*)/g, (match, header, rows) => {
        const ths = header.split("|").filter(Boolean).map(h => `<th>${h.trim()}</th>`).join("");
        const trs = rows.trim().split("\n").map(row => {
          const tds = row.split("|").filter(Boolean).map(d => `<td>${d.trim()}</td>`).join("");
          return `<tr>${tds}</tr>`;
        }).join("");
        return `<div class="table-wrap"><table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
      })
      // Bold
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
      // Headers
      .replace(/^## (.+)$/gm, '<h3 class="md-h3">$1</h3>')
      .replace(/^# (.+)$/gm, '<h2 class="md-h2">$1</h2>')
      // Checkboxes
      .replace(/- \[ \] (.+)/g, '<div class="checkbox-item"><span class="checkbox">☐</span> $1</div>')
      .replace(/- \[x\] (.+)/g, '<div class="checkbox-item done"><span class="checkbox">☑</span> $1</div>')
      // Bullets
      .replace(/^- (.+)$/gm, '<div class="bullet-item">• $1</div>')
      // Paragraphs
      .replace(/\n\n/g, "</p><p>")
      .replace(/^(?!<)(.+)$/gm, (line) => {
        if (line.startsWith("<") || line.trim() === "") return line;
        return line;
      });

    return `<p>${html}</p>`;
  }

  const isCompleted = (mIdx, lIdx) => completedLessons.has(getLessonKey(mIdx, lIdx));

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#0D0D0D",
      minHeight: "100vh",
      color: "#E8E0D0",
      display: "flex",
      flexDirection: "column",
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb { background: #444; border-radius: 2px; }
        
        .nav-bar {
          background: #111;
          border-bottom: 1px solid #222;
          padding: 14px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .nav-title {
          font-size: 18px;
          font-weight: bold;
          letter-spacing: -0.5px;
          color: #FF6B35;
        }
        .nav-sub {
          font-size: 12px;
          color: #666;
          font-family: monospace;
        }
        .progress-bar-outer {
          flex: 1;
          height: 4px;
          background: #222;
          border-radius: 2px;
          overflow: hidden;
        }
        .progress-bar-inner {
          height: 100%;
          background: linear-gradient(90deg, #FF6B35, #EC4899);
          border-radius: 2px;
          transition: width 0.4s ease;
        }
        .progress-label {
          font-size: 11px;
          color: #666;
          font-family: monospace;
          white-space: nowrap;
        }
        
        .layout {
          display: flex;
          flex: 1;
          min-height: 0;
          height: calc(100vh - 53px);
        }
        
        .sidebar {
          width: 300px;
          min-width: 300px;
          background: #111;
          border-right: 1px solid #1e1e1e;
          overflow-y: auto;
          padding: 16px 0;
        }
        
        .sidebar-overview-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          cursor: pointer;
          font-size: 13px;
          color: #888;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-family: inherit;
          transition: color 0.2s;
          margin-bottom: 8px;
          border-bottom: 1px solid #1e1e1e;
        }
        .sidebar-overview-btn:hover { color: #E8E0D0; }
        
        .module-header {
          padding: 10px 20px 6px;
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-family: inherit;
        }
        .module-label {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .module-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .module-name {
          font-size: 12px;
          font-weight: bold;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #999;
        }
        .module-meta {
          font-size: 11px;
          color: #555;
          margin-top: 2px;
          padding-left: 16px;
          font-family: monospace;
        }
        
        .lesson-btn {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 7px 20px 7px 36px;
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-family: inherit;
          transition: background 0.15s;
        }
        .lesson-btn:hover { background: #181818; }
        .lesson-btn.active { background: #1e1e1e; }
        .lesson-icon {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .lesson-icon.done { background: #22c55e; color: white; }
        .lesson-icon.current { background: #FF6B35; color: white; }
        .lesson-icon.todo { background: #333; color: #666; }
        .lesson-title-text {
          font-size: 12px;
          color: #aaa;
          line-height: 1.4;
          flex: 1;
        }
        .lesson-title-text.active { color: #E8E0D0; }
        .lesson-duration {
          font-size: 10px;
          color: #555;
          font-family: monospace;
          flex-shrink: 0;
          margin-top: 3px;
        }
        
        .main-content {
          flex: 1;
          overflow-y: auto;
          padding: 0;
        }
        
        /* Overview styles */
        .overview-hero {
          background: linear-gradient(135deg, #1a0a00 0%, #0D0D0D 60%);
          padding: 60px 48px 48px;
          border-bottom: 1px solid #1e1e1e;
        }
        .overview-lobster {
          font-size: 48px;
          margin-bottom: 12px;
        }
        .overview-title {
          font-size: 42px;
          font-weight: bold;
          color: #FF6B35;
          letter-spacing: -1px;
          line-height: 1;
          margin-bottom: 8px;
        }
        .overview-subtitle {
          font-size: 16px;
          color: #888;
          font-family: monospace;
          margin-bottom: 32px;
        }
        .overview-stats {
          display: flex;
          gap: 40px;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .stat-value {
          font-size: 28px;
          font-weight: bold;
          color: #E8E0D0;
        }
        .stat-label {
          font-size: 12px;
          color: #666;
          font-family: monospace;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .modules-grid {
          padding: 48px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }
        .module-card {
          background: #141414;
          border: 1px solid #222;
          border-radius: 4px;
          padding: 24px;
          cursor: pointer;
          transition: border-color 0.2s, transform 0.2s;
        }
        .module-card:hover {
          border-color: #444;
          transform: translateY(-2px);
        }
        .module-card-emoji {
          font-size: 28px;
          margin-bottom: 12px;
        }
        .module-card-title {
          font-size: 16px;
          font-weight: bold;
          color: #E8E0D0;
          margin-bottom: 4px;
        }
        .module-card-meta {
          font-size: 11px;
          font-family: monospace;
          color: #666;
          margin-bottom: 16px;
        }
        .module-card-lessons {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .module-card-lesson {
          font-size: 12px;
          color: #777;
          padding: 2px 0;
          border-left: 2px solid #333;
          padding-left: 8px;
        }
        .module-card-lesson.done-lesson {
          color: #555;
          border-left-color: #22c55e;
          text-decoration: line-through;
        }
        
        /* Lesson styles */
        .lesson-header {
          padding: 40px 48px 32px;
          border-bottom: 1px solid #1e1e1e;
          background: #0f0f0f;
        }
        .lesson-breadcrumb {
          font-size: 11px;
          color: #555;
          font-family: monospace;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .lesson-big-title {
          font-size: 28px;
          font-weight: bold;
          color: #E8E0D0;
          letter-spacing: -0.5px;
          line-height: 1.2;
          margin-bottom: 8px;
        }
        .lesson-meta-row {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 12px;
          color: #666;
          font-family: monospace;
        }
        .lesson-tag {
          padding: 3px 8px;
          border-radius: 2px;
          font-size: 10px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          font-weight: bold;
        }
        
        .lesson-body {
          padding: 40px 48px;
          max-width: 720px;
        }
        .lesson-body p {
          font-size: 15px;
          line-height: 1.75;
          color: #C8C0B0;
          margin-bottom: 16px;
        }
        .lesson-body .md-h2 {
          font-size: 20px;
          color: #E8E0D0;
          margin: 28px 0 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #222;
        }
        .lesson-body .md-h3 {
          font-size: 16px;
          color: #E8E0D0;
          margin: 24px 0 8px;
          font-weight: bold;
        }
        .code-block {
          background: #0a0a0a;
          border: 1px solid #222;
          border-radius: 4px;
          padding: 16px 20px;
          overflow-x: auto;
          margin: 16px 0;
          font-family: 'Courier New', Courier, monospace;
          font-size: 13px;
          line-height: 1.6;
          color: #a0d0a0;
        }
        .inline-code {
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 2px;
          padding: 1px 5px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 12px;
          color: #FF6B35;
        }
        .table-wrap {
          overflow-x: auto;
          margin: 16px 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        th {
          background: #1a1a1a;
          color: #E8E0D0;
          padding: 8px 12px;
          text-align: left;
          border: 1px solid #2a2a2a;
          font-weight: bold;
        }
        td {
          padding: 8px 12px;
          border: 1px solid #1e1e1e;
          color: #aaa;
          vertical-align: top;
        }
        tr:nth-child(even) td { background: #0f0f0f; }
        .bullet-item {
          font-size: 14px;
          color: #C8C0B0;
          line-height: 1.6;
          padding: 3px 0;
          padding-left: 4px;
        }
        .checkbox-item {
          font-size: 14px;
          color: #C8C0B0;
          line-height: 1.6;
          padding: 3px 0;
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        .checkbox-item.done { color: #555; text-decoration: line-through; }
        .checkbox { font-size: 14px; flex-shrink: 0; margin-top: 1px; }
        strong { color: #E8E0D0; }
        
        .lesson-footer {
          padding: 32px 48px;
          border-top: 1px solid #1e1e1e;
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .btn {
          padding: 10px 20px;
          border-radius: 3px;
          font-size: 13px;
          cursor: pointer;
          border: none;
          font-family: inherit;
          font-weight: bold;
          letter-spacing: 0.3px;
          transition: opacity 0.2s;
        }
        .btn:hover { opacity: 0.85; }
        .btn-primary {
          background: #FF6B35;
          color: white;
        }
        .btn-secondary {
          background: #1e1e1e;
          color: #aaa;
          border: 1px solid #333;
        }
        .btn-back {
          background: none;
          color: #666;
          border: 1px solid #2a2a2a;
          padding: 10px 16px;
          font-size: 12px;
        }
      `}</style>

      {/* Nav */}
      <div className="nav-bar">
        <div>
          <div className="nav-title">🦞 OpenClaw Masterclass</div>
          <div className="nav-sub">{COURSE_DATA.totalMinutes} min · {totalLessons} lessons</div>
          {onBack && <button onClick={onBack} style={{background:"none",border:"1px solid #2a2a2a",color:"#666",padding:"6px 14px",borderRadius:2,fontFamily:"monospace",fontSize:11,cursor:"pointer",letterSpacing:1}}>← Back</button>}
        </div>
        <div className="progress-bar-outer">
          <div className="progress-bar-inner" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="progress-label">{totalCompleted}/{totalLessons} done · {progressPct}%</div>
      </div>

      <div className="layout">
        {/* Sidebar */}
        <div className="sidebar">
          <button className="sidebar-overview-btn" onClick={() => setView("overview")}>
            ← Overview
          </button>
          {COURSE_DATA.modules.map((mod, mIdx) => (
            <div key={mod.id}>
              <div className="module-header">
                <div className="module-label">
                  <div className="module-dot" style={{ background: mod.color }} />
                  <div className="module-name">{mod.emoji} {mod.title}</div>
                </div>
                <div className="module-meta">{mod.duration} min · {mod.lessons.length} lessons</div>
              </div>
              {mod.lessons.map((lesson, lIdx) => {
                const key = getLessonKey(mIdx, lIdx);
                const isActive = view === "lesson" && activeModule === mIdx && activeLesson === lIdx;
                const isDone = completedLessons.has(key);
                return (
                  <button
                    key={lIdx}
                    className={`lesson-btn ${isActive ? "active" : ""}`}
                    onClick={() => openLesson(mIdx, lIdx)}
                  >
                    <div className={`lesson-icon ${isDone ? "done" : isActive ? "current" : "todo"}`}>
                      {isDone ? "✓" : isActive ? "▶" : lIdx + 1}
                    </div>
                    <div className={`lesson-title-text ${isActive ? "active" : ""}`}>{lesson.title}</div>
                    <div className="lesson-duration">{lesson.duration}m</div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="main-content" ref={contentRef}>
          {view === "overview" ? (
            <>
              <div className="overview-hero">
                <div className="overview-lobster">🦞</div>
                <div className="overview-title">Maximize OpenClaw</div>
                <div className="overview-subtitle">A complete 1.5-hour guide from setup to power-user mastery</div>
                <div className="overview-stats">
                  <div className="stat-item">
                    <div className="stat-value">{COURSE_DATA.totalMinutes}</div>
                    <div className="stat-label">Minutes</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{COURSE_DATA.modules.length}</div>
                    <div className="stat-label">Modules</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{totalLessons}</div>
                    <div className="stat-label">Lessons</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{progressPct}%</div>
                    <div className="stat-label">Complete</div>
                  </div>
                </div>
              </div>
              <div className="modules-grid">
                {COURSE_DATA.modules.map((mod, mIdx) => (
                  <div
                    key={mod.id}
                    className="module-card"
                    style={{ borderTopColor: mod.color, borderTopWidth: 3 }}
                    onClick={() => openLesson(mIdx, 0)}
                  >
                    <div className="module-card-emoji">{mod.emoji}</div>
                    <div className="module-card-title">{mod.title}</div>
                    <div className="module-card-meta">{mod.duration} min · {mod.lessons.length} lessons</div>
                    <div className="module-card-lessons">
                      {mod.lessons.map((l, lIdx) => (
                        <div
                          key={lIdx}
                          className={`module-card-lesson ${isCompleted(mIdx, lIdx) ? "done-lesson" : ""}`}
                          style={{ borderLeftColor: isCompleted(mIdx, lIdx) ? "#22c55e" : mod.color + "66" }}
                        >
                          {l.title}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : currentLesson ? (
            <>
              <div className="lesson-header">
                <div className="lesson-breadcrumb">
                  Module {activeModule + 1} · {currentModule.emoji} {currentModule.title}
                </div>
                <div className="lesson-big-title">{currentLesson.title}</div>
                <div className="lesson-meta-row">
                  <span
                    className="lesson-tag"
                    style={{ background: currentModule.color + "22", color: currentModule.color }}
                  >
                    {currentModule.title}
                  </span>
                  <span>🕐 {currentLesson.duration} min</span>
                  {isCompleted(activeModule, activeLesson) && (
                    <span style={{ color: "#22c55e" }}>✓ Completed</span>
                  )}
                </div>
              </div>
              <div
                className="lesson-body"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(currentLesson.content) }}
              />
              <div className="lesson-footer">
                <button
                  className="btn btn-primary"
                  onClick={nextLesson}
                >
                  {activeModule === COURSE_DATA.modules.length - 1 &&
                   activeLesson === currentModule.lessons.length - 1
                    ? "Complete Course ✓"
                    : "Mark Complete & Continue →"}
                </button>
                {!isCompleted(activeModule, activeLesson) && (
                  <button
                    className="btn btn-secondary"
                    onClick={() => markComplete(activeModule, activeLesson)}
                  >
                    Mark Complete
                  </button>
                )}
                <button className="btn btn-back" onClick={() => setView("overview")}>
                  ↩ Overview
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
