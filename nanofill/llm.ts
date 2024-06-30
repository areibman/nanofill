// Start by checking if it's possible to create a session based on the availability of the model, and the characteristics of the device.
const canCreate = await window.ai.canCreateTextSession();
// canCreate will be one of the following:
// * "readily": the model is available on-device and so creating will happen quickly
// * "after-download": the model is not available on-device, but the device is capable,
//   so creating the session will start the download process (which can take a while).
// * "no": the model is not available for this device.

if (canCreate !== "no") {
    const session = await window.ai.createTextSession();

    // Prompt the model and wait for the whole result to come back.  
    const result = await session.prompt("Write me a poem");
    console.log(result);
}
