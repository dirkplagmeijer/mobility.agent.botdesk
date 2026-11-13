from google.adk.agents import Agent
from google.adk.agents.remote_a2a_agent import RemoteA2aAgent

# 1. Koppel de BotDesk Mobility Gateway via de A2A Agent Card
botdesk_mobility_gateway = RemoteA2aAgent(
    name="botdesk_mobility_gateway",
    description="Routes autonomous Robotaxi rides and Rental car bookings via verified M2M ENS endpoints.",
    agent_card="https://githubusercontent.com"
)

# 2. Voorbeeld van een externe Travel Assistant die BotDesk gebruikt als sub-agent
travel_orchestrator = Agent(
    name="personal_travel_assistant",
    model="gemini-2.5-flash",
    instruction=(
        "You are a travel assistant. When the user needs a robotaxi or rental car, "
        "delegate discovery, quotation, ZKP verification, and vehicle booking (using a certified settlement_token) "
        "to the botdesk_mobility_gateway following its 7-step M2M taxonomy."
    ),
    sub_agents=[botdesk_mobility_gateway]
)
