document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        // Retrieve stored accounts
        let storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];

        // Validate credentials
        let user = storedAccounts.find(account => account.email === email && account.password === password);

        if (user) {
            alert("Login successful!");
            localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store the logged-in user
            window.location.href = "home.html"; // Redirect to account page
        } else {
            alert("Invalid email or password.");
        }
    });
});