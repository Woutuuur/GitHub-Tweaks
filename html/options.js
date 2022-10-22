function saveOptions(e) {
    e.preventDefault();
    
    browser.storage.sync.set({
        disableAnnotations: document.querySelector("#disableAnnotations").checked
    });
}
  
function restoreOptions() {
    function setCurrentChoice(result) {
        if (result.disableAnnotations != undefined) {
            document.querySelector("#disableAnnotations").checked = result.disableAnnotations;
        } else {
            document.querySelector("#disableAnnotations").checked = true
        }
    }
  
    function onError(error) {
        console.log(`Error: ${error}`);
    }
  
    let getting = browser.storage.sync.get("disableAnnotations");
    getting.then(setCurrentChoice, onError);

}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions)
