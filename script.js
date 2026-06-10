// DATA
const PRODUCTS = [
  {id:1,name:'Burgundy',collection:'Luxury Pret',price:'Rs. 79,500',badge:'new',colors:['#6B2737','#2C2825','#B89A6E'],img:'images/basic1.jpeg',img2:'images/basic1.jpeg'},
  {id:2,name:'Strawberry',collection:'Luxury Pret',price:'Rs. 78,000',badge:'new',colors:['#C4687A','#FAF8F5'],img:'images/basic2.jpeg',img2:'images/basic2.jpeg'},
  {id:3,name:'Emerald',collection:'Luxury Pret',price:'Rs. 78,500',badge:'',colors:['#2D6A4F','#1A4031'],img:'images/basic3.jpeg',img2:'images/basic3.jpeg'},
  {id:4,name:'Blush Pink',collection:'Luxury Pret',price:'Rs. 68,500',originalPrice:'Rs. 80,000',badge:'sale',colors:['#E8C4BC','#D4A5A0'],img:'images/basic4.jpeg',img2:'images/basic4.jpeg'},
  {id:5,name:'Black Gold',collection:'Luxury Pret',price:'Rs. 68,500',badge:'limited',colors:['#1A1714','#B89A6E'],img:'images/basic5.jpeg',img2:'images/basic5.jpeg'},
  {id:6,name:'SeaFoam',collection:'Luxury Pret',price:'Rs. 75,000',badge:'new',colors:['#7FB5B5','#5A9090'],img:'images/basic6.jpeg',img2:'images/basic6.jpeg'},
  {id:7,name:'Midnight Dream',collection:'Festive',price:'Rs. 62,500',badge:'',colors:['#1A1A2E','#16213E'],img:'images/basic7.jpeg',img2:'images/basic7.jpeg'},
  {id:8,name:'Pink Dust',collection:'Luxury Pret',price:'Rs. 85,000',badge:'new',colors:['#E8B4B8','#D4919A'],img:'images/basic8.jpeg',img2:'images/basic8.jpeg'},
];
const BASICS = [
  {id:101,name:'Cyan Blue',collection:'Basics',price:'Rs. 15,500',badge:'',colors:['#7EC8E3','#4AAFCB'],img:'images/img1.jpeg',img2:'images/img1.jpeg'},
  {id:102,name:'Moss Green',collection:'Basics',price:'Rs. 16,000',badge:'',colors:['#5C7A5A','#3D5C3A'],img:'images/img2.jpeg',img2:'images/img2.jpeg'},
  {id:103,name:'Coke',collection:'Basics',price:'Rs. 15,500',badge:'',colors:['#1A0A0A','#2C1414'],img:'images/img3.jpeg',img2:'images/img3.jpeg'},
  {id:104,name:'Berrie',collection:'Basics',price:'Rs. 16,500',badge:'new',colors:['#7B3B6E','#5C2A52'],img:'images/img4.jpeg',img2:'images/img4.jpeg'},
];
const TESTIMONIALS = [
  {stars:5,text:'"The quality is absolutely breathtaking. My Burgundy set arrived and I have worn it to three events already — everyone asks where I got it!"',author:'Fatima A.',location:'Lahore, Pakistan'},
  {stars:5,text:'"Shipping was surprisingly fast to UAE and the packaging is so luxurious. The fabric is exactly as described — soft, rich, and utterly gorgeous."',author:'Nadia S.',location:'Dubai, UAE'},
  {stars:5,text:'"I purchased the Blush Pink for Eid and received so many compliments. The stitching and detail are impeccable. Will definitely order again!"',author:'Zara M.',location:'London, UK'},
];
const CATEGORIES = [
  {name:'The Eid Duo \'26',count:'19 products',img:'https://flairsstudio.com/cdn/shop/files/DSC8797.jpg?v=1722258065'},
  {name:'Luxury Pret',count:'24 products',img:'https://flairsstudio.com/cdn/shop/files/DSC8245.jpg?v=1722257826'},
  {name:'Basics',count:'12 products',img:'https://flairsstudio.com/cdn/shop/files/DSC8559-Recovered.jpg?v=1722258003'},
  {name:'Velvets',count:'10 products',img:'https://flairsstudio.com/cdn/shop/files/IMG_3355.jpg?v=1722348818'},
];
const LOOKBOOK_IMGS = [
  'https://flairsstudio.com/cdn/shop/files/DSC8797.jpg?v=1722258065',
  'https://flairsstudio.com/cdn/shop/files/DSC8245.jpg?v=1722257826',
  'https://flairsstudio.com/cdn/shop/files/DSC8559-Recovered.jpg?v=1722258003',
  'https://flairsstudio.com/cdn/shop/files/IMG_3355.jpg?v=1722348818',
  'https://flairsstudio.com/cdn/shop/files/DSC9707.jpg?v=1722258179',
];
const INSTA_IMGS = [
  'https://flairsstudio.com/cdn/shop/files/DSC8797.jpg?v=1722258065',
  'https://flairsstudio.com/cdn/shop/files/DSC8245.jpg?v=1722257826',
  'https://flairsstudio.com/cdn/shop/files/DSC8559-Recovered.jpg?v=1722258003',
  'https://flairsstudio.com/cdn/shop/files/IMG_3355.jpg?v=1722348818',
  'https://flairsstudio.com/cdn/shop/files/DSC9707.jpg?v=1722258179',
  'https://flairsstudio.com/cdn/shop/files/DSC8797.jpg?v=1722258065',
];

