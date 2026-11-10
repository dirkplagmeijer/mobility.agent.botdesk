# mobility.agent.botdesk
### The Autonomous Web2.5 Foundation for AI-Agents in Passenger Mobility

Anticipating a yearly billion bookings market massive transforming. The passenger mobility sector is breaking out of its legacy "walled gardens" driven by critical market triggers:

* **The Big Tech Battle:** A global race to decentralize data routing and counter Google's monopoly on mobility mapping and transit infrastructure.
* **The Aggregator Transformation:** Independent brokers and localized travel aggregators (such as Lyko and CarTrawler) are shifting to accommodate plug-in API architectures to stay distributed.
* **M2M Cost Efficiency:** Algorithmic machine-to-machine transactions severely compress intermediary margins, making travel commerce significantly cheaper.
* **The Airport Disruption:** High-frequency autonomous "Roborental" models are moving to directly compete with legacy physical airport rental monopolies.
* **Optimized Fleet Utilization:** Automated M2M operations scale network fleet deployment, continuously increasing the overall vehicle occupancy and utilization rate.
* **Unified Standards for Travel Assistants:** Next-generation AI travel assistants require uniform, structured open data standards to discover, evaluate, and book transport autonomously.

---

## 🚀 The Gateway: Open-Source Architecture Driven by BotDesk

We are changing the rules of the game with BotDesk. We deliver a cross-chain, highly efficient, and superior mobility taxonomy that serves as the universal foundation upon which Web3 developers can openly build and deploy their validated endpoints. 

Our pragmatic deployment roadmap launches as a hybrid distribution landing page for autonomous AI agents, while systematically digitalizing the backend settlement layer step-by-step into a fully automated agent economy.

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

Integration with the official, validated settlement network requires a certified partnership. As a commercial entrepreneur with a clear vision and focus, I am inviting Web3 developers, ecosystem builders, and business developers to build or integrate the data-layer for the future mobility market. 

📩 **Strategic Licensing & Co-Founding Dialogues:**
If you understand the scale of the upcoming passenger agent-economy and want to participate, let’s connect directly. Serious inquiries regarding core smart contract execution, private data room access, or technical co-founding structures in Amsterdam/Hybrid are exclusively handled via direct communication. Reach out directly via LinkedIn DM.
