document.addEventListener("DOMContentLoaded", function () {
  // Select login and register containers
  const loginForm = document.getElementById("login");
  const registerForm = document.getElementById("register");
  const loginFormElement = document.getElementById("loginForm");
  const registerFormElement = document.getElementById("registerForm");

  // Ensure the containers are found
  if (
    !loginForm ||
    !registerForm ||
    !loginFormElement ||
    !registerFormElement
  ) {
    console.error("Login or register form not found in the DOM.");
    return;
  }

  // Navbar buttons
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");

  const showRegisterLink = document.getElementById("showRegisterLink");
  const showLoginLink = document.getElementById("showLoginLink");

  function clearFormFields(form) {
    const inputs = form.querySelectorAll(
      "input[type='text'], input[type='password'], input[type='checkbox']"
    );
    inputs.forEach((input) => {
      if (input.type === "checkbox") {
        input.checked = false; // Uncheck checkboxes
      } else {
        input.value = ""; // Clear text and password fields
      }
    });
  }

  showRegisterLink?.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behavior
    clearFormFields(loginForm);
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    history.pushState(null, "", "/register");
  });

  showLoginLink?.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behavior
    clearFormFields(registerForm);
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    history.pushState(null, "", "/login");
  });

  // Add event listeners
  loginBtn?.addEventListener("click", function (event) {
    event.preventDefault();
    clearFormFields(registerForm);
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    history.pushState(null, "", "/login");
  });

  registerBtn?.addEventListener("click", function (event) {
    event.preventDefault();
    clearFormFields(loginForm);
    registerForm.style.display = "block";
    loginForm.style.display = "none";
    history.pushState(null, "", "/register");
  });

  // Handling form submission (login or register) and redirect after form submission
  document.querySelector("#registerForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission
  
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
  
    // Front-end email validation (check if email is in valid format)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const email = data.email.trim();
    
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return; // Prevent further submission if email is invalid
    }
  
    // Check if the email is already registered (optional: this can be done asynchronously)
    const response = await fetch(`/check-email?email=${email}`);
    const emailExists = await response.json();
  
    if (emailExists.exists) {
      alert("This email is already registered. Please use a different one.");
      return;
    }
  
    // Proceed to submit the registration form
    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert("Registration successful! User ID: " + result.user);
        console.log("I am here, sign.js");
        window.location.href = "/"; // Redirect to login or another page
      } else {
        const error = await response.text();
        // Show error message from the server
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong during registration.");
    }
  });
  
});
