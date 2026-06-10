// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  loadCartSummary();
  updateTotals();
  buildAnnounceTicker();
  updateCartBadges();
  setupEventListeners();
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
}

// ==================== CART FUNCTIONS ====================
let cart = [];
let wishlist = [];

function loadCartFromStorage() {
  const savedCart = localStorage.getItem('flairs_cart');
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
    } catch(e) {
      cart = [];
    }
  }
}

function updateCartBadges() {
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  document.querySelectorAll('#cartBadge, #cartCount').forEach(el => {
    if (el) el.textContent = totalItems;
  });
}

function loadCartSummary() {
  loadCartFromStorage();
  const container = document.getElementById('orderItems');
  if (!container) return;
  
  if (cart.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:2rem;">Your cart is empty</div>';
    return;
  }
  
  let html = '';
  cart.forEach(item => {
    const itemTotal = (item.price || 0) * (item.quantity || 1);
    html += `
      <div class="order-item">
        <img class="order-item-img" src="${item.img || 'https://via.placeholder.com/55x70'}" alt="${item.name || 'Product'}">
        <div class="order-item-info">
          <div class="order-item-name">${escapeHtml(item.name || 'Product')}</div>
          <div class="order-item-meta">Qty: ${item.quantity || 1} | Size: ${item.size || 'M'}</div>
          <div class="order-item-price">Rs. ${itemTotal.toLocaleString()}</div>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function updateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
  const shipping = subtotal > 10000 ? 0 : 800;
  const total = subtotal + shipping;
  
  document.getElementById('subtotalAmount').textContent = `Rs. ${subtotal.toLocaleString()}`;
  document.getElementById('shippingAmount').textContent = shipping === 0 ? 'Free' : `Rs. ${shipping.toLocaleString()}`;
  document.getElementById('totalAmount').textContent = `Rs. ${total.toLocaleString()}`;
  
  return { subtotal, shipping, total };
}

// ==================== CHECKOUT STEPS ====================
function goToStep(step) {
  // Validate current step
  if (step === 2) {
    const name = document.getElementById('fullName')?.value;
    const email = document.getElementById('email')?.value;
    const phone = document.getElementById('phone')?.value;
    
    if (!validateName(name)) return;
    if (!validateEmail(email)) return;
    if (!validatePhone(phone)) return;
  }
  
  if (step === 3) {
    const address = document.getElementById('address')?.value;
    const city = document.getElementById('city')?.value;
    const country = document.getElementById('country')?.value;
    
    if (!validateAddress(address)) return;
    if (!validateCity(city)) return;
    if (!validateCountry(country)) return;
  }
  
  // Hide all sections
  document.getElementById('step1').style.display = 'none';
  document.getElementById('step2').style.display = 'none';
  document.getElementById('step3').style.display = 'none';
  
  // Show selected section
  document.getElementById(`step${step}`).style.display = 'block';
  
  // Update steps
  document.querySelectorAll('.step').forEach((stepEl, index) => {
    const stepNum = index + 1;
    stepEl.classList.remove('active');
    if (stepNum === step) {
      stepEl.classList.add('active');
    }
  });
}

// ==================== VALIDATION FUNCTIONS ====================
function validateName(name) {
  const errorEl = document.getElementById('nameError');
  if (!name || name.trim().length < 3) {
    errorEl.textContent = 'Please enter your full name';
    errorEl.classList.add('show');
    return false;
  }
  errorEl.classList.remove('show');
  return true;
}

function validateEmail(email) {
  const errorEl = document.getElementById('emailError');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errorEl.textContent = 'Please enter a valid email address';
    errorEl.classList.add('show');
    return false;
  }
  errorEl.classList.remove('show');
  return true;
}

function validatePhone(phone) {
  const errorEl = document.getElementById('phoneError');
  const phoneRegex = /^[\+\d\s\-\(\)]{8,20}$/;
  if (!phone || !phoneRegex.test(phone)) {
    errorEl.textContent = 'Please enter a valid phone number';
    errorEl.classList.add('show');
    return false;
  }
  errorEl.classList.remove('show');
  return true;
}

function validateAddress(address) {
  const errorEl = document.getElementById('addressError');
  if (!address || address.trim().length < 5) {
    errorEl.textContent = 'Please enter your street address';
    errorEl.classList.add('show');
    return false;
  }
  errorEl.classList.remove('show');
  return true;
}

function validateCity(city) {
  const errorEl = document.getElementById('cityError');
  if (!city || city.trim().length < 2) {
    errorEl.textContent = 'Please enter your city';
    errorEl.classList.add('show');
    return false;
  }
  errorEl.classList.remove('show');
  return true;
}

function validateCountry(country) {
  const errorEl = document.getElementById('countryError');
  if (!country) {
    errorEl.textContent = 'Please select your country';
    errorEl.classList.add('show');
    return false;
  }
  errorEl.classList.remove('show');
  return true;
}

// ==================== PLACE ORDER ====================
function placeOrder() {
  if (cart.length === 0) {
    showToast('Your cart is empty', '⚠');
    return;
  }
  
  // Get form data
  const orderData = {
    orderId: 'FS-' + Math.random().toString(36).slice(2, 10).toUpperCase(),
    date: new Date().toLocaleString(),
    customer: {
      name: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      postalCode: document.getElementById('postalCode').value,
      country: document.getElementById('country').value
    },
    paymentMethod: document.querySelector('.payment-option.active')?.getAttribute('data-payment') || 'cod',
    items: cart.map(item => ({
      name: item.name,
      quantity: item.quantity || 1,
      size: item.size || 'M',
      price: item.price || 0,
      subtotal: (item.price || 0) * (item.quantity || 1)
    })),
    totals: updateTotals()
  };
  
  // Save order to localStorage
  const orders = JSON.parse(localStorage.getItem('flairs_orders') || '[]');
  orders.push(orderData);
  localStorage.setItem('flairs_orders', JSON.stringify(orders));
  
  // Send WhatsApp message
  sendWhatsAppMessage(orderData);
  
  // Send Email
  sendEmailConfirmation(orderData);
  
  // Clear cart
  localStorage.removeItem('flairs_cart');
  cart = [];
  updateCartBadges();
  
  // Show confirmation
  showOrderConfirmation(orderData);
}

// ==================== WHATSAPP INTEGRATION ====================
function sendWhatsAppMessage(orderData) {
  const phoneNumber = '923003097881'; // Replace with your WhatsApp business number
  const message = formatWhatsAppMessage(orderData);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  // Store the WhatsApp link for later use
  window.whatsappLink = whatsappUrl;
}

function formatWhatsAppMessage(orderData) {
  const itemsList = orderData.items.map(item => 
    `• ${item.name} - Qty: ${item.quantity} - Size: ${item.size} - Rs. ${item.subtotal.toLocaleString()}`
  ).join('\n');
  
  return `
*🛍️ NEW ORDER - Flairs Studio*

*Order ID:* ${orderData.orderId}
*Date:* ${orderData.date}

*👤 CUSTOMER DETAILS*
Name: ${orderData.customer.name}
Phone: ${orderData.customer.phone}
Email: ${orderData.customer.email}

*📍 SHIPPING ADDRESS*
${orderData.customer.address}
${orderData.customer.city}, ${orderData.customer.country}
Postal Code: ${orderData.customer.postalCode || 'N/A'}

*📦 ORDER ITEMS*
${itemsList}

*💰 PAYMENT SUMMARY*
Subtotal: Rs. ${orderData.totals.subtotal.toLocaleString()}
Shipping: ${orderData.totals.shipping === 0 ? 'Free' : `Rs. ${orderData.totals.shipping.toLocaleString()}`}
Total: Rs. ${orderData.totals.total.toLocaleString()}

*💳 Payment Method:* ${orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}

*📅 Expected Delivery:* 7-10 business days

Thank you for shopping with Flairs Studio! ✨
  `.trim();
}

// ==================== EMAIL CONFIRMATION ====================
function sendEmailConfirmation(orderData) {
  // Using EmailJS or similar service
  // For demo, we'll create a mailto link
  const subject = `Order Confirmation - ${orderData.orderId} - Flairs Studio`;
  const body = formatEmailMessage(orderData);
  
  const mailtoLink = `mailto:${orderData.customer.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  // Store the email link
  window.emailLink = mailtoLink;
  
  // In production, you would use EmailJS, SendGrid, or a backend API
  console.log('Email would be sent to:', orderData.customer.email);
  console.log('Email content:', body);
}

function formatEmailMessage(orderData) {
  const itemsList = orderData.items.map(item => 
    `<tr>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.size}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">Rs. ${item.subtotal.toLocaleString()}</td>
    </tr>`
  ).join('');
  
  return `
Dear ${orderData.customer.name},

Thank you for your order! Your order has been received and is being processed.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 ORDER DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Order ID: ${orderData.orderId}
Date: ${orderData.date}
Payment Method: ${orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 ORDER ITEMS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${orderData.items.map(item => `• ${item.name} - Qty: ${item.quantity} - Size: ${item.size} - Rs. ${item.subtotal.toLocaleString()}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 ORDER SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Subtotal: Rs. ${orderData.totals.subtotal.toLocaleString()}
Shipping: ${orderData.totals.shipping === 0 ? 'Free' : `Rs. ${orderData.totals.shipping.toLocaleString()}`}
TOTAL: Rs. ${orderData.totals.total.toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 SHIPPING ADDRESS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${orderData.customer.name}
${orderData.customer.address}
${orderData.customer.city}, ${orderData.customer.country}
Phone: ${orderData.customer.phone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ WHAT'S NEXT?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your order will be processed within 1-2 business days.
You will receive a shipping confirmation once your order is on its way.

Expected delivery: 7-10 business days

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 Need help? Contact us:
Email: hello@flairsstudio.com
WhatsApp: +92 300 1234567

Thank you for shopping with Flairs Studio! ❤️

Warm regards,
Team Flairs Studio
  `.trim();
}

// ==================== ORDER CONFIRMATION DISPLAY ====================
function showOrderConfirmation(orderData) {
  const main = document.querySelector('.checkout-main');
  const itemsList = orderData.items.map(item => 
    `<p>• ${item.name} - Qty: ${item.quantity} - Size: ${item.size} - Rs. ${item.subtotal.toLocaleString()}</p>`
  ).join('');
  
  main.innerHTML = `
    <div class="order-confirmation">
      <div class="check-icon">✨</div>
      <h1>Order Confirmed!</h1>
      <p>Thank you for your order, <strong>${orderData.customer.name}</strong>.</p>
      <p>Your order <span class="order-id">${orderData.orderId}</span> has been placed successfully.</p>
      
      <div class="order-details">
        <p><strong>📋 Order Summary</strong></p>
        ${itemsList}
        <hr style="margin: 10px 0; border-color: var(--border);">
        <p><strong>Total Paid:</strong> Rs. ${orderData.totals.total.toLocaleString()}</p>
        <p><strong>Payment Method:</strong> ${orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}</p>
        <p><strong>Shipping to:</strong> ${orderData.customer.city}, ${orderData.customer.country}</p>
      </div>
      
      <p>We've sent a confirmation to <strong>${orderData.customer.email}</strong></p>
      <p>Our team will contact you shortly to confirm your order.</p>
      
      <div>
        <a href="${window.whatsappLink || '#'}" target="_blank" class="whatsapp-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
          Chat on WhatsApp
        </a>
        <a href="index.html" class="btn-continue">Continue Shopping</a>
      </div>
      
      <p style="margin-top: 1.5rem; font-size: 0.8rem; color: var(--muted);">
        ✨ A confirmation email has been sent to your inbox. Our team will reach out within 24 hours.
      </p>
    </div>
  `;
  
  // Open WhatsApp in new tab automatically (optional)
  // window.open(window.whatsappLink, '_blank');
}

// ==================== UI FUNCTIONS ====================
function openCart() {
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  if (overlay) overlay.classList.add('open');
  if (drawer) drawer.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  if (overlay) overlay.classList.remove('open');
  if (drawer) drawer.classList.remove('open');
  document.body.style.overflow = '';
}

function openMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.remove('open');
  document.body.style.overflow = '';
}

function buildAnnounceTicker() {
  const track = document.getElementById('announceTicker');
  if (!track) return;
  
  const items = [
    '✨ Free Shipping on orders over Rs. 10,000 ✨',
    '✨ Easy Returns within 14 days ✨',
    '✨ Cash on Delivery Available ✨',
    '✨ Worldwide Shipping Available ✨'
  ];
  
  track.innerHTML = '';
  [...items, ...items].forEach(t => {
    const span = document.createElement('span');
    span.innerHTML = t + ' <span class="announce-dot">✦</span> ';
    track.appendChild(span);
  });
}

// ==================== TOAST ====================
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
  }, 3000);
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
  // Payment method selection
  document.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('click', function() {
      document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Close overlay
  const overlay = document.getElementById('cartOverlay');
  if (overlay) {
    overlay.addEventListener('click', () => {
      closeCart();
    });
  }
  
  // Enter key on forms
  const inputs = document.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });
  });
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