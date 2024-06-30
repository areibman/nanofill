chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message) {
        console.log("Message from background:", request.message)
        // Handle the message
    }
})


console.log('hello!')