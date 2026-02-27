const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Professor = require('./models/professor');
const Course = require('./models/course');
const User = require('./models/user');

const { authenticateToken, generateToken } = require('./controllers/auth');

mongoose.connect(
  'mongodb+srv://workshop1:Admin1234@cluster0.ezdvqnb.mongodb.net/workshop1?appName=Cluster0'
);
const database = mongoose.connection;


database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});

const app = express();

//middlewares
app.use(bodyParser.json());

app.use(cors({
  domains: '*',
  methods: '*'
}));

// Rutas de autenticación y generación de token para el acceso a las rutas protegidas de profesores y cursos
app.post('/auth/token', generateToken);

// Registro de usuarios y autenticación de token para las rutas protegidas de profesores y cursos
app.post('/register', async (req, res) => {
    const { name, lastName, email, password } = req.body;

    if (!name || !lastName || !email || !password) {
        return res.status(400).json({ message: 'Name, last name, email and password are required' });
    }

    try {
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const user = new User({ name, lastName, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// CRUD Profesores

// Post Profesor necesita autenticación con token para crear un nuevo profesor 
app.post('/professor', authenticateToken, async (req, res) => {
    try {
        const professor = new Professor({
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            cedula: req.body.cedula,
            edad: req.body.edad,
        });

        const professorCreated = await professor.save();
        res.header('Location', `/professor?id=${professorCreated._id}`);
        res.status(201).json(professorCreated);

    }catch (error) {
        res.status(400).json({message: error.message});
    }
});

// Get Profesor
app.get('/professor', authenticateToken, async (req, res) => {
    try{
        if(!req.query.id){
            const data = await Professor.find();
            return res.status(200).json(data)
        }
        const data = await Professor.findById(req.query.id);

        if (!data) {
            return res.status(404).json({ message: 'Profesor not found' });
        }
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

// Update Profesor
app.put('/professor/:id', authenticateToken, async (req, res) => {
    try{
        const updatedProfessor = await Professor.findByIdAndUpdate(
            req.params.id,
            {
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                cedula: req.body.cedula,
                edad: req.body.edad,
            },
            { new: true }
        );

        if(!updatedProfessor){
            return res.status(404).json({message: 'Profesor not found'});
        }
        res.status(200).json(updatedProfessor);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
});

// Delete Profesor
app.delete('/professor/:id', authenticateToken, async (req, res) => {
    try{
        const hasCourses = await Course.exists({ profesorId: req.params.id });
        if (hasCourses) {
            return res.status(400).json({ message: 'No se puede eliminar el profesor porque tiene cursos asociados' });
        }

        const deleteProfessor = await Professor.findByIdAndDelete(req.params.id);

        if(!deleteProfessor){
            return res.status(404).json({message: 'Course not found'});
        }
        res.status(204).send();
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
});

// CRUD Cursos

// Post Curso
app.post('/course', authenticateToken, async (req, res) => {
    try {
        if(req.body.profesorId){
            const profesor = await Professor.findById(req.body.profesorId);
            if(!profesor){
                return res.status(400).json({message: 'Profesor Inválido'});
            }
        }

        const course = new Course({
            nombre: req.body.nombre,
            codigo: req.body.codigo,
            descripcion: req.body.descripcion,
            profesorId: req.body.profesorId || null
        });

        const courseCreated = await course.save();
        res.header('Location', `/course?id=${courseCreated._id}`);
        res.status(201).json(courseCreated);

    }catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Código de curso ya existe' });
        }
        res.status(400).json({message: error.message});
    }
});

// Get Curso
app.get('/course', authenticateToken, async (req, res) => {
    try{
        if(!req.query.id){
            const data = await Course.find().populate('profesorId');
            return res.status(200).json(data)
        }
        const data = await Course.findById(req.query.id).populate('profesorId');
        if (!data) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

// Update Curso
app.put('/course/:id', authenticateToken, async (req, res) => {
    try{
        if (req.body.profesorId){
            const profesor = await Professor.findById(req.body.profesorId);
            if(!profesor){
                return res.status(400).json({message: 'Profesor Inválido'});
            }
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            {
                nombre: req.body.nombre,
                codigo: req.body.codigo,
                descripcion: req.body.descripcion,
                profesorId: req.body.profesorId || null
            },
            { new: true }
        ).populate('profesorId');

        if(!updatedCourse){
            return res.status(404).json({message: 'Course not found'});
        }
        res.status(200).json(updatedCourse);
    }
    catch(error){
        // Verificar si el error es por código de curso duplicado
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Código de curso ya existe' });
        }
        res.status(400).json({message: error.message});
    }
});

// Delete Curso
app.delete('/course/:id', authenticateToken, async (req, res) => {
    try{
        const deleteCourse = await Course.findByIdAndDelete(req.params.id);

        if(!deleteCourse){
            return res.status(404).json({message: 'Course not found'});
        }
        res.status(204).send();
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
});

// start the app
app.listen(3001, () => console.log(`UTN API service listening on port 3001!`))