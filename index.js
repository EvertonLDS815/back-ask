const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 300;
mongoose.connect(process.env.DB_URI)
.then(() => console.log("🚀 MongoDB Conected!"))
.catch((err) => console.log(err));

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true},
    answers: {
        type: Map, // Usa um Map para armazenar pares chave-valor dinâmicos
        of: String, // Os valores devem ser strings
        required: true
    },
    correctAnswer: { type: String, required: true},
});

app.use(express.json());
app.use(cors());

const Question = mongoose.model('question', questionSchema);

app.get('/questions', async (req, res) => {
    const question = await Question.find();

    return res.status(200).json(question);
});

app.post('/questions', async (req, res) => {
    const question = req.body;
    await Question.create(question);

    return res.status(201).json(question);
});

app.listen(port, () => console.log(`🚀 Server is running http://localhost:${port}`))