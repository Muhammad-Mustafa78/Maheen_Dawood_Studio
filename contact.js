// ========== CART SYSTEM ==========
let cart = JSON.parse(localStorage.getItem('flairStudioCart')) || [];

function saveCart() {
  localStorage.setItem('flairStudioCart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(product, size = 'M') {
  const existingItem = cart.find(item => item.id === product.id && item.size === size);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      size: size,
      quantity: 1
    });
  }
  saveCart();
  showToast(`${product.name} added to cart!`);
  openCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  if (cart.length === 0) closeCart();
}

function updateQuantity(index, delta) {
  const item = cart[index];
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(index);
    } else {
      saveCart();
    }
  }
}

function updateCartUI() {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotalSpan = document.getElementById('cartTotal');
  
  if (!cartItemsContainer) return;
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
    if (cartTotalSpan) cartTotalSpan.textContent = '$0';
    return;
  }
  
  let cartHTML = '';
  let subtotal = 0;
  
  cart.forEach((item, idx) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    cartHTML += `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.img}" alt="${item.name}">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateQuantity(${idx}, -1)">−</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity(${idx}, 1)">+</button>
            <button class="remove-btn" onclick="removeFromCart(${idx})">Remove</button>
          </div>
          <div style="font-size: 0.7rem; color: #888;">Size: ${item.size}</div>
        </div>
      </div>
    `;
  });
  
  cartItemsContainer.innerHTML = cartHTML;
  if (cartTotalSpan) cartTotalSpan.textContent = `$${subtotal}`;
}

function openCart() {
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  if (overlay && drawer) {
    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCart() {
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  if (overlay && drawer) {
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function showToast(message) {
  let toast = document.querySelector('.custom-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #d4af37;
      color: #ffffff;
      padding: 0.8rem 1.5rem;
      border-radius: 40px;
      z-index: 10000;
      font-size: 0.8rem;
      font-weight: 600;
      transition: transform 0.3s;
      white-space: nowrap;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.transform = 'translateX(-50%) translateY(0)';
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
  }, 2500);
}

// ========== PRELOADER ==========
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    let progress = 0;
    const progressBar = document.querySelector('.preloader-progress');
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('hide');
        }, 500);
      }
      if (progressBar) progressBar.style.width = progress + '%';
    }, 100);
  }
  updateCartUI();
});

// ========== CUSTOM CURSOR ==========
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');

if (cursor && cursorDot) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  document.querySelectorAll('button, a, .info-card, .social-card, .faq-question').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '60px';
      cursor.style.height = '60px';
      cursor.style.borderColor = '#d4af37';
      cursor.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '40px';
      cursor.style.height = '40px';
      cursor.style.borderColor = 'rgba(212, 175, 55, 0.6)';
      cursor.style.backgroundColor = 'transparent';
    });
  });
}

// ========== NAVIGATION SCROLL EFFECT ==========
const nav = document.querySelector('.main-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ========== BACK TO TOP BUTTON ==========
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========== FAQ ACCORDION ==========
function initFaq() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active', !isActive);
    });
  });
}

// ========== CONTACT FORM ==========
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      if (!name || !email || !message) {
        feedback.innerHTML = 'Please fill in all required fields.';
        feedback.style.color = '#e74c3c';
        return;
      }
      
      feedback.innerHTML = 'Thank you! Your message has been sent. We\'ll get back to you soon.';
      feedback.style.color = '#d4af37';
      form.reset();
      
      setTimeout(() => {
        feedback.innerHTML = '';
      }, 5000);
    });
  }
}

// ========== NEWSLETTER FORM ==========
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input').value;
      showToast(`Thanks for subscribing! You'll receive updates from FlairStudio.`);
      form.reset();
    });
  }
}

// ========== BUTTON ACTIONS ==========
function initButtons() {
  // Cart button
  const cartBtn = document.querySelector('.cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', openCart);
  }
  
  // Cart close
  const cartClose = document.querySelector('.cart-close');
  if (cartClose) {
    cartClose.addEventListener('click', closeCart);
  }
  
  const cartOverlay = document.getElementById('cartOverlay');
  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
  }
  
  // Search button
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      showToast('Search feature coming soon!');
    });
  }
  
  // Checkout button
  const checkoutBtn = document.querySelector('.checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      showToast('Proceeding to checkout!');
    });
  }
}

// ========== SCROLL REVEAL ANIMATIONS (AOS) ==========
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
      easing: 'ease-out'
    });
  }
}

// ========== MOBILE MENU TOGGLE ==========
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }
}

// ========== RESIZE HANDLER ==========
function initResizeHandler() {
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      document.querySelector('.nav-links')?.classList.remove('show');
    }
  });
}

// ========== INITIALIZE EVERYTHING ==========
document.addEventListener('DOMContentLoaded', () => {
  initFaq();
  initContactForm();
  initNewsletter();
  initButtons();
  initAOS();
  initMobileMenu();
  initResizeHandler();
  updateCartUI();
});