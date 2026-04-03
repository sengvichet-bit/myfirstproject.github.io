// ============================================
// COMPUTER STORE CAMBODIA - SCRIPT.JS
// Complete e-commerce functionality
// ============================================

// ---------- PRODUCT DATA ----------
const products = [
    {
        id: 1,
        name: "MacBook Pro M5",
        category: "laptop",
        price: 1299,
        oldPrice: 1499,
        rating: 4.8,
        reviews: 234,
        image: "Image/macbook M5.avif",
        badge: "ពេញនិយម"
    },
    {
        id: 2,
        name: "Dell XPS 15",
        category: "laptop",
        price: 1099,
        oldPrice: 1299,
        rating: 4.7,
        reviews: 189,
        image: "Image/Dell XPS 15.avif",
        badge: null
    },
    {
        id: 3,
        name: "Gaming PC RTX 5090",
        category: "desktop",
        price: 2026,
        oldPrice: 2450,
        rating: 4.9,
        reviews: 156,
        image: "Image/Gaming PC RTX 5090.avif",
        badge: "Gaming"
    },
    {
        id: 4,
        name: "Logitech MX Master 3S",
        category: "accessory",
        price: 89,
        oldPrice: 109,
        rating: 4.8,
        reviews: 567,
        image: "Image/Logitech MX Master 3S.webp",
        badge: null
    },
    {
        id: 5,
        name: "Samsung 27\" Monitor 4K",
        category: "monitor",
        price: 890,
        oldPrice: 2000,
        rating: 4.6,
        reviews: 342,
        image: "Image/Samsung 27 Monitor 4k.jpg",
        badge: "ពិសេស"
    },
    {
        id: 6,
        name: "Keychron K2 Keyboard",
        category: "accessory",
        price: 79,
        oldPrice: 99,
        rating: 4.7,
        reviews: 423,
        image: "Image/Keychron K2 Keyboard.jpg",
        badge: null
    },
    {
        id: 7,
        name: "Lenovo Legion 5 Pro",
        category: "laptop",
        price: 1199,
        oldPrice: 1399,
        rating: 4.8,
        reviews: 278,
        image: "Image/Lenovo Legion 5 Pro.webp",
        badge: "Gaming"
    },
    {
        id: 8,
        name: "ASUS ROG Strix Desktop",
        category: "desktop",
        price: 1499,
        oldPrice: 1799,
        rating: 4.9,
        reviews: 198,
        image: "Image/ASUS ROG Strix Desktop.webp",
        badge: "Premium"
    },
    {
        id: 9,
        name: "LG UltraWide Monitor",
        category: "monitor",
        price: 349,
        oldPrice: 449,
        rating: 4.7,
        reviews: 267,
        image: "Image/LG UltraWide Monitor.avif",
        badge: null
    },
    {
        id: 10,
        name: "Razer DeathAdder V3",
        category: "accessory",
        price: 69,
        oldPrice: 89,
        rating: 4.8,
        reviews: 891,
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&h=200&fit=crop",
        badge: "Hot"
    },
    {
        id: 11,
        name: "HP Pavilion Desktop",
        category: "desktop",
        price: 599,
        oldPrice: 749,
        rating: 4.5,
        reviews: 134,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&h=200&fit=crop",
        badge: null
    },
    {
        id: 12,
        name: "iPad Air M1",
        category: "laptop",
        price: 549,
        oldPrice: 649,
        rating: 4.8,
        reviews: 456,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop",
        badge: "New"
    }
];

// ---------- CART STATE ----------
let cart = [];

// ---------- DOM ELEMENTS ----------
const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const toast = document.getElementById('toast');

// ---------- CURRENT FILTER & SEARCH ----------
let currentCategory = 'all';
let currentSearch = '';

// ---------- HELPER FUNCTIONS ----------
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(price);
}

