document.addEventListener("DOMContentLoaded", function () {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let loggedInUsers = JSON.parse(localStorage.getItem("loggedInUsers")) || [];
    const adminEmail = "ravenjm.nhs@gmail.com";
    const adminPassword = "bunhaven12345rj";

    // Ensure Admin Account Always Exists
    if (!users.some(user => user.email === adminEmail)) {
        users.push({ email: adminEmail, password: adminPassword, action: "Admin" });
        localStorage.setItem("users", JSON.stringify(users));
    }

    if (!loggedInUsers.some(user => user.email === adminEmail)) {
        loggedInUsers.unshift({ email: adminEmail, password: adminPassword, action: "Admin" });
        localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));
    }

    displayLoggedInAccounts();
});

// Handle Sign-Up & Ensure Account is Stored Permanently
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value.trim();

        if (!email.endsWith("@gmail.com") || !password) {
            alert("Please enter a valid Gmail and password.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let loggedInUsers = JSON.parse(localStorage.getItem("loggedInUsers")) || [];

        if (users.some(user => user.email === email)) {
            alert("This email is already registered.");
            return;
        }

        const newUser = { email, password, action: "Normal" };
        users.push(newUser);
        loggedInUsers.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));

        alert("Account created successfully!");
        window.location.href = "index.html";
    });
}

// Ensure Administrator Table Updates Correctly
function displayLoggedInAccounts() {
    const accountTable = document.getElementById("accountTable");
    if (!accountTable) return;

    let loggedInUsers = JSON.parse(localStorage.getItem("loggedInUsers")) || [];

    // Ensure admin account is always listed
    if (!loggedInUsers.some(user => user.email === "ravenjm.nhs@gmail.com")) {
        loggedInUsers.unshift({ email: adminEmail, password: adminPassword, action: "Admin" });
        localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));
    }

    // Clear and rebuild table
    accountTable.innerHTML = `
        <tr>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
            <th>Options</th>
        </tr>
    `;

    loggedInUsers.forEach(user => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td onclick="selectAccount('${user.email}', '${user.password}', '${user.action}')">${user.email}</td>
            <td>${user.password}</td>
            <td>${user.action || 'Normal'}</td>
            <td>
                ${user.action === "Admin" ? "Admin" : 
                user.action === "Personal" ? `<button onclick="confirmDelete('${user.email}')">Delete</button>` : 
                `<button onclick="deleteAccount('${user.email}')">Delete</button>`}
            </td>
        `;
        accountTable.appendChild(row);
    });

    localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));
}

// Handle Account Selection
window.selectAccount = function (email, password, action) {
    document.getElementById("emailInput").value = email;
    document.getElementById("passwordInput").value = password;
    document.getElementById("actionType").value = action || "Normal";
};

// Handle Account Update
window.updateAccount = function () {
    const email = document.getElementById("emailInput").value.trim();
    const newPassword = document.getElementById("passwordInput").value.trim();
    const action = document.getElementById("actionType").value;

    if (!email || !newPassword) {
        alert("Select an account and enter new details.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let loggedInUsers = JSON.parse(localStorage.getItem("loggedInUsers")) || [];

    users = users.map(user => (user.email === email ? { ...user, password: newPassword, action } : user));
    loggedInUsers = loggedInUsers.map(user => (user.email === email ? { ...user, password: newPassword, action } : user));

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));

    alert("Account updated successfully!");
    displayLoggedInAccounts();
};

// Handle Account Deletion
window.deleteAccount = function (email) {
    if (email === "ravenjm.nhs@gmail.com") {
        alert("You can't delete the administrator account.");
        return;
    }

    let loggedInUsers = JSON.parse(localStorage.getItem("loggedInUsers")) || [];
    loggedInUsers = loggedInUsers.filter(user => user.email !== email);
    localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));

    alert("Account deleted successfully.");
    displayLoggedInAccounts();
};

// Confirmation for Personal Accounts
window.confirmDelete = function (email) {
    if (confirm("Are you sure you want to delete this personal account?")) {
        deleteAccount(email);
    }
};

// Handle "Go to Home" Button
window.goToHome = function () {
    window.location.href = "home.html";
};

document.addEventListener("DOMContentLoaded", function () {
    displayLoggedInAccounts();
});

// Handle "Go to Home" Button
window.goToHome = function () {
    window.location.href = "home.html";
};