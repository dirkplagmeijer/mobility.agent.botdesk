# mobility.agent.botdesk
### The Autonomous Web2.5 Foundation for AI-Agents in Passenger Mobility

The global car rental and upcoming robotaxi markets are trapped in fragmented, closed legacy infrastructures. **mobility.agent.botdesk** delivers the core open-source passenger mobility taxonomy required to standardize machine-to-machine (M2M) commerce. 

This repository acts as the definitive logical blueprint. It defines exactly how autonomous AI-agents discover, book, and settle transactions with vehicle fleets, laying the foundation for universal Web2.5 API wrappers without forcing operators to overhaul their current transactional legacy software.

---

### 📂 Repository Structure
* **`/core-architecture`** – Contains `M2M_ENS_REGISTRY.md` (The master M2M on-chain ENS directory).
* **`/schemas/robotaxi`** – Contains `ride_taxonomy_schema.json` (Data model for on-demand passenger rides).
* **`/schemas/rental`** – Contains `rental_taxonomy_schema.json` (Data model for traditional & autonomous car rentals).

---

### 🗺️ The 7-Step Taxonomy & Registry Lifecycle
Each operational step maps real-world mobility logic directly to validated on-chain ENS registry endpoints:

1. **Discovery & Filtering (The Market Scan)**
   * *Robotaxi:* Scans available fleets and stations via `roboride.eth` and `robotaxisearch.eth`.
   * *Rental:* Filters localized vehicles and airport depots via `roborental.eth` and `airportrentalcar.eth`.
2. **Availability & Quotation (Real-Time Binding Pricing)**
   * *Robotaxi:* Requests live status and dynamic pricing quotes per kilometer via `ridequote.eth` and `riderate.eth`.
   * *Rental:* Fetches multi-day availability parameters and base rates via `carrentalquote.eth` and `carrentalrates.eth`.
3. **Verification & Policy (Identity & Compliance)**
   * *Robotaxi:* Verifies operator trust-scores and trip compliance via `rideverification.eth` and `ridepolicy.eth`.
   * *Rental:* Validates Decentralized Identifiers (DIDs) and privacy-preserving Zero-Knowledge Proofs (ZKPs) for digital driver's licenses via `rentaldriverslicense.eth`.
4. **Booking, Escrow & Payment (Locking the Transaction)**
   * *Shared Network Layer:* The database architecture models protocol parameters, including placeholders for a hardcoded **\$0.05 micro-payment protocol fee** per successful M2M booking.
   * *Robotaxi:* Locks the upcoming vehicle and opens the transaction escrow via `ridelock.eth` and `rideescrow.eth`.
   * *Rental:* Secures multi-day reservations and locks required crypto security deposits via `carrentalescrow.eth` and `carrentaldeposit.eth`.
5. **Access, Execution & Telemetry (The Physical Handover)**
   * *Robotaxi:* Tracks approaching GPS coordinates and executes secure door unlocking via `unlockrobotaxi.eth` and `ridelocation.eth`.
   * *Rental:* Processes digital damage inspections and reads initial fuel/battery metrics via `carrentalinspection.eth` and `carrentalfuel.eth`.
6. **Return, Invoice & Settlement (Completion & Final Settlement)**
   * *Robotaxi:* Concludes the localized trip, finalizes streaming payments, and anchors the invoice via `ridesettlement.eth` and `rideinvoice.eth`.
   * *Rental:* Coordinates vehicle drop-off, checks for new damage, and executes deposit release via `carrentalreturn.eth` and `carrentaldepositrelease.eth`.
7. **Calamities & Post-Rental (Incident & Dispute Management)**
   * *Robotaxi:* Manages route modifications, ride cancellations, and accident telemetry snapshots via `ridedispute.eth` and `robocaraccident.eth`.
   * *Rental:* Handles lease extensions, breakdown logistics, and algorithmic damage claims via `carrentalclaim.eth` and `carrentaldamageclaim.eth`.

---

### 🛠️ Technical Roadmap
* **Phase 1 (Current Status):** Core logical frameworks, taxonomy boundaries, and structural validation JSON-schemas for both **Robotaxi** and **Rental** sectors are fully finalized and open for review.
* **Phase 2 (Immediate Next Step):** Compiling the core taxonomy datasets into a unified **OpenAPI 3.0 (Swagger) Specification** (`openapi.yaml`) to enable automated SDK generation in TypeScript, Python, Go, and Rust.
* **Phase 3 (Ecosystem Scaling):** Launching developer guidelines and open-source Web2.5 API wrapper templates.

---

### ⚖️ Open Source Licensing & Core Architecture Partnership
The passenger mobility data taxonomy and JSON-schemas contained in this repository are open-source under the MIT License and free to use for integration into external AI-agent frameworks to foster global machine-to-machine (M2M) standardization.

**Crucial Architecture Notice:** 
To guarantee network trust, absolute security, and fraud-proof capital settlement, the core on-chain Payment and Escrow Smart Contract Module is strictly proprietary. This transactional engine—which hardcodes the universal $0.05 protocol fee—is not publicly deployed here. 

Integration with the official, validated settlement network requires a certified partnership. If you are an enterprise fleet operator, a major aggregator, or a specialized Web3 Smart Contract architect looking to co-develop or utilize the secure transactional layer, you must connect with the founder personally.

📩 **Strategic Licensing & Co-Founding Dialogues:**
Serious inquiries regarding core smart contract execution, private data room access, or technical co-founding structures in Amsterdam/Hybrid are exclusively handled via direct communication. Reach out via LinkedIn DM or contact the Commercial Director at `[Jouw E-mailadres]`.
