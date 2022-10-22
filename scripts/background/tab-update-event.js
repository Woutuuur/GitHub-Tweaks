function getActiveTab() {
    return browser.tabs.query({active: true, currentWindow: true}).then(tabs => tabs[0]);
}

function sendToActiveTabOnUpdate() {
    getActiveTab().then((tab) => {
        browser.tabs.sendMessage(tab.id, {tab: tab, type: "tabUpdateEvent"})
    })
}

browser.tabs.onUpdated.addListener(sendToActiveTabOnUpdate);