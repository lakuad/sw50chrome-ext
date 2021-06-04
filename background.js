let userDetails = { firstName: '',
     lastName:'',
     email:'',
     phoneNumber:'',
     zipCode: '',
     rrNumber:''
};


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

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ 'userDetails': userDetails });  

});


chrome.action.onClicked.addListener( (tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setUserDetails,
    });
});
