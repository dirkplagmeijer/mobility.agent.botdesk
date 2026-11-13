from google.adk.agents import Agent
from google.adk.a2a.utils.agent_to_a2a import to_a2a

def resolve_m2m_endpoint(category: str, step: int) -> dict:
    """Maps the 7-step mobility lifecycle to verified BotDesk ENS endpoints while keeping settlement proprietary."""
    routes = {
        "robotaxi": {
            1: {"endpoint": "roboride.eth", "action": "discovery"},
            2: {"endpoint": "ridequote.eth", "action": "quotation"},
            3: {"endpoint": "rideverification.eth", "action": "verification"},
            4: {"endpoint": "ridebooking.eth", "action": "booking_lock", "requires": "certified_settlement_token"},
            5: {"endpoint": "unlockrobotaxi.eth", "action": "telemetry_access"},
            6: {"endpoint": "rideinvoice.eth", "action": "completion_invoicing", "requires": "certified_settlement_token"},
            7: {"endpoint": "ridedispute.eth", "action": "arbitration"},
        },
        "rental": {
            1: {"endpoint": "carrental.eth", "action": "discovery"},
            2: {"endpoint": "carrentalquote.eth", "action": "quotation"},
            3: {"endpoint": "rentaldriverslicense.eth", "action": "verification"},
            4: {"endpoint": "carrentalbooking.eth", "action": "booking_lock", "requires": "certified_settlement_token"},
            5: {"endpoint": "carrentalinspection.eth", "action": "telemetry_access"},
            6: {"endpoint": "carrentalfinalinvoice.eth", "action": "completion_invoicing", "requires": "certified_settlement_token"},
            7: {"endpoint": "carrentaldamageclaim.eth", "action": "arbitration"},
        }
    }
    return routes.get(category.lower(), {}).get(step, {"error": "Invalid step or category"})

# De ADK Gateway Agent die binnenkomende A2A-verzoeken afhandelt
gateway_agent = Agent(
    name="botdesk_mobility_gateway",
    model="gemini-2.5-flash",
    instruction=(
        "Route incoming passenger mobility requests (Robotaxi or Rental) across the 7-step M2M lifecycle. "
        "Return the corresponding verified .eth endpoint and enforce a certified settlement_token for booking and finalization."
    ),
    tools=[resolve_m2m_endpoint]
)

# Maakt de agent direct klaar als A2A-server (leest jouw bestaande agent-card.json)
a2a_app = to_a2a(gateway_agent, agent_card="agent-card.json")
