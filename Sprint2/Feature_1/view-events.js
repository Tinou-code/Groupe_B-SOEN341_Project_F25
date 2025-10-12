// view-events.js
document.addEventListener("DOMContentLoaded", function () {
  const eventList = document.getElementById("eventList");

  // Récupérer les événements sauvegardés dans le navigateur
  const events = JSON.parse(localStorage.getItem("events")) || [];

  // Si aucun événement n’a encore été enregistré
  if (events.length === 0) {
    eventList.innerHTML = `
      <div class="no-events">
        <p>No events available yet.</p>
        <a href="create_event.html" class="btn">Create your first event</a>
      </div>
    `;
    return;
  }

  // Pour chaque événement, créer une carte d’affichage
  events.forEach((event) => {
    const card = document.createElement("div");
    card.classList.add("event-card");

    card.innerHTML = `
      <h3>${event.name}</h3>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Time:</strong> ${event.time}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p><strong>Description:</strong> ${event.description}</p>
    `;

    eventList.appendChild(card);
  });
});
// view-events.js
document.addEventListener("DOMContentLoaded", function () {
  const eventList = document.getElementById("eventList");
  let events = JSON.parse(localStorage.getItem("events")) || [];

  // === Afficher tous les événements ===
  function displayEvents() {
    eventList.innerHTML = "";

    if (events.length === 0) {
      eventList.innerHTML = `
        <div class="no-events">
          <p>No events available yet.</p>
          <a href="create_event.html" class="btn">Create your first event</a>
        </div>
      `;
      return;
    }

    events.forEach((event, index) => {
      const card = document.createElement("div");
      card.classList.add("event-card");

      card.innerHTML = `
        <h3>${event.name}</h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Description:</strong> ${event.description}</p>
        <div class="button-group">
          <button class="edit-btn" data-index="${index}">✏️ Edit</button>
          <button class="delete-btn" data-index="${index}">🗑️ Delete</button>
        </div>
      `;

      eventList.appendChild(card);
    });

    attachButtonEvents();
  }

  // === Gérer les boutons Edit et Delete ===
  function attachButtonEvents() {
    // Boutons de suppression
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        if (confirm("Are you sure you want to delete this event?")) {
          events.splice(index, 1);
          localStorage.setItem("events", JSON.stringify(events));
          displayEvents();
        }
      });
    });

    // Boutons d'édition
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        const event = events[index];

        // Préremplir un prompt simple (pour éviter une nouvelle page)
        const newName = prompt("Edit event name:", event.name);
        if (newName === null) return; // Annulé

        const newDate = prompt("Edit date (YYYY-MM-DD):", event.date);
        if (newDate === null) return;

        const newTime = prompt("Edit time (HH:MM):", event.time);
        if (newTime === null) return;

        const newLocation = prompt("Edit location:", event.location);
        if (newLocation === null) return;

        const newDescription = prompt("Edit description:", event.description);
        if (newDescription === null) return;

        // Mise à jour de l'événement
        events[index] = {
          name: newName,
          date: newDate,
          time: newTime,
          location: newLocation,
          description: newDescription,
        };

        localStorage.setItem("events", JSON.stringify(events));
        displayEvents();
      });
    });
  }

  // === Initialisation ===
  displayEvents();
});
