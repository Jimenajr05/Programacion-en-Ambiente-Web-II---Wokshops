# Workshop 3 – REST API Cursos y Profesores

REST API desarrollada con Node.js, Express y MongoDB Atlas para el curso Programación en Ambiente Web II – UTN.
El proyecto permite gestionar Profesores y Cursos, incluyendo la relación entre ambos (un curso puede tener un profesor asignado).
Incluye frontend básico en HTML + JavaScript (Fetch API) y backend con Mongoose.

## Tecnologías

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- CORS
- Body-Parser
- HTML5
- JavaScript (Fetch API)

## Estructura del proyecto
Workshop3/
├─ client/
│  ├─ index.html
│  ├─ courses.html
│  └─ professors.html
│
├─ server/
│  ├─ index.js
│  ├─ package.json
│  ├─ package-lock.json
│  ├─ models/
│  │  ├─ course.js
│  │  └─ professor.js
│  └─ node_modules/
│
├─ .gitignore
└─ README.md

## Configuración y ejecución

1. Instalar dependencias (en la carpeta server):
    npm init
    npm i express mongoose nodemon dotenv
    npm install mongoose --save
    npm install cors
    npm run dev 
    node index.js

2. Ejecutar el servidor
    npm run dev
    o
    node index.js

3. Servidor disponible en:
    http://localhost:3001

4. Endpoints API
#### Profesores
- Crear profesor
    POST /professor

    Body (JSON):

    {
    "nombre": "Carlos",
    "apellidos": "Rodríguez",
    "cedula": "12345678",
    "edad": 40
    }

- Obtener todos los profesores
    GET /professor?id=ID

- Actualizar profesor
    PUT /professor/:id

- Eliminar profesor
    DELETE /professor/:id

## AVISO
No se puede eliminar un profesor si tiene cursos asignados (control de integridad).

#### Cursos
- Crear curso
    POST /course

    Body (JSON):

    {
    "nombre": "Programación Web II",
    "codigo": "PW2-2026",
    "descripcion": "Curso avanzado de desarrollo web",
    "profesorId": "ID_DEL_PROFESOR" // opcional
    }

Valida que el profesor exista
Código único
Manejo de error E11000 (duplicados)

- Obtener todos los cursos
    GET /course

Incluye populate() para traer los datos del profesor
Ordena por fecha de creación descendente

- NObtener un curso por ID
    GET /course?id=ID

- Actualizar curso
    PUT /course/:id

Valida profesor si se envía
aneja duplicados en código

- Eliminar curso
    DELETE /course/:id

5. Relación entre modelos

- Un Curso puede tener un profesorId
- profesorId es una referencia (ref: 'Profesor')
- Se utiliza populate() para traer los datos completos del profesor

6. Frontend
El frontend está desarrollado en:

- HTML
- JavaScript Vanilla
- Fetch API
- Manejo dinámico del DOM

Permite:

* Crear, editar y eliminar profesores
* Crear, editar y eliminar cursos
* Asignar profesor a un curso
* Mostrar tablas dinámicas
* Validaciones básicas

7. Validaciones implementadas

- Campos obligatorios
- Código de curso único
- Cédula única
- Validación de profesor existente
- Control de eliminación con cursos asociados
- Manejo de errores personalizados
- Edad mínima de 18 años para profesores

## Autor
María Jimena Jara Rojas – Universidad Técnica Nacional (UTN)