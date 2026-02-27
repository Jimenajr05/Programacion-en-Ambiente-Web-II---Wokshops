# Workshop 4 – Autenticación con Tokens

Proyecto basado en el Workshop 3 y el ejemplo de autenticación visto en clase (Semana 4).
Se implementó autenticación por tokens y se modificó el frontend y backend para trabajar con sesiones autenticadas.

## Estructura del proyecto

Workshop4/
├─ client/
│  ├─ index.html
│  ├─ login.html
│  ├─ register.html
│  ├─ courses.html
│  └─ professors.html
│
├─ server/
│  ├─ index.js
│  ├─ package.json
│  ├─ package-lock.json
│  ├─ controllers/
│  │  └─ auth.js
│  ├─ models/
│  │  ├─ user.js
│  │  ├─ professor.js
│  │  └─ course.js
│  └─ node_modules/
│
├─ .gitignore
└─ README.md

## Funcionalidades implementadas

- Registro de usuarios con los campos:

    - Name
    - LastName
    - Email
    - Password

- Formulario de login que consume el endpoint:

    - POST /auth/token

- Lógica de autenticación con tokens, implementada en:

    - controllers/auth.js

- Almacenamiento del token en Session Storage tras el inicio de sesión.

- Protección de los APIs existentes mediante middleware de autenticación por token.

- Modificación de los formularios existentes para enviar el token en los headers 
    (Authorization: Bearer <token>).

## Autor
María Jimena Jara Rojas - Universidad Técnica Nacional (UTN)