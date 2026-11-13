/**
 * BotDesk Mobility - Serverless Web2.5 Discovery & Routing Edge Worker
 * Deployable for free on Cloudflare Workers (up to 100,000 requests/day free).
 */

const GITHUB_AGENT_CARD_URL =
  "https://githubusercontent.com";

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
      const cardResponse = await fetch(GITHUB_AGENT_CARD_URL);
      const cardBody = await cardResponse.text();
      return new Response(cardBody, {
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300",
        },
      });
    }

    // 2. Lightweight M2M Endpoint Resolver (/route?category=robotaxi&step=1)
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

    // 3. Default Gateway Status
    return new Response(
      JSON.stringify({
        service: "BotDesk Mobility Web2.5 Gateway",
        status: "online",
        discovery_manifest: "/.well-known/agent-card.json",
        router_example: "/route?category=robotaxi&step=1",
      }),
      { headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  },
};
