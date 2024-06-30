// background/messages/ping.ts
import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    console.log('AHHHHH')
    console.log(req)
    console.log(res)
    const message = `This is a message: ${req.body.data}`
    // Send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, { message })
        }
    })

    res.send({
        message
    })
}

export default handler 