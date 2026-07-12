// 1. Paste the two enterprise functions at the top or bottom of main.js
function saveStudyMinutes(minutesInputValue) {
    const minutes = parseInt(minutesInputValue);

    // ENTERPRISE VALIDATION CHECK
    if (isNaN(minutes) || minutes <= 0) {
        alert("Error: Input must be a positive number greater than 0.");
        return false; 
    }
    if (minutes > 1440) { 
        alert("Error: Study duration cannot exceed 24 hours in a single day.");
        return false;
    }

    // Proceed to save data safely if validation passes
    let currentTotal = parseInt(localStorage.getItem("totalStudyMinutes")) || 0;
    localStorage.setItem("totalStudyMinutes", currentTotal + minutes);
    
    // Success! Now trigger the audit trail log
    logSessionToAuditTrail(minutes);
    return true;
}

function logSessionToAuditTrail(minutesStudied) {
    let sessionLog = JSON.parse(localStorage.getItem("foxcus_session_log")) || [];

    const newRecord = {
        sessionID: "SESS-" + Date.now(),
        timestamp: new Date().toLocaleString(),
        durationMins: minutesStudied
    };

    sessionLog.push(newRecord);
    localStorage.setItem("foxcus_session_log", JSON.stringify(sessionLog));
}


// ==========================================
// 2. WHERE TO CALL IT (Inside your Stop Button event listener)
// ==========================================
const stopFocusButton = document.querySelector('.stop-focusing-btn'); // Change selector to match your HTML

stopFocusButton.addEventListener('click', () => {
    // Calculate minutes elapsed from your timer
    // For example, if your timer ran for 25 minutes:
    let minutesElapsed = calculateTimeSpent(); 

    // CALL YOUR NEW VALIDATION LAYER
    let isSaved = saveStudyMinutes(minutesElapsed);

    if (isSaved) {
        // Run your existing code to switch back to main.html dashboard view
        // And refresh the UI text that shows total study time!
        updateDashboardUI();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    
    // If a user is new, give them 300 minutes to start so they can test shopping!
    if (localStorage.getItem("userCoins") === null) {
        localStorage.setItem("userCoins", "300");
    }

    // Dynamic asset scan check
    const activeDecorations = ["lampplant", "plantcup"];

    activeDecorations.forEach(itemKey => {
        const isOwned = localStorage.getItem(`owned_${itemKey}`);

        if (isOwned === "true") {
            const targetAsset = document.getElementById(`decor-${itemKey}`);
            if (targetAsset) {
                // Strip the hidden display block rules away
                targetAsset.classList.add("visible-decor");
            }
        }
    });

    // Sync currency numbers cleanly with your original top-right HUD node
    const currentMinutes = localStorage.getItem("userCoins") || "0";
    const coinHudNode = document.getElementById("hud-coin-text");
    if (coinHudNode) {
        coinHudNode.innerText = currentMinutes;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("chatbot-toggle-btn");
    const closeBtn = document.getElementById("close-chat-btn");
    const chatWindow = document.getElementById("chatbot-window");
    const sendBtn = document.getElementById("send-chat-btn");
    const userInput = document.getElementById("chat-user-input");
    const chatBody = document.getElementById("chat-body");

    // Toggle window visibility
    toggleBtn.addEventListener("click", () => {
        chatWindow.classList.remove("chat-window-hidden");
        toggleBtn.classList.add("chat-window-hidden");
    });
    closeBtn.addEventListener("click", () => {
        chatWindow.classList.add("chat-window-hidden");
        toggleBtn.classList.remove("chat-window-hidden");
    });

    // Handle messaging processing execution
    sendBtn.addEventListener("click", processUserMessage);
    userInput.addEventListener("keypress", (e) => { if (e.key === 'Enter') processUserMessage(); });

    function processUserMessage() {
        const queryText = userInput.value.trim();
        if (!queryText) return;

        // Append User View Message
        appendMessage(queryText, "user-msg");
        userInput.value = "";

        // Simulate thinking processing lag to mimic standard AI loops
        setTimeout(() => {
            const botResponse = generateAIResponse(queryText);
            appendMessage(botResponse, "bot-msg");
        }, 400);
    }

    function appendMessage(text, className) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `chat-message ${className}`;
        msgDiv.textContent = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight; // Auto-scrolls to newest data log
    }

    // --- ENTERPRISE SYSTEM AI ROUTING DICTIONARY ---
    function generateAIResponse(input) {
        const standardCleanInput = input.toLowerCase();

        // Relational Query Mapping Rules
        if (standardCleanInput.includes("hello") || standardCleanInput.includes("hi ")) {
            return "Hello there! How can I assist you with your academic goals today?";
        }
        if (standardCleanInput.includes("economics") || standardCleanInput.includes("budget") || standardCleanInput.includes("market")) {
            return "When analyzing topics like the Federal Budget or economic policies, remember to focus directly on structural indicators: the Balance of Payments, external stability targets, and the exact impacts on key public stakeholders.";
        }
        if (standardCleanInput.includes("active recall") || standardCleanInput.includes("memorise") || standardCleanInput.includes("study technique")) {
            return "To maximize memory retention before exams, use active recall methods! Try using digital applications like Goodnotes to completely cover key vocabulary headers, forcing your brain to retrieve structural information under speed.";
        }
        if (standardCleanInput.includes("essay") || standardCleanInput.includes("literature") || standardCleanInput.includes("poem")) {
            return "For high-tier literature analysis, always ensure your core arguments directly answer the thematic prompt. For example, if evaluating identity, rigorously unpack whether the author portrays the definition of self as unstable and shifting, rather than static and certain.";
        }
        if (standardCleanInput.includes("procrastinating") || standardCleanInput.includes("distracted") || standardCleanInput.includes("focus")) {
            return "If you are struggling to start, initiate a short 25-minute focus session right here on Foxcus. Committing to a localized time segment lowers psychological friction and unlocks coin incentives!";
        }
        if (standardCleanInput.includes("stress") || standardCleanInput.includes("tired")) {
            return "Academic health relies closely on proper physical well-being. If you are experiencing fatigue, consider activating our ergonomic Dark Theme toggle to reduce blue light glare, and aim for a healthy consistency in your sleep cycles.";
        }

        // Generic Ultimate Dynamic Fallback Handler
        return "That is a great study question. To optimize that specific area, break down your curriculum guidelines into separate core modules, allocate a strict 45-minute focus window on your dashboard, and test your retention using active recall reviews.";
    }
});
