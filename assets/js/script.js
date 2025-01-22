// A simple chatbot that responds with some predefined answers
function chatbot(input) {
    let output = "";
    input = input.toLowerCase();

    if (input.includes("hello") || input.includes("hi")) {
        output = "Hello, welcome to VibeIt! How can I assist you with your music today?";
    } else if (input.includes("how are you")) {
        output = "I'm just a chatbot, but I'm doing great! How can I help you?";
    } else if (input.includes("what is your name")) {
        output = "My name is VibeBot, your music assistant!";
    } else if (input.includes("what can you do")) {
        output = "I can help you find new music, manage your playlists, and answer any questions about your account!";
    } else if (input.includes("play music") || input.includes("play a song")) {
        output = "Sure! What song would you like me to play for you?";
    } else if (input.includes("recommend me a song") || input.includes("suggest a song")) {
        output = "I recommend you check out 'Cruel Summer' by Taylor Swift. It's a hit!";
    } else if (input.includes("who is the artist") || input.includes("who sings")) {
        output = "Let me know the song or album name, and I'll tell you the artist!";
    } else if (input.includes("playlist") || input.includes("make a playlist")) {
        output = "I can help you create a playlist! What kind of music do you want to add?";
    } else if (input.includes("what's new") || input.includes("new releases")) {
        output = "Check out the latest album by Taylor Swift, 'Midnights'. It's fantastic!";
    } else if (input.includes("favorite genre") || input.includes("music genre")) {
        output = "I don't have a favorite genre, but I can suggest music from rock, pop, hip hop, and more!";
    } else if (input.includes("account") || input.includes("my account")) {
        output = "I can help you manage your account. Do you want to view or edit your profile?";
    } else if (input.includes("help") || input.includes("support")) {
        output = "If you need assistance, feel free to ask about music, playlists, or your account!";
    } else if (input.includes("goodbye") || input.includes("bye")) {
        output = "Goodbye! Enjoy your music, and feel free to come back anytime!";
    } else {
        output = "Sorry, I didn't quite get that. Could you ask something else about music?";
    }

    return output;
}


  // Display the user message on the chat
  function displayUserMessage(message) {
    let chat = document.getElementById("chat");
    let userMessage = document.createElement("div");
    userMessage.classList.add("message");
    userMessage.classList.add("user");
    let userAvatar = document.createElement("div");
    userAvatar.classList.add("avatar");
    let userText = document.createElement("div");
    userText.classList.add("text");
    userText.innerHTML = message;
    userMessage.appendChild(userAvatar);
    userMessage.appendChild(userText);
    chat.appendChild(userMessage);
    chat.scrollTop = chat.scrollHeight;
  }

  // Display the bot message on the chat
  function displayBotMessage(message) {
    let chat = document.getElementById("chat");
    let botMessage = document.createElement("div");
    botMessage.classList.add("message");
    botMessage.classList.add("bot");
    let botAvatar = document.createElement("div");
    botAvatar.classList.add("avatar");
    let botText = document.createElement("div");
    botText.classList.add("text");
    botText.innerHTML = message;
    botMessage.appendChild(botAvatar);
    botMessage.appendChild(botText);
    chat.appendChild(botMessage);
    chat.scrollTop = chat.scrollHeight;
  }

  // Send the user message and get the bot response
  function sendMessage() {
    let input = document.getElementById("input").value;
    if (input) {
      displayUserMessage(input);
      let output = chatbot(input);
      setTimeout(function() {
        displayBotMessage(output);
      }, 1000);
      document.getElementById("input").value = "";
    }
  }

  // Add a click event listener to the button
  document.getElementById("button").addEventListener("click", sendMessage);

  // Add a keypress event listener to the input
  document.getElementById("input").addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
      sendMessage();
    }
  });
