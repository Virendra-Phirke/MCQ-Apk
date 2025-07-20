import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../contexts/QuizContext';
import { 
  Clock, 
  Flag, 
  CheckCircle, 
  XCircle, 
  ArrowLeft, 
  ArrowRight, 
  SkipForward,
  AlertCircle,
  Timer
} from 'lucide-react';

const QuizInterface: React.FC = () => {
  const navigate = useNavigate();
  const { quizState, config, answerQuestion, flagQuestion, unflagQuestion, goToQuestion, submitQuiz } = useQuiz();
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!quizState) {
      navigate('/configure');
      return;
    }

    if (config?.timeLimit && config.timeLimit > 0) {
      setTimeLeft(config.timeLimit * 60);
    }
  }, [quizState, config, navigate]);

  useEffect(() => {
    if (timeLeft === undefined || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === undefined || prev <= 1) {
          clearInterval(timer);
          submitQuiz();
          navigate('/results');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitQuiz, navigate]);

  if (!quizState || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Quiz in Progress
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Please configure and start a quiz first.
          </p>
          <button
            onClick={() => navigate('/configure')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Configure Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const currentAnswer = quizState.answers[quizState.currentQuestionIndex];
  const isFlagged = quizState.flaggedQuestions.has(quizState.currentQuestionIndex);
  const answeredCount = quizState.answers.filter(answer => answer !== null).length;
  const progress = (quizState.currentQuestionIndex + 1) / quizState.questions.length;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answerIndex: number) => {
    answerQuestion(quizState.currentQuestionIndex, answerIndex);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
      goToQuestion(quizState.currentQuestionIndex + 1);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (quizState.currentQuestionIndex > 0) {
      goToQuestion(quizState.currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };

  const handleSubmit = () => {
    if (answeredCount < quizState.questions.length) {
      if (window.confirm('You have unanswered questions. Are you sure you want to submit?')) {
        submitQuiz();
        navigate('/results');
      }
    } else {
      submitQuiz();
      navigate('/results');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/configure')}
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {config.language} Quiz
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Question {quizState.currentQuestionIndex + 1} of {quizState.questions.length}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {timeLeft !== undefined && (
                <div className="flex items-center space-x-2 bg-red-100 dark:bg-red-900/20 px-3 py-2 rounded-lg">
                  <Timer className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <span className="font-mono text-red-600 dark:text-red-400">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              )}
              
              <div className="text-right">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {answeredCount} / {quizState.questions.length} answered
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {quizState.flaggedQuestions.size} flagged
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Question Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {currentQuestion.difficulty}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-500">•</span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {currentQuestion.category}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => {
                  if (isFlagged) {
                    unflagQuestion(quizState.currentQuestionIndex);
                  } else {
                    flagQuestion(quizState.currentQuestionIndex);
                  }
                }}
                className={`p-2 rounded-lg transition-colors ${
                  isFlagged 
                    ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400' 
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-yellow-100 hover:text-yellow-600 dark:hover:bg-yellow-900/20 dark:hover:text-yellow-400'
                }`}
              >
                <Flag className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Question Content */}
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {currentQuestion.question}
              </h2>
              
              {currentQuestion.code && (
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
                  <pre>{currentQuestion.code}</pre>
                </div>
              )}
            </div>

            {/* Answer Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    currentAnswer === index
                      ? showExplanation
                        ? index === currentQuestion.correctAnswer
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                  } ${showExplanation ? 'cursor-default' : 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 dark:text-white">
                      {String.fromCharCode(65 + index)}. {option}
                    </span>
                    {showExplanation && currentAnswer === index && (
                      <div className="flex items-center space-x-2">
                        {index === currentQuestion.correctAnswer ? (
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                    )}
                    {showExplanation && index === currentQuestion.correctAnswer && currentAnswer !== index && (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Explanation
                </h4>
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={quizState.currentQuestionIndex === 0}
                className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Previous
              </button>

              <div className="flex items-center space-x-2">
                {quizState.currentQuestionIndex < quizState.questions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <SkipForward className="h-4 w-4 mr-1" />
                    Submit Quiz
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Question Navigation */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Question Navigation
          </h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {quizState.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToQuestion(index)}
                className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  index === quizState.currentQuestionIndex
                    ? 'bg-blue-600 text-white'
                    : quizState.answers[index] !== null
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                    : quizState.flaggedQuestions.has(index)
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizInterface; 