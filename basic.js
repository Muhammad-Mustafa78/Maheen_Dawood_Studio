// ============ BASICS PRODUCT DATA ============
const BASICS_PRODUCTS = [
  { id:101, name:'Mehraab',    category:'Everyday Basics', price:5500,  priceDisplay:'45,000',  fabric:'Soft Biege',      description:'Mehraab design reflects the beauty of structure and detail. This 3-piece stitched ensemble in soft beige with a peach dupatta is elevated by its intricately embellished shalwar, echoing the timeless grandeur of traditional craftsmanship. Gentle, graceful, yet striking, Mehraab embodies the essence of elegance. ', img:'images/basic1.jpeg', img2:'images/basic1.jpeg' },
  { id:102, name:'Raqs-e-Rang',   category:'Everyday Basics', price:5500,  priceDisplay:'45,000',  fabric:'stiched Orange',      description:'Raqs-e-Rang is a 3-piece stitched ensemble in striking orange, elevated with magenta and green contrasts. ', img:'images/basic2.jpeg', img2:'https://flairsstudio.com/cdn/shop/files/DSC8245.jpg?v=1722257826' },
  { id:103, name:'Gulnar',         category:'Everyday Basics', price:5500,  priceDisplay:'45,000',  fabric:' ivory canvas adorned with golden embroidery.',      description:'Gulnar blooms with the grandeur of Mughal courts an ivory canvas adorned with golden embroidery, brought to life by a regal magenta dip-dyed dupatta. A vision of grace and majesty, this ensemble embodies timeless elegance and royal charm', img:'images/basic3.jpeg', img2:'https://flairsstudio.com/cdn/shop/files/IMG_3355.jpg?v=1722348818' },
  { id:104, name:'Kohinoor',       category:'Everyday Basics', price:5500,  priceDisplay:'45,000',  fabric:'Premium Cotton',      description:'A jewel of the collection, Kohinoor reflects regal craftsmanship and timeless elegance', img:'images/basic4.jpeg', img2:'https://flairsstudio.com/cdn/shop/files/DSC9707.jpg?v=1722258179' },
  { id:105, name:'Zeenat',   category:'Everyday Basics', price:5500,  priceDisplay:'Rs.50,000',  fabric:'Black Weaving Cotton',   description:' A fully embellished shirt with intricate handwork, paired with a classic garara that speaks of old-world charm. The ensemble is elevated with a luxuriously adorned dupatta and a beautifully designed back, weaving tradition and sophistication into every detail.', img:'images/basic5.jpeg', img2:'https://flairsstudio.com/cdn/shop/files/DSC8245.jpg?v=1722257826' },
  { id:106, name:'Black Velvet', category:'Everyday Basics', price:5900,  priceDisplay:'Rs.50,000',  fabric:'Velvet, golden embellishments',        description:'Black velvet ensemble adorned with handcrafted golden embellishments, a perfect blend of grace, luxury, and timeless elegance.', img:'images/basic6.jpeg', img2:'https://flairsstudio.com/cdn/shop/files/DSC8559-Recovered.jpg?v=1722258003' },
  { id:107, name:'Mint Green',   category:'Everyday Basics', price:5900,  priceDisplay:'Rs.50,000',  fabric:'Silk,Silver Embroidery',       description:' This beautiful outfit, delicately embellished with intricate silver embroidery.', img:'images/basic7.jpeg', img2:'https://flairsstudio.com/cdn/shop/files/IMG_3355.jpg?v=1722348818' },
  { id:108, name:'Pink Velvet',    category:'Everyday Basics', price:5900,  priceDisplay:'Rs.50,000',  fabric:'Velvet',      description:'custom pink velvet ensemble, adorned with delicate hand embellishments and paired with a rich silk dupatta a timeless piece designed to make every moment elegant. ', img:'images/basic8.jpeg', img2:'https://flairsstudio.com/cdn/shop/files/DSC9707.jpg?v=1722258179' },
];

// ============ PAGE STATE ============
let currentProduct = null;
let selectedSize = 'M';

// ============ RENDER PRODUCTS ============
function renderProducts(products) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 0.05}s`;
    card.innerHTML = `
      <div class="product-image">
        <img src="${product.img}" alt="${product.name}" loading="lazy">
        <div class="product-overlay">
          <button class="quick-view-btn" onclick="openQuickView(${product.id})">Quick View</button>
          <button class="quick-shop-btn" onclick="addToCartPage(${product.id})">Quick Shop</button>
        </div>
      </div>
      <div class="product-name">${product.name}</div>
      <div class="product-price">from ${product.priceDisplay}</div>
    `;
    grid.appendChild(card);
  });
}

// ============ SORT ============
function sortProducts() {
  const v = document.getElementById('sortSelect').value;
  let sorted = [...BASICS_PRODUCTS];
  if (v === 'price-low') sorted.sort((a, b) => a.price - b.price);
  if (v === 'price-high') sorted.sort((a, b) => b.price - a.price);
  renderProducts(sorted);
}

// ============ QUICK VIEW ============
function openQuickView(productId) {
  currentProduct = BASICS_PRODUCTS.find(p => p.id === productId);
  if (!currentProduct) return;
  document.getElementById('qvImg').src = currentProduct.img;
  document.getElementById('qvCategory').textContent = currentProduct.category;
  document.getElementById('qvName').textContent = currentProduct.name;
  document.getElementById('qvPrice').textContent = currentProduct.priceDisplay;
  document.getElementById('qvFabric').textContent = currentProduct.fabric;
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
function addToCartPage(productId, fromModal = false) {
  const product = fromModal && currentProduct ? currentProduct : BASICS_PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  
  const size = fromModal ? selectedSize : 'M';
  
  const productForCart = {
    id: product.id,
    name: product.name,
    price: product.price,
    priceDisplay: product.priceDisplay,
    img: product.img,
    category: product.category
  };
  
  FlairsCart.addToCart(productForCart, size);
  if (fromModal) closeQuickView();
  FlairsCart.openCart();
}

// ============ ANNOUNCEMENT TICKER ============
function buildAnnounce() {
  const items = ["✨ The Eid Duo '26 Is Now Live · Shipping Worldwide 🌏", '✨ Free Shipping on orders over Rs. 10,000', "✨ New Meraki Basics '26 Just Dropped", '✨ Easy Returns · Hassle-Free Policy'];
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
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// ============ BACK TO TOP ============
window.addEventListener('scroll', () => {
  document.getElementById('backTop')?.classList.toggle('show', window.scrollY > 400);
});
document.getElementById('backTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============ EVENT LISTENERS ============
document.getElementById('sortSelect')?.addEventListener('change', sortProducts);
document.getElementById('qvAddToCart')?.addEventListener('click', () => {
  if (currentProduct) addToCartPage(currentProduct.id, true);
});
document.getElementById('qvWishlist')?.addEventListener('click', () => {
  if (currentProduct) FlairsCart.showToast(`${currentProduct.name} added to wishlist ♡`, '♡');
});
document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', function () { selectSize(this); });
});

// ============ INIT ============
renderProducts(BASICS_PRODUCTS);
buildAnnounce();
initReveal();