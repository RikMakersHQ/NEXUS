/**
 * core/main_router.js
 * RikMakersHQ // PROJECT NEXUS Core Micro-Kernel & State Machine Router
 * Architectural Paradigm: Observer Pattern & Decoupled State Registry
 */

class NexusSystemKernel {
    constructor() {
        this.systemStateRegistry = {
            activeRoute: 'syntax',
            performanceTelemetry: {
                lastExecutionTimeMs: 0,
                memoryFootprintBytes: 0,
                cycleCount: 0
            },
            initializedModules: new Set()
        };
        this.routeListeners = [];
    }

    // High-performance asynchronous view routing swapper engine
    initializeRouter() {
        window.switchNexusRoute = (targetRouteHandle) => {
            if (this.systemStateRegistry.activeRoute === targetRouteHandle) return;
            
            const executionStart = performance.now();
            
            // Reassign global active status vectors
            this.systemStateRegistry.activeRoute = targetRouteHandle;
            
            // Dynamic view DOM toggle updates
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.toggle('active-route', tab.id === `tab-${targetRouteHandle}`);
            });

            document.querySelectorAll('.route-view-panel').forEach(panel => {
                panel.classList.toggle('active-panel', panel.id === `view-${targetRouteHandle}`);
            });

            // Trigger Module initialization vectors on demand
            this.broadcastRouteShift(targetRouteHandle);

            // Log Telemetry Speeds
            this.systemStateRegistry.performanceTelemetry.lastExecutionTimeMs = performance.now() - executionStart;
            this.systemStateRegistry.performanceTelemetry.cycleCount++;
        }
        
        this.systemStateRegistry.initializedModules.add('KERNEL_ROUTER_ACTIVE');
        console.log("[NEXUS KERNEL]: Micro-Router successfully initialized on core thread registry.");
    }

    registerModuleListener(callbackFunction) {
        this.routeListeners.push(callbackFunction);
    }

    broadcastRouteShift(currentActiveRoute) {
        this.routeListeners.forEach(listenerCallback => {
            try {
                listenerCallback(currentActiveRoute);
            } catch (runtimeError) {
                console.error(`[KERNEL ERROR]: Failed to notify subsystem listener node:`, runtimeError);
            }
        });
    }
}

// Global initialization execution pass
window.NexusKernelInstance = new NexusSystemKernel();
document.addEventListener('DOMContentLoaded', () => {
    window.NexusKernelInstance.initializeRouter();
});
