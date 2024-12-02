# Proyecto Filmoteca 2024

La Filmoteca 2024 permite a un usuario que se identifique en la App, a crear su propia BBDD de películas.

Un usuario dado de alta podrá crear un máximo de 100 películas en su BBDD, donde podrá añadir título de la película, título original, portada (enlace http a la imagen que el usuario quiera), reparto, año, director, música, genero, sinopsis y enlace video (http al lugar que el usuario quiera)

Un usuario premium podrá crear hasta 5.000 películas, crear sus propios tags personales en cada película y un campo descripción para poder añadir comentarios y anotaciones propios y personales referente a la película.
Además podrá crear un rating en sus peliculas y luego hacer búsquedas por los criterios de calificación que haya realizado.

Este es un proyecto que consta de dos partes: el **backend** y el **frontend**. A continuación se describen los pasos para ejecutar cada parte y las tecnologías utilizadas.

<img src="https://github.com/user-attachments/assets/bc984c92-1123-41d5-ad7f-cc3e2a400470" width="350">

---

## Backend

### Comando para ejecutar la aplicación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/Ascis2000/01_Filmoteca_2024
    cd backend
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Ejecuta la aplicación en modo desarrollo:
    ```bash
    npm run dev
    ```

### Tecnología usada

- **Node.js**: El servidor está construido con Node.js, utilizando Express como framework principal.
- **Express**: Framework para la creación del servidor y manejo de rutas.
- **Base de Datos**: PostgreSQL
- **Comandos y Rutas**:
    - El backend está configurado con las siguientes rutas principales:
      - `GET /api/peliculas`: Devuelve una lista de películas.
      - `POST /api/comentarios`: Permite agregar un comentario a una película.
      - `GET /api/usuarios`: Devuelve la información del usuario.
     
    - Para mas información:
         - En el repositorio backend existe un ejecutable swagger: openapi3_0.json
         - En el repositorio backend existe un json postman: Filmoteca2024.postman_collection.json

---

## Frontend

### Comando para ejecutar la aplicación

1. Clona el repositorio:
    ```bash
    cd frontend
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Ejecuta la aplicación en modo desarrollo:
    ```bash
    npm run dev
    ```

### Tecnología usada

- **React**: Framework utilizado para construir la interfaz de usuario de la aplicación.
- **Vite**: Herramienta de construcción que permite un desarrollo rápido con soporte para React.
- **React Router**: Para gestionar la navegación entre diferentes vistas dentro de la aplicación.
- **js-cookie**: Para manejar las cookies y almacenamiento de sesión de los usuarios.
- **jwt-decode**: Para decodificar el token JWT en el cliente y verificar la autenticación del usuario.

---

### Herramientas
- **Postman**: llamadas a los endpoints para hacer validaciones.
<img src="https://github.com/user-attachments/assets/4c730ee3-8c6a-42c5-82bf-ec4d6e7cc3e4" width="350">


## Despliegue

### Backend

1. **Render**: El backend está desplegado en [Render]([https://render.com](https://zero1-filmoteca-2024.onrender.com/)).

### Frontend

1. **Render**: El frontend está desplegado en [Render]([https://render.com](https://zero1-filmoteca-2024.onrender.com/)).
2. **URL de la aplicación**: por desplegar

---

# SWAGGER
<img src="https://github.com/user-attachments/assets/ffaf2268-4607-45c6-b147-a71ca9fd9ebe" width="300">

## Contribuciones

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:
1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b nombre-de-la-rama`).
3. Realiza tus cambios y realiza un commit (`git commit -m 'Agregando nueva funcionalidad'`).
4. Haz push a la rama (`git push origin nombre-de-la-rama`).
5. Abre un pull request describiendo tus cambios.

---

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.


