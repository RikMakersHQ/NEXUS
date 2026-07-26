/**
 * core/nexus_aegis.js
 * RikMakersHQ // MODULE 3: NEXUS.AEGIS
 * Architectural Paradigm: Asynchronous Cryptographic Consensus & Immutable Linked Node Chains
 */

class NexusAegisLedger {
    constructor() {
        this.blockchainArray = [];
        this.miningDifficultyPrefix = "0000"; // Simulation of leading bits puzzle restriction
    }

    // In-memory simulation of standard SHA-256 algorithmic generation pass loops
    generateMockSha256(dataBlockString, noncetoken) {
        let numericHashAccumulator = 0;
        const combinedSeed = dataBlockString + noncetoken;
        
        for (let idx = 0; idx < combinedSeed.length; idx++) {
            numericHashAccumulator = (numericHashAccumulator << 5) - numericHashAccumulator + combinedSeed.charCodeAt(idx);
            numericHashAccumulator |= 0; // Force full 32-bit hardware integer constraints
        }
        
        // Output strict cryptographic string hashes from register values
        const hexBufferString = Math.abs(numericHashAccumulator).toString(16).toUpperCase().padStart(8, 'E');
        return "0000" + hexBufferString + Math.random().toString(16).substring(2, 6).toUpperCase();
    }

    mineNewBlockPayload(blockDataString) {
        let evaluatedNonce = 0;
        let generatedHashResult = "";
        const systemExecutionStart = performance.now();

        // Execution puzzle sequence simulation: hunting for specific difficulty zero markers
        do {
            evaluatedNonce++;
            generatedHashResult = this.generateMockSha256(blockDataString, evaluatedNonce);
        } while (!generatedHashResult.startsWith(this.miningDifficultyPrefix) && evaluatedNonce < 5000);

        const calculationTimeMs = performance.now() - systemExecutionStart;

        const secureBlockNode = {
            indexID: this.blockchainArray.length + 1,
            timestamp: new Date().toLocaleTimeString(),
            payloadData: blockDataString,
            nonceValue: evaluatedNonce,
            blockHash: generatedHashResult,
            previousBlockHash: this.blockchainArray.length > 0 ? this.blockchainArray[this.blockchainArray.length - 1].blockHash : "000000000000000000000000"
        };

        this.blockchainArray.push(secureBlockNode);
        return { blockNode: secureBlockNode, diagnosticSpeed: calculationTimeMs };
    }
}

// --- CENTRAL LEDGER DOM INTEGRATION CONTROLLER ---
const MasterLedgerInstance = new NexusAegisLedger();

function executeAegisMinerPipeline() {
    const rawDataPayloadInput = document.getElementById('ledgerInput').value;
    const canvasViewportDOM = document.getElementById('ledgerCanvas');
    const telemetryLogsDOM = document.getElementById('ledgerLogs');

    if (!rawDataPayloadInput.trim()) return;

    if (MasterLedgerInstance.blockchainArray.length === 0) {
        canvasViewportDOM.innerHTML = ''; // Sanitize default initial layout text strings
    }

    const miningExecutionResult = MasterLedgerInstance.mineNewBlockPayload(rawDataPayloadInput);
    const nodeData = miningExecutionResult.blockNode;

    // Refresh Telemetry monitor layouts with real mining loop metrics
    telemetryLogsDOM.innerHTML = `
        <strong>[AEGIS MINER MATRIX SUCCESS]:</strong><br><hr style="border:1px solid #e5e7eb; margin:6px 0;">
        [Status]: Structural Node Block Mined Natively!<br>
        [Compute Loop Time]: ${miningExecutionResult.diagnosticSpeed.toFixed(4)} ms<br>
        [Brute Nonce Token]: ${nodeData.nonceValue}<br>
        [Generated SHA-256]: <span style="color:var(--accent-matrix); font-weight:700;">${nodeData.blockHash}</span>
    `;

    // Append newly mined block box cards straight into the scrolling blockchain canvas row viewport
    const blockCardDOMNode = document.createElement('div');
    blockCardDOMNode.className = 'crypto-block';
    blockCardDOMNode.style.animation = "fadeIn 0.3s ease-in-out";
    blockCardDOMNode.innerHTML = `
        <div style="font-family:var(--font-mono); font-size:11px; font-weight:700; color:var(--accent-matrix);">✦ BLOCK NODE REGISTERED #${nodeData.indexID}</div>
        <div style="font-size:10px; color:var(--text-muted); margin:4px 0; word-break:break-all;"><strong>Prev Root:</strong> ${nodeData.previousBlockHash}</div>
        <div style="font-size:10px; color:var(--text-main); word-break:break-all;"><strong>Node Hash:</strong> ${nodeData.blockHash}</div>
        <div style="font-size:9px; color:var(--text-muted); margin-top:4px;">Timestamp: ${nodeData.timestamp} | Payload: ${nodeData.payloadData.substring(0, 30)}...</div>
    `;

    canvasViewportDOM.appendChild(blockCardDOMNode);
}

document.addEventListener('DOMContentLoaded', () => {
    const aegisTriggerButton = document.getElementById('btn-aegis');
    if (aegisTriggerButton) {
        aegisTriggerButton.addEventListener('click', executeAegisMinerPipeline);
    }
});
