document.addEventListener("DOMContentLoaded", () => {
    // Navigation menu functionality
    const openIcon = document.getElementById("openIcon");
    const closeIcon = document.getElementById("closeIcon");
    const navmenu = document.getElementById("navmenu");
    const navLinks = document.querySelectorAll("#navmenu li a");

    // Open mobile menu
    openIcon.addEventListener("click", () => {
        navmenu.style.right = "0";
    });
    
    // Close mobile menu
    closeIcon.addEventListener("click", () => {
        navmenu.style.right = "-200%";
    });

    // Close menu when clicking on a link (for mobile)
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                navmenu.style.right = "-200%";
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button functionality
    const backToTopBtn = document.getElementById("backToTop");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });
    
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Product filter functionality
    const filterContainer = document.querySelector(".filter-buttons");
    const productCards = document.querySelectorAll(".products-grid .product-card");

    if (filterContainer) {
        filterContainer.addEventListener("click", (e) => {
            if (e.target.classList.contains("filter-btn")) {
                filterContainer.querySelector(".active").classList.remove("active");
                e.target.classList.add("active");

                const filterValue = e.target.getAttribute("data-filter");

                productCards.forEach(card => {
                    if (filterValue === "all" || card.dataset.category === filterValue) {
                        card.classList.remove("hide");
                    } else {
                        card.classList.add("hide");
                    }
                });
            }
        });
    }

    // Shop Now button interaction
    const shopNowBtn = document.getElementById("shopNowBtn");
    shopNowBtn.addEventListener("click", () => {
        showToast("Shopping features coming soon!");
    });

    // Cart icon interaction
    const cartIcon = document.getElementById("cartIcon");
    cartIcon.addEventListener("click", () => {
        showToast("Your cart is empty!");
    });

    // Search icon interaction
    const searchIcon = document.getElementById("searchIcon");
    searchIcon.addEventListener("click", () => {
        showToast("Search feature coming soon!");
    });

    // Newsletter form submission
    const newsletterForm = document.getElementById("newsletterForm");
    newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector("input").value;
        if (email) {
            showToast("Thanks for subscribing!");
            newsletterForm.reset();
        }
    });

    // Coffee icon interaction
    const coffeeIcon = document.querySelector('.bxs-coffee');
    if (coffeeIcon) {
        coffeeIcon.addEventListener("click", () => {
            coffeeIcon.style.transform = "scale(1.1) rotate(10deg)";
            setTimeout(() => {
                coffeeIcon.style.transform = "";
            }, 500);
        });
    }

    // Toast notification function
    function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    // Add animation to the coffee icon container
    const coffeeContainer = document.querySelector('.right > div');
    if (coffeeContainer) {
        coffeeContainer.style.animation = "float 4s ease-in-out infinite";
    }

    // Add animation to elements when they come into view
    const observerOptions = {
        threshold: 0.25
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Apply animation to footer sections
    document.querySelectorAll('.footer-section').forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "all 0.5s ease";
        observer.observe(section);
    });
});