# Workshop 2 – REST API Cursos

REST API desarrollada con Node.js, Express y MongoDB Atlas para el curso Programación en Ambiente Web II.
El proyecto permite crear y listar cursos mediante un frontend básico en HTML y una API REST con Mongoose.

## Tecnologías
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- CORS
- HTML + JavaScript (AJAX)

## Estructura del proyecto
Workshop2/
├─ client/
│  ├─ index.html
│  ├─ createCourse.html
│  └─ listCourses.html
├─ server/
│  ├─ index.js
│  ├─ package.json
│  ├─ package-lock.json
│  └─ models/
│     └─ course.js
├─ .gitignore
└─ README.md

## Configuración y ejecución

1. Instalar dependencias (en la carpeta server):
    npm init
    npm i express mongoose nodemon dotenv
    npm install mongoose --save
    npm run dev 
    node index.js

2. Servidor disponible en:
    http://localhost:3001

3. Endpoints
- Crear un curso
    POST http://localhost:3001/course

- Body - JSON:
    {
    "name": "Programación Web",
    "credits": 4
    }

- Obtener todos los cursos
    GET http://localhost:3001/course

- Actualizar un curso
    PUT http://localhost:3001/course/ID

- Eliminar un curso
    DELETE http://localhost:3001/course/ID

## Autor
María Jimena Jara Rojas – Universidad Técnica Nacional (UTN)