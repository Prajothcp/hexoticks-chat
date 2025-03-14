const API_URL = "https://your-railway-url.com";  // Replace with your Railway-deployed URL

let socket;
let username;
let token;

function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  axios.post(`${API_URL}/register`, { username, password })
    .then(res => alert(res.data.message))
    .catch(err => alert("Error registering"));
}

function login() {
  const usernameInput = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  axios.post(`${API_URL}/login`, { username: usernameInput, password })
    .then(res => {
      token = res.data.token;
      username = res.data.username;
      document.getElementById("chat").style.display = "block";
      document.getElementById("login-section").style.display = "none";
      initSocket();
    })
    .catch(err => alert("Invalid credentials"));
}

function initSocket() {
  socket = io(API_URL);

  socket.on("connect", () => {
    console.log("Connected to chat server");
  });

  socket.on("chatMessage", (msg) => {
    const msgDiv = document.createElement("div");
    msgDiv.textContent = msg;
    document.getElementById("messages").appendChild(msgDiv);
  });
}

function sendMessage() {
  const message = document.getElementById("messageInput").value;
  if (message.trim() !== "") {
    socket.emit("chatMessage", `${username}: ${message}`);
    document.getElementById("messageInput").value = "";
  }
}
