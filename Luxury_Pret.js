// ============ PRODUCT DATA ============
const PRODUCTS = [
  { id: 1, name: ' Zaitoon Luxe', category: 'Luxury Pret', priceMin: 35000 ,priceMax: 35000 ,priceDisplay: 'Rs.35,000', fabric: 'Velvet SHEESHA SILK', description: 'Our best seller Zaitoon Luxe customized in red color ', img: 'images/luxury1.jpeg', img2: 'https://flairsstudio.com/cdn/shop/files/DSC8245.jpg?v=1722257826' },
  { id: 2, name: 'Strawberry', category: 'Luxury Pret', priceMin: 35000, priceMax: 35000, priceDisplay: 'Rs.35,000', fabric: 'Raw Silk with Embroidery', description: 'Indulge in the sweetness of our Strawberry ensemble.', img: 'images/luxury2.jpeg', img2: 'https://flairsstudio.com/cdn/shop/files/DSC8559-Recovered.jpg?v=1722258003' },
  { id: 3, name: 'Emerald', category: 'Luxury Pret', priceMin: 35500, priceMax: 35500, priceDisplay: 'Rs.35,000', fabric: 'Velvet with Zari Work', description: 'The Emerald collection brings regal elegance to your wardrobe.', img: 'images/luxury3.jpeg', img2: 'https://flairsstudio.com/cdn/shop/files/IMG_3355.jpg?v=1722348818' },
  { id: 4, name: 'Sheesha Silk', category: 'Luxury Pret', priceMin: 35000, priceMax: 35000, priceDisplay: 'Rs.35,000', fabric: 'Chiffon with Sequins', description: 'A beautiful outfit in rich burnt orange made from soft and flowy Sheesha silk Elegant detailing, a flattering cut, and just the right amount of shine perfect for any festive occasion.', img: 'images/luxury4.jpeg', img2: 'https://flairsstudio.com/cdn/shop/files/DSC8245.jpg?v=1722257826' },
  { id: 5, name: 'Bahar', category: 'Luxury Pret', priceMin: 68500, priceMax: 68500, priceDisplay: 'Rs.68,500', fabric: 'deep teal canvas', description: 'Bahar is crafted in a deep teal canvas, detailed with intricate gold and ivory embroidery. Paired with straight trousers and contrasted with a navy chiffon dupatta, it’s a timeless piece that radiates sophistication. ', img: 'images/luxury5.jpeg', img2: 'https://flairsstudio.com/cdn/shop/files/DSC8797.jpg?v=1722258065' },
  { id: 6, name: 'Aabroo', category: 'Luxury Pret', priceMin: 88000, priceMax: 88000, priceDisplay: 'Rs.88,000', fabric: 'deep cobalt', description: 'Aabroo, is a timeless harmony of colors where deep cobalt reflects quiet strength and the soft mint dupatta whispers serenity together creating a regal balance of power and poise for the woman who carries her elegance effortlessly.', img: 'images/luxury6.jpeg', img2: 'https://flairsstudio.com/cdn/shop/files/DSC8245.jpg?v=1722257826' },
  { id: 7, name: 'Zayra', category: 'Luxury Pret', priceMin: 82500, priceMax: 82500, priceDisplay: 'Rs.82,500', fabric: 'Velvet with Dabka Work', description: 'A royal shade of blue brought to life with delicate embroidery on the collars and cuffs, finished with a bold floral bunch detail.A perfect blend of tradition and modernity, this Indo-Western silhouette is made to stand out.', img: 'images/luxury7.jpeg', img2: 'https://flairsstudio.com/cdn/shop/files/DSC8559-Recovered.jpg?v=1722258003' },
  { id: 8, name: 'Lalkaar', category: 'Luxury Pret', priceMin: 75500, priceMax: 75500, priceDisplay: 'Rs.75,500', fabric: 'striking crimson red', description: 'Lalkaar, the roar is a stitched ensemble in striking crimson red, adorned with intricate embroidery that embodies strength, boldness, and unapologetic elegance.', img: 'images/luxury8.jpeg', img2: 'https://flairsstudio.com/cdn/shop/files/DSC8559-Recovered.jpg?v=1722258003' },
];

// ============ STATE ============
let currentProduct = null;
let selectedSize = 'M';
let selectedAddon = 0;

// ============ RENDER PRODUCTS ============
function renderProducts(products) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  
  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 0.05}s`;
    const priceHtml = product.priceMin !== product.priceMax ? 
      `<div class="product-price-range">from ${product.priceDisplay}</div>` : 
      `<div class="product-price">${product.priceDisplay}</div>`;
    
    card.innerHTML = `
      <div class="product-image">
        <img src="${product.img}" alt="${product.name}" loading="lazy">
        <div class="product-overlay">
          <button class="quick-view-btn" onclick="openQuickView(${product.id})">Quick View</button>
          <button class="quick-shop-btn" onclick="addToCart(${product.id})">Quick Shop</button>
        </div>
      </div>
      <div class="product-name">${product.name}</div>
      ${priceHtml}
    `;
    grid.appendChild(card);
  });
}

// ============ SORT FUNCTION ============
function sortProducts() {
  const sortValue = document.getElementById('sortSelect').value;
  let sorted = [...PRODUCTS];
  if (sortValue === 'price-low') sorted.sort((a, b) => a.priceMin - b.priceMin);
  else if (sortValue === 'price-high') sorted.sort((a, b) => b.priceMax - a.priceMax);
  renderProducts(sorted);
}

// ============ QUICK VIEW ============
function openQuickView(productId) {
  currentProduct = PRODUCTS.find(p => p.id === productId);
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

function selectAddon(btn) {
  document.querySelectorAll('.addon-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedAddon = parseInt(btn.dataset.addon);
}

// ============ ADD TO CART (using FlairsCart) ============
function addToCart(productId, fromModal = false) {
  let product;
  let size = 'M';
  let addon = 0;
  
  if (fromModal && currentProduct) {
    product = currentProduct;
    size = selectedSize;
    addon = selectedAddon;
  } else {
    product = PRODUCTS.find(p => p.id === productId);
  }
  
  if (!product) return;
  
  const price = product.priceMin;
  const totalPrice = price + addon;
  
  const productForCart = {
    id: product.id,
    name: product.name,
    price: totalPrice,
    priceDisplay: `Rs. ${totalPrice.toLocaleString()}`,
    img: product.img,
    category: product.category
  };
  
  FlairsCart.addToCart(productForCart, size, addon);
  
  if (fromModal) closeQuickView();
  FlairsCart.openCart();
}

// ============ ANNOUNCEMENT TICKER ============
function buildAnnounce() {
  const items = ['✨ The Eid Duo \'26 Is Now Live · Shipping Worldwide 🌏', '✨ Free Shipping on orders over Rs. 10,000', '✨ New Meraki Basics \'26 Just Dropped'];
  const track = document.getElementById('announceTicker');
  if (!track) return;
  [...items, ...items].forEach(t => {
    const span = document.createElement('span');
    span.innerHTML = t + ' <span class="announce-dot">✦</span> ';
    track.appendChild(span);
  });
}
// ============ MOBILE MENU ============
function openMobileMenu(){
  document.getElementById('mobileMenu').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileMenu(){
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
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

// Initialize size and addon buttons
document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', function() { selectSize(this); });
});
document.querySelectorAll('.addon-btn').forEach(btn => {
  btn.addEventListener('click', function() { selectAddon(this); });
});

// Initialize
renderProducts(PRODUCTS);
buildAnnounce();
