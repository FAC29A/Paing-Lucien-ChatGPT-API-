let apiKey;
const chatContainer = document.getElementById("chat-container");
const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");

function storeApiKey() {
  apiKey = document.getElementById("api-key-input").value;
  chatContainer.style.display = "block";
}

function appendMessage(role, content) {
  const messageDiv = document.createElement("div");
  messageDiv.innerHTML = `<strong>${role}:</strong> ${content}`;
  chatLog.appendChild(messageDiv);
}

function sendMessage() {
  const userMessage = userInput.value.trim();

  if (userMessage !== "") {
    // Display user message in the chat log
    appendMessage("User", userMessage);

    // Send user message to the OpenAI API
    axios
      .post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: userMessage }],
          max_tokens: 100,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      )
      .then((response) => {
        // Get and display the assistant's reply
        const assistantReply = response.data.choices[0].message.content;
        appendMessage("Assistant", assistantReply);
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });

    // Clear the user input
    userInput.value = "";
  }
}
