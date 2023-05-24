var initializedOnTab = null

function hideNotificationsIcon(request, sender, sendResponse) {
    if (initializedOnTab == request.tab) return

    const hideNotificationsIconSetting = browser.storage.sync.get("hideNotificationsIcon");
    hideNotificationsIconSetting.then((item) => {
        if (item.hideNotificationsIcon === undefined || item.hideNotificationsIcon) {
            document.querySelectorAll("#AppHeader-notifications-button span.mail-status").forEach(el => el.remove())
        }
    }, (error) => console.log(`Error retrieving setting ${error}`));

}

browser.runtime.onMessage.addListener(hideNotificationsIcon);