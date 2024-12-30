import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import Confetti from 'react-confetti';

function App() {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/questions/random');
      setQuestion(response.data);
      setSelectedAnswer(null);
      setResult(null);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
    setLoading(false);
  };

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    setQuestionsAnswered(questionsAnswered + 1);
    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1);
      setResult('correct');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setResult('incorrect');
    }
  };

  const handleNext = () => {
    fetchQuestion();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-6 flex flex-col justify-center sm:py-12">
      {showConfetti && <Confetti />}
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"
        >
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Quiz Master</h1>
          <div className="max-w-md mx-auto">
            <div className="mb-8 text-center">
              <p className="text-2xl font-semibold text-gray-700">Score: {score}/{questionsAnswered}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(score / questionsAnswered) * 100 || 0}%` }}
                  transition={{ duration: 0.5 }}
                  className="bg-blue-600 h-2.5 rounded-full"
                ></motion.div>
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">{question.question}</h2>
            <ul className="space-y-3">
              {question.options.map((option, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerSelect(index)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors duration-300 ${
                    selectedAnswer === index
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  {option}
                </motion.li>
              ))}
            </ul>
            <AnimatePresence>
              {selectedAnswer !== null && !result && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className="mt-6 w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300"
                >
                  Submit Answer
                </motion.button>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6"
                >
                  <div className={`flex items-center justify-center mb-4 ${
                    result === 'correct' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {result === 'correct' ? (
                      <CheckCircleIcon className="h-8 w-8 mr-2" />
                    ) : (
                      <XCircleIcon className="h-8 w-8 mr-2" />
                    )}
                    <p className="text-lg font-semibold">
                      {result === 'correct' ? 'Correct!' : 'Incorrect'}
                    </p>
                  </div>
                  {result === 'incorrect' && (
                    <p className="text-gray-600 mb-4">
                      The correct answer was: {question.options[question.correctAnswer]}
                    </p>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
                  >
                    Next Question
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;

