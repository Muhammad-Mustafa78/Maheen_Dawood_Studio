// ========== COLLECTION DATA ==========
const COLLECTION_IMAGES = [
  { src: 'images/basic1.jpeg', alt: 'Embroidered Silk', code: 'SILK DREAM', price: 1299 },
  { src: 'images/basic2.jpeg', alt: 'Velvet Cape', code: 'VELVET NIGHT', price: 599 },
  { src: 'images/img1.jpeg', alt: 'Floral Ensemble', code: 'FLORA', price: 749 },
  { src: 'images/luxury1.jpeg', alt: 'Day Dress', code: 'COTTON BLISS', price: 449 },
  { src: 'images/luxury3.jpeg', alt: 'Evening Gown', code: 'STARLIGHT', price: 1599 },
  { src: 'images/img6.jpeg', alt: 'Traditional', code: 'HERITAGE', price: 899 },
  { src: 'images/basic6.jpeg', alt: 'Contemporary', code: 'MODERNIST', price: 699 }
];

const LOOKBOOK_IMAGES = [
  { src: 'images/basic7.jpeg', alt: 'Look 1' },
  { src: 'images/img15.jpeg', alt: 'Look 2' },
  { src: 'images/basic8.jpeg', alt: 'Look 3' },
  { src: 'images/img12.jpeg', alt: 'Look 4' },
  { src: 'images/luxury2.jpeg', alt: 'Look 5' },
  { src: 'images/luxury8.jpeg', alt: 'Look 6' }
];

