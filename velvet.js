// ============ VELVET SHOWCASE PRODUCTS ============
const SHOWCASE_PRODUCTS = [
  { id: 201, name: 'Zeenat', collection: "'25 Edition", price: 89500, priceDisplay: 'Rs.89,500', fabric: 'Black Weaving Cotton', description: 'A fully embellished shirt with intricate handwork, paired with a classic garara that speaks of old-world charm. The ensemble is elevated with a luxuriously adorned dupatta and a beautifully designed back, weaving tradition and sophistication into every detail.', details: 'Hand-embroidered motifs | Pure Italian Velvet | Silk lining', features: ['Hand Embroidery', 'Italian Velvet', 'Gold Thread Work'], img: 'images/img1.jpeg', img2: 'https://flairsstudio.com/cdn/shop/files/DSC8245.jpg?v=1722257826' },
  { id: 202, name: 'Mehraab', collection: "Velvet Vellour '24", price: 78500, priceDisplay: 'Rs.78,500', fabric: 'Soft Biege', description: 'Mehraab design reflects the beauty of structure and detail. This 3-piece stitched ensemble in soft beige with a peach dupatta is elevated by its intricately embellished shalwar, echoing the timeless grandeur of traditional craftsmanship. Gentle, graceful, yet striking, Mehraab embodies the essence of elegance.', details: 'Vellour finish | Gota Patti work | Soft velvet texture', features: ['Vellour Finish', 'Gota Patti', 'Soft Texture'], img: 'images/img5.jpeg', img2: 'https://flairsstudio.com/cdn/shop/files/DSC8559-Recovered.jpg?v=1722258003' },
  { id: 203, name: 'Shab-e-Naz', collection: "Luxury Pret", price: 92500, priceDisplay: 'Rs.92,500', fabric: ' fluid silhouette', description: 'Shab-e-Naz is a statement kaftan that captures the quiet luxury of a starlit night. With its fluid silhouette, deep dreamy tones, and golden detailing', details: 'Crushed velvet | Zardozi & Dabka | Cape-style silhouette', features: ['Crushed Velvet', 'Zardozi Work', 'Dabka Details'], img: 'images/img6.jpeg', img2: 'https://flairsstudio.com/cdn/shop/files/IMG_3355.jpg?v=1722348818' },
  { id: 204, name: 'Aabroo', collection: "Signature Line", price: 105000, priceDisplay: 'Rs.105,000', fabric: 'deep cobalt', description: 'Aabroo, is a timeless harmony of colors where deep cobalt reflects quiet strength and the soft mint dupatta whispers serenity together creating a regal balance of power and poise for the woman who carries her elegance effortlessly. ', details: 'Diamond-cut velvet | 3D appliqués | Crystal & pearl embellishments', features: ['Diamond Velvet', '3D Appliqués', 'Crystal Work'], img: 'images/img11.jpeg', img2: 'https://flairsstudio.com/cdn/shop/files/DSC9707.jpg?v=1722258179' },
];

const VELVET_PRODUCTS = [
  { id: 205, name: 'Zucchini Velvet', category: 'Velvet Collection', price: 68500, priceDisplay: 'Rs.60,000', fabric: 'Velvet SHEESHA SILK', description: 'Olive-toned cape-style shirt with sheesha silk tazars.', img: 'images/img12.jpeg', img2: 'https://flairsstudio.com/cdn/shop/files/DSC8797.jpg?v=1722258065' },
  { id: 206, name: 'Velvet Noir', category: 'Velvet Collection', price: 72500, priceDisplay: 'Rs.60,000', fabric: 'Black Velvet', description: 'Timeless black velvet with subtle silver embroidery.', img: 'images/img13.jpeg', img2: 'https://flairsstudio.com/cdn/shop/files/DSC8245.jpg?v=1722257826' },
  { id: 207, name: 'Rose Velvet', category: 'Velvet Collection', price: 69500, priceDisplay: 'Rs.60,000', fabric: 'Rose Gold Velvet', description: 'Soft rose gold velvet with pearl and sequin embellishments.', img: 'images/img14.jpeg', img2: 'https://flairsstudio.com/cdn/shop/files/DSC8559-Recovered.jpg?v=1722258003' },
  { id: 208, name: 'Shab-e-Naz Kaftan ', category: 'Velvet Collection', price: 79800, priceDisplay: 'Rs.60,0000', fabric: 'Sapphire Blue Velvet', description: 'This stunning blue dress accompanied by Handmade golden embroidery delicates Elegance and timeless consumption', img: 'images/img15.jpeg', img2: 'https://flairsstudio.com/cdn/shop/files/IMG_3355.jpg?v=1722348818' },
];

// ============ STATE ============
let currentProduct = null;
let selectedSize = 'M';

