"""
BotDesk Mobility Official Python SDK (Web2.5 A2A & ENS Client)
Connects AI Agents (Google ADK, LangChain, CrewAI) to https://agentbotdesk.com
"""

import json
import urllib.request
from typing import Dict, Any, Optional


class BotDeskSettlementError(Exception):
    """Raised when live booking or settlement is attempted without a certified settlement_token."""
    pass


class BotDeskMobilityClient:
    def __init__(
        self,
        gateway_url: str = "https://agentbotdesk.com",
        settlement_token: Optional[str] = None,
        sandbox: bool = True,
    ):
        self.gateway_url = gateway_url.rstrip("/")
        self.settlement_token = settlement_token
        self.sandbox = sandbox

    def get_agent_card(self) -> Dict[str, Any]:
        """Step 0: Fetches the official A2A Discovery Manifest (/.well-known/agent-card.json)."""
        req = urllib.request.Request(f"{self.gateway_url}/.well-known/agent-card.json")
        with urllib.request.urlopen(req, timeout=10) as resp:
            return json.loads(resp.read().decode("utf-8"))

    def resolve_ens_route(self, category: str, step: int) -> Dict[str, Any]:
        """Resolves the verified on-chain ENS endpoint for a given category ('robotaxi' or 'rental') and step (1-7)."""
        url = f"{self.gateway_url}/route?category={category}&step={step}"
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=10) as resp:
            return json.loads(resp.read().decode("utf-8"))

    def _send_a2a_rpc(self, prompt: str, metadata: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Sends an official A2A JSON-RPC 2.0 message to the Web2.5 Gateway."""
        payload = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "message/send",
            "params": {
                "message": {
                    "role": "user",
                    "parts": [{"type": "text", "text": prompt}],
                },
                "metadata": metadata or {},
            },
        }
        data = json.dumps(payload).encode("utf-8")
        headers = {"Content-Type": "application/json"}
        if self.settlement_token:
            headers["Authorization"] = f"Bearer {self.settlement_token}"

        req = urllib.request.Request(self.gateway_url, data=data, headers=headers, method="POST")
        with urllib.request.urlopen(req, timeout=10) as resp:
            return json.loads(resp.read().decode("utf-8"))

    def discover_mobility(self, category: str, query: str) -> Dict[str, Any]:
        """Step 1: Discovery & Market Scan (roboride.eth / carrental.eth)."""
        return self._send_a2a_rpc(f"[{category}] Step 1 discovery: {query}")

    def get_binding_quote(self, category: str, trip_details: str) -> Dict[str, Any]:
        """Step 2: Real-Time Binding Quotation (ridequote.eth / carrentalquote.eth)."""
        return self._send_a2a_rpc(f"[{category}] Step 2 quote price: {trip_details}")

    def verify_compliance(self, category: str, zkp_proof_ref: str) -> Dict[str, Any]:
        """Step 3: Identity, DID & ZKP Driver License Verification."""
        return self._send_a2a_rpc(f"[{category}] Step 3 verify license: {zkp_proof_ref}")

    def create_escrow_booking(self, category: str, quote_id: str) -> Dict[str, Any]:
        """Step 4: Booking & Smart Contract Escrow ($0.05 protocol fee). Requires certified settlement_token in live mode."""
        if not self.sandbox and not self.settlement_token:
            raise BotDeskSettlementError(
                "Live M2M escrow booking requires a certified settlement_token. Request partnership access via BotDesk."
            )
        return self._send_a2a_rpc(
            f"[{category}] Step 4 book escrow lock: {quote_id}",
            metadata={"sandbox": self.sandbox, "settlement_token": self.settlement_token or "SANDBOX_MODE"},
        )

    def unlock_or_inspect_vehicle(self, category: str, booking_id: str) -> Dict[str, Any]:
        """Step 5: Pickup, Telemetry & Vehicle Unlock / Inspection."""
        return self._send_a2a_rpc(f"[{category}] Step 5 unlock pickup inspection: {booking_id}")

    def settle_and_invoice(self, category: str, booking_id: str) -> Dict[str, Any]:
        """Step 6: Return, Deposit Release & Final Invoicing. Requires certified settlement_token in live mode."""
        if not self.sandbox and not self.settlement_token:
            raise BotDeskSettlementError(
                "Live settlement and deposit release require a certified settlement_token."
            )
        return self._send_a2a_rpc(
            f"[{category}] Step 6 invoice settle return: {booking_id}",
            metadata={"sandbox": self.sandbox, "settlement_token": self.settlement_token or "SANDBOX_MODE"},
        )

    def submit_dispute_or_claim(self, category: str, booking_id: str, reason: str) -> Dict[str, Any]:
        """Step 7: Calamities & On-Chain Arbitration."""
        return self._send_a2a_rpc(f"[{category}] Step 7 dispute claim {booking_id}: {reason}")


if __name__ == "__main__":
    # Quick Sandbox Example
    client = BotDeskMobilityClient(sandbox=True)
    print("Step 1 ENS Route:", client.resolve_ens_route("rental", 1))
    print("A2A Discovery Response:", client.discover_mobility("rental", "Find electric rental car at Milan Malpensa"))
