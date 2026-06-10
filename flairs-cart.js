// flairs-cart.js - Shared cart for ALL pages
// Include this file on EVERY page BEFORE other JS files

const FlairsCart = {
  KEY: 'flairs_cart',
  WISH_KEY: 'flairs_wishlist',

  // Get cart items
  getCart() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) || '[]');
    } catch {
      return [];
    }
  },

  // Save cart
  saveCart(items) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.updateBadges();
    return items;
  },

  // Get wishlist
  getWishlist() {
    try {
      return JSON.parse(localStorage.getItem(this.WISH_KEY) || '[]');
    } catch {
      return [];
    }
  },

  // Save wishlist
  saveWishlist(items) {
    localStorage.setItem(this.WISH_KEY, JSON.stringify(items));
    this.updateBadges();
    return items;
  },

  // Add to cart
  addToCart(product, size = 'M', addon = 0, quantity = 1) {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(
      item => item.id === product.id && item.size === size && item.addon === addon
    );

    const priceNum = this.extractPrice(product);
    const totalPrice = priceNum + addon;

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: totalPrice,
        priceDisplay: `Rs. ${totalPrice.toLocaleString()}`,
        originalPriceDisplay: product.originalPriceDisplay || null,
        img: product.img,
        category: product.category || product.collection || 'Flairs Studio',
        size: size,
        addon: addon,
        quantity: quantity,
        slug: product.slug || product.name.toLowerCase().replace(/\s+/g, '-')
      });
    }

    this.saveCart(cart);
    this.showToast(`${product.name} added to cart`, '✓');
    return cart;
  },

  // Remove from cart
  removeFromCart(id, size, addon) {
    let cart = this.getCart();
    cart = cart.filter(item => !(item.id === id && item.size === size && item.addon === addon));
    this.saveCart(cart);
    if (cart.length === 0) this.closeCart();
    return cart;
  },

  // Update quantity
  updateQuantity(id, size, addon, delta) {
    const cart = this.getCart();
    const itemIndex = cart.findIndex(item => item.id === id && item.size === size && item.addon === addon);
    
    if (itemIndex !== -1) {
      cart[itemIndex].quantity += delta;
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }
      this.saveCart(cart);
    }
    return cart;
  },

  // Clear cart
  clearCart() {
    localStorage.removeItem(this.KEY);
    this.updateBadges();
    return [];
  },

  // Get cart count
  cartCount() {
    return this.getCart().reduce((sum, item) => sum + item.quantity, 0);
  },

  // Get subtotal
  subtotal() {
    return this.getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  // Wishlist functions
  addToWishlist(product) {
    let wishlist = this.getWishlist();
    const exists = wishlist.find(item => item.id === product.id);
    
    if (!exists) {
      wishlist.push({
        id: product.id,
        name: product.name,
        price: product.priceDisplay || `Rs. ${product.price?.toLocaleString()}`,
        img: product.img,
        category: product.category || product.collection
      });
      this.saveWishlist(wishlist);
      this.showToast(`${product.name} added to wishlist`, '♡');
      return true;
    } else {
      this.showToast(`${product.name} already in wishlist`, '♡');
      return false;
    }
  },

  removeFromWishlist(id) {
    let wishlist = this.getWishlist();
    wishlist = wishlist.filter(item => item.id !== id);
    this.saveWishlist(wishlist);
    this.showToast(`Removed from wishlist`, '♡');
    return wishlist;
  },

  isInWishlist(id) {
    return this.getWishlist().some(item => item.id === id);
  },

  wishlistCount() {
    return this.getWishlist().length;
  },

  // Helper to extract numeric price
  extractPrice(product) {
    if (typeof product.price === 'number') return product.price;
    if (product.priceMin) return product.priceMin;
    if (product.priceDisplay) {
      const match = product.priceDisplay.match(/(\d{1,3}(?:,\d{3})*)/);
      if (match) return parseInt(match[0].replace(/,/g, ''));
    }
    return 0;
  },

  // UI: Update cart badge on all pages
  updateBadges() {
    const count = this.cartCount();
    const wishCount = this.wishlistCount();
    
    document.querySelectorAll('#cartBadge, #cartCount').forEach(el => {
      if (el) el.textContent = count;
    });
    document.querySelectorAll('#wishBadge, #wishCount').forEach(el => {
      if (el) el.textContent = wishCount;
    });
  },

  // UI: Render cart drawer
  renderCartDrawer() {
    const cart = this.getCart();
    const container = document.getElementById('cartItems');
    const emptyEl = document.querySelector('.cart-empty');
    const footerEl = document.getElementById('cartFooter');
    const totalEl = document.getElementById('cartTotal');

    this.updateBadges();

    if (!container) return;

    if (cart.length === 0) {
      if (container) container.innerHTML = '';
      if (emptyEl) emptyEl.style.display = 'block';
      if (footerEl) footerEl.style.display = 'none';
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';
    if (footerEl) footerEl.style.display = 'block';

    let subtotal = 0;
    let cartHTML = '';

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      
      cartHTML += `
        <div class="cart-item" data-cart-index="${index}">
          <img class="cart-item-img" src="${item.img}" alt="${item.name}">
          <div class="cart-item-info">
            <div class="cart-item-name">${this.escapeHtml(item.name)}</div>
            <div class="cart-item-price">${item.priceDisplay}</div>
            <div class="cart-item-qty">
              <button class="qty-btn" onclick="FlairsCart.updateQuantityHandler(${item.id}, '${item.size}', ${item.addon}, -1)">−</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" onclick="FlairsCart.updateQuantityHandler(${item.id}, '${item.size}', ${item.addon}, 1)">+</button>
              <button class="cart-remove" onclick="FlairsCart.removeFromCartHandler(${item.id}, '${item.size}', ${item.addon})">Remove</button>
            </div>
            <div style="font-size:0.65rem;color:#888;margin-top:0.3rem">
              Size: ${item.size}
              ${item.addon ? ` &nbsp;|&nbsp; + Dupatta: Rs.${item.addon.toLocaleString()}` : ''}
              ${item.category ? ` &nbsp;|&nbsp; ${item.category}` : ''}
            </div>
          </div>
          <div class="cart-item-price-total">${this.formatPrice(itemTotal)}</div>
        </div>
      `;
    });

    if (container) container.innerHTML = cartHTML;
    if (totalEl) totalEl.textContent = this.formatPrice(subtotal);
  },

  // Wrapper handlers for onclick
  updateQuantityHandler(id, size, addon, delta) {
    this.updateQuantity(id, size, addon, delta);
    this.renderCartDrawer();
  },

  removeFromCartHandler(id, size, addon) {
    this.removeFromCart(id, size, addon);
    this.renderCartDrawer();
    if (this.cartCount() === 0) this.closeCart();
  },

  // UI: Open cart drawer
  openCart() {
    this.renderCartDrawer();
    const overlay = document.getElementById('cartOverlay');
    const drawer = document.getElementById('cartDrawer');
    if (overlay) overlay.classList.add('open');
    if (drawer) drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeCart() {
    const overlay = document.getElementById('cartOverlay');
    const drawer = document.getElementById('cartDrawer');
    if (overlay) overlay.classList.remove('open');
    if (drawer) drawer.classList.remove('open');
    document.body.style.overflow = '';
  },

  // UI: Render wishlist drawer
  renderWishlistDrawer() {
    const wishlist = this.getWishlist();
    const container = document.getElementById('wishItems');
    const emptyEl = document.querySelector('#wishBody .cart-empty');
    
    this.updateBadges();

    if (!container) return;

    if (wishlist.length === 0) {
      if (container) container.innerHTML = '';
      if (emptyEl) emptyEl.style.display = 'block';
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';

    let wishHTML = '';
    wishlist.forEach((item, index) => {
      wishHTML += `
        <div class="cart-item">
          <img class="cart-item-img" src="${item.img}" alt="${item.name}">
          <div class="cart-item-info">
            <div class="cart-item-name">${this.escapeHtml(item.name)}</div>
            <div class="cart-item-price">${item.price}</div>
            <button class="cart-remove" onclick="FlairsCart.moveToCartFromWishlist(${item.id})">Move to Cart</button>
          </div>
        </div>
      `;
    });
    
    container.innerHTML = wishHTML;
  },

  moveToCartFromWishlist(id) {
    const wishlist = this.getWishlist();
    const item = wishlist.find(w => w.id === id);
    if (item) {
      // Create a product object from wishlist item
      const product = {
        id: item.id,
        name: item.name,
        price: parseInt(item.price.replace(/[^0-9]/g, '')),
        priceDisplay: item.price,
        img: item.img,
        category: item.category
      };
      this.addToCart(product);
      this.removeFromWishlist(id);
      this.renderWishlistDrawer();
      this.openCart();
    }
  },

  openWishlist() {
    this.renderWishlistDrawer();
    const overlay = document.getElementById('cartOverlay');
    const drawer = document.getElementById('wishlistDrawer');
    if (overlay) overlay.classList.add('open');
    if (drawer) drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeWishlist() {
    const overlay = document.getElementById('cartOverlay');
    const drawer = document.getElementById('wishlistDrawer');
    if (overlay) overlay.classList.remove('open');
    if (drawer) drawer.classList.remove('open');
    document.body.style.overflow = '';
  },

  // UI: Toast notification
  showToast(message, icon = '✓') {
    clearTimeout(this.toastTimer);
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    const toastIcon = toast?.querySelector('.toast-icon, span:first-child');
    
    if (toastMsg) toastMsg.textContent = message;
    if (toastIcon) toastIcon.textContent = icon;
    if (toast) toast.classList.add('show');
    
    this.toastTimer = setTimeout(() => {
      if (toast) toast.classList.remove('show');
    }, 2500);
  },

  // UI: Format price
  formatPrice(price) {
    return 'Rs. ' + price.toLocaleString();
  },

  // Helper: Escape HTML
  escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }
};

// Global cart close function (for inline onclick)
function closeCart() {
  FlairsCart.closeCart();
}

function openCart() {
  FlairsCart.openCart();
}

function closeWishlist() {
  FlairsCart.closeWishlist();
}

function openWishlist() {
  FlairsCart.openWishlist();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  FlairsCart.updateBadges();
  FlairsCart.renderCartDrawer();
  
  // Close cart when clicking overlay
  const overlay = document.getElementById('cartOverlay');
  if (overlay) {
    overlay.addEventListener('click', () => {
      FlairsCart.closeCart();
      FlairsCart.closeWishlist();
    });
  }
});