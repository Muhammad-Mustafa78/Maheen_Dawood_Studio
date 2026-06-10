// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initProgressIndicator();
  initScrollLineAnimation();
  initTextRollNavigation();
  initCounterAnimation();
  initBackToTop();
  buildAnnounceTicker();
  updateCartBadges();
  setupEventListeners();
  initSmoothScroll();
});

// ==================== CUSTOM CURSOR ====================
function initCursor() {
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  
  if (!cursor) return;
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    setTimeout(() => {
      if (cursorRing) {
        cursorRing.style.left = e.clientX + 'px';
        cursorRing.style.top = e.clientY + 'px';
      }
    }, 55);
  });
  
  const interactiveElements = document.querySelectorAll('button, a, .stat-card, .team-card, .craft-card, .value-card, .text-roll-item');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '14px';
      cursor.style.height = '14px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '8px';
      cursor.style.height = '8px';
    });
  });
}

// ==================== PROGRESS INDICATOR (Skiper89 style) ====================
function initProgressIndicator() {
  const progressFill = document.getElementById('progressFill');
  const progressPercent = document.getElementById('progressPercent');
  
  if (!progressFill) return;
  
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  
  function updateProgress() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
    const percent = Math.round(progress * 100);
    
    // Update circle stroke
    const dashoffset = circumference * (1 - progress);
    progressFill.style.strokeDasharray = `${circumference}`;
    progressFill.style.strokeDashoffset = dashoffset;
    
    // Update percent text
    if (progressPercent) {
      progressPercent.textContent = `${percent}%`;
    }
  }
  
  window.addEventListener('scroll', updateProgress);
  window.addEventListener('resize', updateProgress);
  updateProgress();
}

// ==================== SCROLL LINE ANIMATION (Skiper19 style) ====================
function initScrollLineAnimation() {
  const linePath = document.querySelector('.scroll-line-path');
  if (!linePath) return;
  
  const container = document.querySelector('.scroll-progress-container');
  if (!container) return;
  
  const pathLength = linePath.getTotalLength();
  linePath.style.strokeDasharray = pathLength;
  linePath.style.strokeDashoffset = pathLength;
  
  function updateLine() {
    const containerTop = container.offsetTop;
    const containerHeight = container.offsetHeight;
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    let progress = (scrollY - containerTop) / (containerHeight - windowHeight);
    progress = Math.max(0, Math.min(1, progress));
    
    const drawLength = pathLength * progress;
    linePath.style.strokeDashoffset = pathLength - drawLength;
  }
  
  window.addEventListener('scroll', updateLine);
  window.addEventListener('resize', updateLine);
  updateLine();
}

// ==================== TEXT ROLL NAVIGATION (Skiper58 style) ====================
function initTextRollNavigation() {
  const textRollItems = document.querySelectorAll('.text-roll-item');
  
  textRollItems.forEach(item => {
    // Add hover animation
    const textRoll = item.querySelector('.text-roll');
    if (textRoll) {
      textRoll.addEventListener('mouseenter', () => {
        const topSpan = textRoll.querySelector('.text-roll-top');
        const bottomSpan = textRoll.querySelector('.text-roll-bottom');
        if (topSpan && bottomSpan) {
          topSpan.style.transform = 'translateY(-100%)';
          bottomSpan.style.transform = 'translateY(0)';
        }
      });
      
      textRoll.addEventListener('mouseleave', () => {
        const topSpan = textRoll.querySelector('.text-roll-top');
        const bottomSpan = textRoll.querySelector('.text-roll-bottom');
        if (topSpan && bottomSpan) {
          topSpan.style.transform = 'translateY(0)';
          bottomSpan.style.transform = 'translateY(100%)';
        }
      });
    }
    
    // Click to scroll to section
    item.addEventListener('click', () => {
      const href = item.getAttribute('data-href');
      if (href) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// ==================== COUNTER ANIMATION ====================
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = target.toLocaleString();
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current).toLocaleString();
          }
        }, 20);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// ==================== BACK TO TOP BUTTON ====================
function initBackToTop() {
  const backTop = document.getElementById('backTop');
  if (!backTop) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backTop.classList.add('show');
    } else {
      backTop.classList.remove('show');
    }
  });
  
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==================== ANNOUNCEMENT TICKER ====================
function buildAnnounceTicker() {
  const track = document.getElementById('announceTicker');
  if (!track) return;
  
  const items = [
    '✨ The Eid Duo \'26 Is Now Live · Shipping Worldwide 🌏',
    '✨ Free Shipping on orders over Rs. 10,000',
    '✨ New Meraki Basics \'26 Just Dropped',
    '✨ Easy Returns · Hassle-Free Policy'
  ];
  
  track.innerHTML = '';
  [...items, ...items].forEach(t => {
    const span = document.createElement('span');
    span.innerHTML = t + ' <span class="announce-dot">✦</span> ';
    track.appendChild(span);
  });
}