// ============ RENDER SHOWCASE CARDS ============
function renderShowcase() {
  const grid = document.getElementById('showcaseGrid');
  if (!grid) return;
  grid.innerHTML = '';
  SHOWCASE_PRODUCTS.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'showcase-card';
    card.innerHTML = `
      <div class="showcase-img"><img src="${product.img}" alt="${product.name}" loading="lazy"></div>
      <div class="showcase-content">
        <h3>${product.name}</h3>
        <div class="showcase-collection">${product.collection}</div>
        <div class="showcase-desc">${product.description.substring(0, 100)}...</div>
        <div class="showcase-features">${product.features.map(f => `<span class="feature-tag">${f}</span>`).join('')}</div>
        <div class="showcase-price">${product.priceDisplay}</div>
        <button class="showcase-btn" onclick="openQuickView(${product.id})">View Details →</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ============ RENDER PRODUCTS GRID ============
function renderProducts(products) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const allProducts = [...SHOWCASE_PRODUCTS, ...VELVET_PRODUCTS];
  allProducts.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 0.05}s`;
    card.innerHTML = `
      <div class="product-image">
        <img src="${product.img}" alt="${product.name}" loading="lazy">
        <div class="product-overlay">
          <button class="quick-view-btn" onclick="openQuickView(${product.id})">Quick View</button>
          <button class="quick-shop-btn" onclick="addToCart(${product.id})">Quick Shop</button>
        </div>
      </div>
      <div class="product-name">${product.name}</div>
      <div class="product-price">${product.priceDisplay}</div>
    `;
    grid.appendChild(card);
  });
}

// ============ SORT FUNCTION ============
function sortProducts() {
  const sortValue = document.getElementById('sortSelect').value;
  const allProducts = [...SHOWCASE_PRODUCTS, ...VELVET_PRODUCTS];
  let sorted = [...allProducts];
  if (sortValue === 'price-low') sorted.sort((a, b) => a.price - b.price);
  else if (sortValue === 'price-high') sorted.sort((a, b) => b.price - a.price);
  renderProducts(sorted);
}

// ============ QUICK VIEW ============
function openQuickView(productId) {
  const allProducts = [...SHOWCASE_PRODUCTS, ...VELVET_PRODUCTS];
  currentProduct = allProducts.find(p => p.id === productId);
  if (!currentProduct) return;
  document.getElementById('qvImg').src = currentProduct.img;
  document.getElementById('qvCategory').textContent = 'Velvet Collection';
  document.getElementById('qvName').textContent = currentProduct.name;
  document.getElementById('qvPrice').textContent = currentProduct.priceDisplay;
  document.getElementById('qvFabric').textContent = currentProduct.fabric;
  document.getElementById('qvDetails').innerHTML = currentProduct.details || 'Premium quality velvet with intricate handwork details';
  document.getElementById('qvDesc').textContent = currentProduct.description;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModal(e) {
  if (e.target === document.getElementById('modalOverlay')) closeQuickView();
}

function selectSize(btn) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedSize = btn.dataset.size;
}

// ============ ADD TO CART (using FlairsCart) ============
function addToCart(productId, fromModal = false) {
  let product;
  let size = 'M';
  
  const allProducts = [...SHOWCASE_PRODUCTS, ...VELVET_PRODUCTS];
  
  if (fromModal && currentProduct) {
    product = currentProduct;
    size = selectedSize;
  } else {
    product = allProducts.find(p => p.id === productId);
  }
  
  if (!product) return;
  
  const productForCart = {
    id: product.id,
    name: product.name,
    price: product.price,
    priceDisplay: product.priceDisplay,
    img: product.img,
    category: 'Velvet Collection'
  };
  
  FlairsCart.addToCart(productForCart, size);
  
  if (fromModal) closeQuickView();
  FlairsCart.openCart();
}

// ============ ANNOUNCEMENT TICKER ============
function buildAnnounce() {
  const items = ['✨ The Eid Duo \'26 Is Now Live · Shipping Worldwide 🌏', '✨ Free Shipping on orders over Rs. 10,000', '✨ New Velvet Collection Just Dropped', '✨ Easy Returns · Hassle-Free Policy'];
  const track = document.getElementById('announceTicker');
  if (!track) return;
  [...items, ...items].forEach(t => {
    const span = document.createElement('span');
    span.innerHTML = t + ' <span class="announce-dot">✦</span> ';
    track.appendChild(span);
  });
}

// ============ NEWSLETTER ============
function subscribeNewsletter() {
  const email = document.getElementById('newsletterEmail').value;
  if (!email || !email.includes('@')) {
    FlairsCart.showToast('Please enter a valid email', '⚠');
    return;
  }
  document.getElementById('newsletterEmail').value = '';
  FlairsCart.showToast('Subscribed! Welcome to Flairs Studio ✦', '✦');
}

// ============ SCROLL REVEAL ============
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
}

// ============ BACK TO TOP ============
window.addEventListener('scroll', () => {
  const backTop = document.getElementById('backTop');
  if (backTop) backTop.classList.toggle('show', window.scrollY > 400);
});
document.getElementById('backTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============ EVENT LISTENERS ============
document.getElementById('sortSelect')?.addEventListener('change', sortProducts);
document.getElementById('qvAddToCart')?.addEventListener('click', () => {
  if (currentProduct) addToCart(currentProduct.id, true);
});
document.getElementById('qvWishlist')?.addEventListener('click', () => {
  if (currentProduct) FlairsCart.showToast(`${currentProduct.name} added to wishlist ♡`, '♡');
});

// Initialize size buttons
document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', function() { selectSize(this); });
});

// ============ INITIALIZE ============
renderShowcase();
renderProducts([...SHOWCASE_PRODUCTS, ...VELVET_PRODUCTS]);
buildAnnounce();
initReveal();