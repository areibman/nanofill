// Function to identify form fields on the page
function identifyForms() {
    const textElements = document.querySelectorAll('input[type="text"], textarea');
    const formFields = Array.from(textElements).map(el => {
        // Select the 2nd or 3rd parent element as a candidate for autofill
        return el.parentElement.parentElement || el.parentElement.parentElement.parentElement;
    });
    return formFields;
}

// Function to qualify if the identified form is suitable for autofill
async function qualifyForm(formElement) {
    // Use Gemini Nano LLM to qualify the form
    const session = await window.ai.createTextSession();
    const prompt = `Is the following HTML element suitable for autofill? ${formElement.outerHTML}`;
    const result = await session.prompt(prompt);
    session.destroy(); // Destroy the session after use
    // Interpret the result to decide if the form is qualified
    const isQualified = result.includes("yes"); // This is a simplification, you'll need to parse the result properly
    return isQualified ? formElement : null;
}

// Function to autofill the form with provided data
async function fillForm(formElement, jsonData) {
    // Use Gemini Nano LLM to determine the best key-value pairs for the input
    const session = await window.ai.createTextSession();
    const data = JSON.parse(jsonData);
    let filled = false; // Flag to check if at least one field was filled

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const prompt = `For the following HTML element, what is the best value for the key "${key}"? ${formElement.outerHTML}`;
            const result = await session.prompt(prompt);
            // Parse the result to extract the value
            const value = result; // This is a simplification, you'll need to parse the result properly
            const input = formElement.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = value;
                filled = true;
            }
        }
    }

    session.destroy(); // Destroy the session after use
    return filled;
} 