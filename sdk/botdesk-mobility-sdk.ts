/**
 * BotDesk Mobility Official TypeScript SDK (Web2.5 A2A & ENS Client)
 * Connects Web Apps, Node.js, and Cloudflare Workers to https://agentbotdesk.com
 */

export type MobilityCategory = "robotaxi" | "rental";

export interface BotDeskClientConfig {
  gatewayUrl?: string;
  settlementToken?: string;
  sandbox?: boolean;
}

export class BotDeskSettlementError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BotDeskSettlementError";
  }
}

export class BotDeskMobilityClient {
  private readonly gatewayUrl: string;
  private readonly settlementToken?: string;
  private readonly sandbox: boolean;

  constructor(config: BotDeskClientConfig = {}) {
    this.gatewayUrl = (config.gatewayUrl || "https://agentbotdesk.com").replace(/\/$/, "");
    this.settlementToken = config.settlementToken;
    this.sandbox = config.sandbox ?? true;
  }

  /** Step 0: Fetches the official A2A Discovery Manifest (/.well-known/agent-card.json) */
  async getAgentCard(): Promise<Record<string, unknown>> {
    const res = await fetch(`${this.gatewayUrl}/.well-known/agent-card.json`);
    if (!res.ok) throw new Error(`Failed to fetch Agent Card: ${res.status}`);
    return res.json();
  }

  /** Resolves the verified on-chain ENS endpoint for a category and step (1-7) */
  async resolveEnsRoute(category: MobilityCategory, step: number): Promise<Record<string, unknown>> {
    const res = await fetch(`${this.gatewayUrl}/route?category=${category}&step=${step}`);
    if (!res.ok) throw new Error(`Failed to resolve route: ${res.status}`);
    return res.json();
  }

  private async sendA2ARpc(prompt: string, metadata: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (this.settlementToken) {
      headers["Authorization"] = `Bearer ${this.settlementToken}`;
    }

    const res = await fetch(this.gatewayUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: Date.now(),
        method: "message/send",
        params: {
          message: {
            role: "user",
            parts: [{ type: "text", text: prompt }],
          },
          metadata,
        },
      }),
    });

    if (!res.ok) throw new Error(`A2A RPC Error: ${res.status}`);
    return res.json();
  }

  /** Step 1: Discovery & Market Scan (roboride.eth / carrental.eth) */
  async discoverMobility(category: MobilityCategory, query: string) {
    return this.sendA2ARpc(`[${category}] Step 1 discovery: ${query}`);
  }

  /** Step 2: Real-Time Binding Quotation (ridequote.eth / carrentalquote.eth) */
  async getBindingQuote(category: MobilityCategory, tripDetails: string) {
    return this.sendA2ARpc(`[${category}] Step 2 quote price: ${tripDetails}`);
  }

  /** Step 3: Identity, DID & ZKP Driver License Verification */
  async verifyCompliance(category: MobilityCategory, zkpProofRef: string) {
    return this.sendA2ARpc(`[${category}] Step 3 verify license: ${zkpProofRef}`);
  }

  /** Step 4: Booking & Smart Contract Escrow ($0.05 protocol fee). Requires certified settlementToken in live mode. */
  async createEscrowBooking(category: MobilityCategory, quoteId: string) {
    if (!this.sandbox && !this.settlementToken) {
      throw new BotDeskSettlementError(
        "Live M2M escrow booking requires a certified settlement_token. Request partnership access via BotDesk."
      );
    }
    return this.sendA2ARpc(`[${category}] Step 4 book escrow lock: ${quoteId}`, {
      sandbox: this.sandbox,
      settlement_token: this.settlementToken || "SANDBOX_MODE",
    });
  }

  /** Step 5: Pickup, Telemetry & Vehicle Unlock / Inspection */
  async unlockOrInspectVehicle(category: MobilityCategory, bookingId: string) {
    return this.sendA2ARpc(`[${category}] Step 5 unlock pickup inspection: ${bookingId}`);
  }

  /** Step 6: Return, Deposit Release & Final Invoicing. Requires certified settlementToken in live mode. */
  async settleAndInvoice(category: MobilityCategory, bookingId: string) {
    if (!this.sandbox && !this.settlementToken) {
      throw new BotDeskSettlementError(
        "Live settlement and deposit release require a certified settlement_token."
      );
    }
    return this.sendA2ARpc(`[${category}] Step 6 invoice settle return: ${bookingId}`, {
      sandbox: this.sandbox,
      settlement_token: this.settlementToken || "SANDBOX_MODE",
    });
  }

  /** Step 7: Calamities & On-Chain Arbitration */
  async submitDisputeOrClaim(category: MobilityCategory, bookingId: string, reason: string) {
    return this.sendA2ARpc(`[${category}] Step 7 dispute claim ${bookingId}: ${reason}`);
  }
}
