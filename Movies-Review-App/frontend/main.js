// Function to display the login form
function login() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  // Hide the registration form and show the login form
  registerForm.style.display = "none";
  loginForm.style.display = "block";
}

// Function to display the registration form
function register() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  // Hide the login form and show the registration form
  loginForm.style.display = "none";
  registerForm.style.display = "block";
}

// Optional: Function to toggle the menu (mobile responsiveness)
function myMenuFunction() {
  var i = document.getElementById("navMenu");
  if (i.className === "nav-menu") {
    i.className += " responsive";
  } else {
    i.className = "nav-menu";
  }
}
