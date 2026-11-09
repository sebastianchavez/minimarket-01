# Minimarket — Template ecommerce

Template de minimarket con 16 páginas HTML existentes.

## Alcance

Incluye catálogo con filtros, carrito, cuenta, pedidos y reseñas de demostración. Usa localStorage para datos del navegador; los pagos y el envío de formularios requieren una integración real.

Los precios, contactos y datos de cliente son ejemplos para personalizar. La presencia de un formulario o botón no garantiza una integración con servicios externos.

## Tecnologías y estructura

- HTML para las páginas.
- Tailwind CSS mediante CDN; no requiere compilar estilos para la vista previa.
- CSS local: `css/custom.css`.
- JavaScript local: `js/data.js`, `js/components.js`, `js/utils.js`, `js/cart.js`, `js/auth.js y js/pages/`.
- localStorage para el estado de demostración en el navegador.
- Fuentes, iconos o imágenes externas según cada pantalla; se necesita conexión para cargar esos recursos.

## Vista previa local

Desde esta carpeta, inicia un servidor estático. Por ejemplo, con Node.js y npm disponibles:

```sh
npx --yes http-server . -p 8000
```

Abre [la pantalla inicial](http://localhost:8000/index.html) en el navegador. No hay un package.json ni un paso de build propio del template.

## Páginas incluidas

Las rutas son relativas a esta carpeta.

| Archivo | Título de la pantalla |
| --- | --- |
| `about.html` | Sobre Nosotros - Minimarket |
| `cart.html` | Carrito - Minimarket |
| `checkout.html` | Checkout - Minimarket |
| `contact.html` | Contacto - Minimarket |
| `forgot-password.html` | Recuperar Contraseña - Minimarket |
| `index.html` | Minimarket - Tu tienda de confianza |
| `login.html` | Iniciar Sesión - Minimarket |
| `order-confirmation.html` | Confirmación de Pedido - Minimarket |
| `order-detail.html` | Detalle del Pedido - Minimarket |
| `privacy.html` | Política de Privacidad - Minimarket |
| `product-detail.html` | Detalle del Producto - Minimarket |
| `products.html` | Productos - Minimarket |
| `profile.html` | Mi Perfil - Minimarket |
| `register.html` | Registro - Minimarket |
| `review.html` | Escribir Reseña - Minimarket |
| `terms.html` | Términos y Condiciones - Minimarket |

## Personalización

- Edita los textos, contactos e imágenes en los HTML y los datos de catálogo en `js/data.js`.
- Ajusta los estilos en `css/custom.css` y la configuración de Tailwind de las páginas cuando corresponda.
- Los importes del template están presentados en CLP. Mantén el formato sin decimales y los contactos de ejemplo para Chile al personalizarlo.
- Comprueba los cambios en móvil, tablet y escritorio.
- Para reiniciar la demostración, elimina únicamente las claves de localStorage de este template desde las herramientas de desarrollo del navegador.

## Integración

Antes de usar el template en una tienda operativa, conecta los servicios que correspondan: catálogo, inventario, autenticación, pedidos, pagos y contacto. Revisa las rutas y sustituye el contenido de muestra y los textos legales por los del negocio.
