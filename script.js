// Menu Icon Toggle
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

// Scroll Sections Active Link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Sticky Navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove Toggle Icon When Link Clicked
    menuIcon.classList.remove('fa-times');
    navbar.classList.remove('active');
};

// Typed.js
const typed = new Typed('.multiple-text', {
    strings: ['Aspiring Data Analyst', 'Data Science Student', 'Problem Solver'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate').forEach(el => observer.observe(el));

// Smooth Scroll
$('a[href*="#"]').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top - 100
    }, 500);
});


// Success Popup
const form = document.getElementById("contact-form");
const popup = document.getElementById("success-popup");

// Ensure popup is hidden on page load
popup.style.display = "none";

// Handle form submit
form.addEventListener("submit", function (e) {
    e.preventDefault();     // STOP REDIRECT

    const formData = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
            "Accept": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            sessionStorage.setItem("formSubmitted", "true"); // mark submission
            popup.style.display = "flex";
            form.reset();
        } else {
            alert("Failed to send message. Please try again.");
        }
    })
    .catch(() => {
        alert("Network error. Please try later.");
    });
});

// Close popup & clear flag
function closePopup() {
    popup.style.display = "none";
    sessionStorage.removeItem("formSubmitted");
}