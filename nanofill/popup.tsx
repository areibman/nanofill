import { useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { sendToBackground } from "@plasmohq/messaging"

function IndexPopup() {
  const [data, setData] = useState("")
  const [savedData, setSavedData] = useStorage("saved-data", "")

  const handleSave = async () => {
    console.log('hi')
    setSavedData(data);

    try {
      const resp = await sendToBackground({
        name: "ping",
        body: {
          data
        }
      })
      console.log('Response from background:', resp)
    } catch (error) {
      console.error('Error sending message to background:', error)
    }
  }

  return (
    <div
      style={{
        padding: 32, // Increased padding
        fontSize: "1.5em",
        width: 500,
        height: 700,
        background: "white",
        borderRadius: 10,
      }}>
      <h1>
        Nanofill
      </h1>
      <textarea
        onChange={(e) => setData(e.target.value)}
        value={data}
      />
      <button onClick={handleSave}>
        Save
      </button>
    </div>
  )
}

export default IndexPopup