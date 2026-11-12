# Web2.5 Discovery Gateway

This directory contains the platform-neutral discovery manifest that bridges traditional Web2 AI agents (across Linux Foundation A2A, MCP, and enterprise assistant frameworks) with the on-chain **BotDesk Mobility** ENS infrastructure.

## How the Web2.5 Gateway Works

1. **Web2 Agent Discovery (`agent-card.json`):** Exposes the 7-step passenger mobility lifecycle as structured `skills` for standard JSON-RPC and HTTPS agent clients.
2. **Web3 ENS Resolution:** Each skill maps directly to verified `.eth` endpoints cataloged in `/core-architecture/M2M_ENS_REGISTRY.md`.
3. **Protected Settlement:** While discovery is open to any AI ecosystem, binding reservations and capital settlement route exclusively through the proprietary `$0.05` M2M escrow smart contract module.
