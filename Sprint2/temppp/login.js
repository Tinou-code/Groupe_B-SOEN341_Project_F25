document.addEventListener("DOMContentLoaded", () => {
    hydrateAuthUI();
    // Wire logout button if present
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);
  });
  
  (function guard() {
    try {
      const ok = localStorage.getItem("loggedIn") === "true";
      if (!ok) {
        window.location.replace("admin_login.html");
      }
    } catch {
      window.location.replace("admin_login.html");
    }
  })();
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    if (form) form.addEventListener("submit", handleLogin);
});
  
  async function handleLogin(e) {
    e.preventDefault();
  
    const username = (document.getElementById("username1")?.value || "").trim();
    const password = (document.getElementById("password1")?.value || "").trim();
    const errorEl = document.getElementById("errorMessage");
  
    if (!username || !password) {
      if (errorEl) errorEl.textContent = "Please enter both fields.";
      return;
    }
  
    try {
      // TEMPORARY: fake auth (replace with fetch('/login') later)
      if (username === "admin" && password === "1234") {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("role", "admin");
        window.location.href = "events.html";
        return;
      }
      if (username === "student" && password === "1234") {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("role", "student");
        window.location.href = "events.html";
        return;
      }
      if (username === "organizer" && password === "1234") {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("role", "organizer");
        window.location.href = "events.html";
        return;
      }
  
      if (errorEl) errorEl.textContent = "Invalid username or password.";
    } catch (err) {
      console.error("Login error:", err);
      if (errorEl) errorEl.textContent = "Something went wrong. Try again.";
    }
    }
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("loginMenuBtn");
    const dropdown = document.getElementById("loginDropdown");
  
    if (btn && dropdown) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("show");
      });
  
      document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target) && e.target !== btn) {
          dropdown.classList.remove("show");
        }
      });
    }
})