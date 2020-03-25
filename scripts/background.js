let askToOpenTempTable = false
let askToExploreTempTable = false

function logTempTable(requestDetails) {
    // console.log(requestDetails.url, requestDetails);

    if (/https:\/\/clients6\.google\.com\/bigquery\/v2internal\/projects\/.*\/datasets\/_.*/gm.test(requestDetails.url) && (askToOpenTempTable || askToExploreTempTable)) {

        const regexProject = /.*projects\/([^\/]*)\/.*/gm;
        const regexDataset = /.*datasets\/([^\/]*)\/.*/gm;
        const regexTable = /.*tables\/([^(:|?|\/)]*)(:|\?|\/).*/gm;

        let projectId = regexProject.exec(requestDetails.url);
        let dataset = regexDataset.exec(requestDetails.url);
        let table = regexTable.exec(requestDetails.url);

        if (projectId && dataset && table) {
            console.log(dataset[1]);
            console.log(table[1]);

            let tempTable = projectId[1] + "." + dataset[1] + "." + table[1];
            console.log("Dataset " + tempTable);

            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                if (askToOpenTempTable) {
                    chrome.tabs.executeScript(tabs[0].id, {code: 'injectFn("' + tempTable + '");'}, function (response) {
                        // console.log('Script Executed');
                        askToOpenTempTable = false;
                    });
                }
                if (askToExploreTempTable) {
                    askToExploreTempTable = false
                    let config = {
                        "projectId": projectId[1],
                        "tableId": table[1],
                        "datasetId": dataset[1],
                        "billingProjectId": projectId[1],
                        "connectorType": "BIG_QUERY",
                        "sqlType": "STANDARD_SQL"
                    }
                    chrome.tabs.create({url: "https://datastudio.google.com/u/0/explorer?config=" + encodeURI(JSON.stringify(config))});
                }
            });
        }

    }

}

chrome.webRequest.onCompleted.addListener(
    logTempTable,
    {urls: ["https://clients6.google.com/bigquery/v2internal/projects/*"]}
);

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        // console.log('Received bg', request, sender, sendResponse);
        askToOpenTempTable = request.askToOpenTempTable
        askToExploreTempTable = request.askToExploreTempTable

        sendResponse({});
        return true;
    }
);

console.log('background.js loaded')