var askToOpenTempTable = false

function logTempTable(requestDetails) {

  if (/https:\/\/clients6\.google\.com\/bigquery\/v2internal\/projects\/.*\/datasets\/_.*/gm.test(requestDetails.url) && askToOpenTempTable) {
    
    const regexProject = /.*projects\/([^\/]*)\/.*/gm;
    const regexDataset = /.*datasets\/([^\/]*)\/.*/gm;
    const regexTable = /.*tables\/([^(:|?|\/)]*)(:|\?|\/).*/gm;

    var projectId = regexProject.exec(requestDetails.url);
    var dataset = regexDataset.exec(requestDetails.url);
    var table = regexTable.exec(requestDetails.url);

    if (projectId && dataset && table) {
        console.log(dataset[1]);
        console.log(table[1]);
    
        var tempTable = projectId[1] + "." + dataset[1] + "." + table[1];
        console.log("Dataset " + tempTable);
    
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(tabs[0].id, {code: 'injectFn("'+ tempTable +'");'}, function(response) {
                console.log('Script Executed');
                askToOpenTempTable = false;
            });
        });
    }

  }
}

chrome.webRequest.onCompleted.addListener(
    logTempTable,
    {urls: ["<all_urls>"]}
);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        console.log('Received bg', request, sender, sendResponse);
        if (request.askToOpenTempTable) {
            askToOpenTempTable = true
        }

        sendResponse({});
        return true;
    }
);
