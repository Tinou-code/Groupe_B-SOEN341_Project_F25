// ---------------- Dropdown toggle ----------------
function toggleDropdown() {
    const dropdown = document.getElementById('loginDropdown');
    dropdown.classList.toggle('show');
  }
  
  // Close dropdown when clicking outside
  window.onclick = function (event) {
    if (!event.target.matches('.btn-login')) {
      const dropdowns = document.getElementsByClassName('dropdown-content');
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  };
  
  // ---------------- LOGIN STATE MANAGEMENT ----------------
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.btn-login');
    const dropdown = document.getElementById('loginDropdown');
  
    // Check if logged in
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  
    if (isLoggedIn) {
      // --- Logged in: hide dropdown, make button a logout button
      if (dropdown) dropdown.classList.remove('show'); // ensure hidden
      btn.textContent = 'Logout';
      btn.onclick = handleLogout;
    } else {
      // --- Logged out: restore login dropdown behavior
      if (dropdown) dropdown.classList.remove('show'); // keep hidden by default
      btn.textContent = 'Login';
      btn.onclick = toggleDropdown;
    }
  });
  
  // ---------------- LOGOUT ----------------
  function handleLogout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('role');
    window.location.href = 'home.html'; // redirect to homepage
  }
  