// Function to inject the main modal into the page
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
                <div id="modalButtons" style="display: flex; align-items: center;">
                    <button id="settingsBtn" class="btn" style="background: #81A1C1; border: none; padding: 5px 10px; color: white; border-radius: 4px; cursor: pointer; margin-right: 10px;">⚙️</button>
                    <button id="minimizeBtn" class="btn" style="background: #81A1C1; border: none; padding: 5px 10px; color: white; border-radius: 4px; cursor: pointer;">_</button>
                    <button id="maximizeBtn" class="btn" style="display: none; background: #81A1C1; border: none; padding: 5px 10px; color: white; border-radius: 4px; cursor: pointer;">⬜</button>
                    <button id="closeModalBtn" class="btn" style="background: #81A1C1; border: none; padding: 5px 10px; color: white; border-radius: 4px; cursor: pointer;">X</button>
                </div>
            </div>
            <div id="modalContent">
                <textarea id="scrapedContent" rows="5" style="width: 100%; background: #4C566A; color: #D8DEE9; border: none; border-radius: 4px; padding: 10px; margin-bottom: 10px; display: none;"></textarea>
                <div id="chatArea" class="chat-area" style="background: #3B4252; padding: 10px; border-radius: 4px; height: 200px; overflow-y: auto; margin-bottom: 10px;"></div>
                <textarea id="userInput" class="user-input" placeholder="Type your message..." style="width: 80%; background: #4C566A; color: #D8DEE9; border: none; border-radius: 4px; padding: 10px; margin-bottom: 10px; height: 40px;"></textarea>
                <div class="modal-buttons" style="display: flex; justify-content: space-between;">
                    <button id="sendBtn" class="btn" style="background: #81A1C1; border: none; padding: 10px 20px; color: white; border-radius: 4px; cursor: pointer;">Send</button>
                    <div id="wordCount" style="color: #D8DEE9; text-align: right; display: none;">
                        <span id="contentWordCount">Content Words: 0</span><br>
                        <span id="inputWordCount">Input Words: 0</span><br>
                        <span id="responseWordCount">Response Words: 0</span>
                    </div>
                </div>
                <div style="text-align: center; color: #8AB4F8; margin-top: 10px;">
                    Ctrl + / for shortcut reference
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    addModalEventListeners();
    scrapeContent();
}

// Function to inject the settings modal into the page
function injectSettingsModal() {
    const settingsModalHTML = `
        <div id="settingsModal" style="position: fixed; top: 20%; left: 50%; transform: translateX(-50%); z-index: 1100; background: #2E3440; width: 40%; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); color: #D8DEE9;">
            <div id="settingsModalHeader" style="display: flex; justify-content: space-between; align-items: center;">
                <h1 style="color: #88C0D0; font-family: 'Arial Black', Gadget, sans-serif; margin-left: 10px;">Settings</h1>
                <button id="closeSettingsModalBtn" class="btn" style="background: #81A1C1; border: none; padding: 5px 10px; color: white; border-radius: 4px; cursor: pointer;">X</button>
            </div>
            <div id="settingsModalContent">
                <div style="margin-bottom: 10px;">
                    <label for="settingsToggleContentCheckbox" style="color: #D8DEE9;">Show Content</label>
                    <input type="checkbox" id="settingsToggleContentCheckbox" class="btn">
                </div>
                <div style="margin-bottom: 10px;">
                    <label for="settingsToggleFoldCheckbox" style="color: #D8DEE9;">Auto-Fold Previous</label>
                    <input type="checkbox" id="settingsToggleFoldCheckbox"

 class="btn">
                </div>
                <div style="margin-bottom: 10px;">
                    <label for="settingsToggleMetricsCheckbox" style="color: #D8DEE9;">Hide Metrics</label>
                    <input type="checkbox" id="settingsToggleMetricsCheckbox" class="btn" checked>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', settingsModalHTML);
    addSettingsModalEventListeners();
}

// Function to inject the shortcuts modal into the page
function injectShortcutsModal() {
    const shortcutsModalHTML = `
        <div id="shortcutsModal" style="position: fixed; top: 20%; left: 50%; transform: translateX(-50%); z-index: 1200; background: #2E3440; width: 40%; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); color: #D8DEE9;">
            <div id="shortcutsModalHeader" style="display: flex; justify-content: space-between; align-items: center;">
                <h1 style="color: #88C0D0; font-family: 'Arial Black', Gadget, sans-serif; margin-left: 10px;">Shortcuts</h1>
                <button id="closeShortcutsModalBtn" class="btn" style="background: #81A1C1; border: none; padding: 5px 10px; color: white; border-radius: 4px; cursor: pointer;">X</button>
            </div>
            <div id="shortcutsModalContent">
                <ul style="list-style-type: none; padding-left: 0;">
                    <li><strong>Ctrl + Enter:</strong> Send message</li>
                    <li><strong>Ctrl + Shift + Enter:</strong> New line in message</li>
                    <li><strong>Ctrl + Shift + U:</strong> Reload page</li>
                    <li><strong>Ctrl + /:</strong> Open shortcuts reference</li>
                </ul>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', shortcutsModalHTML);
    addShortcutsModalEventListeners();
}

