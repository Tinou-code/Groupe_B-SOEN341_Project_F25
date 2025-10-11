(function guard() {
    try {
      const isLoggedIn = localStorage.getItem("loggedIn") === "true";
      const role = localStorage.getItem("role");
  
      // We only store the info — no redirection.
      window.__USER_STATE__ = {
        isLoggedIn,
        role,
      };
    } catch (error) {
      window.__USER_STATE__ = { isLoggedIn: false, role: null };
    }
  })();
  