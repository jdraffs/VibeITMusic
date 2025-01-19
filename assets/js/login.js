// Handle the login form submission
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form's default submission behavior
  
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
  
    // Simulate login validation (Replace with real logic, such as server-side validation)
    if (email === "test@example.com" && password === "password123") {
        alert("Login successful!");
        window.location.href = "index.html"; // Redirect to home page
    } else {
        alert("Invalid email or password. Please try again.");
    }
  });
  
  // Handle the signup form (optional, similar logic)
  document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Sign up successful! Redirecting to home...");
    window.location.href = "index.html";
  });