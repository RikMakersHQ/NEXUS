/**
 * core/nexus_vortex.js
 * RikMakersHQ // MODULE 4: NEXUS.VORTEX
 * Architectural Paradigm: File Allocation Table (FAT16) Sector Paging Virtualizer
 */

class NexusVortexStorage {
    constructor() {
        this.totalSectors = 64;
        this.sectorAllocationMap = new Array(this.totalSectors).fill(null); // Storage Array
        this.fileAllocationTable = {}; // FAT Index Linked Nodes
    }

    resetStorageArray() {
        this.sectorAllocationMap.fill(null);
        this.fileAllocationTable = {};
    }

    // Advanced block allocation pipeline simulator parsing structural file definitions
    allocateSpaceForFile(filenameString, requestedSectorSize) {
        let sizeToAllocate = parseInt(requestedSectorSize, 10);
        if (isNaN(sizeToAllocate) || sizeToAllocate <= 0) sizeToAllocate = 4;

        let allocatedSectorsList = [];
        
        // Linear Scanning Scan Loop to find unallocated clusters
        for (let idx = 0; idx < this.totalSectors; idx++) {
            if (this.sectorAllocationMap[idx] === null) {
                this.sectorAllocationMap[idx] = filenameString;
                allocatedSectorsList.push(idx);
                
                if (allocatedSectorsList.length === sizeToAllocate) break;
            }
        }

        // If block sector allocation completes successfully, register node maps inside FAT registry
        if (allocatedSectorsList.length > 0) {
            this.fileAllocationTable[filenameString] = {
                fileSizeClusters: sizeToAllocate,
                clusterChainLinks: allocatedSectorsList,
                allocationStatus: allocatedSectorsList.length === sizeToAllocate ? 'SUCCESS' : 'FRAGMENTED_PARTIAL'
            };
        }

        return {
            filename: filenameString,
            sectorsBounded: allocatedSectorsList,
            targetSize: sizeToAllocate,
            actualAllocated: allocatedSectorsList.length
        };
    }
}

// --- CENTRAL DOM RENDER CONTROLLER INTERFACE ---
const VirtualVortexController = new NexusVortexStorage();

function initVortexGraphicalGrid() {
    const gridCanvasDOMNode = document.getElementById('storageCanvas');
    if (!gridCanvasDOMNode) return;
    
    // Clear and build pristine unallocated physical squares layout
    gridCanvasDOMNode.innerHTML = '';
    for (let idx = 0; idx < VirtualVortexController.totalSectors; idx++) {
        const sectorSquareNode = document.createElement('div');
        sectorSquareNode.className = 'sector-block';
        sectorSquareNode.id = `cluster-node-${idx}`;
        sectorSquareNode.innerText = idx.toString().padStart(2, '0');
        gridCanvasDOMNode.appendChild(sectorSquareNode);
    }
}

function executeVortexStoragePipeline() {
    const scriptInputText = document.getElementById('storageInput').value;
    const metricsDisplayLogs = document.getElementById('storageLogs');

    if (!scriptInputText.trim()) return;

    // Force clear internal allocations array memory maps before parsing new inputs
    VirtualVortexController.resetStorageArray();
    initVortexGraphicalGrid();

    metricsDisplayLogs.innerHTML = `<strong>[VORTEX DATA METRICS ENGINE]:</strong><br><hr style="border:1px solid #e5e7eb; margin:6px 0;">`;
    
    const commandLinesArray = scriptInputText.split('\n');

    commandLinesArray.forEach((scriptLine, lineIndex) => {
        const tokenParts = scriptLine.trim().split(/\s+/);
        const coreCommand = tokenParts[0] ? tokenParts[0].toLowerCase() : '';
        const targetFilename = tokenParts[1] || null;
        const targetSize = tokenParts[2] || null;

        if (coreCommand === 'allocate' && targetFilename && targetSize) {
            const allocationReport = VirtualVortexController.allocateSpaceForFile(targetFilename, targetSize);
            
            // Map color classes to active cluster elements inside view panel layout grid
            allocationReport.sectorsBounded.forEach(sectorID => {
                const physicalBlockDOMNode = document.getElementById(`cluster-node-${sectorID}`);
                if (physicalBlockDOMNode) {
                    physicalBlockDOMNode.classList.add('allocated');
                    physicalBlockDOMNode.title = `File Ref: ${allocationReport.filename}`;
                }
            });

            // Write FAT allocation metrics logs to telemetry terminal interface panel
            metricsDisplayLogs.innerHTML += `
                <div style="padding: 2px 0; font-size:10px;">
                    [FAT16 MAP]: Node Link '${allocationReport.filename}' allocated [${allocationReport.actualAllocated}/${allocationReport.targetSize}] Sectors successfully.
                </div>`;
            
            if (allocationReport.actualAllocated < allocationReport.targetSize) {
                metricsDisplayLogs.innerHTML += `
                    <div style="color:var(--accent-crimson); font-size:9px; padding-left:12px;">
                        ↳ ERROR: Disk Out of Memory Partition. Allocation path fragmented!
                    </div>`;
            }
        } else if (scriptLine.trim() && !scriptLine.startsWith(';')) {
            metricsDisplayLogs.innerHTML += `<div style="color:var(--text-muted);">[Line ${lineIndex + 1}] Skip invalid syntax.</div>`;
        }
    });
}

// Ensure hardware sector matrix squares are pre-rendered on view load initialization passes
document.addEventListener('DOMContentLoaded', () => {
    initVortexGraphicalGrid();
    
    const vortexTriggerButton = document.getElementById('btn-vortex');
    if (vortexTriggerButton) {
        vortexTriggerButton.addEventListener('click', executeVortexStoragePipeline);
    }
});
