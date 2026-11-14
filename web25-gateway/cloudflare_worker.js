/**
 * BotDesk Mobility - Serverless Web2.5 A2A Discovery & Routing Edge Worker
 * Supports:
 * 1. GET /.well-known/agent-card.json (A2A Discovery)
 * 2. GET /route?category=robotaxi&step=1 (Direct ENS Resolver)
 * 3. POST / (Official Google A2A JSON-RPC Task/Message Receiver)
 */

const AGENT_CARD = {
  name: "BotDesk Mobility Gateway",
  description: "Platform-neutral Web2.5 M2M routing gateway for autonomous Robotaxi rides and Rental passenger fleets, backed by verified ENS endpoints.",
  version: "1.0.0",
  provider: {
    organization: "BotDesk Mobility",
    url: "https://github.com"
  },
  supportedInterfaces: [
    {
      url: "https://agentbotdesk.com",
      protocolBinding: "JSONRPC",
      protocolVersion: "1.0"
    }
  ],
  defaultInputModes: ["application/json"],
  defaultOutputModes: ["application/json"],
  capabilities: {
    streaming: false,
    pushNotifications: false,
    extendedAgentCard: false,
    extensions: [
      {
        uri: "https://ens.domains",
        description: "On-chain ENS endpoint routing and $0.05 escrow settlement verification",
        required: false
      }
    ]
  },
  skills: [
    {
      id: "mobility.discovery",
      name: "Step 1: Discovery & Market Scan",
      description: "Scans available Robotaxi fleets and Rental depots across airports and hubs.",
      tags: ["robotaxi", "rental", "discovery", "ens:roboride.eth", "ens:carrental.eth"],
      examples: [
        "Find an autonomous robotaxi from Schiphol Airport to Amsterdam Zuid",
        "Search available electric rental cars at Amsterdam Airport"
      ]
    },
    {
      id: "mobility.quotation",
      name: "Step 2: Real-Time Binding Quotation",
      description: "Fetches binding dynamic rates and vehicle specifications via on-chain oracles.",
      tags: ["quotation", "pricing", "ens:ridequote.eth", "ens:carrentalquote.eth"],
      examples: [
        "Get a binding fare quote for a 15km robotaxi trip",
        "Calculate a 4-day rental rate including insurance"
      ]
    },
    {
      id: "mobility.verification",
      name: "Step 3: Identity, DID & ZKP Compliance",
      description: "Validates digital driver licenses (ZKP), operator trust scores, and agent spending allowances.",
      tags: ["compliance", "kyc", "ens:rentaldriverslicense.eth", "ens:agentallowance.eth"],
      examples: [
        "Verify passenger driver license ZKP for autonomous car rental",
        "Check agent allowance consent before booking"
      ]
    },
    {
      id: "mobility.booking_escrow",
      name: "Step 4: Booking, Escrow & Capital Settlement",
      description: "Locks vehicles and initializes M2M smart contract escrow with the $0.05 protocol fee.",
      tags: ["booking", "escrow", "payment", "ens:rideescrow.eth", "ens:carrentalescrow.eth"],
      examples: [
        "Lock robotaxi vehicle and fund trip escrow",
        "Confirm rental reservation and lock security deposit"
      ]
    },
    {
      id: "mobility.telemetry_access",
      name: "Step 5: Pickup, Access & Vehicle Control",
      description: "Provides live GPS approach telemetry, digital inspection logs, and cryptographic door unlock.",
      tags: ["telemetry", "unlock", "ens:unlockrobotaxi.eth", "ens:carrentalinspection.eth"],
      examples: [
        "Unlock assigned robotaxi at pickup coordinates",
        "Submit pre-rental battery and damage inspection"
      ]
    },
    {
      id: "mobility.settlement",
      name: "Step 6: Return, Deposit Release & Invoicing",
      description: "Concludes trips, calculates local city/tourist taxes, releases deposits, and issues final invoices.",
      tags: ["settlement", "invoice", "ens:ridesettlement.eth", "ens:carrentaldepositrelease.eth"],
      examples: [
        "Finalize robotaxi streaming payment at drop-off",
        "Release rental security deposit and generate final invoice"
      ]
    },
    {
      id: "mobility.arbitration",
      name: "Step 7: Calamities & On-Chain Arbitration",
      description: "Handles trip extensions, cancellations, refunds, and automated accident/damage claims.",
      tags: ["dispute", "claim", "refund", "ens:ridedispute.eth", "ens:carrentaldamageclaim.eth"],
      examples: [
        "Extend active car rental duration by 24 hours",
        "Submit telemetry snapshot for a rental damage claim"
      ]
    }
  ]
};

