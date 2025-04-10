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
          { name: "Vega", gram: "102gr", price: "6 000 UZS", img: "img/vega.png", viewImg: ["img/view/vega1.png", "img/view/vega2.png"], id: "vega", boxNum: "50", galleryName: "Classic Vega Plombir"},
          { name: "SuperChock", gram: "102gr", price: "5 500 UZS", img: "img/superChock.png", viewImg: ["img/view/supchock1.png", "img/view/supchock2.png"], id: "superChock" },
          { name: "Sandwich", gram: "106gr", price: "8 500 UZS", img: "img/sandwich.png", viewImg: [], id: "sandwich" },
          { name: "Bricket", gram: "140gr", price: "13 000 UZS", img: "img/bricket.png", viewImg: [], id: "bricket" },
          { name: "Konus Super Twist", gram: "70gr", price: "4 500 UZS", img: "img/konusTwist.png", viewImg: [], id: "konusTwist" },
          { name: "Konus Shokoladli", gram: "70gr", price: "4 500 UZS", img: "img/konusChock.png", viewImg: [], id: "konusChock"  }
      ]
  },
  icegold: {
      title: "Ice & GolD"
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
              <img src="${product.img}" alt="${product.name}">
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

  // iceCreamInfo.style.display = 'block';
}

// Swipe functionality
function initSwipe() {
  let startX, moveX;
  const images = document.querySelectorAll('.gallery-img');

  galleryTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    
  });

  galleryTrack.addEventListener('touchmove', (e) => {
    if (!startX) return;
    moveX = e.touches[0].clientX;
    const diffX = moveX - startX;
    
    galleryTrack.style.transition = 'none'
    galleryTrack.style.transform = `translateX(calc(-${currentImageIndex * 100}% + ${diffX}px))`;
  });

  galleryTrack.addEventListener('touchend', () => {
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
  });
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