// Add event listeners for the main modal buttons
function addModalEventListeners() {
    document.getElementById('sendBtn').addEventListener('click', sendContentToAI);
    document.getElementById('closeModalBtn').addEventListener('click', closeModal);
    document.getElementById('minimizeBtn').addEventListener('click', minimizeModal);
    document.getElementById('maximizeBtn').addEventListener('click', maximizeModal);
    document.getElementById('settingsBtn').addEventListener('click', injectSettingsModal);
    document.getElementById('userInput').addEventListener('input', updateWordCount);
    document.getElementById('userInput').addEventListener('keydown', handleUserInputKeydown);
    document.addEventListener('click', closeOnClickOutside);
    document.addEventListener('keydown', handleGlobalShortcuts);
}

// Add event listeners for the settings modal buttons
function addSettingsModalEventListeners() {
    document.getElementById('closeSettingsModalBtn').addEventListener('click', closeSettingsModal);
    document.getElementById('settingsToggleContentCheckbox').addEventListener('change', toggleScrapedContent);
    document.getElementById('settingsToggleFoldCheckbox').addEventListener('change', toggleAutoFold);
    document.getElementById('settingsToggleMetricsCheckbox').addEventListener('change', toggleMetrics);
    document.getElementById('settingsModal').addEventListener('click', (event) => {
        event.stopPropagation();
    });
}

// Add event listeners for the shortcuts modal buttons
function addShortcutsModalEventListeners() {
    document.getElementById('closeShortcutsModalBtn').addEventListener('click', closeShortcutsModal);
    document.getElementById('shortcutsModal').addEventListener('click', (event) => {
        event.stopPropagation();
    });
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

// Function to close the main modal
function closeModal() {
    const modal = document.getElementById('myCustomModal');
    if (modal) {
        modal.remove();
    }
}

// Function to close the settings modal
function closeSettingsModal() {
    const settingsModal = document.getElementById('settingsModal');
    if (settingsModal) {
        settingsModal.remove();
    }
}

// Function to close the shortcuts modal
function closeShortcutsModal() {
    const shortcutsModal = document.getElementById('shortcutsModal');
    if (shortcutsModal) {
        shortcutsModal.remove();
    }
}

// Function to close the main modal when clicking outside of it
function closeOnClickOutside(event) {
    const modal = document.getElementById('myCustomModal');
    const settingsModal = document.getElementById('settingsModal');
    const shortcutsModal = document.getElementById('shortcutsModal');
    if (modal && !modal.contains(event.target) && (!settingsModal || !settingsModal.contains(event.target)) && (!shortcutsModal || !shortcutsModal.contains(event.target)) && event.target.id !== 'maximizeBtn') {
        closeModal();
    }
}

// Function to handle keydown events in the user input textarea
function handleUserInputKeydown(event) {
    if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault();
        sendContentToAI();
    } else if (event.ctrlKey && event.shiftKey && event.key === 'Enter') {
        const userInput = document.getElementById('userInput');
        const start = userInput.selectionStart;
        const end = userInput.selectionEnd;
        userInput.value = userInput.value.substring(0, start) + '\n' + userInput.value.substring(end);
        userInput.selectionStart = userInput.selectionEnd = start + 1;
    }
}

