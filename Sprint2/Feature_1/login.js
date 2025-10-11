// login.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const errorMessage = document.getElementById("errorMessage");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
  
      // temporary fake login
      if (username === "student" && password === "1234") {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("role", "student");
        window.location.href = "events.html";
      } else if (username === "admin" && password === "1234") {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("role", "admin");
        window.location.href = "events.html";
      } else if (username === "organizer" && password === "1234") {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("role", "organizer");
        window.location.href = "events.html";
      } else {
        errorMessage.textContent = "Invalid username or password.";
      }
    });
  });
  