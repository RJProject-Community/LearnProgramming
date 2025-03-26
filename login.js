document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page refresh

        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();

        let storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
        let matchedUser = storedAccounts.find(acc => acc.email === email && acc.password === password);

        if (matchedUser) {
            localStorage.setItem("loggedInUser", JSON.stringify({ email: email })); // Store login data
            window.location.href = "home.html"; // Redirect to home
        } else {
            alert("Invalid email or password!"); // Show error
        }
    });
});