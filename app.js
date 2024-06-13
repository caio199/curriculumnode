const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex')(require('./knexfile')['development']);

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Rota para criar um novo currículo na tabela Curriculums
app.post('/api/curriculum', async (req, res) => {
  const { name, email, phone, address, education, experience, skills } = req.body;
  try {
    const newCurriculum = await knex('Curriculums').insert({
      name,
      email,
      phone,
      address,
      education,
      experience,
      skills,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning('*');
    res.status(201).json(newCurriculum[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para obter todos os currículos
app.get('/api/curriculum', async (req, res) => {
  try {
    const curriculums = await knex('Curriculums').select('*');
    res.json(curriculums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para obter um currículo específico por ID
app.get('/api/curriculum/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const curriculum = await knex('Curriculums').where({ id }).first();
    if (!curriculum) {
      res.status(404).json({ error: 'Currículo não encontrado' });
      return;
    }
    res.json(curriculum);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para atualizar um currículo por ID
app.put('/api/curriculum/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, education, experience, skills } = req.body;
  try {
    const updatedCurriculum = await knex('Curriculums')
      .where({ id })
      .update({
        name,
        email,
        phone,
        address,
        education,
        experience,
        skills,
        updatedAt: new Date()
      })
      .returning('*');
    
    if (updatedCurriculum.length === 0) {
      res.status(404).json({ error: 'Currículo não encontrado' });
      return;
    }
    
    res.json(updatedCurriculum[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para excluir um currículo por ID
app.delete('/api/curriculum/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCurriculum = await knex('Curriculums').where({ id }).del().returning('*');
    
    if (deletedCurriculum.length === 0) {
      res.status(404).json({ error: 'Currículo não encontrado' });
      return;
    }
    
    res.json({ message: 'Currículo excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});

