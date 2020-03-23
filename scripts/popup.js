// -------------------
//    BigQuery Easy
// -------------------
//
// Auteur : Anthony Fernandez


function add_click_capability() {

    $(document).keydown(function (e) {

        var key = e.which; 

        // Left arrow
        if (key == 37 && !$("input,textarea").is(":focus")) {
            if (is_bigq_tab) {
                console.log('LEFT');
                 simulateMouseClick(document.querySelector('#main > div > div > central-page-area > div > div > pcc-content-viewport > div > div > ng2-router-root > div > ng1-router-root-loader > xap-deferred-loader-outlet > ng1-router-root-wrapper > ng1-router-root > div > ng-view > pan-panel-container > div > div > div > pan-panel-container > div > div > div.p6n-vulcan-panel.bq-main-container.p6n-panel.p6n-panel-center > bq-right-panel > pan-panel-container > div > div > div.p6n-vulcan-panel-primary.bq-main-panel.p6n-panel.p6n-panel-center > bq-view > div > bq-query-results-container > bq-query-results > div > section > div.p6n-bq-query-results-tab > bq-results-table > div > span > div:nth-child(2) > div > div:nth-child(2) > jfk-button:nth-child(5)'));
            }

        }
        // Right arrow
        else if (key == 39 && !$("input,textarea").is(":focus")) {
            if (is_bigq_tab) {
                console.log('RIGHT');
                 simulateMouseClick(document.querySelector('#main > div > div > central-page-area > div > div > pcc-content-viewport > div > div > ng2-router-root > div > ng1-router-root-loader > xap-deferred-loader-outlet > ng1-router-root-wrapper > ng1-router-root > div > ng-view > pan-panel-container > div > div > div > pan-panel-container > div > div > div.p6n-vulcan-panel.bq-main-container.p6n-panel.p6n-panel-center > bq-right-panel > pan-panel-container > div > div > div.p6n-vulcan-panel-primary.bq-main-panel.p6n-panel.p6n-panel-center > bq-view > div > bq-query-results-container > bq-query-results > div > section > div.p6n-bq-query-results-tab > bq-results-table > div > span > div:nth-child(2) > div > div:nth-child(2) > jfk-button:nth-child(6)'));
            }

        }

        else if ((e.keyCode == 10 || e.keyCode == 13) && (e.ctrlKey || e.metaKey)) {
            if (is_bigq_tab) {
                console.log('CTRL ENTER');
                simulateMouseClick(document.querySelector('#main > div > div > central-page-area > div > div > pcc-content-viewport > div > div > ng2-router-root > div > ng1-router-root-loader > xap-deferred-loader-outlet > ng1-router-root-wrapper > ng1-router-root > div > ng-view > pan-panel-container > div > div > div > pan-panel-container > div > div > div.p6n-vulcan-panel.bq-main-container.p6n-panel.p6n-panel-center > bq-right-panel > pan-panel-container > div > div > div.p6n-vulcan-panel.bq-query-editor-panel.p6n-panel > bq-query-panel > div > div > div > div > div > div.layout-wrap.layout-row.flex-none > div.p6n-split-button.p6n-split-button-with-triangle.p6n-bq-run-query-split-button.flex-none > jfk-button'));
            }
        }
    });
}

