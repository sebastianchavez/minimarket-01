let currentFilters = { search: '', category: 'all', price: 'all', sort: 'name' };

document.addEventListener('DOMContentLoaded', () => {
  initPage();

  const urlCategory = getUrlParam('category');
  if (urlCategory) currentFilters.category = parseInt(urlCategory);

  renderCategoryFilters();
  renderProducts();

  document.getElementById('search-input').addEventListener('input', debounce((e) => {
    currentFilters.search = e.target.value.toLowerCase();
    renderProducts();
  }, 300));

  document.querySelectorAll('input[name="price"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      currentFilters.price = e.target.value;
      renderProducts();
    });
  });

  document.getElementById('sort-select').addEventListener('change', (e) => {
    currentFilters.sort = e.target.value;
    renderProducts();
  });

  document.getElementById('clear-filters').addEventListener('click', () => {
    currentFilters = { search: '', category: 'all', price: 'all', sort: 'name' };
    document.getElementById('search-input').value = '';
    document.querySelectorAll('input[name="price"]').forEach(r => r.checked = r.value === 'all');
    document.getElementById('sort-select').value = 'name';
    document.querySelectorAll('#category-filters input').forEach(r => r.checked = r.value === 'all');
    renderProducts();
  });
});

function renderCategoryFilters() {
  const container = document.getElementById('category-filters');
  let html = `
    <label class="flex items-center cursor-pointer">
      <input type="radio" name="category" value="all" ${currentFilters.category === 'all' ? 'checked' : ''} class="text-green-600 focus:ring-green-500">
      <span class="ml-2 text-sm text-gray-600">Todas</span>
    </label>
  `;
  CATEGORIES.forEach(cat => {
    html += `
      <label class="flex items-center cursor-pointer">
        <input type="radio" name="category" value="${cat.id}" ${currentFilters.category === cat.id ? 'checked' : ''} class="text-green-600 focus:ring-green-500">
        <span class="ml-2 text-sm text-gray-600">${cat.icon} ${cat.name}</span>
      </label>
    `;
  });
  container.innerHTML = html;

  document.querySelectorAll('input[name="category"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      currentFilters.category = e.target.value === 'all' ? 'all' : parseInt(e.target.value);
      renderProducts();
    });
  });
}

function getFilteredProducts() {
  let filtered = [...PRODUCTS];

  if (currentFilters.search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(currentFilters.search));
  }

  if (currentFilters.category !== 'all') {
    filtered = filtered.filter(p => p.category === currentFilters.category);
  }

  if (currentFilters.price !== 'all') {
    if (currentFilters.price === '0-2') filtered = filtered.filter(p => p.price <= 2);
    else if (currentFilters.price === '2-5') filtered = filtered.filter(p => p.price > 2 && p.price <= 5);
    else if (currentFilters.price === '5+') filtered = filtered.filter(p => p.price > 5);
  }

  switch (currentFilters.sort) {
    case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'name-desc': filtered.sort((a, b) => b.name.localeCompare(a.name)); break;
    case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
    case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
    case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
  }

  return filtered;
}

function renderProducts() {
  const filtered = getFilteredProducts();
  const grid = document.getElementById('products-grid');
  const noResults = document.getElementById('no-results');
  const count = document.getElementById('results-count');
  const clearBtn = document.getElementById('clear-filters');

  const hasFilters = currentFilters.search || currentFilters.category !== 'all' || currentFilters.price !== 'all';
  clearBtn.classList.toggle('hidden', !hasFilters);

  if (filtered.length === 0) {
    grid.classList.add('hidden');
    noResults.classList.remove('hidden');
    count.textContent = '0 productos encontrados';
  } else {
    grid.classList.remove('hidden');
    noResults.classList.add('hidden');
    count.textContent = `${filtered.length} producto${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`;
    grid.innerHTML = filtered.map(p => renderProductCard(p)).join('');
  }
}