// ==================== CART FUNCTIONS ====================
let cart = [];
let wishlist = [];

function loadCart() {
  const savedCart = localStorage.getItem('flairs_cart');
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
    } catch(e) {
      cart = [];
    }
  }
  
  const savedWishlist = localStorage.getItem('flairs_wishlist');
  if (savedWishlist) {
    try {
      wishlist = JSON.parse(savedWishlist);
    } catch(e) {
      wishlist = [];
    }
  }
  
  updateCartBadges();
}

function updateCartBadges() {
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  document.querySelectorAll('#cartBadge, #cartCount').forEach(el => {
    if (el) el.textContent = totalItems;
  });
  
  const wishlistCount = wishlist.length;
  document.querySelectorAll('#wishBadge, #wishCount').forEach(el => {
    if (el) el.textContent = wishlistCount;
  });
}

function saveCart() {
  localStorage.setItem('flairs_cart', JSON.stringify(cart));
  updateCartBadges();
  renderCartDrawer();
}

function saveWishlist() {
  localStorage.setItem('flairs_wishlist', JSON.stringify(wishlist));
  updateCartBadges();
  renderWishlistDrawer();
}

function renderCartDrawer() {
  const container = document.getElementById('cartItems');
  const emptyEl = document.getElementById('cartEmpty');
  const footerEl = document.getElementById('cartFooter');
  const totalEl = document.getElementById('cartTotal');
  
  if (!container) return;
  
  if (cart.length === 0) {
    container.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
    if (footerEl) footerEl.style.display = 'none';
    return;
  }
  
  if (emptyEl) emptyEl.style.display = 'none';
  if (footerEl) footerEl.style.display = 'block';
  
  let subtotal = 0;
  let cartHTML = '';
  
  cart.forEach((item, index) => {
    const itemPrice = typeof item.price === 'number' ? item.price : 0;
    const itemTotal = itemPrice * (item.quantity || 1);
    subtotal += itemTotal;
    
    cartHTML += `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.img || ''}" alt="${escapeHtml(item.name || 'Product')}">
        <div class="cart-item-info">
          <div class="cart-item-name">${escapeHtml(item.name || 'Product')}</div>
          <div class="cart-item-price">${item.priceDisplay || `Rs. ${itemPrice.toLocaleString()}`}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateQuantity(${index}, -1)">−</button>
            <span>${item.quantity || 1}</span>
            <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
            <button class="cart-remove" onclick="removeFromCart(${index})">Remove</button>
          </div>
          <div style="font-size:0.65rem;color:#888;margin-top:0.3rem">Size: ${item.size || 'M'}</div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = cartHTML;
  if (totalEl) totalEl.textContent = `Rs. ${subtotal.toLocaleString()}`;
}

function renderWishlistDrawer() {
  const container = document.getElementById('wishItems');
  const emptyEl = document.querySelector('#wishBody .cart-empty');
  
  if (!container) return;
  
  if (wishlist.length === 0) {
    container.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
    return;
  }
  
  if (emptyEl) emptyEl.style.display = 'none';
  
  let wishHTML = '';
  wishlist.forEach((item, index) => {
    wishHTML += `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.img || ''}" alt="${escapeHtml(item.name || 'Product')}">
        <div class="cart-item-info">
          <div class="cart-item-name">${escapeHtml(item.name || 'Product')}</div>
          <div class="cart-item-price">${item.priceDisplay || item.price || 'Rs. 0'}</div>
          <button class="cart-remove" onclick="moveToCartFromWishlist(${index})">Move to Cart</button>
        </div>
      </div>
    `;
  });
  container.innerHTML = wishHTML;
}

function updateQuantity(index, delta) {
  if (!cart[index]) return;
  
  const currentQty = cart[index].quantity || 1;
  const newQty = currentQty + delta;
  
  if (newQty <= 0) {
    cart.splice(index, 1);
  } else {
    cart[index].quantity = newQty;
  }
  
  saveCart();
  renderCartDrawer();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCartDrawer();
  
  if (cart.length === 0) closeCart();
}

function moveToCartFromWishlist(index) {
  const item = wishlist[index];
  if (item) {
    cart.push({
      id: item.id || Date.now(),
      name: item.name,
      price: typeof item.price === 'number' ? item.price : 0,
      priceDisplay: item.priceDisplay || item.price,
      img: item.img,
      quantity: 1,
      size: 'M'
    });
    saveCart();
    
    wishlist.splice(index, 1);
    saveWishlist();
    renderWishlistDrawer();
    
    showToast(`${item.name} moved to cart`, '✓');
    openCart();
  }
}

// ==================== UI FUNCTIONS ====================
function openCart() {
  renderCartDrawer();
  document.getElementById('cartOverlay')?.classList.add('open');
  document.getElementById('cartDrawer')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.body.style.overflow = '';
}

function openWishlist() {
  renderWishlistDrawer();
  document.getElementById('cartOverlay')?.classList.add('open');
  document.getElementById('wishlistDrawer')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeWishlist() {
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.getElementById('wishlistDrawer')?.classList.remove('open');
  document.body.style.overflow = '';
}

function openSearch() {
  document.getElementById('searchOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('searchInput')?.focus(), 200);
}

function closeSearch() {
  document.getElementById('searchOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function runSearch() {
  const query = document.getElementById('searchInput')?.value;
  if (query && query.trim()) {
    closeSearch();
    showToast(`Searching for "${query}"...`, '🔍');
  }
}

function openMobileMenu() {
  document.getElementById('mobileMenu')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  document.getElementById('mobileMenu')?.classList.remove('open');
  document.body.style.overflow = '';
}

function handleSubscribe() {
  const email = document.getElementById('emailInput')?.value;
  if (!email || !email.includes('@')) {
    showToast('Please enter a valid email', '⚠');
    return;
  }
  document.getElementById('emailInput').value = '';
  showToast('Subscribed! Welcome to Flairs Studio ✦', '✦');
}

// ==================== TOAST NOTIFICATION ====================
let toastTimer;

function showToast(message, icon = '✓') {
  clearTimeout(toastTimer);
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  const toastIcon = toast?.querySelector('.toast-icon');
  
  if (toastMsg) toastMsg.textContent = message;
  if (toastIcon) toastIcon.textContent = icon;
  if (toast) toast.classList.add('show');
  
  toastTimer = setTimeout(() => {
    if (toast) toast.classList.remove('show');
  }, 2500);
}

// ==================== HELPER FUNCTIONS ====================
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

function setupEventListeners() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
      closeCart();
      closeWishlist();
      closeMobileMenu();
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });
  
  const overlay = document.getElementById('cartOverlay');
  if (overlay) {
    overlay.addEventListener('click', () => {
      closeCart();
      closeWishlist();
    });
  }
  
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') runSearch();
    });
  }
  
  const emailInput = document.getElementById('emailInput');
  if (emailInput) {
    emailInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSubscribe();
    });
  }
}

// Load cart on page load
loadCart();