/**
 * core/nexus_valkyrie.js
 * RikMakersHQ // MODULE 2: NEXUS.VALKYRIE
 * Architectural Paradigm: Instruction Set Architecture (ISA) Register State Emulator
 */

class NexusValkyrieVM {
    constructor() {
        this.registers = { AX: 0x0000, BX: 0x0000, CX: 0x0000, DX: 0x0000 };
        this.programCounter = 0;
        this.traceMatrixLogs = [];
    }

    resetProcessorState() {
        this.registers = { AX: 0x0000, BX: 0x0000, CX: 0x0000, DX: 0x0000 };
        this.programCounter = 0;
        this.traceMatrixLogs = [];
    }

    // Ingests, tokenizes, and executes a full block of raw assembly text strings
    compileAndRunAssembly(rawAssemblyPayload) {
        this.resetProcessorState();
        const instructionLines = rawAssemblyPayload.split('\n');

        instructionLines.forEach((rawLine, index) => {
            const cleanedLine = rawLine.trim().replace(/,/g, '');
            // Skip un-compiled assembly notation comments or empty lines
            if (!cleanedLine || cleanedLine.startsWith(';')) return;

            this.programCounter++;
            const commandTokens = cleanedLine.split(/\s+/);
            const opCode = commandTokens[0].toUpperCase();
            const destinationRegister = commandTokens[1] ? commandTokens[1].toUpperCase() : null;
            const sourceOperand = commandTokens[2] ? commandTokens[2].toUpperCase() : null;

            if (opCode === 'MOV') {
                this.executeMoveOp(destinationRegister, sourceOperand, index);
            } else if (opCode === 'ADD') {
                this.executeAddOp(destinationRegister, sourceOperand, index);
            } else {
                this.traceMatrixLogs.push(`[Line ${index + 1} | PC: ${this.programCounter}] FAULT: Invalid Opcode [${opCode}] bypassed.`);
            }
        });

        return {
            finalRegisters: this.registers,
            stepTrace: this.traceMatrixLogs
        };
    }

    executeMoveOp(dest, src, lineIndex) {
        if (!this.registers.hasOwnProperty(dest)) {
            this.traceMatrixLogs.push(`[Line ${lineIndex + 1}] ERROR: Invalid destination register allocation [${dest}]`);
            return;
        }

        let literalVal = this.registers.hasOwnProperty(src) ? this.registers[src] : parseInt(src, 10);
        if (isNaN(literalVal)) literalVal = 0;

        this.registers[dest] = literalVal & 0xFFFF; // Enforce strict 16-bit physical hardware limits
        this.traceMatrixLogs.push(`[Line ${lineIndex + 1} | PC: ${this.programCounter}] MOV: Loaded evaluation [0x${this.registers[dest].toString(16).toUpperCase().padStart(4, '0')}] into ${dest}`);
    }

    executeAddOp(dest, src, lineIndex) {
        if (!this.registers.hasOwnProperty(dest)) {
            this.traceMatrixLogs.push(`[Line ${lineIndex + 1}] ERROR: Target assignment node [${dest}] does not exist.`);
            return;
        }

        let literalVal = this.registers.hasOwnProperty(src) ? this.registers[src] : parseInt(src, 10);
        if (isNaN(literalVal)) literalVal = 0;

        this.registers[dest] = (this.registers[dest] + literalVal) & 0xFFFF;
        this.traceMatrixLogs.push(`[Line ${lineIndex + 1} | PC: ${this.programCounter}] ADD: Combined values. Register ${dest} computed to [0x${this.registers[dest].toString(16).toUpperCase().padStart(4, '0')}]`);
    }
}

// --- VIEW CONTROLLER INTERACTION BRIDGE ---
function executeValkyrieCPUPipeline() {
    const rawCodeBlock = document.getElementById('cpuInput').value;
    const traceLogsDisplay = document.getElementById('cpuLogs');

    if (!rawCodeBlock.trim()) return;

    const VMInstance = new NexusValkyrieVM();
    const runtimeExecutionResult = VMInstance.compileAndRunAssembly(rawCodeBlock);

    // Dynamic UI registry component grid refresh updates
    for (const regKey in runtimeExecutionResult.finalRegisters) {
        const valueHexStr = "0x" + runtimeExecutionResult.finalRegisters[regKey].toString(16).toUpperCase().padStart(4, '0');
        document.getElementById(`reg-${regKey}`).innerText = valueHexStr;
    }

    // Output low-level execution trace rows to screen layout
    traceLogsDisplay.innerHTML = `<strong>[VALKYRIE PC TRACE MATRIX]:</strong><br><hr style="border:1px solid #e5e7eb; margin:6px 0;">`;
    runtimeExecutionResult.stepTrace.forEach(logLine => {
        traceLogsDisplay.innerHTML += `<div style="padding: 2px 0;">${logLine}</div>`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const valkyrieTriggerButton = document.getElementById('btn-valkyrie');
    if (valkyrieTriggerButton) {
        valkyrieTriggerButton.addEventListener('click', executeValkyrieCPUPipeline);
    }
});
