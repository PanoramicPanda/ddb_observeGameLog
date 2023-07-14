
async function onStateChangeEvent(msg) {
    if (msg.kind === "hasInitialized") {
        // TS API Initialized!
        let cBlob = await TS.campaign.getBlob();

    };
};