// NOTE: cart and wishlist are now managed by FlairsCart (no local variables)

let currentQvProduct = null;

// CURSOR
const cur=document.getElementById('cur');
const curRing=document.getElementById('cur-ring');
const curText=document.getElementById('cur-text');
document.addEventListener('mousemove',e=>{
  cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px';
  setTimeout(()=>{curRing.style.left=e.clientX+'px';curRing.style.top=e.clientY+'px';curText.style.left=e.clientX+'px';curText.style.top=e.clientY+'px'},55);
});
function setCursorHover(text=''){
  if(text){
    cur.style.opacity='0';
    curRing.style.width='64px';curRing.style.height='64px';
    curRing.style.background='rgba(26,23,20,.85)';curRing.style.borderColor='transparent';
    curText.style.opacity='1';curText.textContent=text;
  } else {
    cur.style.opacity='1';
    curRing.style.width='30px';curRing.style.height='30px';
    curRing.style.background='transparent';curRing.style.borderColor='rgba(26,23,20,.35)';
    curText.style.opacity='0';
  }
}
document.querySelectorAll('button,a').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.width='14px';cur.style.height='14px'});
  el.addEventListener('mouseleave',()=>{cur.style.width='8px';cur.style.height='8px'});
});

// ANNOUNCEMENT & MARQUEE
function buildAnnounce(){
  const items=['The Eid Duo \'26 Is Now Live · Shipping Worldwide 🌏','Free Shipping on orders over Rs. 10,000','New Meraki Basics \'26 Just Dropped','Easy Returns · Hassle-Free Policy'];
  const track=document.getElementById('announceTicker');
  const all=[...items,...items];
  all.forEach(t=>{
    const span=document.createElement('span');
    span.innerHTML=t+' <span class="announce-dot">✦</span> ';
    track.appendChild(span);
  });
}
buildAnnounce();
function buildMarquee(){
  const items=['Luxury Pret','Premium Craftsmanship','Worldwide Delivery','Festive Collections','Elegance Redefined','Eid Collection \'26','Velvet Luxe'];
  const track=document.getElementById('marqueeTrack');
  const all=[...items,...items,...items];
  all.forEach(t=>{
    const el=document.createElement('span');
    el.className='marquee-item';
    el.innerHTML=`${t} <span class="marquee-star">✦</span>`;
    track.appendChild(el);
  });
}
buildMarquee();

// PRODUCT CARD
function buildProductCard(p,small=false){
  const badgeHtml=p.badge?`<div class="product-card-badge badge-${p.badge}">${p.badge==='new'?'New':p.badge==='sale'?'Sale':p.badge==='limited'?'Limited':p.badge}</div>`:'';
  const priceHtml=p.originalPrice?`<span class="original">${p.originalPrice}</span><span class="sale-price">${p.price}</span>`:p.price;
  const colorsHtml=p.colors.map((c,i)=>`<div class="color-dot${i===0?' active':''}" style="background:${c}" onclick="event.stopPropagation()"></div>`).join('');
  const card=document.createElement('div');
  card.className='product-card reveal';
  card.innerHTML=`
    <div class="product-card-img" data-id="${p.id}">
      ${badgeHtml}
      <img class="main-img" src="${p.img}" alt="${p.name}" loading="lazy">
      <img class="hover-img" src="${p.img2}" alt="${p.name}" loading="lazy">
      <div class="product-card-actions">
        <button class="btn-wishlist" onclick="addToWishlist(${p.id},event)">♡ Wishlist</button>
        <button class="btn-addcart" onclick="addToCart(${p.id},event)">Add to Cart</button>
      </div>
    </div>
    <div class="product-card-name">${p.name}</div>
    <div class="product-card-price">${priceHtml}</div>
    <div class="product-colors">${colorsHtml}</div>
  `;
  const imgWrap=card.querySelector('.product-card-img');
  imgWrap.addEventListener('mouseenter',()=>setCursorHover('VIEW'));
  imgWrap.addEventListener('mouseleave',()=>setCursorHover(''));
  imgWrap.addEventListener('click',()=>openQuickView(p));
  return card;
}

