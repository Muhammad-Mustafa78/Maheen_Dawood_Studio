// ============ NEW ARRIVALS PRODUCT DATA ============
const NEW_ARRIVALS = [
  {id:1, name:'Burgundy Elegance', price:79500, priceDisplay:'Rs. 79,500', badge:'new', img:"images/img1.jpeg", img2:'images/img1.jpeg'},
  {id:2, name:'Strawberry Blush', price:78000, priceDisplay:'Rs. 78,000', badge:'new', img:'images/basic1.jpeg', img2:'images/basic1.jpeg'},
  {id:3, name:'Emerald Dream', price:78500, priceDisplay:'Rs. 78,500', badge:'new', img:'images/basic3.jpeg', img2:'images/basic3.jpeg'},
  {id:4, name:'Pink Dust', price:85000, priceDisplay:'Rs. 85,000', badge:'new', img:'images/basic5.jpeg', img2:'images/basic5.jpeg'},
  {id:5, name:'Midnight Velvet', price:82500, priceDisplay:'Rs. 82,500', badge:'new', img:'images/img5.jpeg', img2:'images/img5.jpeg'},
  {id:6, name:'Rose Gold', price:88000, priceDisplay:'Rs. 88,000', badge:'new', img:'images/img6.jpeg', img2:'images/img6.jpeg'},
  {id:7, name:'Sapphire Blue', price:75500, priceDisplay:'Rs. 75,500', badge:'new', img:'images/img12.jpeg', img2:'images/img12.jpeg'},
  {id:8, name:'Cream Silk', price:72000, priceDisplay:'Rs. 72,000', badge:'new', img:'images/img14.jpeg', img2:'images/img14.jpeg'},
];

// ============ BUILD PRODUCT CARD ============
function buildProductCard(product) {
  const badgeHtml = `<div class="product-card-badge badge-new">NEW</div>`;
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <div class="product-card-img">
      ${badgeHtml}
      <img class="main-img" src="${product.img}" alt="${product.name}" loading="lazy">
      <img class="hover-img" src="${product.img2}" alt="${product.name}" loading="lazy">
      <div class="product-card-actions">
        <button class="btn-wishlist" onclick="addToWishlist(${product.id}, event)">♡ Wishlist</button>
        <button class="btn-addcart" onclick="addToCart(${product.id}, event)">Add to Cart</button>
      </div>
    </div>
    <div class="product-card-name">${product.name}</div>
    <div class="product-card-price">${product.priceDisplay}</div>
  `;
  return card;
}

// ============ RENDER NEW ARRIVALS GRID ============
function renderNewArrivals() {
  const grid = document.getElementById('newArrivalsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  NEW_ARRIVALS.forEach(product => {
    grid.appendChild(buildProductCard(product));
  });
}
renderNewArrivals();

// ============ SCROLL REVEAL ANIMATION ============
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.1});
  reveals.forEach(el => observer.observe(el));
}
initReveal();

// ============ ANNOUNCEMENT TICKER ============
function buildAnnounce() {
  const items = ['✨ The Eid Duo \'26 Is Now Live · Shipping Worldwide 🌏', '✨ Free Shipping on orders over Rs. 10,000', '✨ New Meraki Basics \'26 Just Dropped', '✨ Easy Returns · Hassle-Free Policy'];
  const track = document.getElementById('announceTicker');
  if (!track) return;
  [...items, ...items].forEach(t => {
    const span = document.createElement('span');
    span.innerHTML = t + ' <span class="announce-dot">✦</span> ';
    track.appendChild(span);
  });
}
buildAnnounce();

// ============ BACK TO TOP ============
window.addEventListener('scroll', () => {
  const backTop = document.getElementById('backTop');
  if (backTop) {
    backTop.classList.toggle('show', window.scrollY > 400);
  }
});

// ============ ADD TO CART (using shared FlairsCart) ============
function addToCart(productId, event) {
  if (event) event.stopPropagation();
  const product = NEW_ARRIVALS.find(p => p.id === productId);
  if (!product) return;
  
  const productForCart = {
    id: product.id,
    name: product.name,
    price: product.price,
    priceDisplay: product.priceDisplay,
    img: product.img,
    category: 'New Arrivals'
  };
  
  FlairsCart.addToCart(productForCart);
  FlairsCart.openCart();
}

// ============ ADD TO WISHLIST ============
function addToWishlist(productId, event) {
  if (event) event.stopPropagation();
  const product = NEW_ARRIVALS.find(p => p.id === productId);
  if (!product) return;
  
  const productForWish = {
    id: product.id,
    name: product.name,
    priceDisplay: product.priceDisplay,
    img: product.img,
    category: 'New Arrivals'
  };
  
  FlairsCart.addToWishlist(productForWish);
}