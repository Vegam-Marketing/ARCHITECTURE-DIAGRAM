# Changelog

All notable changes to AI Intime Architect are recorded here.

## [0.1.0] — Initial frontend prototype

### Added

- Landing page with AI Intime brand voice ("Don't just pilot AI. Operationalize it.")
- 8-stage flow: company → industry → pain (3 paths) → stack → outcome → generation → reveal → email gate
- Three pain input paths: shipped agent cards, custom free-text, four impact frames
- Three shipped agent cards: Lab Reports – Knowledge Twin, Insight Edge, Customer Support Email Agent
- Dynamic architecture diagram — 5-layer AI Intime framework populated from user inputs
- MCP integration nodes with example function names per system (SAP, Vegam SFS, Outlook, etc.)
- "Other + describe" custom input on every stack layer — renders as dashed-border MCP node
- Email gate with work-domain validation
- Executive brief preview with blur-until-unlock pattern
- Post-unlock CTA for "Book a strategy session" (Calendly-ready)
- Engineering-blueprint aesthetic: jet black, amber accent, IBM Plex typography, corner-bracket framing

### Mocked (v1, to be replaced by backend)

- Claude generation call — currently templated prose in the component
- RAG retrieval — no backend call; no corpus integration
- PDF generation — download buttons trigger the email modal only
- Persistent URL per submission — frontend state only, no `/architect/[id]` routes
- Email delivery — modal captures email but does not send anything
