function saveOptions(e) {
    e.preventDefault();
    
    browser.storage.sync.set({
        disableAnnotations: document.querySelector("#disableAnnotations").checked,
        hideNotificationsIcon: document.querySelector("#hideNotificationsIcon").checked,
    });
}
  
function restoreOptions() {
    function setCurrentChoice(result) {
        if (result.disableAnnotations != undefined) {
            document.querySelector("#disableAnnotations").checked = result.disableAnnotations;
        }
        if (result.hideNotificationsIcon != undefined) {
            document.querySelector("#hideNotificationsIcon").checked = result.hideNotificationsIcon;
        }
    }
  
    function onError(error) {
        console.log(`Error: ${error}`);
    }

    // Set defaults
    document.querySelector("#disableAnnotations").checked = true
    document.querySelector("#hideNotificationsIcon").checked = true

    
    // Update with saved settings
    browser.storage.sync.get("disableAnnotations").then(setCurrentChoice, onError);
    browser.storage.sync.get("hideNotificationsIcon").then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions)
