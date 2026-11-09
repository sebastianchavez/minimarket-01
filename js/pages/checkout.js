document.addEventListener('DOMContentLoaded', () => {
  initPage();

  const cart = CartManager.getCart();
  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  const user = AuthManager.getUser();
  const container = document.getElementById('checkout-content');
  const subtotal = CartManager.getTotal();

  container.innerHTML = `
    <form id="checkout-form" class="grid lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Dirección de Envío</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input type="text" name="name" required value="${user?.name || ''}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input type="tel" name="phone" required value="${user?.phone || ''}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
              <input type="text" name="address" required value="${user?.address || ''}" placeholder="Calle, número, piso, puerta" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
              <input type="text" name="city" required value="Santiago" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Código Postal</label>
              <input type="text" name="zip" required placeholder="7500000" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Método de Envío</h2>
          <div class="space-y-3">
            <label class="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition has-[:checked]:border-green-500 has-[:checked]:bg-green-50">
              <input type="radio" name="shipping" value="standard" checked class="text-green-600 focus:ring-green-500">
              <div class="ml-3 flex-1">
                <p class="font-medium text-gray-800">Estándar (2-3 días)</p>
                <p class="text-sm text-gray-500">Entrega en 2-3 días hábiles</p>
              </div>
              <span class="font-semibold text-gray-800">$3.000</span>
            </label>
            <label class="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition has-[:checked]:border-green-500 has-[:checked]:bg-green-50">
              <input type="radio" name="shipping" value="express" class="text-green-600 focus:ring-green-500">
              <div class="ml-3 flex-1">
                <p class="font-medium text-gray-800">Express (24h)</p>
                <p class="text-sm text-gray-500">Entrega al día siguiente</p>
              </div>
              <span class="font-semibold text-gray-800">$5.000</span>
            </label>
            <label class="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition has-[:checked]:border-green-500 has-[:checked]:bg-green-50">
              <input type="radio" name="shipping" value="free" class="text-green-600 focus:ring-green-500" ${subtotal >= 10000 ? '' : 'disabled'}>
              <div class="ml-3 flex-1">
                <p class="font-medium text-gray-800">Gratis (+$10.000)</p>
                <p class="text-sm text-gray-500">${subtotal >= 10000 ? '¡Pedido eligible!' : 'Pedido mínimo $10.000'}</p>
              </div>
              <span class="font-semibold text-green-600">Gratis</span>
            </label>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Método de Pago</h2>
          <div class="space-y-3">
            <label class="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition has-[:checked]:border-green-500 has-[:checked]:bg-green-50">
              <input type="radio" name="payment" value="card" checked class="text-green-600 focus:ring-green-500">
              <span class="ml-3 font-medium text-gray-800">💳 Tarjeta de crédito/débito</span>
            </label>
            <label class="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition has-[:checked]:border-green-500 has-[:checked]:bg-green-50">
              <input type="radio" name="payment" value="paypal" class="text-green-600 focus:ring-green-500">
              <span class="ml-3 font-medium text-gray-800">🅿️ PayPal</span>
            </label>
            <label class="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition has-[:checked]:border-green-500 has-[:checked]:bg-green-50">
              <input type="radio" name="payment" value="transfer" class="text-green-600 focus:ring-green-500">
              <span class="ml-3 font-medium text-gray-800">🏦 Transferencia bancaria</span>
            </label>
          </div>

          <div id="card-fields" class="mt-4 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Número de tarjeta</label>
              <input type="text" placeholder="1234 5678 9012 3456" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Fecha de expiración</label>
                <input type="text" placeholder="MM/AA" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input type="text" placeholder="123" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="bg-white rounded-xl p-6 shadow-sm sticky top-24">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Tu Pedido</h3>
          <div class="space-y-3 mb-4 max-h-60 overflow-y-auto">
            ${cart.map(item => `
              <div class="flex items-center gap-3">
                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded-lg object-cover">
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-800 truncate">${item.name}</p>
                  <p class="text-xs text-gray-500">x${item.quantity}</p>
                </div>
                <span class="text-sm font-medium">${formatCurrency(item.price * item.quantity)}</span>
              </div>
            `).join('')}
          </div>
          <div class="border-t pt-4 space-y-2 text-sm">
            <div class="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${formatCurrency(subtotal)}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Envío</span>
              <span id="shipping-cost">$3.000</span>
            </div>
            <div class="border-t pt-2 flex justify-between text-lg font-bold text-gray-800">
              <span>Total</span>
              <span id="total-cost" class="text-green-700">${formatCurrency(subtotal + 3000)}</span>
            </div>
          </div>
          <button type="submit" class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition mt-6">Confirmar Pedido</button>
        </div>
      </div>
    </form>
  `;

  document.querySelectorAll('input[name="shipping"]').forEach(radio => {
    radio.addEventListener('change', updateTotals);
  });

  document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      document.getElementById('card-fields').style.display = e.target.value === 'card' ? 'block' : 'none';
    });
  });

  document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const shippingMethod = formData.get('shipping');
    const shippingCosts = { standard: 3000, express: 5000, free: 0 };
    const shippingNames = { standard: 'Estándar (2-3 días)', express: 'Express (24h)', free: 'Gratis (+$10.000)' };
    const paymentNames = { card: 'Tarjeta de crédito', paypal: 'PayPal', transfer: 'Transferencia bancaria' };

    const order = {
      id: 'ORD-' + String(Date.now()).slice(-6),
      date: new Date().toISOString().split('T')[0],
      status: 'Procesando',
      items: cart.map(item => ({ ...item })),
      subtotal,
      shipping: shippingCosts[shippingMethod],
      total: subtotal + shippingCosts[shippingMethod],
      address: `${formData.get('address')}, ${formData.get('city')}`,
      shippingMethod: shippingNames[shippingMethod],
      paymentMethod: paymentNames[formData.get('payment')]
    };

    AuthManager.saveOrder(order);
    CartManager.clearCart();
    window.location.href = `order-confirmation.html?orderId=${order.id}`;
  });
});

function updateTotals() {
  const subtotal = CartManager.getTotal();
  const shipping = document.querySelector('input[name="shipping"]:checked').value;
  const costs = { standard: 3000, express: 5000, free: 0 };
  const cost = costs[shipping];

  document.getElementById('shipping-cost').textContent = cost === 0 ? 'Gratis' : formatCurrency(cost);
  document.getElementById('total-cost').textContent = formatCurrency(subtotal + cost);
}
