## Web2.5 Discovery Gateway

This directory contains the platform-neutral discovery manifest and Google ADK integration examples that bridge traditional Web2 AI agents (across Linux Foundation A2A, Google ADK, MCP, and enterprise assistant frameworks) with the on-chain BotDesk Mobility ENS infrastructure.

### Files in this Directory
* **`agent-card.json`** – Standard A2A discovery manifest exposing the 7-step passenger mobility lifecycle as structured skills.
* **`adk_consumer_example.py`** – Ready-to-use Google ADK snippet showing how external travel assistants connect via `RemoteA2aAgent`.
* **`adk_gateway_router.py`** – Lightweight ADK routing server mapping incoming A2A requests to verified `.eth` endpoints.

### How the Web2.5 Gateway Works
* **Web2 Agent Discovery:** Exposes the 7-step passenger mobility lifecycle as structured skills for standard JSON-RPC and HTTPS agent clients.
* **Web3 ENS Resolution:** Each skill maps directly to verified `.eth` endpoints cataloged in `/core-architecture/M2M_ENS_REGISTRY.md`.
* **Protected Settlement:** While discovery is open to any AI ecosystem, binding reservations and capital settlement require a certified `settlement_token` issued via the proprietary settlement module.
