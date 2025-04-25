const chatbotForm = document.getElementById("chatbot-form");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotMessages = document.getElementById("chatbot-messages");

chatbotForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = chatbotInput.value;
  displayMessage(userMessage, "user");

  // Clear input
  chatbotInput.value = "";

  // Send message to server
  const botResponse = await fetchChatbotResponse(userMessage);
  displayMessage(botResponse, "bot");
});

function displayMessage(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;
  messageDiv.className = sender === "user" ? "user-message" : "bot-message";
  chatbotMessages.appendChild(messageDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

async function fetchChatbotResponse(userMessage) {
  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });
    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    return "Sorry, something went wrong.";
  }
}