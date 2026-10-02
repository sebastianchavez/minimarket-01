document.addEventListener('DOMContentLoaded', () => {
  initPage();

  const categoriesGrid = document.getElementById('categories-grid');
  categoriesGrid.innerHTML = CATEGORIES.map(cat => `
    <a href="products.html?category=${cat.id}" class="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all group">
      <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">${cat.icon}</div>
      <h3 class="font-medium text-gray-800 text-sm">${cat.name}</h3>
    </a>
  `).join('');

  const featuredGrid = document.getElementById('featured-products');
  const featured = PRODUCTS.filter(p => p.featured);
  featuredGrid.innerHTML = featured.map(p => renderProductCard(p)).join('');

  const offersGrid = document.getElementById('offers-grid');
  const offerProducts = [PRODUCTS[9], PRODUCTS[14]];
  offersGrid.innerHTML = offerProducts.map(p => `
    <div class="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-8 text-white flex items-center justify-between">
      <div>
        <span class="bg-white text-green-700 text-xs font-bold px-3 py-1 rounded-full">OFERTA</span>
        <h3 class="text-2xl font-bold mt-3">${p.name}</h3>
        <p class="text-green-100 mt-1">Ahorra en tus productos favoritos</p>
        <div class="mt-4 flex items-center gap-3">
          <span class="text-3xl font-bold">${formatCurrency(p.price)}</span>
          <a href="product-detail.html?id=${p.id}" class="bg-white text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition text-sm">Comprar ahora</a>
        </div>
      </div>
      <img src="${p.image}" alt="${p.name}" class="w-32 h-32 rounded-xl object-cover hidden sm:block">
    </div>
  `).join('');
});
