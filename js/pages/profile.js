document.addEventListener('DOMContentLoaded', () => {
  initPage();

  const user = AuthManager.getUser();
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  const orders = AuthManager.getOrders();
  const container = document.getElementById('profile-content');

  const statusColors = {
    'Entregado': 'bg-green-100 text-green-700',
    'En camino': 'bg-blue-100 text-blue-700',
    'Procesando': 'bg-yellow-100 text-yellow-700',
    'Cancelado': 'bg-red-100 text-red-700'
  };

  container.innerHTML = `
    <div class="grid lg:grid-cols-3 gap-8">
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <div class="text-center mb-6">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-3xl text-green-700 font-bold mx-auto mb-3">${user.name.charAt(0)}</div>
            <h2 class="text-xl font-bold text-gray-800">${user.name}</h2>
            <p class="text-sm text-gray-500">Miembro desde ${formatDate(user.memberSince)}</p>
          </div>

          <div class="space-y-4 text-sm">
            <div>
              <p class="text-gray-500">Email</p>
              <p class="font-medium text-gray-800">${user.email}</p>
            </div>
            ${user.phone ? `
              <div>
                <p class="text-gray-500">Teléfono</p>
                <p class="font-medium text-gray-800">${user.phone}</p>
              </div>
            ` : ''}
            ${user.address ? `
              <div>
                <p class="text-gray-500">Dirección</p>
                <p class="font-medium text-gray-800">${user.address}</p>
              </div>
            ` : ''}
          </div>

          <button onclick="AuthManager.logout()" class="w-full mt-6 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition font-medium text-sm">Cerrar Sesión</button>
        </div>
      </div>

      <div class="lg:col-span-2">
        <div class="bg-white rounded-xl shadow-sm overflow-hidden">
          <div class="p-6 border-b">
            <h2 class="text-xl font-bold text-gray-800">Historial de Pedidos</h2>
          </div>

          ${orders.length > 0 ? `
            <div class="divide-y">
              ${orders.map(order => `
                <div class="p-6 hover:bg-gray-50 transition">
                  <div class="flex items-center justify-between mb-3">
                    <div>
                      <p class="font-semibold text-gray-800">${order.id}</p>
                      <p class="text-sm text-gray-500">${formatDate(order.date)}</p>
                    </div>
                    <span class="text-xs font-medium px-3 py-1 rounded-full ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}">${order.status}</span>
                  </div>

                  <div class="flex items-center gap-2 mb-3">
                    ${order.items.slice(0, 3).map(item => `
                      <img src="${item.image}" alt="${item.name}" class="w-10 h-10 rounded-lg object-cover">
                    `).join('')}
                    ${order.items.length > 3 ? `<span class="text-sm text-gray-500">+${order.items.length - 3} más</span>` : ''}
                  </div>

                  <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-600">${order.items.length} producto${order.items.length !== 1 ? 's' : ''}</p>
                    <div class="flex items-center gap-3">
                      <p class="font-bold text-gray-800">${formatCurrency(order.total)}</p>
                      <a href="order-detail.html?id=${order.id}" class="text-green-600 hover:text-green-700 text-sm font-medium">Ver detalle →</a>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="p-12 text-center">
              <div class="text-5xl mb-4">📦</div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">No tienes pedidos aún</h3>
              <p class="text-gray-600 mb-4">Comienza a comprar y verás tus pedidos aquí</p>
              <a href="products.html" class="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition">Ver Productos</a>
            </div>
          `}
        </div>
      </div>
    </div>
  `;
});
