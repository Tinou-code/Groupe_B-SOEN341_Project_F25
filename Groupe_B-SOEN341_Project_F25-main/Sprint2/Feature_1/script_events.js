document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".event-form");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;
      const location = document.getElementById("location").value.trim();
      const description = document.getElementById("description").value.trim();

      if (!name || !date || !time || !location || !description) {
        alert("Please fill in all fields!");
        return;
      }

      const newEvent = {
        name,
        date,
        time,
        location,
        description,
        createdAt: new Date().toLocaleString(),
      };

      // Récupère les anciens événements
      let events = JSON.parse(localStorage.getItem("events")) || [];

      // Ajoute le nouveau
      events.push(newEvent);

      // Sauvegarde dans le navigateur
      localStorage.setItem("events", JSON.stringify(events));

      alert("✅ Event saved successfully!");
      form.reset();
    });
  }
});
