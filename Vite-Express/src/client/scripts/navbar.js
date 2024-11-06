function setActiveLink() {
    // Get all links with the class 'link' in the navbar
    const links = document.querySelectorAll(".nav-menu .link");
    const currentPath = window.location.pathname; // Get current path (e.g., '/movies')

    // Remove 'active' class from all links
    links.forEach(link => link.classList.remove("active"));

    // Loop through links and set 'active' class on the one that matches the path
    links.forEach(link => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
      }
    });
  }

  // Run the function on page load
  window.onload = setActiveLink;