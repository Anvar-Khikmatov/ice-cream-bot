class ShoppingCart {
  constructor() {
    this.cartKey = 'iceCreamCart';
    this.loadCart();
  }

  loadCart() {
    const saved = localStorage.getItem(this.cartKey);
    this.items = saved ? JSON.parse(saved) : [];
  }

  saveCart() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.items));
  }

  addToCart(product, quantity = 1) {
    const productIdStr = String(product.id);
    const existingItem = this.items.find(item => String(item.productId) === productIdStr);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        productId: productIdStr,
        name: product.name,
        price: parseInt(product.price.replace(/\D/g, '')),
        gram: product.gram,
        boxNum: product.boxNum,
        quantity: quantity,
        img: product.img,
        brand: product.brand,
        galleryName: product.galleryName
      });
    }
    
    this.saveCart();
    this.updateCartBadge();
    console.log('✅ Added to cart:', product.name, 'Qty:', quantity);
    return true;
  }

  removeFromCart(productId) {
    const pid = String(productId);
    this.items = this.items.filter(item => String(item.productId) !== pid);
    this.saveCart();
    this.updateCartBadge();
  }

  updateQuantity(productId, quantity) {
    const pid = String(productId);
    const item = this.items.find(item => String(item.productId) === pid);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.saveCart();
      this.updateCartBadge();
    }
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    this.updateCartBadge();
  }

  getTotal() {
    return this.items.reduce((sum, item) => {
      // Skip items with missing or invalid price
      if (!item.price || isNaN(item.price) || item.price <= 0) {
        return sum;
      }
      // Skip items with missing or invalid boxNum
      if (!item.boxNum || item.boxNum === '-' || isNaN(parseInt(item.boxNum))) {
        return sum;
      }
      const boxNum = parseInt(item.boxNum) || 1;
      return sum + (item.price * item.quantity * boxNum);
    }, 0);
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    const count = this.getItemCount();
    
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  formatPrice(price) {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' UZS';
  }

  
  // generateTelegramMessage() {
  //   if (this.items.length === 0) return '';

  //   let message = '🛒 *BUYURTMA XULOSASI*\n';
  //   message += '━━━━━━━━━━━━━━━━━\n\n';

  //   let totalPrice = 0;

  //   this.items.forEach((item, index) => {
  //     const boxNum = parseInt(item.boxNum) || 1;
  //     const itemTotal = item.price * item.quantity * boxNum;
  //     totalPrice += itemTotal;
      
  //     message += `${index + 1}. ${item.name}\n`;
  //     message += `   ${item.gram} × ${item.quantity} (${item.boxNum} boxes) = ${this.formatPrice(itemTotal)}\n\n`;
  //   });

  //   message += '━━━━━━━━━━━━━━━━━\n';
  //   message += `💰 *JAMI: ${this.formatPrice(totalPrice)}*\n`;
  //   message += `📦 Jami mahsulot: ${this.getItemCount()} dona\n`;

  //   return encodeURIComponent(message);
  // }

  // sendToTelegram(ownerTelegramId = 'faz_25') {
  //   const message = this.generateTelegramMessage();
  //   if (!message) {
  //     alert('Savat bo\'sh!');
  //     return;
  //   }
    
  //   window.open(`https://t.me/${ownerTelegramId}`, '_blank');
  // }


}

// Initialize cart globally
const cart = new ShoppingCart();
