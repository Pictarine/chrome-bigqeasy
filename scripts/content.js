// -------------------
//    BigQuery Easy
// -------------------
//
// Auteur : Anthony Fernandez

if (!window.bqCostObserverInitiated) {
    window.bqCostObserverInitiated = true;

    function computeCost(size, unit) {
        const TB_TO_BYTES = 1e12;
        const GB_TO_BYTES = 1e9;
        const MB_TO_BYTES = 1e6;
        const KB_TO_BYTES = 1e3;
        const COST_PER_TB = 6.25;

        let bytes;
        switch (unit) {
            case 'KB':
                bytes = size * KB_TO_BYTES;
                break;
            case 'MB':
                bytes = size * MB_TO_BYTES;
                break;
            case 'GB':
                bytes = size * GB_TO_BYTES;
                break;
            case 'TB':
                bytes = size * TB_TO_BYTES;
                break;
            default:
                return 0;
        }

        return (bytes / TB_TO_BYTES) * COST_PER_TB;
    }

    function processAndUpdateText(node) {
        const regex = /This query will process ([\d.,]+) ([KBGM]B) when run\./;
        const match = node.nodeValue.match(regex);
        if (match) {
            const size = parseFloat(match[1].replace(',', ''));
            const unit = match[2];
            const cost = computeCost(size, unit);
            node.nodeValue = `This query will process ${size} ${unit} when run (Estimated Cost: $${cost.toFixed(2)})`;

            if (cost < 0.6) {
                document.querySelector('.cfc-progress-button-resolved .cm-button').innerHTML = `RUN for $${cost.toFixed(2)}`
            } else {
                document.querySelector('.cfc-progress-button-resolved .cm-button').innerHTML = `⚠️ RUN for $${cost.toFixed(2)}`
            }
        }
    }

    const bqCostObserver = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.type === 'characterData') {
                processAndUpdateText(mutation.target);
            } else if (mutation.type === 'childList') {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === 3 && node.nodeValue.includes("This query will process")) {
                        processAndUpdateText(node);
                    }
                }
            }
        }
    });

    bqCostObserver.observe(document.body, {childList: true, subtree: true, characterData: true});

}
