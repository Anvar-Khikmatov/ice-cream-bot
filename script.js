// Add this at the VERY TOP of script.js
document.addEventListener('DOMContentLoaded', function() {
  if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    
    // Enable full mobile view
    tg.expand();
    
    // Set up menu button
    tg.MainButton.setText("🍦 MENU");
    tg.MainButton.onClick(() => {
      tg.openLink("https://arzonbozor-muzqaymoq.vercel.app"); 
    });
    tg.MainButton.show();
    
    console.log("Telegram WebApp initialized!"); // Debug check
  } else {
    console.error("Telegram WebApp not detected!");
  }
});





const icBrands = {
  dairy: {
      title: "DAIRY CLASSIC",
      products: [  
          { name: "Vega", gram: "102gr", price: "6 300 UZS", img: "img/vega.jpg", viewImg: ["img/view/vega1.png", "img/view/vega2.png"], id: "vega", boxNum: "40", galleryName: "Classic Vega Plombir"},
          { name: "SuperChoc", gram: "102gr", price: "6 130 UZS", img: "img/superChock.jpg", viewImg: ["img/view/superchock1.png", "img/view/superchock2.png"], id: "superChock", boxNum: "40", galleryName: "Super Choc" },
          { name: "Sandwich", gram: "106gr", price: "9 200 UZS", img: "img/sandwich.jpg", viewImg: ["img/view/sandwich1.jpg", "img/view/sandwich2.webp"], id: "sandwich", boxNum: "40", galleryName: "Classic Sandwich" },
          { name: "Bricket", gram: "140gr", price: "14 700 UZS", img: "img/bricket.jpg", viewImg: ["img/view/bricket1.png", "img/view/bricket2.png"], id: "bricket", boxNum: "40", galleryName: "Super Bricket" },
          { name: "Konus Super Twist", gram: "70gr", price: "5 000 UZS", img: "img/konusTwist.jpg", viewImg: ["img/view/konusTwist1.webp", "img/view/konusTwist2.webp"], id: "konusTwist", boxNum: "45", galleryName: "Super Twist" },
          { name: "Konus Shokoladli", gram: "70gr", price: "5 000 UZS", img: "img/konusChock.jpg", viewImg: ["img/view/konusChoco1.webp", "img/view/konusChoco2.webp"], id: "konusChock", boxNum: "45", galleryName: "Choco Boom"  },
          { name: "New Classic", gram: "102gr", price: "5 950 UZS", img: "img/classic.jpg", viewImg: ["img/view/classic1.webp", "img/view/classic2.webp"], id: "classic", boxNum: "40", galleryName: "New Classic Plombir Muzqaymoq"  },
          { name: "Кофе Мокко", gram: "69gr", price: "3 600 UZS", img: "img/kofeMokko.jpg", viewImg: ["img/view/kofeMokko1.webp"], id: "kofeMokko", boxNum: "60", galleryName: "Кофе Мокко"  },
          { name: "Звездочет", gram: "69gr", price: "3 280 UZS", img: "img/zvezdachet.jpg", viewImg: ["img/view/zvezdachet1.webp"], id: "zvezdachet", boxNum: "60", galleryName: "Звездочет- shokoladli eskimo plombir" },
          { name: "Tiger King", gram: "90gr", price: "3 500 UZS", img: "img/tigerKing.jpg", viewImg: ["img/view/tigerKing1.webp"], id: "tigerKing", boxNum: "60", galleryName: "Kivi va nok ta'mli muz" },
          { name: "Royal Fruits", gram: "90gr", price: "3 500 UZS", img: "img/royalFruits.jpg", viewImg: ["img/view/royalFruits1.jpg"], id: "royalFruits", boxNum: "60", galleryName: "Ananas va Apelsin ta'mli muz" },
          { name: "Creamica", gram: "80gr", price: "5 500 UZS", img: "img/creamica.jpg", viewImg: ["img/view/creamica1.webp", "img/view/creamica2.webp"], id: "creamica", boxNum: "36", galleryName: "Shokolad qoplamali va yong'oqli plombir" },
      ]
  },
  icegold: {
      title: "Ice & GolD",
      products: [
          { name: "Настоящий Пломбир", gram: "100gr", price: "- UZS", img: "img/nastPlombir.jpg", viewImg: ["img/view/nastPlombir1.jpg", "img/view/nastPlombir2.jpg"], id: "nastPlombir", boxNum: "40", galleryName: "Настоящий Пломбир - bolalikdagi haqiqiy plombir lazzatini hadya etadi."},
      ]
  }
};

