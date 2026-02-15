const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Professor = require('./models/professor');
const Course = require('./models/course');

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

// CRUD Profesores

// Post Profesor
app.post('/professor', async (req, res) => {
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
app.get('/professor', async (req, res) => {
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
app.put('/professor/:id', async (req, res) => {
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
app.delete('/professor/:id', async (req, res) => {
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
app.post('/course', async (req, res) => {
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
app.get('/course', async (req, res) => {
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
app.put('/course/:id', async (req, res) => {
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
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Código de curso ya existe' });
        }
        res.status(400).json({message: error.message});
    }
});

// Delete Curso
app.delete('/course/:id', async (req, res) => {
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