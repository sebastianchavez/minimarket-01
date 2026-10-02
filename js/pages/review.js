document.addEventListener('DOMContentLoaded', () => {
  initPage();

  const user = AuthManager.getUser();
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  const productId = parseInt(getUrlParam('productId'));
  const product = PRODUCTS.find(p => p.id === productId);
  const container = document.getElementById('review-content');

  if (!product) {
    container.innerHTML = `
      <div class="text-center py-16">
        <div class="text-6xl mb-4">😕</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Producto no encontrado</h2>
        <a href="products.html" class="text-green-600 hover:text-green-700 font-medium">Volver a productos</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <nav class="text-sm text-gray-500 mb-6">
      <a href="products.html" class="hover:text-green-600">Productos</a> / 
      <a href="product-detail.html?id=${product.id}" class="hover:text-green-600">${product.name}</a> / 
      <span class="text-gray-800">Escribir Reseña</span>
    </nav>

    <div class="bg-white rounded-2xl shadow-sm p-8">
      <div class="flex items-center gap-4 mb-8">
        <img src="${product.image}" alt="${product.name}" class="w-20 h-20 rounded-xl object-cover">
        <div>
          <h1 class="text-xl font-bold text-gray-800">${product.name}</h1>
          <p class="text-green-700 font-medium">${formatCurrency(product.price)}</p>
        </div>
      </div>

      <form id="review-form" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">Tu valoración</label>
          <div id="star-rating" class="flex gap-1 star-rating">
            ${[1, 2, 3, 4, 5].map(i => `
              <label class="cursor-pointer">
                <input type="radio" name="rating" value="${i}" class="hidden" required>
                <svg class="w-10 h-10 text-gray-300 hover:text-yellow-400 transition" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </label>
            `).join('')}
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Título de tu reseña</label>
          <input type="text" name="title" required placeholder="Ej: ¡Excelente producto!" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tu opinión</label>
          <textarea name="comment" required rows="5" placeholder="Cuéntanos tu experiencia con este producto..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"></textarea>
        </div>

        <div class="flex gap-4">
          <a href="product-detail.html?id=${product.id}" class="flex-1 text-center py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition">Cancelar</a>
          <button type="submit" class="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">Publicar Reseña</button>
        </div>
      </form>
    </div>
  `;

  const stars = document.querySelectorAll('#star-rating label');
  stars.forEach((label, index) => {
    label.addEventListener('click', () => {
      stars.forEach((s, i) => {
        const svg = s.querySelector('svg');
        if (i <= index) {
          svg.classList.remove('text-gray-300');
          svg.classList.add('text-yellow-400');
        } else {
          svg.classList.remove('text-yellow-400');
          svg.classList.add('text-gray-300');
        }
      });
    });
  });

  document.getElementById('review-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const rating = parseInt(formData.get('rating'));

    if (!rating) {
      showToast('Por favor selecciona una valoración', 'error');
      return;
    }

    const reviews = JSON.parse(localStorage.getItem('minimarket_reviews') || '[]');
    reviews.push({
      id: Date.now(),
      productId: product.id,
      userId: user.id,
      userName: user.name,
      rating: rating,
      title: formData.get('title'),
      comment: formData.get('comment'),
      date: new Date().toISOString().split('T')[0]
    });
    localStorage.setItem('minimarket_reviews', JSON.stringify(reviews));

    showToast('¡Reseña publicada exitosamente!');
    setTimeout(() => window.location.href = `product-detail.html?id=${product.id}`, 1500);
  });
});
