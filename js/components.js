function renderHeader() {
  const user = AuthManager.getUser();
  const cartCount = CartManager.getItemCount();

  return `
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <a href="index.html" class="flex items-center space-x-2">
            <span class="text-3xl">🛒</span>
            <span class="text-xl font-bold text-green-700">Minimarket</span>
          </a>

          <nav class="hidden md:flex items-center space-x-8">
            <a href="index.html" class="text-gray-700 hover:text-green-600 font-medium transition">Inicio</a>
            <a href="products.html" class="text-gray-700 hover:text-green-600 font-medium transition">Productos</a>
            <a href="about.html" class="text-gray-700 hover:text-green-600 font-medium transition">Nosotros</a>
            <a href="contact.html" class="text-gray-700 hover:text-green-600 font-medium transition">Contacto</a>
          </nav>

          <div class="flex items-center space-x-4">
            <a href="cart.html" class="relative p-2 text-gray-700 hover:text-green-600 transition">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/>
              </svg>
              <span id="cart-badge" class="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center" style="display: ${cartCount > 0 ? 'flex' : 'none'}">${cartCount}</span>
            </a>

            ${user ? `
              <div class="relative group">
                <button class="flex items-center space-x-2 p-2 text-gray-700 hover:text-green-600 transition">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </button>
                <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                  <div class="px-4 py-2 text-sm text-gray-700 border-b">Hola, ${user.name.split(' ')[0]}</div>
                  <a href="profile.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mi Perfil</a>
                  <a href="profile.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mis Pedidos</a>
                  <button onclick="AuthManager.logout()" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Cerrar Sesión</button>
                </div>
              </div>
            ` : `
              <a href="login.html" class="hidden sm:inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
                Iniciar Sesión
              </a>
            `}

            <button id="mobile-menu-btn" class="md:hidden p-2 text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div id="mobile-menu" class="hidden md:hidden bg-white border-t">
        <div class="px-4 py-3 space-y-2">
          <a href="index.html" class="block py-2 text-gray-700 hover:text-green-600">Inicio</a>
          <a href="products.html" class="block py-2 text-gray-700 hover:text-green-600">Productos</a>
          <a href="about.html" class="block py-2 text-gray-700 hover:text-green-600">Nosotros</a>
          <a href="contact.html" class="block py-2 text-gray-700 hover:text-green-600">Contacto</a>
          ${!user ? '<a href="login.html" class="block py-2 text-green-600 font-medium">Iniciar Sesión</a>' : ''}
        </div>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="bg-gray-900 text-white mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <span class="text-3xl">🛒</span>
              <span class="text-xl font-bold">Minimarket</span>
            </div>
            <p class="text-gray-400 text-sm">Tu tienda de confianza con los mejores productos frescos y de calidad.</p>
          </div>

          <div>
            <h3 class="font-semibold mb-4">Enlaces</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="index.html" class="hover:text-white transition">Inicio</a></li>
              <li><a href="products.html" class="hover:text-white transition">Productos</a></li>
              <li><a href="about.html" class="hover:text-white transition">Nosotros</a></li>
              <li><a href="contact.html" class="hover:text-white transition">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold mb-4">Legal</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="privacy.html" class="hover:text-white transition">Política de Privacidad</a></li>
              <li><a href="terms.html" class="hover:text-white transition">Términos y Condiciones</a></li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold mb-4">Contacto</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>📍 Av. Providencia 123, Santiago</li>
              <li>📞 +56 2 2345 6789</li>
              <li>✉️ info@minimarket.cl</li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 Minimarket. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `;
}

function renderProductCard(product) {
  return `
    <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <a href="product-detail.html?id=${product.id}" class="block">
        <div class="relative overflow-hidden">
          <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
          ${product.featured ? '<span class="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">Destacado</span>' : ''}
        </div>
      </a>
      <div class="p-4">
        <a href="product-detail.html?id=${product.id}">
          <h3 class="font-semibold text-gray-800 mb-1 hover:text-green-600 transition">${product.name}</h3>
        </a>
        <div class="flex items-center mb-2">
          ${renderStars(product.rating)}
          <span class="text-sm text-gray-500 ml-1">(${product.rating})</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-lg font-bold text-green-700">${formatCurrency(product.price)}</span>
          <button onclick="CartManager.addItem(PRODUCTS.find(p => p.id === ${product.id}))" class="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderStars(rating, interactive = false, name = 'rating') {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.floor(rating);
    const half = !filled && i === Math.ceil(rating) && rating % 1 !== 0;

    if (interactive) {
      html += `
        <label class="cursor-pointer">
          <input type="radio" name="${name}" value="${i}" class="hidden" ${i === rating ? 'checked' : ''}>
          <svg class="w-6 h-6 ${filled || half ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </label>
      `;
    } else {
      html += `
        <svg class="w-4 h-4 ${filled ? 'text-yellow-400' : half ? 'text-yellow-400' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      `;
    }
  }
  return html;
}

function initPage() {
  document.body.insertAdjacentHTML('afterbegin', renderHeader());
  document.body.insertAdjacentHTML('beforeend', renderFooter());
  CartManager.updateBadge();

  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  }
}
