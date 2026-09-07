# Prueba técnica Frontend

Aplicación desarrollada con React como parte de una prueba técnica frontend.

La aplicación permite consultar un listado de dispositivos móviles, buscar productos por marca o modelo, consultar el detalle de cada producto y añadir productos al carrito.

## Tecnologías utilizadas

- React
- JavaScript ES6
- React Router
- Vite
- Vitest
- React Testing Library
- ESLint

## Funcionalidades

### Listado de productos

- Obtención de los productos desde la API.
- Visualización de los productos en formato responsive.
- Hasta 4 productos por fila.
- Búsqueda en tiempo real por marca o modelo.
- Acceso al detalle de cada producto.

### Detalle del producto

Se muestra la información principal del dispositivo:

- Imagen.
- Marca.
- Modelo.
- Precio.
- CPU.
- RAM.
- Sistema operativo.
- Resolución de pantalla.
- Batería.
- Cámaras.
- Dimensiones.
- Peso.

También se pueden seleccionar las opciones disponibles de:

- Color.
- Almacenamiento.

Cuando un producto solo dispone de una opción, esta se selecciona automáticamente.

Desde esta vista se puede añadir el producto al carrito o volver al listado.

### Carrito

El número de productos añadidos al carrito se muestra en el header de la aplicación.

El contador se actualiza al añadir un producto y se persiste en `localStorage`.

## Caché

Se ha implementado una caché en cliente utilizando `localStorage`.

Los datos obtenidos de la API se almacenan durante 1 hora para evitar realizar peticiones innecesarias.

La caché se aplica tanto al listado de productos como al detalle individual de cada producto.

Una vez que la caché caduca, se realiza una nueva petición a la API.

## API

La aplicación utiliza los siguientes endpoints:

```text
GET /api/product
GET /api/product/:id
POST /api/cart
```

Para añadir un producto al carrito se envían el identificador del producto, el código del color seleccionado y el código del almacenamiento seleccionado.

Ejemplo:

```json
{
  "id": "product-id",
  "colorCode": "color-code",
  "storageCode": "storage-code"
}
```

## Estructura del proyecto

```text
src/
├── components/
│   ├── Header/
│   ├── ListView/
│   ├── ProductCard/
│   ├── ProductOptions/
│   └── SearchBox/
├── pages/
│   ├── ProductDetail/
│   └── ProductList/
├── services/
│   └── productService.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

Los tests de los componentes están colocados junto a los propios componentes.

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

## Scripts

### Desarrollo

Para iniciar la aplicación en modo desarrollo:

```bash
npm run START
```

### Tests

Para ejecutar los tests:

```bash
npm run TEST
```

### Lint

Para comprobar el código con ESLint:

```bash
npm run LINT
```

### Build de producción

Para generar la build de producción:

```bash
npm run BUILD
```

También se puede comprobar la build de producción mediante:

```bash
npm run preview
```

## Tests

Se han añadido tests utilizando Vitest y React Testing Library.

Actualmente la suite cuenta con:

- 8 archivos de test.
- 32 tests.

Los tests cubren, entre otros aspectos:

- Renderizado de componentes.
- Búsqueda y filtrado de productos.
- Navegación.
- Selección de color y almacenamiento.
- Añadir productos al carrito.
- Peticiones a la API.
- Caché del listado y del detalle.
- Header y contador del carrito.

Las llamadas a la API se mockean en los tests para evitar que dependan de la disponibilidad del servicio externo.

## Decisiones técnicas

### React Router

Se utiliza React Router para gestionar las dos vistas de la aplicación manteniendo el funcionamiento como SPA.

### Caché

Se utiliza `localStorage` para almacenar temporalmente los datos obtenidos de la API junto con su fecha de almacenamiento.

### Carrito

El contador del carrito se mantiene en `App` para poder mostrarlo en el header independientemente de la vista actual.

El valor también se persiste en `localStorage`.

### Tests

Para los tests de componentes se utiliza React Testing Library y Vitest.

Las llamadas a la API se mockean para mantener los tests independientes de la disponibilidad del servicio externo.

## Validación

Antes de finalizar el proyecto se han ejecutado correctamente los siguientes comandos:

```bash
npm run TEST
npm run LINT
npm run BUILD
```

Resultado actual de los tests:

```text
8 Test Files
32 Tests
32 Passed
```