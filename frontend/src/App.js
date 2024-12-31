import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import Confetti from "react-confetti";

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
      const response = await axios.get("http://localhost:5000/api/questions/random");
      setQuestion(response.data);
      setSelectedAnswer(null);
      setResult(null);
    } catch (error) {
      console.error("Error fetching question:", error);
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
      setResult("correct");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setResult("incorrect");
    }
  };

  const handleNext = () => {
    fetchQuestion();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-purple-800 to-pink-800 py-6">
      {showConfetti && <Confetti />}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6"
        >
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Quiz App</h1>
          <div className="mb-4">
            <p className="text-xl text-gray-600 text-center">
              Score: <span className="font-bold text-gray-900">{score}</span> /{" "}
              {questionsAnswered}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(score / questionsAnswered) * 100 || 0}%`,
                }}
                className="bg-green-500 h-2 rounded-full"
              ></motion.div>
            </div>
          </div>
          <h2 className="text-2xl font-medium text-gray-700 mb-6">
            {question.question}
          </h2>
          <ul className="space-y-4">
            {question.options.map((option, index) => (
              <motion.li
                key={index}
                onClick={() => handleAnswerSelect(index)}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg cursor-pointer ${
                  selectedAnswer === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {option}
              </motion.li>
            ))}
          </ul>
          <AnimatePresence>
            {selectedAnswer !== null && !result && (
              <motion.button
                onClick={handleSubmit}
                whileHover={{ scale: 1.05 }}
                className="mt-6 w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Submit Answer
              </motion.button>
            )}
          </AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <div
                className={`flex items-center text-lg mb-4 ${
                  result === "correct" ? "text-green-600" : "text-red-600"
                }`}
              >
                {result === "correct" ? (
                  <CheckCircleIcon className="h-6 w-6 mr-2" />
                ) : (
                  <XCircleIcon className="h-6 w-6 mr-2" />
                )}
                {result === "correct" ? "Correct!" : "Incorrect"}
              </div>
              {result === "incorrect" && (
                <p className="text-gray-600 mb-4">
                  Correct Answer: {question.options[question.correctAnswer]}
                </p>
              )}
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.05 }}
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Next Question
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default App;
