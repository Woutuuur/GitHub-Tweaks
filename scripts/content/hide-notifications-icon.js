var initializedOnTab = null

function hideNotificationsIcon(request, sender, sendResponse) {
    if (initializedOnTab == request.tab) return

    const hideNotificationsIconSetting = browser.storage.sync.get("hideNotificationsIcon");
    hideNotificationsIconSetting.then((item) => {
        if (item.hideNotificationsIcon === undefined || item.hideNotificationsIcon) {
            document.querySelectorAll("#AppHeader-notifications-button").forEach(el => el.classList.remove('AppHeader-button--hasIndicator'))
        }
        
    }, (error) => console.log(`Error retrieving setting ${error}`));

}

browser.runtime.onMessage.addListener(hideNotificationsIcon);