const express = require('express');
const router = express.Router();
const axios = require('axios');
const Question = require('../models/Question');

// Fetch questions from Open Trivia Database API and store in MongoDB
router.post('/fetch-and-store', async (req, res) => {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=100&type=multiple');
    const questions = response.data.results.map(q => ({
      question: q.question,
      options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
      correctAnswer: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5).indexOf(q.correct_answer),
    }));

    await Question.deleteMany({}); // Clear existing questions
    await Question.insertMany(questions);
    res.json({ message: 'Questions fetched and stored successfully' });
  } catch (error) {
    console.error('Error fetching and storing questions:', error);
    res.status(500).json({ message: 'Error fetching and storing questions' });
  }
});

// Get a random question
router.get('/random', async (req, res) => {
  try {
    const count = await Question.countDocuments();
    const random = Math.floor(Math.random() * count);
    const question = await Question.findOne().skip(random);
    res.json(question);
  } catch (error) {
    console.error('Error fetching random question:', error);
    res.status(500).json({ message: 'Error fetching random question' });
  }
});

module.exports = router;