const homepage = document.querySelector('.homepage');
const brandMenu = document.querySelector('.brand-menu');
const iceCreamMenu = document.querySelector('.iceCream-menu');
const backButton = document.querySelector(".title button");
const titleName = document.querySelector('.title-name');
const iceCreamContainer = document.querySelector(".ic-content");

brandMenu.addEventListener('click', event => {
  const clickedBrand = event.target.closest('.brands');
  
  if (!clickedBrand) return;
  const brandName = clickedBrand.getAttribute('data-brand');
  
  homepage.style.display = "none";
  iceCreamMenu.style.display = "block";
  titleName.textContent = icBrands[brandName]?.title || "Unknown Brand";

  iceCreamContainer.innerHTML = "";

  if (!icBrands[brandName]?.products) {
      const noProductMessage = document.createElement('div');
      noProductMessage.classList.add("no-message");
      iceCreamContainer.appendChild(noProductMessage);
      noProductMessage.textContent = "No products available for this brand.";
      return;
  }

  icBrands[brandName].products.forEach(product => {
      const icBox = document.createElement('div');
      icBox.classList.add("ic-box");
      icBox.setAttribute('data-ic', product.id);
  
      icBox.innerHTML = `
          <div class="ic-img">
              <img src="${product.img}" width="500" height="500" loading="lazy"  alt="${product.name}">
          </div>
          <div class="ic-details">
              <div class="ic-name">${product.name} <span class="ic-gram">${product.gram}</span></div>
              <span class="ic-price">${product.price}</span>
          </div>
      `;
  
      iceCreamContainer.appendChild(icBox);
  });
});

backButton.addEventListener('click', () => {
  iceCreamMenu.style.display = "none";
  homepage.style.display = "block";
});






const iceCreamInfo = document.querySelector('.iceCream-info');
const galleryBackBtn = document.querySelector('.gallery-back-btn');
const galleryTrack = document.querySelector('.gallery-track');
const galleryDots = document.querySelector('.gallery-dots');


galleryBackBtn.addEventListener('click', () => {
  iceCreamInfo.style.display = 'none';
  iceCreamMenu.style.display = 'block';
});


let currentImageIndex = 0;

// Event listener when a product is clicked
iceCreamContainer.addEventListener('click', event => {
  const clickedIc = event.target.closest('.ic-box');
  if (!clickedIc) return;

  galleryBackBtn.style.display = "flex";
  iceCreamMenu.style.display = 'none';
  iceCreamInfo.style.display = "block";

  const productId = clickedIc.getAttribute('data-ic');
  const productView = getProductById(productId);

  if (productView) {
    showProductGallery(productView);
    showProductDetails(productView);
  }
});

// Function to get product by ID
function getProductById(idPar) {
  for (const brand in icBrands) {
    const product = icBrands[brand].products?.find(p => p.id === idPar);
    if (product) return product;
  }
  return null;
}

// Function to show the product gallery
function showProductGallery(product) {
  // iceCreamMenu.style.display = 'none';

  // Reset current image index to 0 each time the gallery is opened
  currentImageIndex = 0;

  // Clear previous images and dots
  galleryTrack.innerHTML = '';
  galleryDots.innerHTML = '';

  // Load images from the product's viewImg array
  product.viewImg.forEach((imgSrc, index) => {
    const img = document.createElement('img');
    img.src = imgSrc;
    img.className = 'gallery-img';
    galleryTrack.appendChild(img);

    // Create a dot for each image
    const dot = document.createElement('span');
    dot.className = 'dot' + (index === 0 ? ' active' : '');
    galleryDots.appendChild(dot);
  });


  // Reset gallery position immediately
  galleryTrack.style.transition = 'none';
  galleryTrack.style.transform = `translateX(-${currentImageIndex * 100}%)`;
  setTimeout(() => {
    galleryTrack.style.transition = '';
  }, 50);
  
  initSwipe();
}


