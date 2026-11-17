from google.adk.agents import Agent
from google.adk.agents.remote_a2a_agent import RemoteA2aAgent

# 1. Connect the BotDesk Mobility Gateway via the official A2A Agent Card
botdesk_mobility_gateway = RemoteA2aAgent(
    name="botdesk_mobility_gateway",
    description="Routes autonomous Robotaxi rides and Rental car bookings via verified M2M ENS endpoints.",
    agent_card="https://agentbotdesk.com"
)

# 2. Example of an external Travel Assistant using BotDesk as a sub-agent
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
