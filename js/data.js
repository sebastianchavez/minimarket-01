const CATEGORIES = [
  { id: 1, name: 'Frutas y Verduras', icon: '🍎', slug: 'frutas-verduras', image: 'https://picsum.photos/seed/cat-fruits/400/300' },
  { id: 2, name: 'Lácteos', icon: '🥛', slug: 'lacteos', image: 'https://picsum.photos/seed/cat-dairy/400/300' },
  { id: 3, name: 'Bebidas', icon: '🥤', slug: 'bebidas', image: 'https://picsum.photos/seed/cat-drinks/400/300' },
  { id: 4, name: 'Snacks', icon: '🍿', slug: 'snacks', image: 'https://picsum.photos/seed/cat-snacks/400/300' },
  { id: 5, name: 'Limpieza', icon: '🧹', slug: 'limpieza', image: 'https://picsum.photos/seed/cat-clean/400/300' },
  { id: 6, name: 'Panadería', icon: '🍞', slug: 'panaderia', image: 'https://picsum.photos/seed/cat-bread/400/300' }
];

const PRODUCTS = [
  { id: 1, name: 'Manzanas Rojas', price: 2500, category: 1, stock: 50, rating: 4.5, image: 'https://picsum.photos/seed/prod-apple/400/400', description: 'Manzanas rojas frescas, crujientes y dulces. Perfectas para comer solas o en ensaladas. Origen: Valle del Jerte.', featured: true },
  { id: 2, name: 'Plátanos', price: 1800, category: 1, stock: 80, rating: 4.7, image: 'https://picsum.photos/seed/prod-banana/400/400', description: 'Plátanos de Canarias maduros y dulces. Ricos en potasio y energía natural.', featured: true },
  { id: 3, name: 'Tomates', price: 3200, category: 1, stock: 40, rating: 4.3, image: 'https://picsum.photos/seed/prod-tomato/400/400', description: 'Tomates maduros de huerta, ideales para ensaladas y salsas. Sin pesticidas.', featured: false },
  { id: 4, name: 'Lechuga Romana', price: 1500, category: 1, stock: 30, rating: 4.0, image: 'https://picsum.photos/seed/prod-lettuce/400/400', description: 'Lechuga romana fresca y crujiente. Perfecta para ensaladas y wraps.', featured: false },
  { id: 5, name: 'Leche Entera 1L', price: 1200, category: 2, stock: 100, rating: 4.6, image: 'https://picsum.photos/seed/prod-milk/400/400', description: 'Leche entera pasteurizada de alta calidad. Rica en calcio y vitaminas.', featured: true },
  { id: 6, name: 'Yogur Natural', price: 800, category: 2, stock: 60, rating: 4.4, image: 'https://picsum.photos/seed/prod-yogurt/400/400', description: 'Yogur natural sin azúcar añadido. Cremoso y delicioso.', featured: true },
  { id: 7, name: 'Queso Manchego', price: 8500, category: 2, stock: 20, rating: 4.8, image: 'https://picsum.photos/seed/prod-cheese/400/400', description: 'Queso manchego curado, sabor intenso y textura firme. Denominación de origen.', featured: false },
  { id: 8, name: 'Mantequilla', price: 2300, category: 2, stock: 45, rating: 4.2, image: 'https://picsum.photos/seed/prod-butter/400/400', description: 'Mantequilla cremosa de primera calidad. Ideal para cocinar y untar.', featured: false },
  { id: 9, name: 'Agua Mineral 1.5L', price: 900, category: 3, stock: 200, rating: 4.5, image: 'https://picsum.photos/seed/prod-water/400/400', description: 'Agua mineral natural de manantial. Pura y refrescante.', featured: true },
  { id: 10, name: 'Zumo de Naranja 1L', price: 2800, category: 3, stock: 50, rating: 4.6, image: 'https://picsum.photos/seed/prod-juice/400/400', description: 'Zumo de naranja 100% natural, sin azúcares añadidos ni conservantes.', featured: true },
  { id: 11, name: 'Coca-Cola 2L', price: 2100, category: 3, stock: 80, rating: 4.3, image: 'https://picsum.photos/seed/prod-cola/400/400', description: 'Refresco de cola clásico. Sabor inconfundible.', featured: false },
  { id: 12, name: 'Cerveza Artesanal', price: 3500, category: 3, stock: 35, rating: 4.7, image: 'https://picsum.photos/seed/prod-beer/400/400', description: 'Cerveza artesanal elaborada con ingredientes naturales. Sabor único.', featured: false },
  { id: 13, name: 'Patatas Fritas', price: 2200, category: 4, stock: 70, rating: 4.4, image: 'https://picsum.photos/seed/prod-chips/400/400', description: 'Patatas fritas crujientes con sal marina. Snack perfecto para cualquier momento.', featured: true },
  { id: 14, name: 'Galletas de Chocolate', price: 1900, category: 4, stock: 55, rating: 4.5, image: 'https://picsum.photos/seed/prod-cookies/400/400', description: 'Galletas con chips de chocolate. Suaves por dentro y crujientes por fuera.', featured: true },
  { id: 15, name: 'Chocolate con Leche', price: 2500, category: 4, stock: 40, rating: 4.8, image: 'https://picsum.photos/seed/prod-chocolate/400/400', description: 'Chocolate con leche cremoso. Elaborado con cacao seleccionado.', featured: false },
  { id: 16, name: 'Frutos Secos Mix', price: 4500, category: 4, stock: 30, rating: 4.6, image: 'https://picsum.photos/seed/prod-nuts/400/400', description: 'Mezcla de almendras, nueces y anacardos. Snack saludable y energético.', featured: false },
  { id: 17, name: 'Detergente Líquido', price: 6800, category: 5, stock: 25, rating: 4.3, image: 'https://picsum.photos/seed/prod-detergent/400/400', description: 'Detergente líquido concentrado para ropa. Eficaz incluso en agua fría.', featured: false },
  { id: 18, name: 'Lavavajillas', price: 3200, category: 5, stock: 40, rating: 4.1, image: 'https://picsum.photos/seed/prod-dishsoap/400/400', description: 'Gel lavavajillas a mano con aroma a limón. Suave con las manos.', featured: false },
  { id: 19, name: 'Papel Higiénico x12', price: 5500, category: 5, stock: 60, rating: 4.4, image: 'https://picsum.photos/seed/prod-toilet/400/400', description: 'Papel higiénico suave y resistente. Pack de 12 rollos.', featured: false },
  { id: 20, name: 'Limpiador Multiusos', price: 2800, category: 5, stock: 35, rating: 4.2, image: 'https://picsum.photos/seed/prod-cleaner/400/400', description: 'Limpiador multiusos con desinfectante. Para todas las superficies.', featured: false },
  { id: 21, name: 'Pan de Molde', price: 1800, category: 6, stock: 30, rating: 4.3, image: 'https://picsum.photos/seed/prod-bread/400/400', description: 'Pan de molde integral, suave y esponjoso. Recién horneado.', featured: true },
  { id: 22, name: 'Croissants x6', price: 3500, category: 6, stock: 20, rating: 4.7, image: 'https://picsum.photos/seed/prod-croissant/400/400', description: 'Croissants de mantequilla, hojaldrados y dorados. Pack de 6 unidades.', featured: true },
  { id: 23, name: 'Magdalenas x12', price: 2900, category: 6, stock: 25, rating: 4.5, image: 'https://picsum.photos/seed/prod-muffins/400/400', description: 'Magdalenas caseras, esponjosas y con sabor a limón. Pack de 12.', featured: false },
  { id: 24, name: 'Baguette', price: 1200, category: 6, stock: 15, rating: 4.4, image: 'https://picsum.photos/seed/prod-baguette/400/400', description: 'Baguette francesa crujiente por fuera y tierna por dentro.', featured: false }
];

