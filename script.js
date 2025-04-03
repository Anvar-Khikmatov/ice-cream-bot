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


// const icBrands = {
//     dairy: {
//         title: "DAIRY CLASSIC",
//         products: [
//             { name: "Vega", gram: " 102gr", price: "6 000 UZS", img: "img/vega.png", id: "vega" },
//             { name: "SuperChock", gram: " 102gr", price: "5 500 UZS", img: "img/superChock.png", id: "superChock" },
//             { name: "Sandwich", gram: " 106gr", price: "8 500 UZS", img: "img/sandwich.png", id: "sandwich" },
//             { name: "Bricket", gram: " 140gr", price: "13 000 UZS", img: "img/bricket.png", id: "bricket" },
//             { name: "Konus Super Twist", gram: " 70gr", price: "4 500 UZS", img: "img/konusTwist.png", id: "konusTwist" },
//             { name: "Konus Shokoladli", gram: " 70gr", price: "4 500 UZS", img: "img/konusChock.png", id: "konusChock"  }
//         ]
//     },
//     icegold: {
//         title: "Ice & GolD"
//     }
// };


// const homepage = document.querySelector('.homepage');
// const brandMenu = document.querySelector('.brand-menu');
// const iceCreamMenu = document.querySelector('.iceCream-menu');
// const backButton = document.querySelector(".title button");
// const titleName = document.querySelector('.title-name');
// const iceCreamContainer = document.querySelector(".ic-content");


// brandMenu.addEventListener('click', event => {
    
//     const clickedBrand = event.target.closest('.brands');
//     if (!clickedBrand) return;
//     const brandName = clickedBrand.getAttribute('data-brand')

   
//     homepage.style.display = "none";
//     iceCreamMenu.style.display = "block";
//     titleName.textContent = icBrands[brandName]?.title || "Unknown Brand";  // Added safety check


//     iceCreamContainer.innerHTML = "";

//     if (!icBrands[brandName]?.products) {
//         const noProductMessage = document.createElement('div')
//         noProductMessage.classList.add("no-message")
//         iceCreamContainer.appendChild(noProductMessage)
//         noProductMessage.textContent = "No products available for this brand.";
//         return;
//     }

//     let productNumber = icBrands[brandName].products.length;
//     let i = 0;
//     while (i < productNumber) {

//         let product = icBrands[brandName].products[i];
//         let icID = product.id;
        
//         const icBox = document.createElement('div');
//         icBox.classList.add("ic-box")
//         icBox.setAttribute('data-ic', icID);
    
//         const icImg = document.createElement('div');
//         icImg.classList.add("ic-img");
//         icImg.innerHTML = `<img src ="${product.img}">`;
         
//         const icDetails = document.createElement('div');
//         icDetails.classList.add("ic-details");

//         const icName = document.createElement('div');
//         icName.classList.add("ic-name");
//         icName.textContent = product.name;
        
//         const icWeight = document.createElement('span');
//         icWeight.classList.add("ic-gram");
//         icWeight.textContent = product.gram;

//         const icPrice = document.createElement('span');
//         icPrice.classList.add("ic-price");
//         icPrice.textContent = product.price;
        
//         icBox.appendChild(icImg);
//         icDetails.appendChild(icName);
//         icName.appendChild(icWeight);
//         icDetails.appendChild(icPrice);
//         icBox.appendChild(icDetails);
//         iceCreamContainer.appendChild(icBox);
       
//         i++;
//     }
// })



// backButton.addEventListener('click', () => {
//     iceCreamMenu.style.display = "none";
//     homepage.style.display = "block";
// })






// // Add this to your existing JS (after icBrands)
// const iceCreamInfo = document.querySelector('.iceCream-info');
// const galleryBackBtn = document.querySelector('.gallery-back-btn');
// const galleryTrack = document.querySelector('.gallery-track');
// const galleryDots = document.querySelector('.gallery-dots');

// let currentImageIndex = 0;

