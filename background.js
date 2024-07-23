chrome.runtime.onInstalled.addListener(() => {
    console.log("AI Chat Extension installed.");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "sendToAI") {
        console.log("Received request to send to AI:", request.content);

        // Extract content and user message from the request
        const { link, text, userMessage } = request.content;

        // Set the API key
        const API_KEY = "";

        // Set headers
        const headers = {
            "x-api-key": API_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
        };

        // Set the request body
        const body = JSON.stringify({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 1024,
            messages: [
                {
                    role: "user",
                    content: `You are acting as a data analyst. Please provide a succinct response.\n\nPage URL: ${link}\nPage Content: ${text}\n\nUser Message: ${userMessage}`
                }
            ]
        });

        console.log("Sending to API:", body);

        // Make the API call
        fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: headers,
            body: body
        })
            .then(response => response.json())
            .then(data => {
                console.log("API Response:", data);
                sendResponse({ response: data });
            })
            .catch(error => {
                console.error('Error:', error);
                sendResponse({ error: 'Error communicating with AI API' });
            });

        return true;
    }
});
