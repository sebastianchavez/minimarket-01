document.addEventListener('DOMContentLoaded', () => {
  initPage();

  const orderId = getUrlParam('id');
  const order = AuthManager.getOrderById(orderId);
  const container = document.getElementById('order-detail-content');

  if (!order) {
    container.innerHTML = `
      <div class="text-center py-16">
        <div class="text-6xl mb-4">😕</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Pedido no encontrado</h2>
        <a href="profile.html" class="text-green-600 hover:text-green-700 font-medium">Volver a mis pedidos</a>
      </div>
    `;
    return;
  }

  const statusColors = {
    'Entregado': 'bg-green-100 text-green-700',
    'En camino': 'bg-blue-100 text-blue-700',
    'Procesando': 'bg-yellow-100 text-yellow-700',
    'Cancelado': 'bg-red-100 text-red-700'
  };

  const statusSteps = ['Procesando', 'En camino', 'Entregado'];
  const currentStep = statusSteps.indexOf(order.status);

  container.innerHTML = `
    <nav class="text-sm text-gray-500 mb-6">
      <a href="profile.html" class="hover:text-green-600">Mi Perfil</a> / 
      <span class="text-gray-800">Pedido ${order.id}</span>
    </nav>

    <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div class="p-6 border-b flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Pedido ${order.id}</h1>
          <p class="text-sm text-gray-500">${formatDate(order.date)}</p>
        </div>
        <span class="text-sm font-medium px-4 py-2 rounded-full ${statusColors[order.status]}">${order.status}</span>
      </div>

      ${order.status !== 'Cancelado' ? `
        <div class="p-6 border-b bg-gray-50">
          <div class="flex items-center justify-between max-w-md mx-auto">
            ${statusSteps.map((step, i) => `
              <div class="flex flex-col items-center">
                <div class="w-10 h-10 rounded-full flex items-center justify-center ${i <= currentStep ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}">
                  ${i <= currentStep ? '✓' : i + 1}
                </div>
                <span class="text-xs mt-1 ${i <= currentStep ? 'text-green-700 font-medium' : 'text-gray-500'}">${step}</span>
              </div>
              ${i < statusSteps.length - 1 ? `<div class="flex-1 h-1 mx-2 ${i < currentStep ? 'bg-green-600' : 'bg-gray-200'}"></div>` : ''}
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Productos</h2>
        <div class="space-y-4">
          ${order.items.map(item => `
            <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover">
              <div class="flex-1">
                <a href="product-detail.html?id=${item.productId}" class="font-medium text-gray-800 hover:text-green-600">${item.name}</a>
                <p class="text-sm text-gray-500">Cantidad: ${item.quantity}</p>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-800">${formatCurrency(item.price * item.quantity)}</p>
                <p class="text-xs text-gray-500">${formatCurrency(item.price)} c/u</p>
              </div>
              ${order.status === 'Entregado' ? `
                <a href="review.html?productId=${item.productId}" class="text-green-600 hover:text-green-700 text-sm font-medium whitespace-nowrap">Reseñar</a>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <div class="p-6 border-t grid md:grid-cols-2 gap-6">
        <div>
          <h3 class="font-semibold text-gray-800 mb-2">Dirección de envío</h3>
          <p class="text-sm text-gray-600">${order.address}</p>
          <p class="text-sm text-gray-600 mt-1">${order.shippingMethod}</p>
        </div>
        <div>
          <h3 class="font-semibold text-gray-800 mb-2">Método de pago</h3>
          <p class="text-sm text-gray-600">${order.paymentMethod}</p>
        </div>
      </div>

      <div class="p-6 border-t bg-gray-50">
        <div class="space-y-2 max-w-xs ml-auto">
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

    <div class="mt-6 flex gap-4">
      <a href="profile.html" class="flex-1 text-center py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition">Volver a Pedidos</a>
      <a href="products.html" class="flex-1 text-center py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">Seguir Comprando</a>
    </div>
  `;
});
