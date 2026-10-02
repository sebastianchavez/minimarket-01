document.addEventListener('DOMContentLoaded', () => {
  initPage();

  const orderId = getUrlParam('orderId');
  const order = AuthManager.getOrderById(orderId);
  const container = document.getElementById('confirmation-content');

  if (!order) {
    container.innerHTML = `
      <div class="text-center py-16">
        <div class="text-6xl mb-4">😕</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Pedido no encontrado</h2>
        <a href="index.html" class="text-green-600 hover:text-green-700 font-medium">Volver al inicio</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div id="receipt" class="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div class="bg-green-600 text-white p-8 text-center">
        <div class="text-5xl mb-3">✅</div>
        <h1 class="text-2xl font-bold mb-1">¡Pedido Confirmado!</h1>
        <p class="text-green-100">Tu pedido ha sido procesado exitosamente</p>
      </div>

      <div class="p-8">
        <div class="text-center mb-8">
          <p class="text-sm text-gray-500">Número de pedido</p>
          <p class="text-xl font-bold text-gray-800">${order.id}</p>
          <p class="text-sm text-gray-500 mt-1">${formatDate(order.date)}</p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 class="font-semibold text-gray-800 mb-2">Dirección de envío</h3>
            <p class="text-sm text-gray-600">${order.address}</p>
          </div>
          <div>
            <h3 class="font-semibold text-gray-800 mb-2">Método de envío</h3>
            <p class="text-sm text-gray-600">${order.shippingMethod}</p>
          </div>
          <div>
            <h3 class="font-semibold text-gray-800 mb-2">Método de pago</h3>
            <p class="text-sm text-gray-600">${order.paymentMethod}</p>
          </div>
          <div>
            <h3 class="font-semibold text-gray-800 mb-2">Estado</h3>
            <span class="inline-block bg-yellow-100 text-yellow-700 text-xs font-medium px-3 py-1 rounded-full">${order.status}</span>
          </div>
        </div>

        <div class="border-t pt-6 mb-6">
          <h3 class="font-semibold text-gray-800 mb-4">Productos</h3>
          <div class="space-y-3">
            ${order.items.map(item => `
              <div class="flex items-center gap-3">
                <img src="${item.image}" alt="${item.name}" class="w-14 h-14 rounded-lg object-cover">
                <div class="flex-1">
                  <p class="font-medium text-gray-800">${item.name}</p>
                  <p class="text-sm text-gray-500">Cantidad: ${item.quantity}</p>
                </div>
                <span class="font-medium">${formatCurrency(item.price * item.quantity)}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="border-t pt-4 space-y-2">
          <div class="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>${formatCurrency(order.subtotal)}</span>
          </div>
          <div class="flex justify-between text-sm text-gray-600">
            <span>Envío</span>
            <span>${order.shipping === 0 ? 'Gratis' : formatCurrency(order.shipping)}</span>
          </div>
          <div class="flex justify-between text-lg font-bold text-gray-800 border-t pt-2">
            <span>Total</span>
            <span class="text-green-700">${formatCurrency(order.total)}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-4 mt-8 no-print">
      <button onclick="window.print()" class="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
        Imprimir Comprobante
      </button>
      <a href="profile.html" class="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
        Ver Historial de Pedidos
      </a>
    </div>
  `;
});
