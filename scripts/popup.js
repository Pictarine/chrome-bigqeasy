// -------------------
//    BigQuery Easy
// -------------------
//
// Auteur : Anthony Fernandez


function add_click_capability() {

    $(document).keydown(function (e) {

        let key = e.which;

        // Left arrow
        if (key == 37 && !$("input,textarea").is(":focus")) {
            console.log('LEFT');
            simulateMouseClick(document.querySelector("jfk-button[jfk-on-action='paginateCtrl.goToPrevPage()']"));

        }
        // Right arrow
        else if (key == 39 && !$("input,textarea").is(":focus")) {
            console.log('RIGHT');
            simulateMouseClick(document.querySelector("jfk-button[jfk-on-action='paginateCtrl.goToNextPage()']"));

        } else if ((e.keyCode == 10 || e.keyCode == 13) && (e.ctrlKey || e.metaKey)) {
            console.log('CTRL ENTER');
            simulateMouseClick(document.querySelector("jfk-button[instrumentation-id='bq-run-query-button']"));
        }
    });
}

function init_environment() {
    $(document).ready(function () {

        console.log("BigQEasy initialized");


        // Add a "Copy Temp table" button
        // ID: query-temp-table
        // ------------------------------

        waitForEl("pan-action-bar-button[ng-click='ctrl.openSaveResultsModal()']", function () {
            let template = document.createElement('template');
            template.innerHTML = '<pan-action-bar-button role="button"> <div class="p6n-action-bar-button-container"> <button class="p6n-material-button p6n-action-bar-button md-primary md-button md-ink-ripple" type="button"> <div class="p6n-action-bar-button-background" style="background-color: rgb(59, 120, 231);"> </div> <span>Query Temp Table</span> <div class="md-ripple-container" style=""></div> </button> </div> </pan-action-bar-button>';
            let queryTempButton = template.content.firstChild

            document.querySelector("pan-action-bar-button[ng-click='ctrl.openSaveResultsModal()']").parentNode.appendChild(queryTempButton);


            queryTempButton.onclick = function () {
                console.log("clicked!!")

                chrome.runtime.sendMessage({askToOpenTempTable: true}, function (response) {
                    console.log("click response!!", response)
                });

                simulateMouseClick(document.querySelector("a[ng-click='ctrl.goToAsset(ctrl.job.config.destinationTable)']"));
            }
        });


        // Display query validation indicator
        // ----------------------------------

        waitForEl("jfk-button[jfk-on-action='ctrl.toggleValidationMessage()']", function () {
            simulateMouseClick(document.querySelector("jfk-button[jfk-on-action='ctrl.toggleValidationMessage()']"));
        });


        // Display tables
        // --------------

        waitForEl("div[instrumentation-id='bq-dataset-explorer-resource-list'] div[ng-click='treeCtrl.handleNodeClick(node)']", function () {
            $("div[instrumentation-id='bq-dataset-explorer-resource-list'] div[ng-click='treeCtrl.handleNodeClick(node)']").trigger('click')
        });


        // Display price for the query
        // ---------------------------

        $("body").on('DOMSubtreeModified', "div.p6n-bq-validation-success-color > div", function (e) {
            if (e.target.innerText && e.target.innerHTML.indexOf('This query will process') >= 0) {
                let state = e.target.innerText;
                let regex = /^This query will process (.*) when run.$/gm;
                let size = unhumanize(regex.exec(state)[1]);
                let price = (5 * size / 1099511627776);

                // console.log(state);
                // console.log(size);
                // console.log(price);

                let buttonRun = $("jfk-button[instrumentation-id='bq-run-query-button'] > span.p6n-loading-button-regular-text");

                if (price > 0.6) {
                    buttonRun.html("⚠️ RUN FOR $" + price.toFixed(2) + " ⚠️");
                } else if (price > 0.05) {
                    buttonRun.html("RUN FOR $" + price.toFixed(2) + " ");
                } else {
                    buttonRun.html("RUN QUERY");
                }

            }
        });

    });
}

function inject_js(filename) {
    console.log('Inject Pictarine Functions');
    let s = document.createElement('script');
    s.src = chrome.extension.getURL('scripts/' + filename);
    s.onload = function () {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
}


inject_js('inject.js');
add_click_capability();
init_environment();