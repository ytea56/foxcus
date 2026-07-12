const timerEl = document.getElementById("timer");
const stopBtn = document.getElementById("stop-focusing-btn");

let interval;
let totalSeconds = 0; // Starts at zero and counts up

function updateTimerDisplay() {
	let minutes = Math.floor(totalSeconds / 60);
	let seconds = totalSeconds % 60;
	
	// Formats numbers to always show two digits (e.g., 03:05)
	let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	timerEl.innerHTML = formattedTime;
}

function startTimer() {
	// Clear any accidental leftover intervals before starting
	clearInterval(interval); 
	
	interval = setInterval(() => {
		totalSeconds++;
		updateTimerDisplay();
	}, 1000);
}

// When user clicks "Stop Focusing"
stopBtn.addEventListener("click", () => {
	clearInterval(interval);

	// Calculate full minutes completed (e.g., 3 mins 45 secs = 3 coins/minutes)
	let minutesEarned = Math.floor(totalSeconds / 60);
	let coinsEarned = minutesEarned;

	// --- STATS SYSTEM LOGIC ---
	if (minutesEarned > 0) {
		// 1. Update Today's Minutes Balance
		let currentTodayMins = parseInt(localStorage.getItem("todayStudyMinutes")) || 0;
		localStorage.setItem("todayStudyMinutes", currentTodayMins + minutesEarned);

		// 2. Update Total All-Time Minutes Balance
		let currentTotalMins = parseInt(localStorage.getItem("totalStudyMinutes")) || 0;
		localStorage.setItem("totalStudyMinutes", currentTotalMins + minutesEarned);
	}

	// --- COINS SYSTEM LOGIC ---
	// Fetch existing wallet balance from localStorage
	let currentCoins = parseInt(localStorage.getItem("userCoins")) || 0;

	// Add the newly accumulated coins
	currentCoins += coinsEarned;

	// Save back to local storage so Main Page and Shop Page can read it
	localStorage.setItem("userCoins", currentCoins);

	// Alert the user of their hard work
	if (coinsEarned > 0) {
		alert(`Great job! You focused for ${coinsEarned} minutes and earned ${coinsEarned} coins! 🪙`);
	} else {
		alert("Session ended. You need to focus for at least 1 full minute to save stats and earn a coin!");
	}

	// Send them right back to the dashboard matching your storyboard flow
	window.location.href = "main.html";
}); 

// Kick off the timer automatically the exact millisecond the page loads!
startTimer();

// Inside your timer completion function where you save data:
const todayDateString = new Date().toISOString().split('T')[0]; // <-- Change this line!

// Now save it to localStorage like normal
localStorage.setItem("lastStudyDate", todayDateString);
localStorage.setItem("todayStudyMinutes", updatedTodayMins);
localStorage.setItem("totalStudyMinutes", updatedTotalMins);

function saveStudySession(sessionMinutes) {
    // 1. Generate the uniform date string
    const todayDateString = new Date().toISOString().split('T')[0];
    
    // 2. Fetch current values and safely convert them to real numbers using parseInt()
    const lastSavedDate = localStorage.getItem("lastStudyDate");
    let currentTotalMins = parseInt(localStorage.getItem("totalStudyMinutes")) || 0;
    let currentTodayMins = parseInt(localStorage.getItem("todayStudyMinutes")) || 0;
    
    // 3. If the date in storage isn't today, reset the daily tracking bucket to 0
    if (lastSavedDate !== todayDateString) {
        currentTodayMins = 0;
    }
    
    // 4. Do the actual math with clean numbers
    const updatedTodayMins = currentTodayMins + sessionMinutes;
    const updatedTotalMins = currentTotalMins + sessionMinutes;
    
    // 5. Write the freshly calculated numbers back to localStorage
    localStorage.setItem("lastStudyDate", todayDateString);
    localStorage.setItem("todayStudyMinutes", updatedTodayMins.toString());
    localStorage.setItem("totalStudyMinutes", updatedTotalMins.toString());
    
    console.log("Saved today's minutes:", updatedTodayMins);
}