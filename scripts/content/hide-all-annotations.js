var initializedOnTab = null

function hideAllAnnotations() {
    const disableAnnotations = browser.storage.sync.get("disableAnnotations");
    disableAnnotations.then((item) => {
        if (item.disableAnnotations === undefined || item.disableAnnotations) {
            document.querySelectorAll(".js-inline-annotations").forEach(el => el.remove())
        }
    }, (error) => console.log(`Error retrieving setting ${error}`));
}

function initialize(request, sender, sendResponse) {
    const pattern = /https:\/\/github\.com\/(.+\/)+(pull\/)(\d+)\/(commits\/(.+)|files)$/;

    if (initializedOnTab == request.tab || !request.tab.url.match(pattern)) return
    initializedOnTab = request.tab

    // Hide the annotations initially (on page load)
    hideAllAnnotations()

    // Hide the annotations that are added dynamically (e.g. on scroll)
    const config = { attributes: true, childList: true, subtree: true }
    const observer = new MutationObserver(hideAllAnnotations)
    observer.observe(document.body, config)    
}


browser.runtime.onMessage.addListener(initialize);
