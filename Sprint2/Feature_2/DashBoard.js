
const events = [
    { id: 1, name: 'Pot Luck', date: '2025-05-14', capacity: 200, issued: 156, checkedIn: 92 },
    { id: 2, name: 'Beach Day', date: '2025-08-02', capacity: 80, issued: 74, checkedIn: 60 },
    { id: 3, name: 'Soccer Tournament', date: '2025-10-25', capacity: 100, issued: 97, checkedIn: 88 }
    ];

    const select = document.getElementById('eventSelect');
    const tableBody = document.querySelector('#eventTable tbody');
    events.forEach(event => {
    const option = document.createElement('option');
    option.value = event.id;
    option.textContent = event.name;
    select.appendChild(option);
    });
    
    
    // Function to render table for selected event
    function showEventDetails(eventId) {
    const ev = events.find(e => e.id == eventId);
    if (!ev) {
    tableBody.innerHTML = '<tr><td colspan="2" class="muted">Please select an event.</td></tr>';
    return;
    }
    const attendanceRate = ((ev.checkedIn / ev.issued) * 100).toFixed(2) + '%';
    const remaining = ev.capacity - ev.issued;
    document.getElementById("EventName").innerText=ev.name;
    tableBody.innerHTML = `
    <tr><td>Date</td><td>${ev.date}</td></tr>
    <tr><td>Capacity</td><td>${ev.capacity}</td></tr>
    <tr><td>Tickets Issued</td><td>${ev.issued}</td></tr>
    <tr><td>Checked-In</td><td>${ev.checkedIn}</td></tr>
    <tr><td>Attendance Rate</td><td>${attendanceRate}</td></tr>
    <tr><td>Remaining Capacity</td><td>${remaining}</td></tr>
    `;
    }
    
    
    select.addEventListener('change', e => showEventDetails(e.target.value));
    
    
    // Default selection: first event
    if (events.length) {
    select.value = events[0].id;
    showEventDetails(events[0].id);
    }