const REVIEWS = [
  { id: 1, productId: 1, userId: 1, userName: 'María García', rating: 5, comment: 'Manzanas increíbles, muy frescas y dulces. Las compro cada semana.', date: '2026-09-15' },
  { id: 2, productId: 1, userId: 2, userName: 'Carlos López', rating: 4, comment: 'Buenas manzanas, aunque algunas venían un poco verdes.', date: '2026-09-10' },
  { id: 3, productId: 1, userId: 3, userName: 'Ana Martínez', rating: 5, comment: 'Excelente calidad, muy contenta con la compra.', date: '2026-09-08' },
  { id: 4, productId: 2, userId: 1, userName: 'María García', rating: 5, comment: 'Los mejores plátanos que he probado. Dulces y en su punto.', date: '2026-09-20' },
  { id: 5, productId: 2, userId: 4, userName: 'Pedro Sánchez', rating: 4, comment: 'Muy buenos, llegaron perfectos de maduración.', date: '2026-09-18' },
  { id: 6, productId: 5, userId: 2, userName: 'Carlos López', rating: 5, comment: 'Leche fresca y de buena calidad. Siempre compro aquí.', date: '2026-09-22' },
  { id: 7, productId: 5, userId: 3, userName: 'Ana Martínez', rating: 4, comment: 'Buena leche, sabor natural.', date: '2026-09-19' },
  { id: 8, productId: 9, userId: 4, userName: 'Pedro Sánchez', rating: 5, comment: 'Agua pura y refrescante. Perfecta para el verano.', date: '2026-09-25' },
  { id: 9, productId: 10, userId: 1, userName: 'María García', rating: 5, comment: 'Zumo natural delicioso, se nota que es de naranja de verdad.', date: '2026-09-23' },
  { id: 10, productId: 13, userId: 2, userName: 'Carlos López', rating: 4, comment: 'Patatas crujientes y sabrosas. Buen snack.', date: '2026-09-21' },
  { id: 11, productId: 14, userId: 3, userName: 'Ana Martínez', rating: 5, comment: 'Las mejores galletas con chocolate, mi favoritas.', date: '2026-09-24' },
  { id: 12, productId: 15, userId: 4, userName: 'Pedro Sánchez', rating: 5, comment: 'Chocolate cremoso y delicioso. Calidad premium.', date: '2026-09-26' },
  { id: 13, productId: 21, userId: 1, userName: 'María García', rating: 4, comment: 'Pan suave y fresco, ideal para sándwiches.', date: '2026-09-27' },
  { id: 14, productId: 22, userId: 2, userName: 'Carlos López', rating: 5, comment: 'Croissants increíbles, como en una pastelería francesa.', date: '2026-09-28' },
  { id: 15, productId: 7, userId: 3, userName: 'Ana Martínez', rating: 5, comment: 'Queso manchego de primera, sabor intenso y auténtico.', date: '2026-09-29' }
];

