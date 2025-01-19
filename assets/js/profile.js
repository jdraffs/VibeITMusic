// Dropdown toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const profileButton = document.querySelector('.profile-button');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    profileButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent event from bubbling up
        dropdownMenu.classList.toggle('show');
    });

    // Close dropdown if clicking outside
    document.addEventListener('click', function () {
        dropdownMenu.classList.remove('show');
    });
});
