// Function to inject a modal into the page
function injectModal() {
    const modalHTML = `
        <div id="myCustomModal" style="position: fixed; top: 20%; left: 50%; transform: translateX(-50%); z-index: 1000; background: #2E3440; width: 60%; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); color: #D8DEE9;">
            <div id="modalHeader" style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center;">
                    <svg height="30" viewBox="0 0 1024 1024" fill="#88C0D0">
                        <path d="M512 0C229.2304 0 0 229.2304 0 512s229.2304 512 512 512 512-229.2304 512-512S794.5728 0 512 0zm0 921.6C273.3568 921.6 102.4 750.6432 102.4 512S273.3568 102.4 512 102.4 921.6 273.3568 921.6 512 750.6432 921.6 512 921.6z"></path>
                        <path d="M699.904 341.6064L620.6464 528.9984c-2.6624 6.5536-10.24 10.24-17.6128 8.0896L435.5584 492.9536c-6.3488-1.9456-10.24-7.9872-8.0896-14.336L544.1024 192.8192c2.6624-6.5536 10.24-10.24 17.6128-8.0896l167.168 44.1344c6.3488 1.9456 10.24 7.9872 8.0896 14.336zM411.1872 574.8736l-82.4832 32.8704-31.9488 81.6128c-2.6624 6.5536-10.24 10.24-17.6128 8.0896L182.272 654.5408c-6.3488-1.9456-10.24-7.9872-8.0896-14.336l31.9488-81.6128 82.4832-32.8704c2.6624-6.5536 10.24-10.24 17.6128-8.0896l98.6112 25.8816c6.3488 1.9456 10.24 7.9872 8.0896 14.336zM749.4656 793.7024l-31.9488 81.6128c-2.6624 6.5536-10.24 10.24-17.6128 8.0896l-98.6112-25.8816c-6.3488-1.9456-10.24-7.9872-8.0896-14.336l31.9488-81.6128 82.4832-32.8704c2.6624-6.5536 10.24-10.24 17.6128-8.0896l98.6112 25.8816c6.3488 1.9456 10.24 7.9872 8.0896 14.336z"></path>
                    </svg>
                    <h1 id="modalTitle" style="color: #88C0D0; font-family: 'Arial Black', Gadget, sans-serif; margin-left: 10px;">Gojira Helper</h1>
                </div>
                <div id="modalButtons" style="display: flex;">
                    <button id="minimizeBtn" class="btn" style="background: #81A1C1; border: none; padding: 5px 10px; color: white; border-radius: 4px; cursor: pointer;">_</button>
                    <button id="maximizeBtn" class="btn" style="display: none; background: #81A1C1; border: none; padding: 5px 10px; color: white; border-radius: 4px; cursor: pointer;">⬜</button>
                    <button id="closeModalBtn" class="btn" style="background: #81A1C1; border: none; padding: 5px 10px; color: white; border-radius: 4px; cursor: pointer;">X</button>
                </div>
            </div>
            <div id="modalContent">
                <textarea id="scrapedContent" rows="5" style="width: 100%; background: #4C566A; color: #D8DEE9; border: none; border-radius: 4px; padding: 10px; margin-bottom: 10px;"></textarea>
                <div id="chatArea" class="chat-area" style="background: #3B4252; padding: 10px; border-radius: 4px; height: 200px; overflow-y: auto; margin-bottom: 10px;"></div>
                <input type="text" id="userInput" class="user-input" placeholder="Type your message..." style="width: 80%; background: #4C566A; color: #D8DEE9; border: none; border-radius: 4px; padding: 10px; margin-bottom: 10px;">
                <div class="modal-buttons" style="display: flex; justify-content: space-between;">
                    <button id="sendBtn" class="btn" style="background: #81A1C1; border: none; padding: 10px 20px; color: white; border-radius: 4px; cursor: pointer;">Send</button>
                    <div id="wordCount" style="color: #D8DEE9; text-align: right;">
                        <span id="contentWordCount">Content Words: 0</span><br>
                        <span id="inputWordCount">Input Words: 0</span><br>
                        <span id="responseWordCount">Response Words: 0</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    addModalEventListeners();
    scrapeContent();
}

// Add event listeners for the modal buttons
function addModalEventListeners() {
    document.getElementById('sendBtn').addEventListener('click', sendContentToAI);
    document.getElementById('closeModalBtn').addEventListener('click', closeModal);
    document.getElementById('minimizeBtn').addEventListener('click', minimizeModal);
    document.getElementById('maximizeBtn').addEventListener('click', maximizeModal);
    document.getElementById('userInput').addEventListener('input', updateWordCount);
    document.addEventListener('click', closeOnClickOutside);
}

// Function to minimize the modal
function minimizeModal() {
    const modal = document.getElementById('myCustomModal');
    const content = document.getElementById('modalContent');
    const title = document.getElementById('modalTitle');
    modal.style.width = '250px';
    modal.style.top = '10px';
    modal.style.left = '10px';
    modal.style.transform = 'none';
    modal.style.height = 'auto';
    modal.style.overflow = 'hidden';
    content.style.display = 'none';
    title.style.display = 'none';
    document.getElementById('minimizeBtn').style.display = 'none';
    document.getElementById('maximizeBtn').style.display = 'inline';
    modal.setAttribute('data-minimized', 'true');
}

// Function to maximize the modal
function maximizeModal() {
    const modal = document.getElementById('myCustomModal');
    const content = document.getElementById('modalContent');
    const title = document.getElementById('modalTitle');
    modal.style.width = '60%';
    modal.style.top = '20%';
    modal.style.left = '50%';
    modal.style.transform = 'translateX(-50%)';
    modal.style.height = '';
    modal.style.overflow = '';
    content.style.display = '';
    title.style.display = '';
    document.getElementById('minimizeBtn').style.display = 'inline';
    document.getElementById('maximizeBtn').style.display = 'none';
    modal.setAttribute('data-minimized', 'false');
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('myCustomModal');
    if (modal) {
        modal.remove();
    }
}

// Function to close the modal when clicking outside of it
function closeOnClickOutside(event) {
    const modal = document.getElementById('myCustomModal');
    if (modal && !modal.contains(event.target) && event.target.id !== 'maximizeBtn') {
        closeModal();
    }
}

// Function to scrape the page content
function scrapeContent() {
    const bodyText = document.body.innerText;
    document.getElementById('scrapedContent').value = bodyText;
    updateWordCount();
}

// Function to update the word count
function updateWordCount() {
    const content = document.getElementById('scrapedContent').value;
    const userInput = document.getElementById('userInput').value;

    const contentWords = content.split(/\s+/).filter(word => word.length > 0).length;
    const inputWords = userInput.split(/\s+/).filter(word => word.length > 0).length;

    document.getElementById('contentWordCount').innerText = `Content Words: ${contentWords}`;
    document.getElementById('inputWordCount').innerText = `Input Words: ${inputWords}`;
}

// Function to send the scraped content to the AI API
function sendContentToAI() {
    const userInput = document.getElementById('userInput').value;
    const content = document.getElementById('scrapedContent').value;

    const data = {
        link: window.location.href,
        text: content,
        userMessage: userInput
    };

    console.log("Sending message to background script:", data);

    // Send the content to the background script
    chrome.runtime.sendMessage({ action: "sendToAI", content: data }, (response) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            return;
        }

        console.log("Received response from background script:", response);

        const chatArea = document.getElementById('chatArea');

        if (response.error) {
            console.error("Error from AI API:", response.error);
            return;
        }

        // User message
        const userMessage = document.createElement('div');
        userMessage.className = 'user-message';
        userMessage.innerText = userInput;
        userMessage.style.backgroundColor = '#5E81AC';
        userMessage.style.color = '#ECEFF4';
        userMessage.style.padding = '10px';
        userMessage.style.margin = '5px 0';
        userMessage.style.borderRadius = '4px';
        chatArea.appendChild(userMessage);

        // AI response message
        const aiMessage = document.createElement('div');
        aiMessage.className = 'ai-message';
        aiMessage.style.backgroundColor = '#4C566A';
        aiMessage.style.color = '#ECEFF4';
        aiMessage.style.padding = '10px';
        aiMessage.style.margin = '5px 0';
        aiMessage.style.borderRadius = '4px';

        // Check if response content exists and is an array
        if (response.response.content && Array.isArray(response.response.content) && response.response.content.length > 0) {
            const aiContent = response.response.content[0].text;
            aiMessage.innerText = aiContent;

            // Update word count for AI response
            const responseWords = aiContent.split(/\s+/).filter(word => word.length > 0).length;
            document.getElementById('responseWordCount').innerText = `Response Words: ${responseWords}`;
        } else {
            console.error("Invalid response format or empty content:", response.response);
            aiMessage.innerText = "Sorry, I couldn't understand the response.";
        }

        chatArea.appendChild(aiMessage);

        // Scroll to the bottom of the chat area
        chatArea.scrollTop = chatArea.scrollHeight;

        document.getElementById('userInput').value = '';
        updateWordCount();
    });
}

// Function to reload the page and then inject the modal after a delay
function reloadPage() {
    // Set a flag in localStorage to show modal after reload
    localStorage.setItem('showModalAfterReload', 'true');
    window.location.reload();
}

// Listen for the command from background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "openModal") {
        setTimeout(() => {
            injectModal();
            scrapeContent();
        }, 1000);
    }
});

// Check if the modal should be shown after a reload
if (localStorage.getItem('showModalAfterReload') === 'true') {
    localStorage.removeItem('showModalAfterReload');
    setTimeout(() => {
        injectModal();
        scrapeContent();
    }, 1000);
}

// Listen for the key combination Ctrl+Shift+U to refresh the page
document.addEventListener('keydown', function(event) {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const isCommandKey = isMac ? event.metaKey : event.ctrlKey;

    if (isCommandKey && event.shiftKey && event.key === 'U') {
        reloadPage();
    }
});document.addEventListener('keydown', function(event) {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const isCommandKey = isMac ? event.metaKey : event.ctrlKey;

    if (isCommandKey && event.shiftKey && event.key === 'U') {
        reloadPage();
    }
});