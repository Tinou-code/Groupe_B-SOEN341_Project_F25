document.addEventListener("DOMContentLoaded", function () {
  const eventList = document.getElementById("eventList");
  let events = JSON.parse(localStorage.getItem("events")) || [];

  // Filter elements
  const priceFilter = document.getElementById("priceFilter");
  const categoryFilter = document.getElementById("categoryFilter");
  const organizationFilter = document.getElementById("organizationFilter");
  const filterBtn = document.getElementById("filterBtn");

  // === Display events ===
  function displayEvents(list) {
    eventList.innerHTML = "";

    if (list.length === 0) {
      eventList.innerHTML = `
        <div class="no-events">
          <p>No matching events found.</p>
          <a href="create_event.html" class="btn">Create an event</a>
        </div>
      `;
      return;
    }

    list.forEach((event, index) => {
      const card = document.createElement("div");
      card.classList.add("event-card");

      card.innerHTML = `
        <h3>${event.name}</h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Category:</strong> ${event.category}</p>
        <p><strong>Organization:</strong> ${event.organization}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Price:</strong> ${event.price}</p>
        <p><strong>Description:</strong> ${event.description}</p>
        <div class="button-group">
          <button class="edit-btn" data-index="${index}">✏️ Edit</button>
          <button class="delete-btn" data-index="${index}">🗑️ Delete</button>
        </div>
      `;

      eventList.appendChild(card);
    });

    attachButtonEvents(list);
  }

  // === Edit/Delete buttons ===
  function attachButtonEvents(list) {
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        if (confirm("Are you sure you want to delete this event?")) {
          events.splice(index, 1);
          localStorage.setItem("events", JSON.stringify(events));
          displayEvents(events);
        }
      });
    });

    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        const event = events[index];

        const newName = prompt("Edit event name:", event.name);
        if (newName === null) return;
        const newDate = prompt("Edit date (YYYY-MM-DD):", event.date);
        if (newDate === null) return;
        const newCategory = prompt("Edit category:", event.category);
        if (newCategory === null) return;
        const newOrganization = prompt("Edit Organization:", event.organization);
        if (newOrganization === null) return;
        const newTime = prompt("Edit time (HH:MM):", event.time);
        if (newTime === null) return;
        const newLocation = prompt("Edit location:", event.location);
        if (newLocation === null) return;
        const newPrice = prompt("Edit price:", event.price);
        if (newPrice === null) return;
        const newDescription = prompt("Edit description:", event.description);
        if (newDescription === null) return;

        events[index] = {
          name: newName,
          date: newDate,
          category: newCategory,
          organization: newOrganization,
          time: newTime,
          location: newLocation,
          price: newPrice,
          description: newDescription,
        };

        localStorage.setItem("events", JSON.stringify(events));
        displayEvents(events);
      });
    });
  }

  // === Apply filters ===
  if (filterBtn) {
    filterBtn.addEventListener("click", () => {
      const selectedPrice = priceFilter.value;
      const selectedCategory = categoryFilter.value;
      const selectedOrganization = organizationFilter.value;

      const filteredEvents = events.filter((ev) => {
        const matchPrice =
          selectedPrice === "all" || ev.price.toLowerCase() === selectedPrice.toLowerCase();
        const matchCategory =
          selectedCategory === "all" || ev.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchOrganization =
          selectedOrganization === "all" || ev.organization.toLowerCase() === selectedOrganization.toLowerCase();

        return matchPrice && matchCategory && matchOrganization;
      });

      displayEvents(filteredEvents);
    });
  }

  // Initial load
  displayEvents(events);
});
