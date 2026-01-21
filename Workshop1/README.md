# Workshop 1 – REST API

REST API desarrollada con Node.js, Express y MongoDB Atlas para el curso
Programación en Ambiente Web II, siguiendo la guía de freeCodeCamp.
El proyecto implementa un CRUD completo utilizando Mongoose y fue probado con Postman.

## Tecnologías
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Nodemon
- Postman

## Estructura del proyecto
Workshop1/
├─ index.js
├─ package.json
├─ package-lock.json
├─ routes/
│ └─ routes.js
├─ models/
│ └─ model.js
├─ .gitignore
├─ .env.example
└─ README.md

## Configuración y ejecución
1. Verificar versiones:
node -v
npm -v

2. Instalar dependencias:
npm init
npm i express mongoose nodemon dotenv

3. Crear el archivo .env a partir de .env.example y agregar la cadena de conexión a MongoDB Atlas:
DATABASE_URL=mongodb+srv://USUARIO:CONTRASEÑA@cluster.mongodb.net/workshop1

4. Ejecutar el servidor:
npm start

## Servidor disponible en:
http://localhost:3000

## Endpoints
- Crear un registro:
    POST http://localhost:3000/api/post
    Body - raw - JSON:

        { 
            "name": "Juan", 
            "age": 25 
        }

- Obtener todos los registros:
    GET http://localhost:3000/api/getAll

- Obtener un registro por ID:
    GET http://localhost:3000/api/getOne/id

- Actualizar un registro por ID:
    PATCH http://localhost:3000/api/update/id
    Body - raw - JSON:

        { 
            "age": 30 
        }

- Eliminar un registro por ID:
    DELETE http://localhost:3000/api/delete/id

## Autor
María Jimena Jara Rojas