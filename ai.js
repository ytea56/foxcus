document.addEventListener("DOMContentLoaded", () => {
    const sendBtn = document.getElementById("ai-send-btn");
    const userInput = document.getElementById("ai-user-query");
    const chatDisplay = document.getElementById("chat-display");

    sendBtn.addEventListener("click", processQuery);
    userInput.addEventListener("keypress", (e) => { if (e.key === 'Enter') processQuery(); });

    function processQuery() {
        const text = userInput.value.trim();
        if (!text) return;

        // Render user message node instantly
        appendChatBubble(text, "user");
        userInput.value = "";

        // Automated decision matrix calculation latency
        setTimeout(() => {
            const aiAnswer = runHeuristicRouter(text);
            appendChatBubble(aiAnswer, "bot");
        }, 350);
    }

    function appendChatBubble(msgText, senderClass) {
        const bubble = document.createElement("div");
        bubble.className = `message ${senderClass}`;
        bubble.textContent = msgText;
        chatDisplay.appendChild(bubble);
        chatDisplay.scrollTop = chatDisplay.scrollHeight; // Auto-scrolling data feed array
    }

    // --- LOGICAL KNOWLEDGE BASE QUERY MATRICES ---
    function runHeuristicRouter(rawInput) {
        const cleanStr = rawInput.toLowerCase();

        if (cleanStr.includes("hello") || cleanStr.includes("hi ")) {
            return "Hello there! How can I assist you with your academic goals today?";
        }
        if (cleanStr.includes("economics") || cleanStr.includes("budget") || cleanStr.includes("market")) {
            return "When evaluating topics like the Federal Budget or economic policies, remember to focus directly on structural indicators: the Balance of Payments, external stability targets, and the exact impacts on key public stakeholders.";
        }
        if (cleanStr.includes("active recall") || cleanStr.includes("memorise") || cleanStr.includes("study technique")) {
            return "To maximize memory retention before exams, use active recall methods! Try using digital applications like Goodnotes to completely cover key vocabulary headers, forcing your brain to retrieve structural information under speed.";
        }
        if (cleanStr.includes("essay") || cleanStr.includes("literature") || cleanStr.includes("poem")) {
            return "For high-tier literature analysis, always ensure your core arguments directly answer the thematic prompt. For example, if evaluating identity, rigorously unpack whether the author portrays the definition of self as unstable and shifting, rather than static and certain.";
        }
        if (cleanStr.includes("procrastinating") || cleanStr.includes("distracted") || cleanStr.includes("focus")) {
            return "If you are struggling to start, initiate a short 25-minute focus session right here on Foxcus. Committing to a localized time segment lowers psychological friction and unlocks coin incentives!";
        }
        if (cleanStr.includes("stress") || cleanStr.includes("tired")) {
            return "Academic health relies closely on proper physical well-being. If you are experiencing fatigue, consider activating our ergonomic Dark Theme toggle to reduce blue light glare, and aim for a healthy consistency in your sleep cycles.";
        }

        return "That is an excellent study question. To optimize that specific area, break down your curriculum guidelines into separate core modules, allocate a strict 45-minute focus window on your dashboard, and test your retention using active recall reviews.";
    }
});