// Function to handle global shortcuts
function handleGlobalShortcuts(event) {
    const modal = document.getElementById('myCustomModal');
    if (modal && event.ctrlKey && event.key === '/') {
        injectShortcutsModal();
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

// Function to toggle the scraped content visibility
function toggleScrapedContent() {
    const scrapedContent = document.getElementById('scrapedContent');
    const checkbox = document.getElementById('settingsToggleContentCheckbox');
    if (checkbox.checked) {
        scrapedContent.style.display = 'block';
    } else {
        scrapedContent.style.display = 'none';
    }
}

// Function to fold all previous conversations except the last one
function foldPreviousConversations() {
    const chatArea = document.getElementById('chatArea');
    const messages = chatArea.getElementsByClassName('chat-message');
    for (let i = 0; i < messages.length - 2; i++) {
        messages[i].classList.add('folded');
        messages[i].innerText = '...';
    }
    if (messages.length > 0) {
        messages[messages.length - 2].classList.remove('folded');
        messages[messages.length - 2].

            innerText = messages[messages.length - 2].getAttribute('data-full-text');
        messages[messages.length - 1].classList.remove('folded');
        messages[messages.length - 1].innerText = messages[messages.length - 1].getAttribute('data-full-text');
    }
}

// Function to toggle auto-folding of previous conversations
function toggleAutoFold() {
    const checkbox = document.getElementById('settingsToggleFoldCheckbox');
    if (checkbox.checked) {
        foldPreviousConversations();
    } else {
        const chatArea = document.getElementById('chatArea');
        const messages = chatArea.getElementsByClassName('chat-message');
        for (let i = 0; i < messages.length; i++) {
            messages[i].classList.remove('folded');
            messages[i].innerText = messages[i].getAttribute('data-full-text');
        }
    }
}

// Function to toggle the visibility of the metrics
function toggleMetrics() {
    const metrics = document.getElementById('wordCount');
    const checkbox = document.getElementById('settingsToggleMetricsCheckbox');
    if (checkbox.checked) {
        metrics.style.display = 'none';
    } else {
        metrics.style.display = 'block';
    }
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
        userMessage.className = 'chat-message user-message';
        userMessage.innerText = userInput;
        userMessage.style.backgroundColor = '#5E81AC';
        userMessage.style.color = '#ECEFF4';
        userMessage.style.padding = '10px';
        userMessage.style.margin = '5px 0';
        userMessage.style.borderRadius = '4px';
        userMessage.setAttribute('data-full-text', userInput);
        chatArea.appendChild(userMessage);

        // AI response message
        const aiMessage = document.createElement('div');
        aiMessage.className = 'chat-message ai-message';
        aiMessage.style.backgroundColor = '#4C566A';
        aiMessage.style.color = '#ECEFF4';
        aiMessage.style.padding = '10px';
        aiMessage.style.margin = '5px 0';
        aiMessage.style.borderRadius = '4px';

        // Check if response content exists and is an array
        if (response.response.content && Array.isArray(response.response.content) && response.response.content.length > 0) {
            const aiContent = response.response.content[0].text;
            aiMessage.innerText = aiContent;
            aiMessage.setAttribute('data-full-text', aiContent);

            // Update word count for AI response
            const responseWords = aiContent.split(/\s+/).filter(word => word.length > 0).length;
            document.getElementById('responseWordCount').innerText = `Response Words: ${responseWords}`;
        } else {
            console.error("Invalid response format or empty content:", response.response);
            aiMessage.innerText = "Sorry, I couldn't understand the response.";
            aiMessage.setAttribute('data-full-text', "Sorry, I couldn't understand the response.");
        }

        chatArea.appendChild(aiMessage);

        // Scroll to the bottom of the chat area
        chatArea.scrollTop = chatArea.scrollHeight;

        // Fold previous conversations if the checkbox is checked
        const autoFoldCheckbox = document.getElementById('settingsToggleFoldCheckbox');
        if (autoFoldCheckbox.checked) {
            foldPreviousConversations();
        }

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
        injectModal();
        scrapeContent();
    }
});

// Check if the modal should be shown after a reload
if (localStorage.getItem('showModalAfterReload') === 'true') {
    localStorage.removeItem('showModalAfterReload');
    setTimeout(() => {
        injectModal();
        scrapeContent();
    }, 3000);  // Delay to allow content to fully load
}

// Listen for the key combination Ctrl+Shift+U to refresh the page
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.shiftKey && event.key === 'U') {
        reloadPage();
    }
});