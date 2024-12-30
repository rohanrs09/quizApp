import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [loading, setLoading] = useState(true);

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
      setResult('Correct!');
    } else {
      setResult(`Incorrect. The correct answer was: ${question.options[question.correctAnswer]}`);
    }
  };

  const handleNext = () => {
    fetchQuestion();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Quiz Master</h1>
          <div className="max-w-md mx-auto">
            <div className="mb-4 text-center">
              <p className="text-xl font-semibold text-gray-700">Score: {score}/{questionsAnswered}</p>
            </div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">{question.question}</h2>
            <ul className="space-y-2">
              {question.options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors duration-300 ${
                    selectedAnswer === index
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  {option}
                </li>
              ))}
            </ul>
            {selectedAnswer !== null && !result && (
              <button
                onClick={handleSubmit}
                className="mt-6 w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300"
              >
                Submit
              </button>
            )}
            {result && (
              <div className="mt-6">
                <p className={`text-lg font-semibold ${result.startsWith('Correct') ? 'text-green-500' : 'text-red-500'}`}>
                  {result}
                </p>
                <button
                  onClick={handleNext}
                  className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
                >
                  Next Question
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

