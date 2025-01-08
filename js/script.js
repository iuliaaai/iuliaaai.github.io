document.addEventListener("DOMContentLoaded", () => {
    // Select elements
    const navLinks = document.querySelectorAll("header nav ul li a");
    const cards = document.querySelectorAll(".card");
    const detailsSection = document.getElementById("details");
    const detailsContent = document.querySelector(".details-content");
    const detailsTitle = document.getElementById("details-title");
    const detailsText = document.getElementById("details-content");
    const detailsImage = document.getElementById("details-image");

    // Add smooth scrolling and URL updates for navigation links
    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault(); // Prevent default anchor behavior
            const targetId = link.getAttribute("href").substring(1); // Get target ID
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Scroll smoothly to the target section
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // Update the URL without reloading
                history.pushState(null, "", `#${targetId}`);
            }
        });
    });

    // Toggle Details for Cards
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const type = card.getAttribute("data-type");

            // Toggle section visibility
            if (detailsContent.classList.contains("show") && detailsTitle.innerText === type) {
                detailsContent.classList.remove("show");
                detailsContent.style.animation = "slide-up 0.5s ease";
                return;
            }

            // Update details section content based on the clicked card
            detailsTitle.innerText = type;
            detailsText.innerHTML = document.getElementById(`content-${type}`).innerHTML;
            detailsImage.src = `images/${type.toLowerCase()}.jpg`;

            // Show section with animation
            detailsContent.style.animation = "slide-down 0.5s ease";
            detailsContent.classList.add("show");
        });
    });

    // Navigation Word Animation with Flip Effect
    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            // Remove existing animations
            navLinks.forEach(link => link.classList.remove("nav-flip", "flip-back"));

            // Add flip animation
            link.classList.add("nav-flip");

            // Smooth scroll to the target section
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: "smooth" });

            // Flip back after animation delay
            setTimeout(() => {
                link.classList.add('flip-back');
            }, 2000);
        });
    });

    // Add flip behavior for opinion cards
    document.querySelectorAll('.opinion-card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // Scroll listener to handle URL updates when scrolling manually
    window.addEventListener("scroll", () => {
        const sections = document.querySelectorAll("section");
        let currentSectionId = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // Adjust offset for fixed headers
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSectionId = section.getAttribute("id");
            }
        });

        if (currentSectionId) {
            history.replaceState(null, "", `#${currentSectionId}`);
        }
    });
});