const FEATURED_PRODUCTS = [
  { id: 1, name: 'The Aurora Gown', tag: 'LIMITED EDITION', desc: 'Hand-embroidered silk with crystal details', price: 899, img: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=800&fit=crop' },
  { id: 2, name: 'Velvet Blazer', tag: 'BESTSELLER', desc: 'Premium velvet with satin lining', price: 599, img: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&h=800&fit=crop' },
  { id: 3, name: 'Silk Ensemble', tag: 'NEW ARRIVAL', desc: 'Pure silk with intricate embroidery', price: 1299, img: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&h=800&fit=crop' }
];

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
  const cartCount = document.querySelectorAll('.cart-btn, .nav-badge');
  
  if (!cartItemsContainer) return;
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
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
      background: #ffd796;
      color: #0a0a0a;
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

  document.querySelectorAll('button, a, .hover-card, .nav-link, .shop-now').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '60px';
      cursor.style.height = '60px';
      cursor.style.borderColor = '#ffd796';
      cursor.style.backgroundColor = 'rgba(255, 215, 150, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '40px';
      cursor.style.height = '40px';
      cursor.style.borderColor = 'rgba(255, 215, 150, 0.6)';
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

// ========== 1. HOVER EXPAND GALLERY ==========
function initHoverExpand() {
  const container = document.getElementById('hover-expand-container');
  if (!container) return;

  let activeIndex = 0;

  function renderCards() {
    container.innerHTML = '';
    
    COLLECTION_IMAGES.forEach((img, idx) => {
      const card = document.createElement('div');
      card.className = `hover-card ${activeIndex === idx ? 'active' : ''}`;
      card.style.width = activeIndex === idx ? '340px' : '80px';
      card.style.height = '480px';
      card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      
      card.innerHTML = `
        <img src="${img.src}" alt="${img.alt}" loading="lazy">
        <div class="hover-card-overlay"></div>
        <div class="hover-card-caption">${img.code}<br><span style="font-size:0.7rem; color:#fff;">$${img.price}</span></div>
      `;
      
      card.addEventListener('click', () => {
        activeIndex = idx;
        renderCards();
      });
      
      card.addEventListener('mouseenter', () => {
        if (activeIndex !== idx) {
          card.style.width = '180px';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        if (activeIndex !== idx) {
          card.style.width = '80px';
        }
      });
      
      container.appendChild(card);
    });
  }
  
  renderCards();
}

// ========== 2. PERSPECTIVE TEXT SCROLL ==========
function initPerspectiveScroll() {
  const container = document.getElementById('perspective-container');
  if (!container) return;
  
  container.innerHTML = `
    <div class="perspective-sticky">
      <div class="perspective-text" id="perspective-text">
        "FlairStudio represents the intersection of creativity and craftsmanship. Every piece is thoughtfully designed to celebrate individuality and timeless elegance. Our collection embodies the spirit of modern luxury with a touch of artistic expression."
      </div>
      <div class="perspective-gradient"></div>
    </div>
  `;
  
  gsap.registerPlugin(ScrollTrigger);
  
  const textElement = document.getElementById('perspective-text');
  if (!textElement) return;
  
  gsap.fromTo(textElement, 
    { rotationX: 35, y: 500, opacity: 0 },
    {
      rotationX: 0,
      y: 0,
      opacity: 1,
      duration: 2,
      scrollTrigger: {
        trigger: '#perspective-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5
      }
    }
  );
}

// ========== 3. CARD CAROUSEL ==========
let swiperInstance = null;

function initCardCarousel() {
  const container = document.getElementById('carousel-container');
  if (!container) return;
  
  container.innerHTML = `
    <div class="swiper-cards swiper-container" id="cards-swiper">
      <div class="swiper-wrapper" id="swiper-wrapper"></div>
    </div>
  `;
  
  const swiperWrapper = document.getElementById('swiper-wrapper');
  if (!swiperWrapper) return;
  
  LOOKBOOK_IMAGES.forEach((img, idx) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide swiper-slide-card';
    slide.innerHTML = `<img src="${img.src}" alt="${img.alt}" loading="lazy">`;
    swiperWrapper.appendChild(slide);
  });
  
  if (typeof Swiper !== 'undefined') {
    swiperInstance = new Swiper('#cards-swiper', {
      effect: 'cards',
      grabCursor: true,
      loop: true,
      cardsEffect: {
        slideShadows: true,
        perSlideRotate: 2,
        perSlideOffset: 8
      },
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      speed: 600
    });
  }
  
  const prevBtn = document.getElementById('prev-slide');
  const nextBtn = document.getElementById('next-slide');
  
  if (prevBtn && swiperInstance) {
    prevBtn.addEventListener('click', () => swiperInstance.slidePrev());
  }
  if (nextBtn && swiperInstance) {
    nextBtn.addEventListener('click', () => swiperInstance.slideNext());
  }
}

// ========== FEATURED PRODUCTS ==========
function initFeaturedProducts() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  FEATURED_PRODUCTS.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'featured-card';
    card.setAttribute('data-aos', 'flip-left');
    card.setAttribute('data-aos-delay', index * 100);
    
    card.innerHTML = `
      <div class="featured-image" style="background-image: url('${product.img}')"></div>
      <div class="featured-info">
        <span class="featured-tag">${product.tag}</span>
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <div class="price">$${product.price}</div>
        <button class="shop-now" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-img="${product.img}">SHOP NOW →</button>
      </div>
    `;
    
    grid.appendChild(card);
  });
  
  // Add event listeners to shop buttons
  document.querySelectorAll('.shop-now').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const product = {
        id: parseInt(btn.dataset.id),
        name: btn.dataset.name,
        price: parseInt(btn.dataset.price),
        img: btn.dataset.img
      };
      addToCart(product);
    });
  });
}

// ========== STATS COUNTER ANIMATION ==========
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current);
          }
        }, 30);
        observer.unobserve(el);
      }
    });
  }, observerOptions);
  
  statNumbers.forEach(el => observer.observe(el));
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

// ========== PARALLAX EFFECT ==========
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallax = document.querySelector('.parallax-banner');
    if (parallax) {
      parallax.style.backgroundPositionY = scrolled * 0.3 + 'px';
    }
  });
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
  document.querySelectorAll('.explore-btn, .lookbook-btn, .preorder-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Explore our full collection at our flagship store!');
    });
  });
  
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
}

// ========== SMOOTH SCROLL FOR ALL ANCHORS ==========
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          if (window.innerWidth <= 1024) {
            document.querySelector('.nav-links')?.classList.remove('show');
          }
        }
      }
    });
  });
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
  initHoverExpand();
  initPerspectiveScroll();
  initCardCarousel();
  initFeaturedProducts();
  initStatsCounter();
  initAOS();
  initParallax();
  initNewsletter();
  initButtons();
  initSmoothScroll();
  initMobileMenu();
  initResizeHandler();
  updateCartUI();
});