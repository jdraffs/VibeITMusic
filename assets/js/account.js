document.addEventListener("DOMContentLoaded", () => {
    // Simulated user data (replace with API call to fetch real data)
    const userData = {
      name: "John Doe",
      email: "john.doe@example.com",
      plan: "Free",
    };
  
    // Populate the account page with user data
    document.getElementById("user-name").textContent = userData.name;
    document.getElementById("user-email").textContent = userData.email;
    document.getElementById("user-plan").textContent = userData.plan;
  
    // Add event listener for the "Edit Profile" button
    const editProfileButton = document.getElementById("edit-profile-button");
    editProfileButton.addEventListener("click", () => {
      alert("Redirecting to the Profile Edit page...");
      // Redirect to a profile editing page (implement this page separately)
      window.location.href = "profile.html";
    });
  
    // Log out confirmation
    const logoutLink = document.querySelector('a[href="logout.php"]');
    logoutLink.addEventListener("click", (event) => {
      event.preventDefault();
      if (confirm("Are you sure you want to log out?")) {
        // Log out logic here (e.g., clear session or tokens)
        window.location.href = "index.html";
      }
    });
  });
  
