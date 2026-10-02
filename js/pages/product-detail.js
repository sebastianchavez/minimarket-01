document.addEventListener('DOMContentLoaded', () => {
  initPage();

  const productId = parseInt(getUrlParam('id'));
  const product = PRODUCTS.find(p => p.id === productId);

  if (!product) {
    document.getElementById('product-detail').innerHTML = `
      <div class="text-center py-16">
        <div class="text-6xl mb-4">😕</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Producto no encontrado</h2>
        <a href="products.html" class="text-green-600 hover:text-green-700 font-medium">Volver a productos</a>
      </div>
    `;
    return;
  }

  const category = CATEGORIES.find(c => c.id === product.category);
  const reviews = REVIEWS.filter(r => r.productId === product.id);

  document.getElementById('product-detail').innerHTML = `
    <nav class="text-sm text-gray-500 mb-6">
      <a href="index.html" class="hover:text-green-600">Inicio</a> / 
      <a href="products.html" class="hover:text-green-600">Productos</a> / 
      <a href="products.html?category=${product.category}" class="hover:text-green-600">${category.name}</a> / 
      <span class="text-gray-800">${product.name}</span>
    </nav>

    <div class="grid md:grid-cols-2 gap-10">
      <div>
        <img src="${product.image}" alt="${product.name}" class="w-full rounded-2xl shadow-md">
      </div>

      <div>
        <span class="inline-block bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full mb-3">${category.icon} ${category.name}</span>
        <h1 class="text-3xl font-bold text-gray-800 mb-3">${product.name}</h1>
        
        <div class="flex items-center mb-4">
          <div class="flex">${renderStars(product.rating)}</div>
          <span class="text-sm text-gray-500 ml-2">${product.rating} (${reviews.length} reseñas)</span>
        </div>

        <p class="text-3xl font-bold text-green-700 mb-6">${formatCurrency(product.price)}</p>

        <p class="text-gray-600 mb-6 leading-relaxed">${product.description}</p>

        <div class="flex items-center gap-2 mb-6">
          <span class="text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}">
            ${product.stock > 0 ? `✓ En stock (${product.stock} disponibles)` : '✗ Sin stock'}
          </span>
        </div>

        ${product.stock > 0 ? `
          <div class="flex items-center gap-4 mb-6">
            <div class="flex items-center border border-gray-300 rounded-lg">
              <button id="qty-minus" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg transition">−</button>
              <input id="qty-input" type="number" value="1" min="1" max="${product.stock}" class="w-16 text-center py-2 border-x border-gray-300 outline-none">
              <button id="qty-plus" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg transition">+</button>
            </div>
            <button id="add-to-cart" class="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
              Añadir al carrito
            </button>
          </div>
        ` : ''}

        <div class="border-t pt-6 space-y-3">
          <div class="flex items-center text-sm text-gray-600">
            <span class="mr-2">🚚</span> Envío gratis en pedidos superiores a €10
          </div>
          <div class="flex items-center text-sm text-gray-600">
            <span class="mr-2">↩️</span> Devolución gratuita en 30 días
          </div>
          <div class="flex items-center text-sm text-gray-600">
            <span class="mr-2">🔒</span> Pago seguro garantizado
          </div>
        </div>
      </div>
    </div>

    <div class="mt-16">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Reseñas (${reviews.length})</h2>
        ${AuthManager.isLoggedIn() ? `<a href="review.html?productId=${product.id}" class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition">Escribir reseña</a>` : ''}
      </div>

      ${reviews.length > 0 ? `
        <div class="space-y-4">
          ${reviews.map(r => `
            <div class="bg-white rounded-xl p-6 shadow-sm">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-semibold">${r.userName.charAt(0)}</div>
                  <div>
                    <p class="font-medium text-gray-800">${r.userName}</p>
                    <p class="text-sm text-gray-500">${formatDate(r.date)}</p>
                  </div>
                </div>
                <div class="flex">${renderStars(r.rating)}</div>
              </div>
              <p class="text-gray-600">${r.comment}</p>
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="bg-white rounded-xl p-8 text-center shadow-sm">
          <p class="text-gray-500">Aún no hay reseñas para este producto. ¡Sé el primero!</p>
        </div>
      `}
    </div>
  `;

  if (product.stock > 0) {
    const qtyInput = document.getElementById('qty-input');
    document.getElementById('qty-minus').addEventListener('click', () => {
      const val = parseInt(qtyInput.value);
      if (val > 1) qtyInput.value = val - 1;
    });
    document.getElementById('qty-plus').addEventListener('click', () => {
      const val = parseInt(qtyInput.value);
      if (val < product.stock) qtyInput.value = val + 1;
    });
    document.getElementById('add-to-cart').addEventListener('click', () => {
      CartManager.addItem(product, parseInt(qtyInput.value));
    });
  }

  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  document.getElementById('related-products').innerHTML = related.map(p => renderProductCard(p)).join('');
});
