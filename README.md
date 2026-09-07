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