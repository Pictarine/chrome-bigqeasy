function unhumanize(text) {
    let powers = {'k': 1, 'm': 2, 'g': 3, 't': 4};
    let regex = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i;

    let res = regex.exec(text);

    if (res[2]) {
        return res[1] * Math.pow(1024, powers[res[2].toLowerCase()]);
    } else {
        return res[1];
    }
}

function simulateMouseClick(targetNode) {
    function triggerMouseEvent(targetNode, eventType) {
        let clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent(eventType, true, true);
        if (targetNode)
            targetNode.dispatchEvent(clickEvent);
    }

    ["mouseover", "mousedown", "mouseup", "click"].forEach(function (eventType) {
        triggerMouseEvent(targetNode, eventType);
    });
}

let waitForEl = function (selector, callback) {
    if (jQuery(selector).length) {
        callback();
    } else {
        setTimeout(function () {
            waitForEl(selector, callback);
        }, 100);
    }
};