// // Update when a product is clicked
// iceCreamContainer.addEventListener('click', event => {
//   const clickedIc = event.target.closest('.ic-box');
//   if (!clickedIc) return;

  
//   galleryBackBtn.style.display = "flex";

//   const productId = clickedIc.getAttribute('data-ic');
//   const product = getProductById(productId);
  
//   if (product) {
//     showProductGallery(product);
//   }
// });

// function getProductById(id) {
//   for (const brand in icBrands) {
//     const product = icBrands[brand].products?.find(p => p.id === id);
//     if (product) return product;
//   }
//   return null;
// }

// function showProductGallery(product) {
//   // Hide current view
//   iceCreamMenu.style.display = 'none';
  
  
//   // Load images (assuming naming pattern: productId1.png, productId2.png)
//   galleryTrack.innerHTML = '';
//   galleryDots.innerHTML = '';
  
//   const images = [
//     `img/view/vega2.png`,
//     `img/view/vega1.png`
//   ].filter(Boolean); // Add more if needed
  
//   images.forEach((imgSrc, index) => {
//     // Add image
//     const img = document.createElement('img');
//     img.src = imgSrc;
//     img.className = 'gallery-img';
//     galleryTrack.appendChild(img);
    
//     // Add dot
//     const dot = document.createElement('span');
//     dot.className = 'dot' + (index === 0 ? ' active' : '');
//     galleryDots.appendChild(dot);
//   });
  
//   // Init swipe
//   initSwipe();
//   iceCreamInfo.style.display = 'block';
// }

// // Swipe logic (similar to before, but for dynamic elements)
// function initSwipe() {
//   let startX, moveX;
//   const images = document.querySelectorAll('.gallery-img');
  
//   galleryTrack.addEventListener('touchstart', (e) => {
//     startX = e.touches[0].clientX;
//   });
  
//   galleryTrack.addEventListener('touchmove', (e) => {
//     if (!startX) return;
//     moveX = e.touches[0].clientX;
//     const diffX = moveX - startX;
//     galleryTrack.style.transition = 'none';
//     galleryTrack.style.transform = `translateX(calc(-${currentImageIndex * 100}% + ${diffX}px))`;
//   });
  
//   galleryTrack.addEventListener('touchend', () => {
//     if (!moveX) return;
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

// function updateDots() {
//   const dots = document.querySelectorAll('.dot');
//   dots.forEach((dot, index) => {
//     dot.classList.toggle('active', index === currentImageIndex);
//   });
// }

  
  

  
// // Back button
// galleryBackBtn.addEventListener('click', () => {
//   // iceCreamInfo.innerHTML = '';
//   iceCreamInfo.style.display = 'none';
//   iceCreamMenu.style.display = 'block';
// });








const icBrands = {
  dairy: {
      title: "DAIRY CLASSIC",
      products: [  
          { name: "Vega", gram: "102gr", price: "6 000 UZS", img: "img/vega.png", viewImg: ["img/view/vega1.png", "img/view/vega2.png"], id: "vega" },
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

let currentImageIndex = 0;

// Event listener when a product is clicked
iceCreamContainer.addEventListener('click', event => {
  const clickedIc = event.target.closest('.ic-box');
  if (!clickedIc) return;

  galleryBackBtn.style.display = "flex";

  const productId = clickedIc.getAttribute('data-ic');
  const product = getProductById(productId);

  if (product) {
    showProductGallery(product);
  }
});

// Function to get product by ID
function getProductById(id) {
  for (const brand in icBrands) {
    const product = icBrands[brand].products?.find(p => p.id === id);
    if (product) return product;
  }
  return null;
}

// Function to show the product gallery
function showProductGallery(product) {
  iceCreamMenu.style.display = 'none';

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

  // Initialize swipe functionality for the gallery
  initSwipe();

  // Show the gallery view
  iceCreamInfo.style.display = 'block';
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
    galleryTrack.style.transition = 'none';
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

// Back button to return to the previous screen
galleryBackBtn.addEventListener('click', () => {
  iceCreamInfo.style.display = 'none';
  iceCreamMenu.style.display = 'block';
});
