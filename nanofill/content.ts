chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message) {
        console.log('AHHHHH')
        console.log(request)
        console.log(sender)
        console.log("Message from background:", request.message)
        // Handle the message
    }
})


console.log('hello!')