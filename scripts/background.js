function checkAndUpdateContent(tabId) {
    chrome.scripting.executeScript({
        target: {tabId: tabId},
        files: ['content.js']
    });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.startsWith("https://console.cloud.google.com/bigquery?") && changeInfo.status === 'complete') {
        checkAndUpdateContent(tabId);
    }
});
