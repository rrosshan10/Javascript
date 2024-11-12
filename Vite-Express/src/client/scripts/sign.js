document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login");
  const registerForm = document.getElementById("register");
  const loginFormElement = document.getElementById("loginForm");
  const registerFormElement = document.getElementById("registerForm");

  if (!loginForm || !registerForm || !loginFormElement || !registerFormElement) {
    console.error("Login or register form not found in the DOM.");
    return;
  }

  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const showRegisterLink = document.getElementById("showRegisterLink");
  const showLoginLink = document.getElementById("showLoginLink");

  function clearFormFields(form) {
    const inputs = form.querySelectorAll("input[type='text'], input[type='password'], input[type='checkbox']");
    inputs.forEach((input) => {
      input.type === "checkbox" ? (input.checked = false) : (input.value = "");
    });
  }

  showRegisterLink?.addEventListener("click", function (event) {
    event.preventDefault();
    clearFormFields(loginForm);
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    history.pushState(null, "", "/register");
  });

  showLoginLink?.addEventListener("click", function (event) {
    event.preventDefault();
    clearFormFields(registerForm);
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    history.pushState(null, "", "/login");
  });

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

  document.querySelector("#registerForm").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    // Prevent duplicate submissions
    if (this.submitting) return;  // Check if the form is already being submitted
    this.submitting = true;        // Set flag to prevent further submissions
  
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert("Please enter a valid email address.");
      this.submitting = false;  // Reset the flag to allow future submissions
      return;
    }
  
    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        alert("Registration successful!");
        window.location.href = "/"; // Redirect to login or another page
      } else {
        const error = await response.text();
        alert(error); // Show server error (e.g., "Email is already registered")
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong during registration.");
    } finally {
      this.submitting = false;  // Reset the flag after submission
    }
  });
  
});
