const CartManager = {
  getCart() {
    const cart = localStorage.getItem('minimarket_cart');
    return cart ? JSON.parse(cart) : [];
  },

  saveCart(cart) {
    localStorage.setItem('minimarket_cart', JSON.stringify(cart));
    this.updateBadge();
  },

  addItem(product, quantity = 1) {
    const cart = this.getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    this.saveCart(cart);
    showToast(`${product.name} añadido al carrito`);
  },

  removeItem(productId) {
    const cart = this.getCart().filter(item => item.id !== productId);
    this.saveCart(cart);
  },

  updateQuantity(productId, quantity) {
    const cart = this.getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveCart(cart);
      }
    }
  },

  clearCart() {
    localStorage.removeItem('minimarket_cart');
    this.updateBadge();
  },

  getTotal() {
    return this.getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getItemCount() {
    return this.getCart().reduce((sum, item) => sum + item.quantity, 0);
  },

  updateBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
      const count = this.getItemCount();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }
};