// RENDER GRIDS
function renderProductGrid(data,gridId){
  const grid=document.getElementById(gridId);
  if(!grid)return;
  grid.innerHTML='';
  data.forEach((p,i)=>{
    const card=buildProductCard(p);
    card.style.transitionDelay=(i%4*0.08)+'s';
    grid.appendChild(card);
  });
  initReveal();
}
renderProductGrid(PRODUCTS,'productGrid');
renderProductGrid(BASICS,'basicsGrid');

// CATEGORIES
function buildCatGrid(){
  const grid=document.getElementById('catGrid');
  CATEGORIES.forEach((c,i)=>{
    const el=document.createElement('div');
    el.className='cat-card reveal';
    el.style.transitionDelay=(i*0.1)+'s';
    el.innerHTML=`
      <div class="cat-card-inner">
        <img src="${c.img}" alt="${c.name}" loading="lazy">
        <div class="cat-card-overlay">
          <div class="cat-count">${c.count}</div>
          <div class="cat-name">${c.name}</div>
          <div class="cat-arrow">→</div>
        </div>
      </div>
    `;
    el.addEventListener('mouseenter',()=>setCursorHover('SHOP'));
    el.addEventListener('mouseleave',()=>setCursorHover(''));
    grid.appendChild(el);
  });
}
buildCatGrid();

// LOOKBOOK
function buildLookbook(){
  const grid=document.getElementById('lookbookGrid');
  LOOKBOOK_IMGS.slice(0,3).forEach((img,i)=>{
    const el=document.createElement('div');
    el.className='lookbook-item reveal'+(i===0?' tall':'');
    el.style.transitionDelay=(i*0.12)+'s';
    el.innerHTML=`<img src="${img}" alt="Look ${i+1}" loading="lazy" style="height:${i===0?'580px':'280px'};width:100%;object-fit:cover"><div class="lookbook-item-overlay"><span class="lookbook-item-tag">Shop Look</span></div>`;
    el.addEventListener('mouseenter',()=>setCursorHover('LOOK'));
    el.addEventListener('mouseleave',()=>setCursorHover(''));
    el.addEventListener('click',()=>FlairsCart.showToast('Opening lookbook...','✦'));
    grid.appendChild(el);
  });
  [LOOKBOOK_IMGS[3],LOOKBOOK_IMGS[4]].forEach((img,i)=>{
    const el=document.createElement('div');
    el.className='lookbook-item reveal';
    el.style.transitionDelay=((i+3)*0.1)+'s';
    el.innerHTML=`<img src="${img}" alt="Look" loading="lazy" style="height:280px;width:100%;object-fit:cover"><div class="lookbook-item-overlay"><span class="lookbook-item-tag">Shop Look</span></div>`;
    el.addEventListener('mouseenter',()=>setCursorHover('LOOK'));
    el.addEventListener('mouseleave',()=>setCursorHover(''));
    el.addEventListener('click',()=>FlairsCart.showToast('Opening lookbook...','✦'));
    grid.appendChild(el);
  });
}
buildLookbook();

// TESTIMONIALS
function buildTestimonials(){
  const grid=document.getElementById('testGrid');
  TESTIMONIALS.forEach((t,i)=>{
    const el=document.createElement('div');
    el.className='testimonial-card reveal';
    el.style.transitionDelay=(i*0.12)+'s';
    el.innerHTML=`
      <div class="test-stars">${'★'.repeat(t.stars)}</div>
      <div class="test-text">${t.text}</div>
      <div class="test-author">${t.author}</div>
      <div class="test-location">${t.location}</div>
    `;
    grid.appendChild(el);
  });
}
buildTestimonials();

// INSTAGRAM
function buildInsta(){
  const grid=document.getElementById('instaGrid');
  INSTA_IMGS.forEach((img,i)=>{
    const el=document.createElement('div');
    el.className='insta-item reveal';
    el.style.transitionDelay=(i*0.07)+'s';
    el.innerHTML=`<img src="${img}" alt="Instagram" loading="lazy"><div class="insta-overlay">◎</div>`;
    el.addEventListener('mouseenter',()=>setCursorHover('VIEW'));
    el.addEventListener('mouseleave',()=>setCursorHover(''));
    el.addEventListener('click',()=>FlairsCart.showToast('Opening Instagram...','◎'));
    grid.appendChild(el);
  });
}
buildInsta();

// SCROLL REVEAL
function initReveal(){
  const els=document.querySelectorAll('.reveal:not(.observed)');
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}});
  },{threshold:0.08});
  els.forEach(el=>{el.classList.add('observed');io.observe(el)});
}
initReveal();
setTimeout(initReveal,300);

// BACK TO TOP
window.addEventListener('scroll',()=>{
  document.getElementById('backTop').classList.toggle('show',window.scrollY>600);
});
document.getElementById('backTop').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
document.getElementById('backTop').addEventListener('mouseenter',()=>setCursorHover('TOP'));
document.getElementById('backTop').addEventListener('mouseleave',()=>setCursorHover(''));

