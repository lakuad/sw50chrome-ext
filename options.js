let saveButton = document.getElementById("saveButton");

function handleSaveOptions(formObject) {

    console.log('start user details');
    let currentDetails = {};

    currentDetails.firstName = document.getElementById("firstName").value;
    currentDetails.lastName = document.getElementById("lastName").value;
    currentDetails.email = document.getElementById("email").value;
    currentDetails.phoneNumber = document.getElementById("phone").value;
    currentDetails.rrNumber = document.getElementById("rrNumber").value;
    currentDetails.zipCode = document.getElementById("zipCode").value;

    chrome.storage.sync.set({ 'userDetails': currentDetails });
    console.log('end user details');
}

function constructOptions() {
  
  chrome.storage.sync.get("userDetails", ( {userDetails})=> {
    document.getElementById("firstName").value = userDetails.firstName;
    document.getElementById("lastName").value = userDetails.lastName;
    document.getElementById("email").value = userDetails.email;
    document.getElementById("phone").value = userDetails.phoneNumber;
    document.getElementById("rrNumber").value = userDetails.rrNumber;
    document.getElementById("zipCode").value = userDetails.zipCode;
  });

   saveButton.addEventListener("click", handleSaveOptions);
}

constructOptions();