function init_environment() {
    $(document).ready(function () {

        console.log("BigQEasy initialized");


        // Add a "Copy Temp table" button
        // ID: query-temp-table
        // ------------------------------

        waitForEl(".p6n-bq-refresh-query-results", function () {
            if (is_bigq_tab) {
                document.querySelector('#p6n-action-bar-container-secondary-panel-bar > div.md-toolbar-tools > div.p6n-action-bar-layout-parent > div.p6n-action-bar-layout-region.p6n-action-bar-contents-main').insertAdjacentHTML('beforeend', '<pan-action-bar-button class="p6n-bq-refresh-query-results" ng-click="testclick();" id="query-temp-table" role="button"> <div class="p6n-action-bar-button-container"> <button class="p6n-material-button p6n-action-bar-button md-primary md-button md-ink-ripple" type="button"> <div class="p6n-action-bar-button-background" style="background-color: rgb(59, 120, 231);"> </div> <span>Query Temp Table</span> <div class="md-ripple-container" style=""></div> </button> </div> </pan-action-bar-button>');
                $("#query-temp-table").click(function() {

                    chrome.runtime.sendMessage({askToOpenTempTable: true}, function(response) {
                      });

                    simulateMouseClick(document.querySelector('#main > div > div > central-page-area > div > div > pcc-content-viewport > div > div > ng2-router-root > div > ng-component > cfc-panel-container > div > div > cfc-panel.bq-main-container.cfc-panel.cfc-panel-center.cfc-panel-color-white.cfc-panel-orientation-vertical > div > div > cfc-panel-container > div > div > div > div > bq-ng1-right-panel-wrapper > xap-deferred-loader-outlet > bq-right-panel-upgrade-wrapper > bq-right-panel-upgrade > bq-right-panel > pan-panel-container > div > div > div.p6n-vulcan-panel-primary.bq-main-panel.p6n-panel.p6n-panel-center > bq-view > div > bq-query-results-container > bq-query-results > div > section > div:nth-child(4) > bq-job-details > div > div > div:nth-child(10) > div.p6n-kv-list-values > div > a > span'));

                    waitForEl("#p6n-action-bar-container-secondary-panel-bar > div.md-toolbar-tools > div.p6n-action-bar-layout-parent > div.p6n-action-bar-layout-region.p6n-action-bar-contents-right-aligned > pan-action-bar-right:nth-child(1) > pan-action-bar-button > div", function() {
                        console.log('QUERY TEMP TABLE');
                    });
                });
            }
        });


        // Display query validation indicator
        // ----------------------------------

        waitForEl("#main > div > div > central-page-area > div > div > pcc-content-viewport > div > div > ng2-router-root > div > ng1-router-root-loader > xap-deferred-loader-outlet > ng1-router-root-wrapper > ng1-router-root > div > ng-view > pan-panel-container > div > div > div > pan-panel-container > div > div > div.p6n-vulcan-panel.bq-main-container.p6n-panel.p6n-panel-center > bq-right-panel > pan-panel-container > div > div > div.p6n-vulcan-panel.bq-query-editor-panel.p6n-panel > bq-query-panel > div > div > div > div > div > div.layout-align-center-center.layout-row.flex-auto > div.p6n-space-above-micro.flex-none > jfk-button > pan-icon > div > md-icon", function () {
            if (is_bigq_tab) {

                simulateMouseClick(document.querySelector('#main > div > div > central-page-area > div > div > pcc-content-viewport > div > div > ng2-router-root > div > ng1-router-root-loader > xap-deferred-loader-outlet > ng1-router-root-wrapper > ng1-router-root > div > ng-view > pan-panel-container > div > div > div > pan-panel-container > div > div > div.p6n-vulcan-panel.bq-main-container.p6n-panel.p6n-panel-center > bq-right-panel > pan-panel-container > div > div > div.p6n-vulcan-panel.bq-query-editor-panel.p6n-panel > bq-query-panel > div > div > div > div > div > div.layout-align-center-center.layout-row.flex-auto > div.p6n-space-above-micro.flex-none > jfk-button'));
            }
        });


        // Display tables
        // --------------

        waitForEl('#vertical-container > div > div.md-virtual-repeat-offsetter > div > div', function () {
            if (is_bigq_tab) {
                $('#vertical-container > div > div.md-virtual-repeat-offsetter > div > div').trigger('click')
            }

        });


        // Display price for the query
        // ---------------------------

        $("body").on('DOMSubtreeModified', "#main > div > div > central-page-area > div > div > pcc-content-viewport > div > div > ng2-router-root > div > ng-component > cfc-panel-container > div > div > cfc-panel.bq-main-container.cfc-panel.cfc-panel-center.cfc-panel-color-white.cfc-panel-orientation-vertical > div > div > cfc-panel-container > div > div > div > div > bq-ng1-right-panel-wrapper > xap-deferred-loader-outlet > bq-right-panel-upgrade-wrapper > bq-right-panel-upgrade > bq-right-panel > pan-panel-container > div > div > div.p6n-vulcan-panel.bq-query-editor-panel.p6n-panel > bq-query-panel > div > div > div > div > div > div.layout-align-center-center.layout-row.flex-auto > div.p6n-bq-validation-success-color.p6n-space-right-small.p6n-space-above-micro.p6n-text-base.p6n-ellipsis.p6n-align-right.flex-auto > div", function (e) {
            if (e.target.innerHTML.indexOf('This query will process') >= 0) {
                var state = e.target.innerText;
                var regex = /^This query will process (.*) when run.$/gm;
                var size = unhumanize(regex.exec(state)[1]);
                var price = (5 * size / 1099511627776);

                console.log(state);
                console.log(size);
                console.log(price);

                let buttonRun = $("#main > div > div > central-page-area > div > div > pcc-content-viewport > div > div > ng2-router-root > div > ng-component > cfc-panel-container > div > div > cfc-panel.bq-main-container.cfc-panel.cfc-panel-center.cfc-panel-color-white.cfc-panel-orientation-vertical > div > div > cfc-panel-container > div > div > div > div > bq-ng1-right-panel-wrapper > xap-deferred-loader-outlet > bq-right-panel-upgrade-wrapper > bq-right-panel-upgrade > bq-right-panel > pan-panel-container > div > div > div.p6n-vulcan-panel.bq-query-editor-panel.p6n-panel > bq-query-panel > div > div > div > div > div > div.layout-wrap.layout-row.flex-none > div.p6n-split-button.p6n-split-button-with-triangle.p6n-bq-run-query-split-button.flex-none > jfk-button > span.p6n-loading-button-regular-text");

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
    var s = document.createElement('script');
    s.src = chrome.extension.getURL('scripts/'+filename);
    s.onload = function () {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
}


inject_js('inject.js');
add_click_capability();
init_environment();