const events = [
    {
        id: 1,
        title: "Tech Innovation Summit 2025",
        date: "2025-10-15",
        time: "14:00",
        location: "Hall Building 101",
        category: "Technology",
        organizer: "Tech Club",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop"
    },
    {
        id: 2,
        title: "Annual Career Fair",
        date: "2025-10-20",
        time: "10:00",
        location: "Library Buidling Main Floor",
        category: "Career",
        organizer: "Career Services",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=400&fit=crop"
    },
    {
        id: 3,
        title: "Spring Music Festival",
        date: "2025-10-25",
        time: "18:00",
        location: "Hall Building 531",
        category: "Entertainment",
        organizer: "Music Society",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=400&fit=crop"
    },
    {
        id: 4,
        title: "Entrepreneurship Workshop",
        date: "2025-10-18",
        time: "13:00",
        location: "Hall Building 823",
        category: "Workshop",
        organizer: "Entrepreneurship Club",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop"
    },
    {
        id: 5,
        title: "International Food Festival",
        date: "2025-10-22",
        time: "12:00",
        location: "Hall Building 507",
        category: "Culture",
        organizer: "International Students Association",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop"
    },
    {
        id: 6,
        title: "AI & Machine Learning Seminar",
        date: "2025-10-28",
        time: "15:30",
        location: "Hall Building 507",
        category: "Technology",
        organizer: "AI Research Group",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop"
    }
];

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Format time
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// SVG Icons
const icons = {
    calendar: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
    clock: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
    location: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
    users: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>'
};
function renderEvents() {
    const eventsGrid = document.getElementById('eventsGrid');
    
    if (events.length === 0) {
        eventsGrid.innerHTML = '<div class="no-events">No events available at the moment.</div>';
        return;
    }

    eventsGrid.innerHTML = events.map(event => `
        <div class="event-card">
            <img src="${event.image}" alt="${event.title}" class="event-image">
            <div class="event-content">
                <span class="event-category">${event.category}</span>
                <h2 class="event-title">${event.title}</h2>
                <div class="event-details">
                    <div class="event-detail">
                        ${icons.calendar}
                        <span>${formatDate(event.date)}</span>
                    </div>
                    <div class="event-detail">
                        ${icons.clock}
                        <span>${formatTime(event.time)}</span>
                    </div>
                    <div class="event-detail">
                        ${icons.location}
                        <span>${event.location}</span>
                    </div>
                </div>
                <div class="event-footer">
                    <span class="event-organizer">by ${event.organizer}</span>
                    
                </div>
            </div>
        </div>
    `).join('');
}

renderEvents();