// ---------- RENDER PRODUCTS ----------
function renderProducts() {
    if (!productsGrid) return;
    
    // Filter products by category and search
    let filteredProducts = products;
    
    if (currentCategory !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === currentCategory);
    }
    
    if (currentSearch.trim() !== '') {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(currentSearch.toLowerCase())
        );
    }
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3>មិនមានផលិតផល</h3>
                <p style="color: #666;">សូមស្វែងរកពាក្យផ្សេងទៀត</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => {
        // Generate star rating
        const fullStars = Math.floor(product.rating);
        const hasHalf = product.rating % 1 >= 0.5;
        let starsHtml = '';
        for (let i = 0; i < fullStars; i++) starsHtml += '<i class="fas fa-star"></i>';
        if (hasHalf) starsHtml += '<i class="fas fa-star-half-alt"></i>';
        const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) starsHtml += '<i class="far fa-star"></i>';
        
        return `
            <div class="product-card" data-id="${product.id}">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-category">
                        ${product.category === 'laptop' ? 'កុំព្យូទ័រយួរដៃ' : 
                          product.category === 'desktop' ? 'កុំព្យូទ័រតុ' :
                          product.category === 'monitor' ? 'ម៉ូនីទ័រ' : 'គ្រឿងបន្លាស់'}
                    </div>
                    <div class="product-price">
                        <span class="current-price">${formatPrice(product.price)}</span>
                        <span class="old-price">${formatPrice(product.oldPrice)}</span>
                    </div>
                    <div class="product-rating">
                        ${starsHtml}
                        <span>(${product.reviews})</span>
                    </div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> បន្ថែមក្នុងកន្ត្រក
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ---------- ADD TO CART ----------
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showToast(`បន្ថែម ${product.name} មួយទៀត`);
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
        showToast(`${product.name} បានបន្ថែមក្នុងកន្ត្រក`);
    }
    
    updateCartUI();
    updateCartCount();
    saveCartToLocal();
}

// ---------- UPDATE CART UI ----------
function updateCartUI() {
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <p>កន្ត្រកទំនិញនៅទទេ</p>
            </div>
        `;
        if (cartTotal) cartTotal.textContent = formatPrice(0);
        return;
    }
    
    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        return `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <span class="remove-item" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash-alt"></i>
                        </span>
                    </div>
                </div>
                <div style="font-weight: 600;">${formatPrice(itemTotal)}</div>
            </div>
        `;
    }).join('');
    
    if (cartTotal) cartTotal.textContent = formatPrice(total);
}

// ---------- UPDATE QUANTITY ----------
function updateQuantity(productId, delta) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;
    
    const newQuantity = cart[itemIndex].quantity + delta;
    
    if (newQuantity <= 0) {
        cart.splice(itemIndex, 1);
        showToast('បានលុបផលិតផលចេញ');
    } else {
        cart[itemIndex].quantity = newQuantity;
    }
    
    updateCartUI();
    updateCartCount();
    saveCartToLocal();
}

// ---------- REMOVE FROM CART ----------
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    updateCartCount();
    saveCartToLocal();
    showToast('បានលុបផលិតផលចេញពីកន្ត្រក');
}

// ---------- UPDATE CART COUNT ----------
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;
}

// ---------- LOCAL STORAGE ----------
function saveCartToLocal() {
    localStorage.setItem('computerStoreCart', JSON.stringify(cart));
}

function loadCartFromLocal() {
    const savedCart = localStorage.getItem('computerStoreCart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCartUI();
            updateCartCount();
        } catch(e) {
            console.error('Error loading cart:', e);
        }
    }
}

// ---------- CHECKOUT ----------
function checkout() {
    if (cart.length === 0) {
        showToast('សូមបន្ថែមផលិតផលក្នុងកន្ត្រកមុន');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`សូមអរគុណសម្រាប់ការទិញទំនិញ!\n\nសរុបទឹកប្រាក់: ${formatPrice(total)}\n\nយើងនឹងទាក់ទងអ្នកក្នុងពេលឆាប់ៗ`);
    
    // Clear cart
    cart = [];
    updateCartUI();
    updateCartCount();
    saveCartToLocal();
    closeCartDrawer();
    showToast('ការបញ្ជាទិញរបស់អ្នកបានជោគជ័យ!');
}

// ---------- CART DRAWER FUNCTIONS ----------
function openCartDrawer() {
    if (cartOverlay) cartOverlay.classList.add('open');
}

function closeCartDrawer() {
    if (cartOverlay) cartOverlay.classList.remove('open');
}

// ---------- FILTER PRODUCTS ----------
function setCategory(category) {
    currentCategory = category;
    
    // Update active button
    filterBtns.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    renderProducts();
}

// ---------- SEARCH PRODUCTS ----------
function searchProducts() {
    currentSearch = searchInput.value;
    renderProducts();
}

// ---------- SCROLL TO PRODUCTS ----------
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ---------- EVENT LISTENERS ----------
function initEventListeners() {
    // Cart icon
    if (cartIcon) cartIcon.addEventListener('click', openCartDrawer);
    
    // Close cart
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
    
    // Close cart when clicking overlay
    if (cartOverlay) {
        cartOverlay.addEventListener('click', (e) => {
            if (e.target === cartOverlay) closeCartDrawer();
        });
    }
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
    
    // Shop now button
    const shopNowBtn = document.getElementById('shopNowBtn');
    if (shopNowBtn) shopNowBtn.addEventListener('click', scrollToProducts);
    
    // Contact button
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) contactBtn.addEventListener('click', scrollToContact);
    
    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', searchProducts);
    }
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setCategory(btn.dataset.category);
        });
    });
    
    // Mobile menu toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('សាររបស់អ្នកត្រូវបានផ្ញើរួចរាល់! យើងនឹងទាក់ទងអ្នកវិញ');
            contactForm.reset();
        });
    }
}

// ---------- INITIALIZE ----------
function init() {
    renderProducts();
    loadCartFromLocal();
    initEventListeners();
}

// Make functions globally available for onclick handlers
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.checkout = checkout;
window.openCartDrawer = openCartDrawer;

// Start the app
init();