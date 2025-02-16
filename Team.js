document.addEventListener("DOMContentLoaded", function () {
    const members = document.querySelectorAll(".team-member");

    members.forEach(member => {
        member.addEventListener("mouseover", function () {
            this.style.transform = "scale(1.1)";
            this.style.transition = "0.3s";
        });

        member.addEventListener("mouseout", function () {
            this.style.transform = "scale(1)";
        });
    });
});
