//register.js file
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const error = document.getElementById("errorMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("id").value.trim();
    const first = document.getElementById("firstName").value.trim();
    const last = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();

    //Here we validate the inputs
   if (!/^[SOA][0-9]+$/.test(id)) {
      return error.textContent = "Invalid ID. Must start with S (Student), O (Organizer), or A (Admin).";;
    }

    if (!email.includes("@")) {
      return error.textContent = "Invalid email. Must contain '@'.";
    }

    if (!/^\d{10}$/.test(phone)) {
     return error.textContent = "Invalid phone number. Must be a 10-digit Canadian number.";
    }

    //Allows communication between frontend and backend
    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password, first, last, email, phone }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
        window.location.href = "home.html";
      } else {
        error.textContent = data.message || "Something went wrong.";
      }
    } catch (err) {
      console.error(err);
      error.textContent = "Could not connect to the server.";
    }
  });
});