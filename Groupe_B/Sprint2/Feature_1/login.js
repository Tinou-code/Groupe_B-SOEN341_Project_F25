// login.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const errorMessage = document.getElementById("errorMessage");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const username = document.getElementById("username").value.trim(); // By username we mean ID
      const password = document.getElementById("password").value.trim();
  
      if (!username || !password) {
      errorMessage.textContent = "Please enter your ID and password.";
      return;
    }

    try {
      const resp = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: username, password }),
      });

      const data = await resp.json();

      if (resp.ok && data.ok) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("role", data.role);
        localStorage.setItem("user", JSON.stringify({id:username, savedEvents:[], claimedTickets:[]}))
        window.location.href = "events.html";
      } else {
        errorMessage.textContent = data.message || "Invalid credentials.";
      }
    } catch (err) {
      console.error(err);
      errorMessage.textContent = "Could not connect to the server.";
    }
    });
  });
  