const TEAM = [
  { id: 1, name: 'Roberto Fernández', role: 'Director General', image: 'https://picsum.photos/seed/team-1/300/300', bio: 'Con más de 20 años de experiencia en el sector retail, lidera Minimarket con visión y pasión por el servicio al cliente.' },
  { id: 2, name: 'Laura Jiménez', role: 'Gerente de Operaciones', image: 'https://picsum.photos/seed/team-2/300/300', bio: 'Experta en logística y gestión de inventarios. Asegura que siempre tengamos los productos frescos y disponibles.' },
  { id: 3, name: 'Miguel Torres', role: 'Director de Marketing', image: 'https://picsum.photos/seed/team-3/300/300', bio: 'Creativo y estratégico, conecta nuestra marca con la comunidad a través de iniciativas innovadoras.' },
  { id: 4, name: 'Sofía Ramírez', role: 'Jefa de Logística', image: 'https://picsum.photos/seed/team-4/300/300', bio: 'Garantiza que cada pedido llegue a tiempo y en perfectas condiciones a nuestros clientes.' }
];

const MOCK_ORDERS = [
  {
    id: 'ORD-001',
    date: '2026-09-28',
    status: 'Entregado',
    items: [
      { productId: 1, name: 'Manzanas Rojas', price: 2500, quantity: 3, image: 'https://picsum.photos/seed/prod-apple/400/400' },
      { productId: 5, name: 'Leche Entera 1L', price: 1200, quantity: 2, image: 'https://picsum.photos/seed/prod-milk/400/400' },
      { productId: 21, name: 'Pan de Molde', price: 1800, quantity: 1, image: 'https://picsum.photos/seed/prod-bread/400/400' }
    ],
    subtotal: 11700,
    shipping: 3000,
    total: 14700,
    address: 'Av. Providencia 123, Santiago',
    shippingMethod: 'Estándar (2-3 días)',
    paymentMethod: 'Tarjeta de crédito'
  },
  {
    id: 'ORD-002',
    date: '2026-09-30',
    status: 'En camino',
    items: [
      { productId: 13, name: 'Patatas Fritas', price: 2200, quantity: 2, image: 'https://picsum.photos/seed/prod-chips/400/400' },
      { productId: 10, name: 'Zumo de Naranja 1L', price: 2800, quantity: 1, image: 'https://picsum.photos/seed/prod-juice/400/400' }
    ],
    subtotal: 7200,
    shipping: 3000,
    total: 10200,
    address: 'Av. Providencia 123, Santiago',
    shippingMethod: 'Express (24h)',
    paymentMethod: 'PayPal'
  },
  {
    id: 'ORD-003',
    date: '2026-10-01',
    status: 'Procesando',
    items: [
      { productId: 22, name: 'Croissants x6', price: 3500, quantity: 1, image: 'https://picsum.photos/seed/prod-croissant/400/400' },
      { productId: 6, name: 'Yogur Natural', price: 800, quantity: 4, image: 'https://picsum.photos/seed/prod-yogurt/400/400' },
      { productId: 15, name: 'Chocolate con Leche', price: 2500, quantity: 2, image: 'https://picsum.photos/seed/prod-chocolate/400/400' }
    ],
    subtotal: 11700,
    shipping: 0,
    total: 11700,
    address: 'Avenida de la Constitución 45, Santiago',
    shippingMethod: 'Gratis (+$10.000)',
    paymentMethod: 'Tarjeta de crédito'
  },
  {
    id: 'ORD-004',
    date: '2026-09-15',
    status: 'Cancelado',
    items: [
      { productId: 17, name: 'Detergente Líquido', price: 6800, quantity: 1, image: 'https://picsum.photos/seed/prod-detergent/400/400' }
    ],
    subtotal: 6800,
    shipping: 3000,
    total: 9800,
    address: 'Av. Providencia 123, Santiago',
    shippingMethod: 'Estándar (2-3 días)',
    paymentMethod: 'Transferencia bancaria'
  }
];

const MOCK_USER = {
  id: 1,
  name: 'Juan Pérez',
  email: 'juan@email.com',
  phone: '+56 9 8765 4321',
  address: 'Av. Providencia 123, Santiago',
  memberSince: '2025-03-15'
};
