let userDetails = { firstName: '',
     lastName:'',
     email:'',
     phoneNumber:'',
     zipCode: '',
     rrNumber:''
};




function createNotification(){
    var opt = {type: "basic",title: "Your Title",message: "Your message",iconUrl: "your_icon.png"}
    chrome.notifications.create("notificationName",  opt, function(){});

    //include this line if you want to clear the notification after 5 seconds
    setTimeout(function(){chrome.notifications.clear("notificationName",function(){});},5000);
}


function setUserDetails() {

    chrome.storage.sync.get("userDetails", ({ userDetails }) => {
        if(chrome.runtime.lastError) {
            console.warn('couldnt retrieve user details');       
            return;
        }
        if(!userDetails || !userDetails.zipCode){
            console.warn('user details are empty');
            alert('Please setup');
            var opt = {type: "basic",title: "Your Title",message: "Your message",iconUrl: "your_icon.png"}
            chrome.notifications.create("notificationName",  opt, function(){});

    //include this line if you want to clear the notification after 5 seconds
    setTimeout(function(){chrome.notifications.clear("notificationName",function(){});},5000);
           // createNotification();
            return;
        }
        document.querySelector('input[name="first_name"]').value = userDetails.firstName;
        document.querySelector('input[name="last_name"]').value = userDetails.lastName;
        document.querySelector('input[name="email"]').value = userDetails.email;
        document.querySelector('input[name="phone"]').value = userDetails.phoneNumber;
        document.querySelector('input[name="rr_number"]').value = userDetails.rrNumber;
        document.querySelector('input[name="zip"]').value = userDetails.zipCode;
        document.querySelector('input[name="rules"]').checked = true;
    });
}

chrome.runtime.onInstalled.addListener((reason) => {
 // chrome.storage.sync.set({ 'userDetails': userDetails });  
 if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({
      url: 'onboarding.html'
    });
} else if (details.reason === "update") {
    console.warn('updated');
  } 
});


chrome.action.onClicked.addListener( (tab) => {

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setUserDetails,
    });
});

