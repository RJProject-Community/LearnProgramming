document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();

        // Retrieve stored accounts
        let storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];

        // Find user in stored accounts
        let user = storedAccounts.find(account => account.email === email && account.password === password);

        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store user in session
            alert("Login successful!");
            window.location.href = "home.html"; // Redirect to home page
        } else {
            alert("Invalid email or password.");
        }
    });
});