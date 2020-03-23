function is_bigq_tab() {
    let current_url = window.location.href;
    return (current_url.substring(0, 41) == "https://console.cloud.google.com/bigquery");
}

function unhumanize(text) {
    var powers = {'k': 1, 'm': 2, 'g': 3, 't': 4};
    var regex = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i;

    var res = regex.exec(text);

    if (res[2]) {
        return res[1] * Math.pow(1024, powers[res[2].toLowerCase()]);
    } else {
        return res[1];
    }
}

function simulateMouseClick(targetNode) {
    function triggerMouseEvent(targetNode, eventType) {
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent(eventType, true, true);
        if (targetNode)
            targetNode.dispatchEvent(clickEvent);
    }

    ["mouseover", "mousedown", "mouseup", "click"].forEach(function (eventType) {
        triggerMouseEvent(targetNode, eventType);
    });
}

var waitForEl = function (selector, callback) {
    if (jQuery(selector).length) {
        callback();
    } else {
        setTimeout(function () {
            waitForEl(selector, callback);
        }, 100);
    }
};