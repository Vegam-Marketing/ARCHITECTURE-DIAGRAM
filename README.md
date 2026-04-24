# AI Intime Architect

> **Don't just pilot AI. Operationalize it.**
>
> A self-serve tool that generates a custom AI agent blueprint and sovereign reference architecture for enterprise manufacturers — in under 10 minutes.

<p align="center">
  <img src="public/og-preview.png" alt="AI Intime Architect — preview" width="820" />
</p>

---

## What this is

A CIO / CTO at a $1B+ manufacturer lands here, answers a handful of questions about their company, stack, and operational pain, and receives:

- A **populated reference architecture** — the AI Intime 5-layer framework with their named ERP, MES, QMS, and other systems rendered as MCP integration nodes.
- A **custom agent blueprint** — role-scoped, with data access and permissions mapped to their environment.
- A **forwardable executive brief** — written for CFO / CEO consumption, phased across 12 months.

The tool is a **product surface, not a gated lead magnet**. Every submission gets a bookmarkable URL. The output is designed to be screenshot, shared, and forwarded internally.

It also *demonstrates* AI Intime's core capabilities while being used — on-prem posture, zero telemetry, retrieval grounding, custom agents. The tool is itself proof.

---

## Features

- 8-stage flow: landing → company → industry → pain → stack → outcome → generation reveal → email gate
- Three pain-input paths — pick from shipped agents, describe your own, or start from an impact frame
- Dynamic architecture generator — same inputs render the same diagram; different inputs visibly differ
- "Other + describe" on every stack layer — custom integrations render as dashed-border MCP nodes
- Email gate only at the end (PDF + architecture image + shareable link)
- Engineering-blueprint aesthetic: jet black, amber accent, IBM Plex typography
- Fully responsive, no login required, no personal data stored client-side

---

## Quick start

```bash
# 1. Clone
git clone https://github.com/<your-org>/ai-intime-architect.git
cd ai-intime-architect

# 2. Install
npm install

# 3. Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Requirements:** Node ≥ 18.17.

---

## Project structure

```
ai-intime-architect/
├── app/
│   ├── layout.jsx         # Root layout + IBM Plex fonts via next/font
│   ├── page.jsx           # Home page — renders the architect
│   └── globals.css        # Tailwind + aesthetic layer (grid, grain, brackets, motion)
├── components/
│   └── ai-intime-architect.jsx  # Main component — landing, flow, reveal
├── lib/
│   └── constants.js       # Industries, shipped agents, impact frames, stack layers,
│                          # compliance options, outcomes, roles, MCP function defaults
├── public/                # Static assets (add og-preview.png, favicon, etc.)
├── tailwind.config.js
├── postcss.config.mjs
├── next.config.mjs
├── jsconfig.json          # @/ path alias
└── package.json
```

---

## Customization

### Swap the accent color

The amber (`#d97642`) is used in ~40 places. Fastest way to change it:

```bash
# Mac / Linux
grep -rl '#d97642' components app lib | xargs sed -i '' 's/#d97642/<NEW_HEX>/g'
# Remember to also update the hover state #c0652f
```

Better long-term: use the `accent` Tailwind token in `tailwind.config.js` and refactor usages to `bg-accent` / `text-accent`.

### Change brand copy

Key headline copy lives in `components/ai-intime-architect.jsx`:

- `Landing` — hero headline, sub-hero, sovereignty band
- `Generating` — generation screen title ("Composing your context-aware nervous system")
- `RevealScreen` — "Sovereign AI Blueprint" heading, CTA card copy

### Swap the typography

Fonts are loaded via `next/font/google` in `app/layout.jsx`. Replace `IBM_Plex_Sans/Serif/Mono` imports with your preferred fonts from `next/font/google`, and update `tailwind.config.js` `fontFamily` accordingly.

### Swap the three shipped agent cards

Edit `AGENT_CARDS` in `lib/constants.js`. The architecture generator auto-adapts — the agent name appears as a node in the orchestration layer when selected.

### Extend the stack list

Add entries to `STACK_LAYERS` in `lib/constants.js`. Each layer has an `options` array and automatically supports an "Other + describe" custom input.

---

## Deployment

### One-click Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F%3Cyour-org%3E%2Fai-intime-architect)

Or manual:

```bash
npm install -g vercel
vercel
```

### Other platforms

Any Node host supporting Next.js 14 App Router works — AWS Amplify, Netlify, Cloudflare Pages, self-hosted. Run `npm run build` and serve the `.next` output.

For **on-premises / air-gapped hosting** (consistent with AI Intime's posture), build locally and deploy to an internal Node server; no external service dependencies in v1.

---

## Backend roadmap

The v1 frontend ships with **mocked generation**. The real backend fills in the following. An `.env.example` is provided for reference.

| Piece | What it does | v1 status |
|---|---|---|
| **Claude API call** | Writes exec summary, agent blueprint prose, phasing. Output as structured JSON per schema. | Mocked with templated copy in `ExecutiveBriefPreview`. |
| **RAG retrieval** | Pinecone + OpenAI embeddings. Grounds every generation on AI Intime's private corpus (product doc, pitch deck, architecture refs, case material). | Not wired. |
| **Rules-based architecture** | Deterministic mapping: stack selection → MCP nodes with named functions. Keeps structural output hallucination-free. | Partial — `FUNC_DEFAULTS` in `lib/constants.js` has the starter mapping for common systems. |
| **PDF generation** | Puppeteer renders an HTML deck template filled with Claude's JSON output. | Not wired. |
| **Persistent URL per submission** | `/architect/[id]` with stored JSON + PDF URL. | Not wired. Frontend state only for v1. |
| **Email delivery** | SendGrid / Resend. PDF attachment + shareable link. | Not wired. |
| **Analytics** | Step drop-off, pain-pattern demand by industry, submissions dashboard. | Not wired. |

See **`.env.example`** for the full list of environment variables the backend phase will consume.

---

## Tech stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **UI:** React 18
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide](https://lucide.dev/)
- **Fonts:** IBM Plex Sans / Serif / Mono via `next/font/google`
- **Language:** JavaScript (JSX). TypeScript-ready — add `typescript` + `@types/*` and rename `.jsx` → `.tsx` to migrate.

---

## Contributing

Internal project. PRs via GitHub; keep each PR focused on one of: a single step, a single component, or a copy/branding update.

Before PR:

```bash
npm run lint
npm run build      # catches most issues the dev server misses
```

---

## Credits

Built by the AI Intime / Vegam team.

AI Intime is a sovereign, enterprise-owned AI control plane deployed at BASF and Henkel via Vegam SFS. [aiintime.com](https://www.aiintime.com/)

---

## License

Proprietary. See `LICENSE` (to be added) or contact [info@aiintime.com](mailto:info@aiintime.com).
