document.addEventListener("DOMContentLoaded", () => {
  // Navigation menu functionality
  const openIcon = document.getElementById("openIcon");
  const closeIcon = document.getElementById("closeIcon");
  const navmenu = document.getElementById("navmenu");
  const navLinks = document.querySelectorAll("#navmenu li a");

  // Open mobile menu
  openIcon.addEventListener("click", () => {
    navmenu.classList.add("active");
  });

  // Close mobile menu
  closeIcon.addEventListener("click", () => {
    navmenu.classList.remove("active");
  });

  // Close menu when clicking on a link (for mobile)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navmenu.classList.remove("active");
      }
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });

  // Back to top button functionality
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
      nav.classList.add("scrolled");
    } else {
      backToTopBtn.classList.remove("show");
      nav.classList.remove("scrolled");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Search functionality
  const searchIcon = document.getElementById("searchIcon");
  const searchContainer = document.getElementById("searchContainer");
  const searchInput = document.getElementById("searchInput");

  searchIcon.addEventListener("click", () => {
    searchContainer.classList.toggle("active");
    if (searchContainer.classList.contains("active")) {
      searchInput.focus();
    }
  });

  // Close search when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchContainer.contains(e.target) && e.target !== searchIcon) {
      searchContainer.classList.remove("active");
    }
  });

  // Search functionality
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card) => {
      const productName = card.querySelector("h3").textContent.toLowerCase();
      const productDesc = card.querySelector("p").textContent.toLowerCase();

      if (
        productName.includes(searchTerm) ||
        productDesc.includes(searchTerm)
      ) {
        card.style.display = "flex";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        }, 50);
      } else {
        card.style.opacity = "0";
        card.style.transform = "scale(0.9)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  });

  // Product data
  const products = [
    {
      id: 1,
      name: "Espresso",
      category: "espresso",
      description:
        "Strong, rich, and concentrated — the heart of Italian coffee culture.",
      price: 120,
      image: "images/Espresso.png",
    },
    {
      id: 2,
      name: "Americano",
      category: "espresso",
      description:
        "A smooth blend of espresso and hot water for a mellow, rich taste.",
      price: 140,
      image: "images/Americano.jpeg",
    },
    {
      id: 3,
      name: "Cappuccino",
      category: "espresso",
      description:
        "Perfect balance of espresso, steamed milk, and frothy foam.",
      price: 160,
      image: "images/Cappuccino.jpeg",
    },
    {
      id: 4,
      name: "Latte",
      category: "espresso",
      description:
        "Velvety espresso with a generous layer of creamy steamed milk.",
      price: 170,
      image: "images/Latte.jpeg",
    },
    {
      id: 5,
      name: "Macchiato",
      category: "espresso",
      description:
        "Espresso 'stained' with milk foam bold with a hint of smoothness.",
      price: 150,
      image: "images/Macchiato.jpeg",
    },
    {
      id: 6,
      name: "Flat White",
      category: "espresso",
      description:
        "Espresso with silky microfoam smooth and strong in every sip.",
      price: 180,
      image: "images/Flat.jpeg",
    },
    {
      id: 7,
      name: "Cold Brew",
      category: "cold",
      description:
        "Brewed slowly in cold water for a smooth, less acidic experience.",
      price: 190,
      image: "images/Cold.jpeg",
    },
    {
      id: 8,
      name: "Mocha",
      category: "espresso",
      description:
        "Espresso meets chocolate and milk for a sweet, indulgent treat.",
      price: 200,
      image: "images/Mocha.jpeg",
    },
    {
      id: 9,
      name: "Affogato",
      category: "specialty",
      description:
        "Vanilla ice cream drowned in hot espresso — dessert meets coffee.",
      price: 220,
      image: "images/Affogato.jpeg",
    },
    {
      id: 10,
      name: "Cortado",
      category: "espresso",
      description: "Equal parts espresso and warm milk — bold yet balanced.",
      price: 160,
      image: "images/Cortado.jpeg",
    },
    {
      id: 11,
      name: "Irish Coffee",
      category: "specialty",
      description:
        "A bold mix of coffee, whiskey, and cream for a warming twist.",
      price: 250,
      image: "images/Irish.jpeg",
    },
    {
      id: 12,
      name: "Ristretto",
      category: "espresso",
      description:
        "A short shot of espresso with a richer and more intense flavor.",
      price: 130,
      image: "images/Ristretto.jpeg",
    },
    {
      id: 13,
      name: "Nitro Coffee",
      category: "cold",
      description:
        "Cold brew infused with nitrogen for a creamy, fizzy texture.",
      price: 210,
      image: "images/Nitro.jpeg",
    },
    {
      id: 14,
      name: "Breve",
      category: "espresso",
      description:
        "Espresso with steamed half-and-half — rich, velvety, and creamy.",
      price: 180,
      image: "images/Breve.jpeg",
    },
    {
      id: 15,
      name: "Doppio",
      category: "espresso",
      description:
        "A double shot of espresso for double the strength and flavor.",
      price: 140,
      image: "images/Doppio.jpeg",
    },
    {
      id: 16,
      name: "Turkish Coffee",
      category: "specialty",
      description:
        "Finely ground coffee simmered unfiltered — rich, thick, and aromatic.",
      price: 230,
      image: "images/Turkish.jpeg",
    },
  ];

  // Generate product cards
  const productsGrid = document.querySelector(".products-grid");

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.dataset.category = product.category;
    productCard.dataset.id = product.id;

    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <button class="btn view-details-btn">View Details</button>
        `;

    productsGrid.appendChild(productCard);
  });

  // Product filter functionality
  const filterContainer = document.querySelector(".filter-buttons");
  const productCards = document.querySelectorAll(
    ".products-grid .product-card"
  );

  if (filterContainer) {
    filterContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("filter-btn")) {
        filterContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");

        const filterValue = e.target.getAttribute("data-filter");

        productCards.forEach((card) => {
          if (filterValue === "all" || card.dataset.category === filterValue) {
            card.style.display = "flex";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "scale(1)";
            }, 50);
          } else {
            card.style.opacity = "0";
            card.style.transform = "scale(0.9)";
            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        });
      }
    });
  }

  // Product modal functionality
  const productModal = document.getElementById("productModal");
  const closeModal = document.querySelector(".close-modal");
  const modalProductImage = document.getElementById("modalProductImage");
  const modalProductName = document.getElementById("modalProductName");
  const modalProductCategory = document.getElementById("modalProductCategory");
  const modalProductDescription = document.getElementById(
    "modalProductDescription"
  );
  const modalProductPrice = document.getElementById("modalProductPrice");
  const quantityInput = document.querySelector(".quantity-input");
  const minusBtn = document.querySelector(".quantity-btn.minus");
  const plusBtn = document.querySelector(".quantity-btn.plus");
  const addToCartBtn = document.querySelector(".add-to-cart-btn");

  let currentProduct = null;

  // View details button click
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-details-btn")) {
      const productCard = e.target.closest(".product-card");
      const productId = parseInt(productCard.dataset.id);
      currentProduct = products.find((p) => p.id === productId);

      if (currentProduct) {
        modalProductImage.src = currentProduct.image;
        modalProductImage.alt = currentProduct.name;
        modalProductName.textContent = currentProduct.name;
        modalProductCategory.textContent =
          currentProduct.category.charAt(0).toUpperCase() +
          currentProduct.category.slice(1);
        modalProductDescription.textContent = currentProduct.description;
        modalProductPrice.textContent = currentProduct.price;
        quantityInput.value = 1;

        productModal.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    }
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    productModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === productModal) {
      productModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Quantity controls
  minusBtn.addEventListener("click", () => {
    if (quantityInput.value > 1) {
      quantityInput.value--;
    }
  });

  plusBtn.addEventListener("click", () => {
    quantityInput.value++;
  });

  // Shopping cart functionality
  const cartIcon = document.getElementById("cartIcon");
  const cartSidebar = document.getElementById("cartSidebar");
  const closeCart = document.querySelector(".close-cart");
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.querySelector(".cart-count");
  const checkoutBtn = document.querySelector(".checkout-btn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Open/close cart
  cartIcon.addEventListener("click", () => {
    cartSidebar.classList.toggle("open");
  });

  closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("open");
  });

  // Update cart display
  function updateCartDisplay() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
                <div class="empty-cart-message">
                    <i class='bx bx-coffee-togo'></i>
                    <p>Your cart is empty</p>
                    <p>Add some delicious coffee to get started!</p>
                </div>
            `;
      cartTotal.textContent = "₹0.00";
      cartCount.textContent = "0";
    } else {
      let total = 0;
      let itemCount = 0;

      cart.forEach((item) => {
        const product = products.find((p) => p.id === item.id);
        if (product) {
          const itemTotal = product.price * item.quantity;
          total += itemTotal;
          itemCount += item.quantity;

          const cartItem = document.createElement("div");
          cartItem.className = "cart-item";
          cartItem.dataset.id = item.id;

          cartItem.innerHTML = `
                        <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h4 class="cart-item-name">${product.name}</h4>
                            <p class="cart-item-price">₹${product.price} x ${item.quantity}</p>
                            <div class="cart-item-quantity">
                                <button class="decrease-quantity">-</button>
                                <input type="number" value="${item.quantity}" min="1" class="item-quantity">
                                <button class="increase-quantity">+</button>
                            </div>
                            <span class="remove-item">Remove</span>
                        </div>
                    `;

          cartItemsContainer.appendChild(cartItem);
        }
      });

      cartTotal.textContent = `₹${total.toFixed(2)}`;
      cartCount.textContent = itemCount;
    }
  }

  // Add to cart
  addToCartBtn.addEventListener("click", () => {
    if (currentProduct) {
      const quantity = parseInt(quantityInput.value);
      const existingItem = cart.find((item) => item.id === currentProduct.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({
          id: currentProduct.id,
          quantity: quantity,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay();
      showToast(`${quantity} ${currentProduct.name} added to cart!`);
      productModal.style.display = "none";
      document.body.style.overflow = "auto";
      cartSidebar.classList.add("open");
    }
  });

  // Cart item controls
  cartItemsContainer.addEventListener("click", (e) => {
    const cartItem = e.target.closest(".cart-item");
    if (!cartItem) return;

    const productId = parseInt(cartItem.dataset.id);
    const quantityInput = cartItem.querySelector(".item-quantity");

    if (e.target.classList.contains("decrease-quantity")) {
      if (quantityInput.value > 1) {
        quantityInput.value--;
        updateCartItem(productId, parseInt(quantityInput.value));
      }
    } else if (e.target.classList.contains("increase-quantity")) {
      quantityInput.value++;
      updateCartItem(productId, parseInt(quantityInput.value));
    } else if (e.target.classList.contains("remove-item")) {
      removeCartItem(productId);
    }
  });

  // Update cart item quantity
  function updateCartItem(productId, quantity) {
    const item = cart.find((item) => item.id === productId);
    if (item) {
      item.quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay();
    }
  }

  // Remove cart item
  function removeCartItem(productId) {
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
    showToast("Item removed from cart");
  }

  // Checkout button
  checkoutBtn.addEventListener("click", () => {
    if (cart.length > 0) {
      showToast("Proceeding to checkout!");
      // In a real implementation, this would redirect to a checkout page
    } else {
      showToast("Your cart is empty!");
    }
  });

  // Initialize cart display
  updateCartDisplay();

  // Shop Now button interaction
  const shopNowBtn = document.getElementById("shopNowBtn");
  shopNowBtn.addEventListener("click", () => {
    window.scrollTo({
      top: document.getElementById("products").offsetTop - 70,
      behavior: "smooth",
    });
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

  // Toast notification function
  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  // Add animation to elements when they come into view
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Apply animation to sections
  document
    .querySelectorAll(
      ".about-section, .products-section, .testimonials-section"
    )
    .forEach((section) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(30px)";
      section.style.transition = "all 0.6s ease";
      observer.observe(section);
    });

  // Apply animation to product cards
  document.querySelectorAll(".product-card").forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Apply animation to testimonial cards
  document.querySelectorAll(".testimonial-card").forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
  });
});
