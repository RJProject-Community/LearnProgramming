document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;

            if (!email.endsWith("@gmail.com")) {
                alert("Please enter a valid Gmail address.");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];
            const foundUser = users.find(user => user.email === email && user.password === password);

            if (foundUser) {
                alert("Login successful!");
                localStorage.setItem("user", JSON.stringify(foundUser));
                window.location.href = "home.html";
            } else {
                alert("Invalid email or password.");
            }
        });
    }

    // Handle Sign-Up
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("signupEmail").value.trim();
            const password = document.getElementById("signupPassword").value;

            if (!email.endsWith("@gmail.com")) {
                alert("Please enter a valid Gmail address.");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];
            users.push({ email, password });
            localStorage.setItem("users", JSON.stringify(users));

            alert("Account created successfully! Please log in.");
            window.location.href = "index.html";
        });
    }

    // Handle Account Page
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (currentUser && document.getElementById("emailInput")) {
        document.getElementById("emailInput").value = currentUser.email;
        document.getElementById("passwordInput").value = currentUser.password;
    }

    window.saveChanges = function () {
        const newEmail = document.getElementById("emailInput").value.trim();
        const newPassword = document.getElementById("passwordInput").value;

        if (!newEmail.endsWith("@gmail.com")) {
            alert("Please enter a valid Gmail address.");
            return;
        }

        // Update existing user info
        let updatedUser = users.find(user => user.email === newEmail);
        if (updatedUser) {
            updatedUser.password = newPassword;
        } else {
            users.push({ email: newEmail, password: newPassword });
        }

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("user", JSON.stringify({ email: newEmail, password: newPassword }));

        alert("Account updated successfully!");
        location.reload();
    };

    window.logout = function () {
        localStorage.removeItem("user");
        window.location.href = "index.html";
    };

    // Display all logged-in accounts
    function displayAccounts() {
        const accountTable = document.getElementById("accountTable");

        users.forEach(user => {
            let row = document.createElement("tr");
            row.innerHTML = `<td>${user.email}</td><td>${user.password}</td>`;
            accountTable.appendChild(row);
        });
    }

    displayAccounts();
});
window.goToHome = function () {
    window.location.href = "home.html";
};