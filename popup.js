let changeColor = document.getElementById("changeColor");

// When the button is clicked, inject setUserDetails into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setUserDetails,
    });
  });
  
  // The body of this function will be executed as a content script inside the
  // current page
  function setUserDetails() {
    
    chrome.storage.sync.get("userDetails", ({ userDetails }) => {
        document.querySelector('input[name="first_name"]').value = userDetails.firstName;
        document.querySelector('input[name="last_name"]').value = userDetails.lastName;
        document.querySelector('input[name="email"]').value = userDetails.email;
        document.querySelector('input[name="phone"]').value = userDetails.phoneNumber;
        document.querySelector('input[name="rr_number"]').value = userDetails.rrNumber;
        document.querySelector('input[name="zip"]').value = userDetails.zipCode;
        document.querySelector('input[name="rules"]').checked = true;
    });
  }