// ============ CART FUNCTIONS (using FlairsCart) ============
function openCart(){
  FlairsCart.openCart();
}
function closeCart(){
  FlairsCart.closeCart();
}

// ADD TO CART - Uses FlairsCart
function addToCart(id, e){
  if(e) e.stopPropagation();
  const all = [...PRODUCTS, ...BASICS];
  const product = all.find(x => x.id === id);
  if(!product) return;
  
  const productForCart = {
    id: product.id,
    name: product.name,
    price: parseInt(product.price.replace(/[^0-9]/g, '')),
    priceDisplay: product.price,
    img: product.img,
    category: product.collection
  };
  
  FlairsCart.addToCart(productForCart);
  FlairsCart.openCart();
}

// ============ WISHLIST FUNCTIONS (using FlairsCart) ============
function openWishlist(){
  FlairsCart.openWishlist();
}
function closeWishlist(){
  FlairsCart.closeWishlist();
}

function addToWishlist(id, e){
  if(e) e.stopPropagation();
  const all = [...PRODUCTS, ...BASICS];
  const product = all.find(x => x.id === id);
  if(!product) return;
  
  const productForWish = {
    id: product.id,
    name: product.name,
    priceDisplay: product.price,
    img: product.img,
    category: product.collection
  };
  
  FlairsCart.addToWishlist(productForWish);
}

function moveToCart(id){
  FlairsCart.moveToCartFromWishlist(id);
}

// Cart overlay click handler (close both cart and wishlist)
document.getElementById('cartOverlay').addEventListener('click',()=>{
  FlairsCart.closeWishlist();
  FlairsCart.closeCart();
});

// ============ QUICK VIEW ============
function openQuickView(p){
  currentQvProduct = p;
  document.getElementById('qvImg').src = p.img;
  document.getElementById('qvLabel').textContent = p.collection;
  document.getElementById('qvName').textContent = p.name;
  document.getElementById('qvPrice').textContent = p.price;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeQuickView(){
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
function closeModal(e){
  if(e.target === document.getElementById('modalOverlay')) closeQuickView();
}
function selectSize(btn){
  if(btn.classList.contains('soldout')) return;
  document.querySelectorAll('.size-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}
function addToCartFromModal(){
  if(currentQvProduct){
    addToCart(currentQvProduct.id, null);
    closeQuickView();
  }
}
function addToWishlistFromModal(){
  if(currentQvProduct){
    addToWishlist(currentQvProduct.id, null);
  }
}

// ============ SEARCH ============
function openSearch(){
  document.getElementById('searchOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(()=>document.getElementById('searchInput').focus(),200);
}
function closeSearch(){
  document.getElementById('searchOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
function fillSearch(t){
  document.getElementById('searchInput').value = t;
}
function runSearch(){
  const v = document.getElementById('searchInput').value;
  if(v){
    closeSearch();
    FlairsCart.showToast(`Searching for "${v}"...`, '🔍');
  }
}
document.getElementById('searchInput').addEventListener('keydown',e=>{
  if(e.key === 'Enter') runSearch();
});
document.addEventListener('keydown',e=>{
  if(e.key === 'Escape'){
    closeSearch();
    closeQuickView();
    FlairsCart.closeCart();
    FlairsCart.closeWishlist();
  }
  if(e.key === '/' && document.activeElement.tagName !== 'INPUT'){
    e.preventDefault();
    openSearch();
  }
});

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
function handleSubscribe(){
  const email = document.getElementById('emailInput').value;
  if(!email || !email.includes('@')){
    FlairsCart.showToast('Please enter a valid email', '⚠');
    return;
  }
  document.getElementById('emailInput').value = '';
  FlairsCart.showToast('Subscribed! Welcome to Flairs Studio ✦', '✦');
}
document.getElementById('emailInput').addEventListener('keydown',e=>{
  if(e.key === 'Enter') handleSubscribe();
});

// ============ COLOR DOT INTERACTION ============
document.addEventListener('click',e=>{
  if(e.target.classList.contains('color-dot')){
    const parent = e.target.closest('.product-card');
    if(parent){
      parent.querySelectorAll('.color-dot').forEach(d=>d.classList.remove('active'));
    }
    e.target.classList.add('active');
  }
});

// ============ CURSOR HOVER FOR NAV LINKS ============
document.querySelectorAll('.nav-links a,.cat-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    cur.style.width = '14px';
    cur.style.height = '14px';
  });
  el.addEventListener('mouseleave',()=>{
    cur.style.width = '8px';
    cur.style.height = '8px';
  });
});

setTimeout(initReveal,100);
window.addEventListener('scroll',initReveal,{passive:true});