const M2M_ROUTES = {
  robotaxi: {
    1: { endpoint: "roboride.eth", action: "discovery" },
    2: { endpoint: "ridequote.eth", action: "quotation" },
    3: { endpoint: "rideverification.eth", action: "verification" },
    4: { endpoint: "ridebooking.eth", action: "booking_lock", requires: "certified_settlement_token" },
    5: { endpoint: "unlockrobotaxi.eth", action: "telemetry_access" },
    6: { endpoint: "rideinvoice.eth", action: "completion_invoicing", requires: "certified_settlement_token" },
    7: { endpoint: "ridedispute.eth", action: "arbitration" },
  },
  rental: {
    1: { endpoint: "carrental.eth", action: "discovery" },
    2: { endpoint: "carrentalquote.eth", action: "quotation" },
    3: { endpoint: "rentaldriverslicense.eth", action: "verification" },
    4: { endpoint: "carrentalbooking.eth", action: "booking_lock", requires: "certified_settlement_token" },
    5: { endpoint: "carrentalinspection.eth", action: "telemetry_access" },
    6: { endpoint: "carrentalfinalinvoice.eth", action: "completion_invoicing", requires: "certified_settlement_token" },
    7: { endpoint: "carrentaldamageclaim.eth", action: "arbitration" },
  },
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);

    // 1. Standard A2A Discovery Endpoint (/.well-known/agent-card.json)
    if (url.pathname === "/.well-known/agent-card.json" || url.pathname === "/agent-card.json") {
      return new Response(JSON.stringify(AGENT_CARD, null, 2), {
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300",
        },
      });
    }

    // 2. Official A2A JSON-RPC POST Receiver (for Google & external AI agents)
    if (request.method === "POST") {
      try {
        const body = await request.json();
        const rpcId = body.id || 1;
        const rawText = JSON.stringify(body).toLowerCase();

        const category = rawText.includes("rental") || rawText.includes("car") ? "rental" : "robotaxi";
        let step = 1;
        if (rawText.includes("quote") || rawText.includes("price") || rawText.includes("rate")) step = 2;
        else if (rawText.includes("verify") || rawText.includes("license") || rawText.includes("kyc")) step = 3;
        else if (rawText.includes("book") || rawText.includes("escrow") || rawText.includes("lock")) step = 4;
        else if (rawText.includes("unlock") || rawText.includes("inspect") || rawText.includes("pickup")) step = 5;
        else if (rawText.includes("invoice") || rawText.includes("settle") || rawText.includes("return")) step = 6;
        else if (rawText.includes("dispute") || rawText.includes("claim") || rawText.includes("cancel")) step = 7;

        const route = M2M_ROUTES[category][step];

        return new Response(
          JSON.stringify({
            jsonrpc: "2.0",
            id: rpcId,
            result: {
              status: { state: "completed" },
              message: {
                role: "agent",
                parts: [
                  {
                    type: "text",
                    text: `Routed to verified ENS endpoint ${route.endpoint} (${category} - step ${step}: ${route.action}). Ready for M2M execution.`,
                  },
                ],
              },
              metadata: {
                protocol: "mobility.agent.botdesk",
                category,
                step,
                ens_endpoint: route.endpoint,
                settlement_fee: "$0.05",
              },
            },
          }),
          { headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Invalid JSON-RPC payload" } }),
          { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
        );
      }
    }

    // 3. Lightweight M2M Endpoint Resolver (/route?category=robotaxi&step=1)
    if (url.pathname === "/route") {
      const category = (url.searchParams.get("category") || "").toLowerCase();
      const step = parseInt(url.searchParams.get("step") || "0", 10);
      const routeData = M2M_ROUTES[category]?.[step];

      if (!routeData) {
        return new Response(
          JSON.stringify({ error: "Invalid category or step (1-7)" }),
          { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({
          protocol: "mobility.agent.botdesk",
          category,
          step,
          ...routeData,
        }),
        { headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    // 4. Default Gateway Status
    return new Response(
      JSON.stringify({
        service: "BotDesk Mobility Web2.5 Gateway",
        status: "online",
        a2a_endpoint: "POST / (JSON-RPC 2.0)",
        discovery_manifest: "/.well-known/agent-card.json",
        router_example: "/route?category=robotaxi&step=1",
      }),
      { headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  },
};