// Swipe functionality
// function initSwipe() {
//   const images = document.querySelectorAll('.gallery-img');
  
//   if (images.length <= 1) return;
//   let startX, moveX;
  

//   galleryTrack.addEventListener('touchstart', (e) => {
//     if (images.length <= 1) return;
//     startX = e.touches[0].clientX;
//   });

//   galleryTrack.addEventListener('touchmove', (e) => {
//     if (!startX || images.length <= 1) return;
//     moveX = e.touches[0].clientX;
//     const diffX = moveX - startX;
    
//     galleryTrack.style.transition = 'none'
//     galleryTrack.style.transform = `translateX(calc(-${currentImageIndex * 100}% + ${diffX}px))`;
//   });

//   galleryTrack.addEventListener('touchend', () => {
//     if (images.length <= 1 || !moveX) return;
//     const diffX = moveX - startX;
    

//     if (Math.abs(diffX) > 50) {
//       if (diffX > 0 && currentImageIndex > 0) {
//         currentImageIndex--;
//       } else if (diffX < 0 && currentImageIndex < images.length - 1) {
//         currentImageIndex++;
//       }
//     }

//     galleryTrack.style.transition = 'transform 0.4s ease-out';
//     galleryTrack.style.transform = `translateX(-${currentImageIndex * 100}%)`;
//     updateDots();
//     startX = null;
//     moveX = null;
//   });
// }



// Store references to the listeners for cleanup
let currentTouchStart, currentTouchMove, currentTouchEnd;

function initSwipe() {
  const images = document.querySelectorAll('.gallery-img');
  
  // ===== 1. CLEAN UP OLD LISTENERS =====
  if (currentTouchStart) {
    galleryTrack.removeEventListener('touchstart', currentTouchStart);
    galleryTrack.removeEventListener('touchmove', currentTouchMove);
    galleryTrack.removeEventListener('touchend', currentTouchEnd);
  }

  // ===== 2. DISABLE SWIPE FOR SINGLE IMAGE =====
  if (images.length <= 1) {
    // Reset position (prevent drift)
    galleryTrack.style.transform = 'translateX(0)';
    galleryTrack.style.transition = 'none';
  }

  // ===== 3. ENABLE SWIPE FOR MULTIPLE IMAGES =====
  let startX, moveX;
  
  // Define listeners (for later cleanup)
  currentTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };
  
  currentTouchMove = (e) => {
    if (!startX) return;
    moveX = e.touches[0].clientX;
    const diffX = moveX - startX;
    galleryTrack.style.transform = `translateX(calc(-${currentImageIndex * 100}% + ${diffX}px)`;
  };
  
  currentTouchEnd = () => {
    if (!moveX) return;
    const diffX = moveX - startX;
    
    if (Math.abs(diffX) > 50) {
      if (diffX > 0 && currentImageIndex > 0) {
        currentImageIndex--;
      } else if (diffX < 0 && currentImageIndex < images.length - 1) {
        currentImageIndex++;
      }
    }
    
    galleryTrack.style.transition = 'transform 0.4s ease-out';
    galleryTrack.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    updateDots();
    startX = null;
    moveX = null;
  };

  // Attach new listeners
  galleryTrack.addEventListener('touchstart', currentTouchStart);
  galleryTrack.addEventListener('touchmove', currentTouchMove);
  galleryTrack.addEventListener('touchend', currentTouchEnd);
}




// Update the active dot based on the current image index
function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentImageIndex);
  });
}




const productDetails = document.body.querySelector('.product-details');
const productPrice = document.body.querySelector('.product-price');
const productNames = document.body.querySelector('.product-names');
const productGram = document.body.querySelector('.product-gram');
const productBoxCount = document.body.querySelector('.product-box-count');
const boxNumber = document.body.querySelector('.box-number');


function showProductDetails(productIdObject){

  productPrice.textContent = productIdObject.price;
  productNames.textContent = productIdObject.galleryName;
  productGram.textContent = productIdObject.gram;
  boxNumber.textContent = productIdObject.boxNum;
  
}