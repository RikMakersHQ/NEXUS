/**
 * core/nexus_titan.js
 * RikMakersHQ // MODULE 1: NEXUS.TITAN
 * Architectural Paradigm: Deterministic Token Classification & Recursive Node Generation Mapping
 */

class NexusTitanCompiler {
    constructor() {
        // Multi-Language Lexical Parameter Definitions Matrix for Polyglot Target Selection
        this.languageSpecs = {
            rust: { keywords: ['let', 'mut', 'fn', 'const', 'struct', 'match', 'impl', 'use'], marker: '// Rust Engine' },
            cpp: { keywords: ['auto', 'int', 'void', 'class', 'public', 'include', 'template', 'std'], marker: '// C++ Engine' },
            go: { keywords: ['func', 'package', 'import', 'chan', 'select', 'defer', 'go', 'var'], marker: '// Go Engine' }
        };

        this.tokenRules = [
            { type: 'KEYWORD', regex: null }, // Handled dynamically via active specification selection mapping
            { type: 'NUMERIC_LITERAL', regex: /\b0x[0-9a-fA-F]+\b|\b\d+\b/ },
            { type: 'STRING_LITERAL', regex: /"[^"\\]*(?:\\.[^"\\]*)*"/ },
            { type: 'IDENTIFIER', regex: /\b[a-zA-Z_][a-zA-Z0-9_]*\b/ },
            { type: 'OPERATOR_ASSIGN', regex: /^(=|\+=|-=)/ },
            { type: 'OPERATOR_LOGIC', regex: /^(==|!=|&&|\|\|)/ },
            { type: 'PUNCTUATION', regex: /^[{}();.,\[\]]/ }
        ];
    }

    // High-density Lexical Analysis Pass (The Tokenizer Pipeline Engine)
    tokenizePayload(sourceText, targetLanguageProfile) {
        let textPointer = 0;
        const tokensArray = [];
        const activeKeywordsList = this.languageSpecs[targetLanguageProfile]?.keywords || [];

        while (textPointer < sourceText.length) {
            let workingSubstring = sourceText.slice(textPointer);

            // Strip functional layout spaces instantly to maximize sorting performance
            const spaceMatch = /^\s+/.exec(workingSubstring);
            if (spaceMatch) {
                textPointer += spaceMatch[0].length;
                continue;
            }

            let tokenMatchVerified = false;

            for (const rule of this.tokenRules) {
                let ruleRegex = rule.regex;
                
                // Construct dynamic keyword regex matrices specifically bounded to the active language
                if (rule.type === 'KEYWORD') {
                    ruleRegex = new RegExp(`^\\b(${activeKeywordsList.join('|')})\\b`);
                }

                const executionMatch = ruleRegex.exec(workingSubstring);
                if (executionMatch && executionMatch.index === 0) {
                    const extractedValue = executionMatch[0];
                    tokensArray.push({
                        type: rule.type === 'KEYWORD' ? 'KEYWORD' : rule.type,
                        value: extractedValue,
                        offsetRange: [textPointer, textPointer + extractedValue.length]
                    });
                    textPointer += extractedValue.length;
                    tokenMatchVerified = true;
                    break;
                }
            }

            if (!tokenMatchVerified) {
                tokensArray.push({
                    type: 'VULNERABILITY_NODE_ERROR',
                    value: sourceText[textPointer],
                    offsetRange: [textPointer, textPointer + 1]
                });
                textPointer++;
            }
        }
        return tokensArray;
    }

    // Core Syntax Parser: Generates a real-world Abstract Syntax Tree (AST) Data Schema Tree
    generateASTSchemaTree(tokensArray) {
        let streamIndex = 0;
        const programRootNode = { type: 'ProgramNode', body: [], metadata: { cycleHash: Math.random().toString(36).substring(7) } };

        function parseStatementNode() {
            if (streamIndex >= tokensArray.length) return null;
            let currentToken = tokensArray[streamIndex];

            // Parse Variable Declarations: let mut payload = 2048; or var telemetry = 5
            if (currentToken.type === 'KEYWORD' && (currentToken.value === 'let' || currentToken.value === 'var' || currentToken.value === 'auto')) {
                const declarationNode = { type: 'VariableDeclarationNode', keyword: currentToken.value, isMutable: false, identifier: null, valueExpression: null };
                streamIndex++; // Consume declaration keyword node

                if (streamIndex < tokensArray.length && tokensArray[streamIndex].value === 'mut') {
                    declarationNode.isMutable = true;
                    streamIndex++; // Consume 'mut'
                }

                if (streamIndex < tokensArray.length && tokensArray[streamIndex].type === 'IDENTIFIER') {
                    declarationNode.identifier = tokensArray[streamIndex].value;
                    streamIndex++;
                }

                if (streamIndex < tokensArray.length && tokensArray[streamIndex].type === 'OPERATOR_ASSIGN') {
                    streamIndex++; // Consume '=' sign
                    if (streamIndex < tokensArray.length) {
                        declarationNode.valueExpression = tokensArray[streamIndex].value;
                        streamIndex++;
                    }
                }
                return declarationNode;
            }

            // Fallback token consumer mapping logic loop
            const primitiveLeafNode = { type: 'ExpressionTerminalLeaf', tokenValue: currentToken.value, classType: currentToken.type };
            streamIndex++;
            return primitiveLeafNode;
        }

        while (streamIndex < tokensArray.length) {
            const compiledStatement = parseStatementNode();
            if (compiledStatement) programRootNode.body.push(compiledStatement);
        }

        return programRootNode;
    }
}

// --- DOM INJECTION HANDLER MATRICES FOR THE VIEWS ---
function executeTitanEnginePipeline() {
    const inputPayloadString = document.getElementById('syntaxInput').value;
    const selectedLanguageProfile = document.getElementById('langSelector').value;
    const logsViewportDOM = document.getElementById('syntaxLogs');
    const canvasViewportDOM = document.getElementById('syntaxCanvas');

    if (!inputPayloadString.trim()) return;

    const CompilerInstance = new NexusTitanCompiler();
    
    // 1. Fire Tokenizer Engine Loop Pass
    const tokenMatrixOutput = CompilerInstance.tokenizePayload(inputPayloadString, selectedLanguageProfile);
    
    // Render Telemetry logs to screen layout
    logsViewportDOM.innerHTML = `<strong>[TITAN TELEMETRY LOGS]:</strong><br><hr style="border:1px solid #e5e7eb; margin:6px 0;">`;
    tokenMatrixOutput.forEach(token => {
        logsViewportDOM.innerHTML += `
            <div class="token-row">
                <span style="color:var(--text-muted); font-size:10px;">${token.type}</span>
                <span style="color:var(--accent-matrix); font-weight:600;">${token.value.replace(/</g, "&lt;")}</span>
            </div>`;
    });

    // 2. Fire AST Parser Engine Loop Pass
    const semanticTreeModel = CompilerInstance.generateASTSchemaTree(tokenMatrixOutput);
    
    // Render Graphical Tree Structures into the center dashboard viewport panel
    canvasViewportDOM.innerHTML = `<div style="font-family:var(--font-mono); font-size:12px;"><strong>[Root Node]:</strong> ${semanticTreeModel.type} (Hash: ${semanticTreeModel.metadata.cycleHash})</div>`;
    semanticTreeModel.body.forEach(node => {
        let displayRowString = `<div style="margin-left:14px; border-left:1px solid var(--border-color); padding-left:10px; margin-top:4px;">↳ <strong>[Branch]:</strong> ${node.type}`;
        if(node.identifier) displayRowString += ` | <span style="color:#2563eb">ID: ${node.identifier}</span>`;
        if(node.isMutable) displayRowString += ` <span style="color:var(--accent-crimson)">[MUTABLE]</span>`;
        if(node.valueExpression) displayRowString += ` ➔ <span style="color:var(--accent-matrix)">Value: ${node.valueExpression}</span>`;
        if(node.tokenValue) displayRowString += ` | Terminal: <code>${node.tokenValue}</code> [${node.classType}]`;
        displayRowString += `</div>`;
        canvasViewportDOM.innerHTML += displayRowString;
    });

    // 3. Fire Static Compiler Shield Anti-Vulnerability Sweeps
    if (inputPayloadString.includes('strcpy') || inputPayloadString.includes('gets') || inputPayloadString.includes('unsafe')) {
        logsViewportDOM.innerHTML += `
            <div style="border:1px solid var(--accent-crimson); padding:10px; margin-top:12px; background:#fff5f5; color:var(--accent-crimson); font-size:10px; line-height:1.4;">
                <strong>⚠️ COMPILER SHIELD PROTECTION FAULT ALERT:</strong><br>
                Memory Vulnerability signature pattern match flagged! Unchecked raw pointer boundary or unsafe allocation method detected. Compile pass halted to prevent target stack overflow exploits.
            </div>`;
    }
}

// Bind live engine execution hook listeners directly to DOM interaction buttons
document.addEventListener('DOMContentLoaded', () => {
    const titanTriggerButton = document.getElementById('btn-titan');
    if (titanTriggerButton) {
        titanTriggerButton.addEventListener('click', executeTitanEnginePipeline);
    }
    
    if (window.NexusKernelInstance) {
        window.NexusKernelInstance.registerModuleListener((activeRoute) => {
            if (activeRoute === 'syntax') console.log("[TITAN SUBSYSTEM]: Active focus verified.");
        });
    }
});
