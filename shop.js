document.addEventListener("DOMContentLoaded", () => {
  // 1. Instantly display current cash balance
  updateShopWallet();

  // 2. Scan memory variables and disable cards for owned items
  const items = ["lampplant", "plantcup"];
  items.forEach(itemKey => {
    if (localStorage.getItem(`owned_${itemKey}`) === "true") {
      const card = document.getElementById(`card-${itemKey}`);
      if (card) {
        card.classList.add("owned");
        const button = card.querySelector(".buy-btn");
        if (button) {
          button.innerText = "Owned";
          button.disabled = true;
        }
      }
    }
  });
});

function buyDecoration(itemName, price) {
  let currentCoins = parseInt(localStorage.getItem("userCoins")) || 0;

  if (localStorage.getItem(`owned_${itemName}`) === "true") {
    return;
  }

  if (currentCoins >= price) {
    currentCoins -= price;
    localStorage.setItem("userCoins", currentCoins.toString());
    localStorage.setItem(`owned_${itemName}`, "true");
    
    alert("Item successfully bought! It's now added to your study desk.");
    window.location.reload(); 
  } else {
    alert("Keep focusing to earn enough minutes for this setup!");
  }
}

function updateShopWallet() {
  const currentCoins = localStorage.getItem("userCoins") || "0";
  const shopHudNode = document.getElementById("shop-coin-text");
  if (shopHudNode) {
    shopHudNode.innerText = currentCoins;
  }
}

function purchaseDeskDecoration(itemId, itemPrice) {
    let userCoins = parseInt(localStorage.getItem("userCoins")) || 0;

    // TRANSACTION INTEGRITY CHECK
    if (userCoins < itemPrice) {
        alert("Transaction Declined: Insufficient Foxcus coins balance.");
        return false; // Halts execution instantly
    }

    // Deduct currency safely and update the inventory state flag
    userCoins -= itemPrice;
    localStorage.setItem("userCoins", userCoins);
    localStorage.setItem(`owned_${itemId}`, "true");
    
    alert("Transaction Successful! Item unlocked on your desk.");
    return true;
}