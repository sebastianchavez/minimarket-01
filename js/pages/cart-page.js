document.addEventListener('DOMContentLoaded', () => {
  initPage();
  renderCart();
});

function renderCart() {
  const cart = CartManager.getCart();
  const container = document.getElementById('cart-content');

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16">
        <div class="text-6xl mb-4">🛒</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Tu carrito está vacío</h2>
        <p class="text-gray-600 mb-6">Añade productos para comenzar tu compra</p>
        <a href="products.html" class="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition">Ver Productos</a>
      </div>
    `;
    return;
  }

  const subtotal = CartManager.getTotal();
  const shipping = subtotal >= 10 ? 0 : 3;
  const total = subtotal + shipping;

  container.innerHTML = `
    <div class="grid lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-4">
        ${cart.map(item => `
          <div class="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
            <img src="${item.image}" alt="${item.name}" class="w-20 h-20 rounded-lg object-cover">
            <div class="flex-1 min-w-0">
              <a href="product-detail.html?id=${item.id}" class="font-semibold text-gray-800 hover:text-green-600 truncate block">${item.name}</a>
              <p class="text-green-700 font-medium">${formatCurrency(item.price)}</p>
            </div>
            <div class="flex items-center border border-gray-300 rounded-lg">
              <button onclick="updateQty(${item.id}, ${item.quantity - 1})" class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg">−</button>
              <span class="px-3 py-1 border-x border-gray-300">${item.quantity}</span>
              <button onclick="updateQty(${item.id}, ${item.quantity + 1})" class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg">+</button>
            </div>
            <p class="font-semibold text-gray-800 w-20 text-right">${formatCurrency(item.price * item.quantity)}</p>
            <button onclick="removeItem(${item.id})" class="text-red-500 hover:text-red-700 p-1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        `).join('')}
      </div>

      <div>
        <div class="bg-white rounded-xl p-6 shadow-sm sticky top-24">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Resumen del pedido</h3>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${formatCurrency(subtotal)}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Envío</span>
              <span>${shipping === 0 ? '<span class="text-green-600 font-medium">Gratis</span>' : formatCurrency(shipping)}</span>
            </div>
            ${shipping > 0 ? `<p class="text-xs text-gray-500">Envío gratis en pedidos superiores a €10</p>` : ''}
            <div class="border-t pt-3 flex justify-between text-lg font-bold text-gray-800">
              <span>Total</span>
              <span class="text-green-700">${formatCurrency(total)}</span>
            </div>
          </div>
          <a href="checkout.html" class="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition mt-6">Proceder al Pago</a>
          <a href="products.html" class="block w-full text-center text-green-600 hover:text-green-700 font-medium mt-3">Seguir Comprando</a>
        </div>
      </div>
    </div>
  `;
}

function updateQty(id, qty) {
  CartManager.updateQuantity(id, qty);
  renderCart();
}

function removeItem(id) {
  CartManager.removeItem(id);
  renderCart();
}
